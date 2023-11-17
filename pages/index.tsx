import React, { useState, useEffect } from 'react';
import withAuth from '@/HOC/withAuth';
import { NextPage } from 'next';
import Layout from '@/components/Layout';

const images = [
  '/assets/image-1.webp',
  '/assets/image-2.webp',
  '/assets/image-3.webp',
  '/assets/image-4.webp',
  '/assets/image-5.webp',
  '/assets/image-6.webp',
  // More images...
];

const Home: NextPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImageIndex = (currentImageIndex + 1) % images.length;
  const prevImageIndex = (currentImageIndex - 1 + images.length) % images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(nextImageIndex);
    }, 2000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [nextImageIndex]);

  return (
    <Layout>
    <div className="container mx-auto px-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl text-slate-600 font-bold my-4">Welcome to the Home Page</h1>
      <div className="flex items-center justify-center my-9">
        <img className='h-60 w-h-60 opacity-50 transition-opacity duration-300 ease-in-out' src={images[prevImageIndex]} alt="Previous" />
        <img className='h-72 w-h-72 mx-4 transition-transform duration-300 ease-in-out transform scale-110' src={images[currentImageIndex]} alt="Current" />
        <img className='h-60 w-h-60 opacity-50 transition-opacity duration-300 ease-in-out' src={images[nextImageIndex]} alt="Next" />
      </div>
      <div className="flex justify-center mt-5">
        <button className='w-32 mx-2 py-2 bg-slate-800 text-white rounded hover:bg-slate-600 transition-colors duration-300 ease-in-out' onClick={() => setCurrentImageIndex(prevImageIndex)}>Previous</button>
        <button className='w-32 mx-2 py-2 bg-slate-800 text-white rounded hover:bg-slate-600 transition-colors duration-300 ease-in-out' onClick={() => setCurrentImageIndex(nextImageIndex)}>Next</button>
      </div>
      {/* Additional content goes here */}
    </div>
    </Layout>
  );
};

export default withAuth(Home);
