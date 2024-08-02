import React from 'react'
import { useEffect } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Navbar = ({isVisible,Artist}) => {
  useEffect(() => {
    console.log(isVisible);
  },[isVisible])
  
  
  return (
    <div className='navbar bg-[#131b11] pl-5 pr-7  rounded-t-md h-[11%] flex items-center justify-between'>
                <div className="forward-back flex text-xl gap-2 "><span className='pl-1 bg-[#041001]'><MdArrowBackIos /></span> <span className='bg-[#041001]'><MdArrowForwardIos /></span>
                </div>
                {
                isVisible &&
                <div className='h-full w-full'> {Artist.name} </div>
                }
                <div className='flex gap-5'>
                  <button onClick={()=>{}} className='hover:text-[16.4px] hover:text-white text-gray-400 flex justify-center items-center w-[65px] '>Sign Up</button>
                  <div className='h-[70px] w-[120px] flex justify-center items-center'>
                    <button onClick={()=>{}}  className='bg-orange-600 h-[49px] w-[110px] rounded-full hover:text-[16.4px] hover:h-[51px] hover:w-[115px]'>Log in</button>
                  </div>
                </div>
              </div>
)
}

export default Navbar