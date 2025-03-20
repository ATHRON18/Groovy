import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { FaPlay,FaPause } from "react-icons/fa";

const ArtistPersonal = ({access_token,setSongAudio,setSongId,SongId,setSongImg,setDuration,setSongName,setIsPlaying,isPlaying,Track,setTrack, SongAudio,isVisible, setIsVisible,Artist,setArtist})=>{

    const {ArtistId} = useParams();
    // console.log(ArtistId);

    const [CurrentSong,setCurrentSong] = useState(null);
    const [btn,setBtn] = useState(<FaPlay className='text-xs'/>);
    const [RelatedArtist,setRelatedArtist] = useState([]);
    const [AlbumArtist,setAlbumArtist] = useState([]);
    const [Views,setViews] = useState(null);

    const navigate = useNavigate();



    useEffect(() => {
        // Fetching Top Tracks of artist
        const TopTrackArtist = async()=>{
            // console.log(access_token);
            // console.log(ArtistId);
            if(access_token && ArtistId){
              const url = `https://api.spotify.com/v1/artists/${ArtistId}/top-tracks?market=US`
              const params = {
                method : 'GET',
                headers : {
                  Authorization : `Bearer ${access_token}` 
                }
              }
              let response = await fetch(url,params);
              response = await response.json();
              // setTrack(response.tracks);
              // console.log(response.tracks);
              return response;
            }}
            if(access_token){
              TopTrackArtist()
              .then(result => {
                if(result.tracks)
                  {
                    setTrack(result.tracks);
                  }
            }).catch(error => {
                console.error("Promise rejected:", error);
            });}
        
        // Fetching Artist details
            const fetchArtist = async()=>{
              if(access_token && ArtistId){
                // console.log(access_token);
                const url = `https://api.spotify.com/v1/artists/${ArtistId}`
                const params = {
                  method : 'GET',
                  headers : {
                    Authorization : `Bearer ${access_token}` 
                  }
                }
                let response = await fetch(url,params);
                response = await response.json();
                // console.log(response);
                return response; 
              }}
              if(access_token){
                fetchArtist()
                .then(result =>{
                  if(result){
                    setArtist(result);
                  }
                })
              }
      
        // Fetching Artist related artist (Fans also like)
        const relatedArtist = async()=>{
          if(access_token && ArtistId){
            const url = `https://api.spotify.com/v1/artists/${ArtistId}/related-artists/`
            const params = {
              method :  'GET',
              headers : {
                Authorization : `Bearer ${access_token}`
              }
            }
            let response = await fetch(url,params);
            response = await response.json();
            // console.log(response);
            return response;
          }
        }
        if(access_token){
          relatedArtist()
          .then(result =>{
            if(result){
              // console.log(result.artists);
              setRelatedArtist(result.artists);
            }
          })
      }

      // Fetching Top Albums of artist
      const TopAlbumArtist = async()=>{
        // console.log(access_token);
        // console.log(ArtistId);
        if(access_token && ArtistId){
          const url = `https://api.spotify.com/v1/artists/${ArtistId}/albums/`
          const params = {
            method : 'GET',
            headers : {
              Authorization : `Bearer ${access_token}` 
            }
          }
          let response = await fetch(url,params);
          response = await response.json();
          // setTrack(response.tracks);
          console.log(response.items);
          return response;
        }}
        if(access_token){
          TopAlbumArtist()
          .then(result => {
            if(result.items)
              {
                setAlbumArtist(result.items);
              }
        }).catch(error => {
            console.error("Promise rejected:", error);
        });}
      setViews(Math.floor(Math.random() * (299_999_999 - 96_111_111) + 96_111_111))

    },[access_token, ArtistId])

    const SetValues = (img,audio)=>{
      setSongAudio(audio);
      setSongImg(img);
    }

    function secondsToMinutes(milliseconds) {
      let totalSeconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      let formattedSeconds = seconds.toString().padStart(2, '0');
      return `${minutes}:${formattedSeconds}`;
    }

    useEffect(() => {
      const checkSong = ()=>{
        if(isPlaying)
          setBtn(<FaPause onClick={()=>{setIsPlaying(!isPlaying)}} className='text-xs'/>)
        else
          setBtn(<FaPlay onClick={()=>{setIsPlaying(!isPlaying)}} className='text-xs'/>)
      }
      checkSong();

    },[isPlaying])

    useEffect(() => {
      setCurrentSong(SongId)
    })
    
  
  return (
    <>
        <div className='ArtistMain h-full w-full overflow-x-hidden overflow-y-scroll'>
          {
            Artist && (
            <div className='upper h-[45%]  bg-center bg-cover flex items-end bg-opacity-5 ' style={{ backgroundImage: `url(${Artist.images[0].url})`, backgroundPosition : '100% 15%' }}>
              <div>
              <p className=' text-8xl m-4 '>  {Artist.name}  </p>
              <p className='m-4 mt-6 bg-black bg-opacity-10 w-fit rounded-md'>{Artist.followers.total.toLocaleString()} monthly listeners</p>
              </div>
               </div>
          ) 
          }
          {
            Track && (
            <div className='lower p-5'> 
              <div className='playBtn h-[70px] flex items-center pl-1'>
                <div className='btn h-16 w-16 rounded-full bg-[#159744] flex justify-center items-center text-xl text-black pl-1 cursor-pointer hover:h-[66px] hover:w-[66px] hover:text-[21px]'> <FaPlay /> </div>
              </div>
              <div className="popularSong">
                <p className='text-3xl py-5'>Popular</p>
                <div className='Songs' >
                  {Track.map((item,index)=>{
                    return(
                    <div onClick = {()=>{ SetValues(item.album.images[2].url,item.preview_url),setDuration(secondsToMinutes(item.duration_ms),setSongName(item.name)),setCurrentSong(SongId),setSongId(item.id)}} className={`flex hover:bg-[#082103] rounded-md px-5 items-center justify-between ${CurrentSong===item.id? 'bg-green-950': "" }`} key={item.id} >
                      <div className='flex items-center w-[32%]'>
                        <div className='w-[12px]' >{CurrentSong===item.id? btn : index+1}</div>
                        <div className='p-3 h-[75px] w-[75px] rounded-md overflow-x-hidden'><img className='rounded-md' src={item.album.images[2].url} alt="" /></div>
                        <div>{item.name}</div>
                      </div>
                      <div>{ ((10-index)*Views).toLocaleString()}</div>
                      <div>{secondsToMinutes(item.duration_ms)}</div>
                    </div>)
                  })}
                </div>
              </div>
            </div>
            )
          }
          {/* Album and Related Artist */}
          <div className='h-[100%] w-full p-3'>
          {/* Albums */}
          <div className='flex justify-between px-2'>
                  <a className='text-2xl  hover:underline' href="Popularartist/">Albums</a>
                  <a className='text-sm text-slate-400 hover:underline' href="ArtistsShowAll/">Show all</a>
          </div>
          <div className=' w-[1180px] p-3 flex justify-evenly overflow-x-scroll'>
            {
            AlbumArtist.map((items)=>{
              return(
                    <div key={items.id} className="min-w-[20%]  p-2 h-fit rounded-xl hover:bg-[#111e15] hover:cursor-pointer">
                      <div className='flex justify-center'>
                        <img className="h-[220px] w-[220px] object-cover rounded-3xl" src={items.images[0].url}/>
                        </div>
                      <div className=" pt-1 ">
                        <div className="font-bold text-lg  text-white w-[100%] overflow-x-hidden truncate ">{items.name}</div>
                        <p className="text-sm text-gray-200">{items.type}</p>
                    </div>
                  </div>
                )
            })
            }
          </div>

            {/* Related Artist */}
          <div className='flex justify-between px-2'>
            <a className='text-2xl hover:underline' href="Popularartist/">Fans also like</a>
            <a className='text-sm text-slate-400 hover:underline' href="ArtistsShowAll/">Show all</a>
          </div>
          <div className=' w-[1180px] pt-3 px-2 flex justify-evenly overflow-x-scroll'>
          {
          RelatedArtist.map((items)=>{
            return(
                  <div key={items.id} onClick={()=>navigate(`/artist/${items.id}`)} className="min-w-fit shadow-transparent p-2 h-fit rounded-lg overflow-hidden hover:bg-[#111e15] hover:cursor-pointer">
                    <div className='flex justify-center'>
                      <img className="h-[220px] w-[220px] object-cover rounded-full" src={items.images[0].url}/>
                      </div>
                    <div className=" pt-1 ">
                      <div className="font-bold text-lg  text-white">{items.name}</div>
                      <p className="text-sm text-gray-200">Artist</p>
                  </div>
                </div>
              )
          })
          }
          </div>
          
          
    </div>
        </div>
    </>
  )
}

export default ArtistPersonal