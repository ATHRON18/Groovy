import React, { useState,useEffect } from 'react'
import Home from './Home'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Navbar from './Navbar'
import ArtistPersonal from './ArtistPersonal'
import Sidebar from './Sidebar'
import Player from './Player'


const RightContainer = () => {

  const [access_token,setaccess_token] = useState(null)
  const [SongImg,setSongImg] = useState(null);
  const [SongAudio,setSongAudio] = useState();
  const [SongName,setSongName] = useState(null);
  const [SongId,setSongId] = useState(null);
  const [Duration,setDuration] = useState(null);
  const [isPlaying,setIsPlaying] = useState(false);
  const [Track,setTrack] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [Artist,setArtist] = useState(null)

useEffect(() => {
  setaccess_token(localStorage.getItem("access_token"));
})


  return (
    <div className='container min-w-full h-screen'>
      <div className="upper-container text-white h-[88%] p-2 w-screen flex font-bold">
        <Sidebar />
          <div className='rightContainer  pl-1 w-full h-[100%] '>
            <Navbar isVisible={isVisible} Artist={Artist}/>
              <div className='right-main  h-[89%] w-full rounded-b-md '>
                <BrowserRouter>
                  <Routes> 
                    <Route path='/' element={<Home access_token = {access_token} />} />
                    <Route path='/artist/:ArtistId' element={<ArtistPersonal access_token = {access_token} setArtist={setArtist} Artist={Artist} SongId ={SongId} setSongId={setSongId} SongAudio = {SongAudio} setSongAudio = {setSongAudio} setSongImg = {setSongImg} setDuration = {setDuration} setSongName = {setSongName} setIsPlaying={setIsPlaying} isPlaying={isPlaying} Track={Track} setTrack={setTrack} setIsVisible={setIsVisible} />} />

                  </Routes>
                </BrowserRouter >
              </div>
          </div>
        </div>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} SongId ={SongId} setSongId={setSongId} SongAudio = {SongAudio} SongImg = {SongImg} Duration = {Duration} SongName = {SongName} Track={Track} setSongAudio = {setSongAudio} setSongImg = {setSongImg} setDuration = {setDuration} setSongName = {setSongName} />
    </div>
  )
}

export default RightContainer