import React from 'react'
import librarySVG from '../assets/library.svg';
import { BiSolidSkull } from "react-icons/bi";
import { GoArrowRight, GoHomeFill,GoPlus,GoSearch } from "react-icons/go";


function Sidebar() {
  return (
    <>
        <div className='leftContainer h-[100%] pr-1 w-1/4 '>
            <div className="left-top  h-1/4 p-5 rounded-md flex flex-col gap-2 "> <p className='flex items-center gap-2 text-[26px]'><BiSolidSkull className='text-[35px]'/>Groovy</p> <p className='flex items-center gap-2 mx-1 '><GoHomeFill className='text-[26px]'/>Home</p>
            <p className='flex items-center gap-2 mx-1'><GoSearch className='text-[28px]'/>Search</p> </div>
            <div className="left-bottom  my-2 h-[74%] rounded-md p-5">
              <div className="library px-2 flex items-center justify-between">
                <div className='min-w-min flex gap-3 items-center'><img src={librarySVG} className='filter brightness-0 invert w-7' /> <p>Your Library</p></div>
                <div className='flex text-2xl  gap-3'> <span><GoPlus /></span> <span><GoArrowRight /></span> </div>
              </div>
              <div className='mt-3 h-2/3 overflow-y-scroll'>
                <div className='h-[55%] p-3 my-6 rounded-md w-[95%] bg-green-900'>
                  <p className='text-lg px-2'>Create your first playlist</p>
                  <p className='text-sm text-gray-300 px-2 font-normal'>It's easy we'll help you </p>
                  <div className='h-[70px] w-[160px] text-slate-600 flex justify-center items-center'>
                    <button  className='bg-white h-[39px] w-[150px] rounded-full hover:text-[14.5px] hover:h-[41px] hover:w-[153px] text-sm'>Create Playlist</button>
                  </div>
                </div>
                <div className='h-[55%] rounded-md w-[95%]  bg-green-900'>
                <p className='text-lg px-2'>Let's find some podcasts to follow</p>
                  <p className='text-sm text-gray-300 px-2 font-normal'>We'll keep you updated on new episodes</p>
                  <div className='h-[70px] w-[160px] text-slate-600 flex justify-center items-center '>
                    <button  className='bg-white h-[39px] w-[150px] rounded-full hover:text-[14.5px] hover:h-[41px] hover:w-[153px] text-sm'>Create Playlist</button>
                  </div>
                </div>
              </div>
              <div className=' h-[30%] flex justify-center items-center'>
                <footer className='text-[9.5px] text-gray-500 '>
                  <a className='mr-5' href="">Legal</a>
                  <a className='mr-5' href="">Safety & Privacy</a>
                  <a className='mr-5' href="">Privacy Policy</a>
                  <a className='mr-5' href="">Cookies</a>
                  <a className='mr-5' href="">About Ads</a>
                  <a className='mr-5' href="">Accessibility</a>
                </footer>
              </div>
            </div>
          </div>
    </>
  )
}

export default Sidebar