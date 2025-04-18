# 旧照片修复网站开发文档

## 项目概述

本项目旨在创建一个在线旧照片修复平台，专注于人像照片的修复。通过整合多个开源AI模型，提供高质量的旧照片修复服务。产品初期主要面向英语市场用户，无需备案和特殊审核，降低上线门槛和成本。

## 技术架构

### 前端
- 框架：Next.js
- UI库：Tailwind CSS
- 部署平台：Vercel
- 国际化：next-i18next（初期仅支持英语）
- 响应式设计：针对移动端和桌面端优化

### 后端
- AI模型：
  - GFPGAN（人脸修复，MVP阶段唯一使用的模型）
  - Bringing-Old-Photos-Back-to-Life（整体照片修复，后期实现）
  - CodeFormer（可选，高质量人脸修复，后期实现）
- API服务：Replicate API（降低技术门槛，简化部署）
- 存储：Cloudinary免费额度
- 云服务：腾讯云高性能GPU工作空间（利用免费10000分钟/月）

### 用户系统
- 认证：MVP阶段不实现用户登录，后期考虑Firebase Auth
- 变现：初期仅使用Google AdSense广告
- 用户数据：后期考虑Firebase Firestore

### 变现策略
- 初期（0-3个月）：仅通过Google AdSense获取广告收益
- 中期（3-6个月）：评估并可能引入基础付费功能
- 长期（6个月+）：实现订阅模式和高级功能付费

## 语言支持

### MVP阶段（1-2个月）
- 仅支持英语
- 专注于英语市场SEO优化

### 增长阶段（3-6个月）
- 可选添加中文支持
- 根据用户反馈考虑其他语言

### 实现方案
1. 使用next-i18next库为未来多语言扩展做准备
2. 简化实现，初期只维护英语内容

## 腾讯云部署方案

### 环境配置
1. 选择免费基础型GPU工作空间（利用每月10000分钟免费额度）
2. 设置自动关机脚本，优化免费时长使用（每6小时不活动自动关机）
3. 预留每日2小时工作时间使用

### 资源优化
1. 设置处理任务队列，避免过载
2. 利用定时启动脚本，根据需求开启服务
3. 实现请求缓冲机制，批量处理请求以节约GPU时间

## 部署步骤（小白友好版）

### 前端部署
1. 克隆RestorePhotos项目
   ```
   git clone https://github.com/Nutlope/restorePhotos.git
   cd restorePhotos
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 配置环境变量（创建.env文件）
   ```
   REPLICATE_API_KEY=your_replicate_api_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. 部署到Vercel
   - 注册Vercel账号
   - 连接GitHub仓库
   - 一键部署

### 后端API配置
1. 注册Replicate账号并获取API密钥
2. 配置GFPGAN模型API使用权限
3. 设置API使用限制，避免意外超额使用

## 广告位设置

### MVP阶段广告位置
1. 处理等待期间广告（最重要，用户等待时间长）
2. 结果页面广告（次重要，用户查看结果时展示）
3. 底部横幅广告（最小影响用户体验）

### 实现方法
1. 集成Google AdSense
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"></script>
   ```

2. 优先设计响应式广告位，确保在移动端和桌面端均可正常显示
3. 避免过多广告影响用户体验

## 功能实现时间线

### MVP阶段（1-2个月）

#### 第1-30天：基础功能与上线
1. **第1-7天：项目设置**
   - 克隆RestorePhotos项目并熟悉代码
   - 配置Replicate API和GFPGAN模型
   - 设置基本的前端界面

2. **第8-14天：核心功能实现**
   - 实现照片上传和处理
   - 配置Cloudinary存储
   - 添加基本的结果展示页面

3. **第15-21天：用户体验改进**
   - 优化界面设计
   - 添加进度指示器
   - 实现简单的错误处理

4. **第22-30天：分析与反馈**
   - 安装Google Analytics
   - 添加用户反馈表单
   - 部署到Vercel并进行基本测试

#### 第31-60天：优化与推广
1. **第31-37天：SEO优化**
   - 优化网站元数据
   - 添加sitemap和robots.txt
   - 实现结构化数据标记

2. **第38-45天：内容与案例**
   - 添加示例修复案例
   - 创建"如何使用"页面
   - 准备营销素材

3. **第46-53天：广告集成**
   - 设置Google AdSense账户
   - 配置广告位
   - 测试不同广告位置

4. **第54-60天：社区推广准备**
   - 准备Reddit分享内容
   - 设置社交媒体账号
   - 收集初期用户反馈

### 增长阶段（3-6个月）

1. **整体照片修复功能**
   - 集成Bringing-Old-Photos-Back-to-Life模型
   - 添加划痕和折痕修复选项
   - 改进修复结果质量

2. **用户系统基础**
   - 可选的用户注册功能
   - 历史记录保存
   - 简单的用户偏好设置

3. **社区功能**
   - 用户作品展示区
   - 社交分享功能
   - 简单的推荐系统

### 优化阶段（6-12个月）

1. **高级功能开发**（根据用户反馈优先实施）
   - 照片上色功能
   - 高清放大功能
   - 批量处理功能
   - 优先处理队列

2. **付费模式设计**
   - 设计会员权益
   - 实现支付系统
   - 过渡部分功能至付费服务

## 资源管理与时间分配

### 每日工作计划（2小时/天）
- **30分钟**：代码开发与功能实现
- **30分钟**：测试与错误修复
- **30分钟**：内容创建（案例、描述文本）
- **30分钟**：社区互动与用户反馈处理

### MVP阶段最小资源需求
- **人力**：一人（开发者自己），每天2小时
- **成本**：
  - Vercel托管：免费
  - Cloudinary存储：免费额度
  - 腾讯云GPU：免费10000分钟/月
  - 域名：约$10-15/年（可选）

## 风险与缓解策略

### 技术风险
1. **API限制或中断**
   - 缓解：实现本地缓存机制，处理API暂时不可用情况
   - 缓解：设置使用量监控，避免超出免费额度

2. **性能问题**
   - 缓解：实现处理队列，避免并发请求过载
   - 缓解：优化图像大小，减少处理时间

### 用户相关风险
1. **低使用量**
   - 缓解：专注于Reddit等社区积极推广
   - 缓解：收集并实施用户反馈，提高产品吸引力

2. **高使用量消耗资源**
   - 缓解：实现请求节流和队列系统
   - 缓解：根据流量设置资源使用优先级

## 后续计划

### 基于用户反馈的功能待实现清单
1. 照片上色（黑白照片转彩色）
2. 高清放大（提高照片分辨率）
3. 批量处理（一次上传多张照片）
4. 优先处理（缩短等待时间）
5. 照片归档（保存处理历史）
6. 高级修复选项（细节控制）

## 待确定问题

1. 是否需要实现简单的用户注册系统，提升留存率？
2. 如何优化腾讯云GPU工作空间使用，避免免费时长不足？
3. 网站设计风格是偏向现代简约还是复古风格？
4. 早期营销重点是放在Reddit社区推广还是SEO优化？ 