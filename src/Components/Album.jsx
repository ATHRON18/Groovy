import React, { useState } from 'react'
import { useEffect } from 'react';

const Album = ({access_token}) => {
  const [Albums, setAlbums] = useState([])

  useEffect(() => {
    const fetchAlbum = async()=>{
      if(access_token){
        // console.log(access_token);
        const url = 'https://api.spotify.com/v1/albums?ids=3RQQmkQEvNCY4prGKE6oc5%2C6s84u2TUpR3wdUv4NgKA2j%2C3T4tUhGYeRNVUGevb0wThu%2C382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc'
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
    fetchAlbum()
    .then(result => {
      if(result.albums)
        {
          setAlbums(result.albums)
        }
  }).catch(error => {
      console.error("Promise rejected:", error);
  });}
  },[access_token])

  // useEffect(() => {
  //   if(access_token && Albums)
  //     // console.log(Albums);
  // }, [Albums]);
  
  return (
    <>
    <div className=' w-[100%] pt-3 flex justify-evenly overflow-x-hidden'>
    {
    Albums.map((items)=>{
      return(
            <div key={items.id} className="min-w-fit shadow-transparent p-2 h-fit rounded-xl overflow-hidden shadow-lg bg-transparent hover:bg-[#111e15] hover:cursor-pointer">
              <div className='flex justify-center'>
                <img className="h-[220px] w-[220px] object-cover rounded-3xl" src={items.images[0].url}/>
                </div>
              <div className=" pt-1 ">
                <div className="font-bold text-lg  text-white overflow-hidden">{items.name}</div>
                <p className="text-sm text-gray-200">{items.artists[0].name}</p>
            </div>
          </div>
        )
    })
    }
    </div>
    </>
  )
}

export default Album