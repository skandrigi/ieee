"use client";
import Notifications from "./notifications";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function Home() {
  const Map = useMemo(() => dynamic(
    () => import('./map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), []);
  
  const position = [30.6212, -96.3404]; 
  const zoom = 13; 

  return (
    <div className="flex">
      <div className="bg-slate-200 grid grid-rows-[20px_1fr_20px] w-[200px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="content-center items-center text-center">
          <Notifications />
        </div>
      </div>
      <div className="w-screen h-[100vh] items-center justify-center">
        <div className="w-screen h-[100vh]">
          <Map position={position} zoom={zoom} />
        </div>
      </div>
    </div>
  );
}
