import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SquigglyLines from '../components/SquigglyLines';
import { Testimonials } from '../components/Testimonials';

const Home: NextPage = () => {
  return (
    <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen'>
      <Head>
        <title>Face Photo Restorer</title>
      </Head>
      <Header />
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-20'>
        <a
          href='https://twitter.com/nutlope/status/1704894145003741611'
          target='_blank'
          rel='noreferrer'
          className='border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out'
        >
          Used by over <span className='font-semibold'>470,000</span> happy
          users
        </a>
        <h1 className='mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl'>
          Restoring old photos{' '}
          <span className='relative whitespace-nowrap text-[#3290EE]'>
            <SquigglyLines />
            <span className='relative'>using AI</span>
          </span>{' '}
          for everyone.
        </h1>

        <p className='mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7'>
          Have old and blurry face photos? Let our AI restore them so those
          memories can live on. 100% free – restore your photos today.
        </p>
        <div className='flex justify-center space-x-4'>
          <a
            className='bg-white rounded-xl text-black font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-gray-100 border'
            href='https://www.roomgpt.io/'
            target='_blank'
            rel='noreferrer'
          >
            Check out roomGPT
          </a>

          <Link
            className='bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80'
            href='/restore'
          >
            Restore your photos
          </Link>
        </div>
        <div className='flex justify-between items-center w-full flex-col sm:mt-10 mt-6'>
          <div className='flex flex-col space-y-10 mt-4 mb-16'>
            <div className='flex sm:space-x-2 sm:flex-row flex-col'>
              <div>
                <h2 className='mb-1 font-medium text-lg'>Original Photo</h2>
                <Image
                  alt='Original photo of my bro'
                  src='/michael.jpg'
                  className='w-96 h-96 rounded-2xl'
                  width={400}
                  height={400}
                />
              </div>
              <div className='sm:mt-0 mt-8'>
                <h2 className='mb-1 font-medium text-lg'>Restored Photo</h2>
                <Image
                  alt='Restored photo of my bro'
                  width={400}
                  height={400}
                  src='/michael-new.jpg'
                  className='w-96 h-96 rounded-2xl sm:mt-0 mt-2'
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* 用户反馈表单链接 */}
        <div className="w-full max-w-2xl mx-auto my-8 p-4 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-bold mb-2">我们重视您的反馈</h2>
          <p className="text-gray-600 mb-4">帮助我们改进照片修复服务，分享您的体验和建议</p>
          <a 
            href="https://forms.gle/9xdZFSuW8HNPQqvU8" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            提交反馈
          </a>
        </div>
      </main>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
