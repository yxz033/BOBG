/**
 * 旧照片修复网站 - 每日任务提醒脚本
 * 
 * 该脚本用于解析milestone-checklist.md文件并显示当天的任务
 * Cursor将在启动时执行此脚本，提醒用户当日需要完成的任务
 */

const fs = require('fs');
const path = require('path');
const config = require('./.cursor.json');

// 配置项
const MILESTONE_FILE = 'milestone-checklist.md';
const DAYS_PER_WEEK = 7;

// 获取项目启动日期
function getProjectStartDate() {
  try {
    // 从配置文件获取启动日期
    const startDateStr = config.workflow.milestoneTracking.startDate;
    if (startDateStr === 'YYYY-MM-DD') {
      console.log('⚠️ 请在.cursor.json中设置实际的项目启动日期');
      return new Date(); // 使用当前日期作为备用
    }
    return new Date(startDateStr);
  } catch (error) {
    console.log('⚠️ 无法获取项目启动日期，使用当前日期');
    return new Date();
  }
}

// 计算项目进行的天数
function getProjectDay() {
  const startDate = getProjectStartDate();
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return Math.max(1, dayDiff); // 确保至少是第1天
}

// 解析里程碑文件
function parseMilestoneFile() {
  try {
    const filePath = path.resolve(MILESTONE_FILE);
    if (!fs.existsSync(filePath)) {
      console.log(`❌ 找不到里程碑文件: ${MILESTONE_FILE}`);
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.log(`❌ 读取里程碑文件出错: ${error.message}`);
    return null;
  }
}

// 解析技术和营销任务
function parseTasks(content) {
  if (!content) return { tech: [], marketing: [] };

  const techTasksRegex = /## 技术开发里程碑([\s\S]*?)##/g;
  const marketingTasksRegex = /## 营销与增长里程碑([\s\S]*?)##/g;

  let techMatch = techTasksRegex.exec(content);
  let marketingMatch = marketingTasksRegex.exec(content);

  const techContent = techMatch ? techMatch[1] : '';
  const marketingContent = marketingMatch ? marketingMatch[1] : '';

  return {
    tech: parseTasksByPeriod(techContent),
    marketing: parseTasksByPeriod(marketingContent)
  };
}

// 按周期解析任务
function parseTasksByPeriod(content) {
  const weekRegex = /### MVP阶段第(\d+)周[\s\S]*?:([\s\S]*?)(?=###|$)/g;
  let periods = [];
  let match;

  while ((match = weekRegex.exec(content)) !== null) {
    const weekNum = parseInt(match[1]);
    const tasksContent = match[2];
    const tasks = parseTasksInPeriod(tasksContent);
    
    periods.push({
      weekNum,
      startDay: (weekNum - 1) * DAYS_PER_WEEK + 1,
      endDay: weekNum * DAYS_PER_WEEK,
      tasks
    });
  }

  return periods;
}

// 解析某个周期内的具体任务
function parseTasksInPeriod(content) {
  const taskRegex = /- \[([ x])\] (.*?)$/gm;
  let tasks = [];
  let match;

  while ((match = taskRegex.exec(content)) !== null) {
    tasks.push({
      completed: match[1] === 'x',
      text: match[2].trim()
    });
  }

  return tasks;
}

// 获取当天的任务
function getCurrentDayTasks() {
  const content = parseMilestoneFile();
  const { tech, marketing } = parseTasks(content);
  
  const currentDay = getProjectDay();
  const currentWeek = Math.ceil(currentDay / DAYS_PER_WEEK);
  const dayInWeek = currentDay % DAYS_PER_WEEK || DAYS_PER_WEEK;
  
  // 查找当前周的技术和营销任务
  const techPeriod = tech.find(p => p.weekNum === currentWeek);
  const marketingPeriod = marketing.find(p => p.weekNum === currentWeek);
  
  // 如果找到任务，则根据当天在周内的位置分配任务
  const techTask = techPeriod && techPeriod.tasks[dayInWeek - 1];
  const marketingTask = marketingPeriod && marketingPeriod.tasks[dayInWeek - 1];
  
  // 查找尚未完成的前序任务
  const incompletePrevTechTasks = getIncompletePreviousTasks(tech, currentWeek, dayInWeek);
  const incompletePrevMarketingTasks = getIncompletePreviousTasks(marketing, currentWeek, dayInWeek);
  
  return {
    currentDay,
    currentWeek,
    dayInWeek,
    techTask,
    marketingTask,
    incompletePrevTechTasks,
    incompletePrevMarketingTasks
  };
}

// 获取尚未完成的前序任务
function getIncompletePreviousTasks(periods, currentWeek, dayInWeek) {
  let incompleteTasks = [];
  
  periods.forEach(period => {
    // 如果是之前的周期，或是当前周期但是之前的天
    if (period.weekNum < currentWeek || 
        (period.weekNum === currentWeek && period.tasks.some((t, idx) => idx < dayInWeek - 1 && !t.completed))) {
      
      // 查找尚未完成的任务
      period.tasks.forEach((task, idx) => {
        if (!task.completed && (period.weekNum < currentWeek || idx < dayInWeek - 1)) {
          incompleteTasks.push({
            weekNum: period.weekNum,
            dayInWeek: idx + 1,
            text: task.text
          });
        }
      });
    }
  });
  
  return incompleteTasks;
}

// 显示当天任务
function displayDailyTasks() {
  const tasks = getCurrentDayTasks();
  
  console.log('\n====================================================');
  console.log(`🚀 旧照片修复网站 - 第${tasks.currentDay}天任务 (第${tasks.currentWeek}周第${tasks.dayInWeek}天)`);
  console.log('====================================================\n');
  
  // 显示今日技术任务
  console.log('🔧 今日技术任务:');
  if (tasks.techTask) {
    const status = tasks.techTask.completed ? '✅ 已完成' : '⬜ 待完成';
    console.log(`${status} ${tasks.techTask.text}`);
  } else {
    console.log('未找到今日技术任务，请检查里程碑文件');
  }
  
  // 显示今日营销任务
  console.log('\n📣 今日营销任务:');
  if (tasks.marketingTask) {
    const status = tasks.marketingTask.completed ? '✅ 已完成' : '⬜ 待完成';
    console.log(`${status} ${tasks.marketingTask.text}`);
  } else {
    console.log('未找到今日营销任务，请检查里程碑文件');
  }
  
  // 显示未完成的前序任务
  if (tasks.incompletePrevTechTasks.length > 0 || tasks.incompletePrevMarketingTasks.length > 0) {
    console.log('\n⚠️ 未完成的前序任务:');
    
    if (tasks.incompletePrevTechTasks.length > 0) {
      console.log('\n技术任务:');
      tasks.incompletePrevTechTasks.forEach(task => {
        console.log(`🔴 第${task.weekNum}周第${task.dayInWeek}天: ${task.text}`);
      });
    }
    
    if (tasks.incompletePrevMarketingTasks.length > 0) {
      console.log('\n营销任务:');
      tasks.incompletePrevMarketingTasks.forEach(task => {
        console.log(`🔴 第${task.weekNum}周第${task.dayInWeek}天: ${task.text}`);
      });
    }
  }
  
  // 提醒更新里程碑进度
  console.log('\n📝 完成任务后，请记得在 milestone-checklist.md 中更新状态!');
  console.log('   将 [ ] 更改为 [x] 以标记已完成的任务');
  
  // 提醒每周回顾
  if (tasks.dayInWeek === DAYS_PER_WEEK) {
    console.log('\n🔄 今天是本周最后一天，请进行周进度回顾，并调整下周计划!');
  }
  
  console.log('\n====================================================\n');
}

// 主函数
function main() {
  try {
    displayDailyTasks();
  } catch (error) {
    console.log(`❌ 执行出错: ${error.message}`);
  }
}

// 执行主函数
main(); 