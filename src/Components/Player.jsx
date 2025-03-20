import { useEffect, useState } from 'react'
import React from 'react'
import { useRef } from 'react';
import { FaCirclePlay,FaCirclePause,FaForwardStep,FaBackwardStep} from "react-icons/fa6";

const Player = ({setSongAudio,setSongImg,setDuration,setSongId,SongId,setSongName,SongAudio,SongImg,Duration,SongName,setIsPlaying,isPlaying,Track}) => {

    const [expanded, setExpanded] = useState(false);
    
    const audioRef = useRef(null);

    useEffect(() => {
        if (SongAudio) {
            audioRef.current = new Audio(SongAudio);
            audioRef.current.play();
            setIsPlaying(true);
            setExpanded(false)
        }
        if (SongAudio === null) {
            setExpanded(true);
        }

    }, [SongAudio]);
    
    
    useEffect(() => {
        // Retrieve song details from localStorage when component mounts
        const savedSong = JSON.parse(localStorage.getItem('LastSong'));
        if (savedSong) {
            // setSongAudio(savedSong.songAudio);
            setSongImg(savedSong.songImg);
            setDuration(savedSong.duration);
            setSongName(savedSong.songName);
            setSongId(savedSong.songId);
            setIsPlaying(false);
        }
    }, []);

    useEffect(() => {
        // Store song details in localStorage whenever they change
        if (SongAudio) {
            const songDetails = {
                songAudio: SongAudio,
                songImg: SongImg,
                duration: Duration,
                songName: SongName,
                songId: SongId,
            };
            localStorage.setItem('LastSong', JSON.stringify(songDetails));
        }
    }, [SongAudio, SongImg, Duration, SongName, SongId]);

    const handlePlay = ()=>{
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.pause();
                setIsPlaying(!isPlaying);
            }
            else{
                audioRef.current.play();
                setIsPlaying(!isPlaying);
            }
        }
        else{
            console.log("123456789");
            setSongAudio(JSON.parse(localStorage.getItem('LastSong')).songAudio);
        }

    }

    function secondsToMinutes(milliseconds) {
        let totalSeconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let formattedSeconds = seconds.toString().padStart(2, '0');
        return `${minutes}:${formattedSeconds}`;
      }

    const goForward = ()=>{
        audioRef.current.pause();
        for (let index = 0; index < Track.length; index++) {
                if(SongId === Track[index].id){
                    console.log(Track[(index+1)%Track.length].album.images[2].url);
                    setSongAudio(Track[(index+1)%Track.length].preview_url);
                    setSongImg(Track[(index+1)%Track.length].album.images[2].url);
                    setDuration( secondsToMinutes(Track[(index+1)%Track.length].duration_ms));
                    setSongName(Track[(index+1)%Track.length].name)
                    setSongId(Track[(index+1)%Track.length].id)
                }
        }
        if (SongAudio === null) {
            setTimeout(() => {
                setExpanded(false);
            }, 1500);
            setExpanded(true)
        }
    }
    const goBackward = ()=>{
        audioRef.current.pause();
        for (let index = 0; index < Track.length; index++) {
                if(SongId === Track[index].id){
                    // console.log(Track[(index-1+Track.length)%Track.length].album.images[2].url);
                    setSongAudio(Track[(index-1+Track.length)%Track.length].preview_url);
                    setSongImg(Track[(index-1+Track.length)%Track.length].album.images[2].url);
                    setDuration(secondsToMinutes(Track[(index-1+Track.length)%Track.length].duration_ms));
                    setSongName(Track[(index-1+Track.length)%Track.length].name)
                    setSongId(Track[(index-1+Track.length)%Track.length].id)
                }
        }
        if (SongAudio === null) {
            setTimeout(() => {
                setExpanded(false);
            }, 1500);
            setExpanded(true)
        }   
    }
    
    

  return (
    <div className='playing-song h-[11%] bg-cover text-xl font-bold bg-opacity-0 rounded-lg mx-2' style={{ backgroundImage: `url(${SongImg})`, backgroundPosition : '100% 50%' }}>
        <div className="playing-song h-full bottom-0 flex justify-between items-center px-12 rounded-lg text-white bg-[#05220248] hover:bg-[#05220258] ">
            <div className='h-[70px] w-[33%] flex gap-2 items-center font-bold pl-2'><img className='rounded-md'  src={SongImg}/><div>{SongName}</div></div>
            <div className='h-[fit] w-[33%] flex justify-center items-center gap-4'>
                <div className='text-[30px] hover:cursor-pointer hover:text-[33px] h-[55px] w-[55px] flex justify-center items-center' ><FaBackwardStep onClick={goBackward}/></div>
                <div onClick={handlePlay} className='hover:cursor-pointer hover:text-[52px]  h-[55px] w-[55px] text-[48px] flex justify-center items-center'>
                    {isPlaying?<FaCirclePause />:<FaCirclePlay />} 
                </div>
                <div className='text-[30px] hover:cursor-pointer hover:text-[33px] h-[55px] w-[55px] flex justify-center items-center'><FaForwardStep onClick={goForward}/></div>
            </div>
            <div className='w-[33%] flex justify-between'>
            <div className={` h-[28px] transition-width duration-700 ease-linear ${expanded ? 'w-[255px] px-2 overflow-x-hidden ' : 'w-0'} overflow-hidden  text-red-900 bg-[#ffffffbc] rounded-full `}>
                {SongAudio === null ? 'This song is not available' : ''}
            </div>
            <div>{Duration}</div>
        </div>
        </div>
        </div>
  )
}

export default Player