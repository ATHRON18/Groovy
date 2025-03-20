import React, { useState } from 'react'
import { useEffect } from 'react';

const Episode = ({access_token}) => {
  const [Episodes, setEpisodes] = useState([])

  useEffect(() => {
    const fetchEpisode = async()=>{
      if(access_token){
        // console.log(access_token);
        const url = 'https://api.spotify.com/v1/episodes?ids=6Gl5Y62Znq3M1Fn8ywYRjz%2C2nLOsuQXZL4oBbzbYQYYro%2C5A9DkT5qoSsF909vLaOaL0%2C1x1YHdOpYAjwR48eoz1yLL'
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
    fetchEpisode()
    .then(result => {
      if(result.episodes)
        {
          setEpisodes(result.episodes)
        }
  }).catch(error => {
      console.error("Promise rejected:", error);
  });}
  },[access_token])

  // useEffect(() => {
  //   if(access_token && Episodes)
  //     console.log(Episodes);
  // }, [Episodes]);
  
  return (
    <>
    <div className=' w-[100%] pt-3 flex justify-evenly overflow-x-hidden'>
    {
    Episodes.map((items)=>{
      return(
            <div key={items.id} className="max-w-60 shadow-transparent p-2 h-[350px] rounded-xl shadow-lg bg-transparent hover:bg-[#111e15] hover:cursor-pointer">
              <div className='flex justify-center'>
                <img className="h-[220px] w-[220px] object-cover rounded-3xl" src={items.images[0].url}/>
                </div>
              <div className=" pt-1 ">
                <div className="font-bold text-lg  text-white overflow-hidden">{items.name}</div>
                <p className="text-sm text-gray-200">{items.release_date}{items.duration_ms}</p>
            </div>
          </div>
        )
    })
    }
    </div>
    </>
  )
}

export default Episode