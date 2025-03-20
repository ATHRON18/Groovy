import React, { useState } from 'react'
import { useEffect } from 'react';
import ArtistPersonal from './ArtistPersonal';
import { useNavigate } from "react-router-dom"

const Artist = ({access_token}) => {
  const [Artists, setArtists] = useState([]);
  // const [ArtistId, setArtistId] = useState(null);

  useEffect(() => {
    const fetchArtist = async()=>{
      if(access_token){
        // console.log(access_token);
        const url = 'https://api.spotify.com/v1/artists?ids=1uNFoZAHBGtllmzznpCI3s%2C5r3wPya2PpeTTsXsGhQU8O%2C66CXWjxzNUsdJxJ2JdwvnR%2C4PULA4EFzYTrxYvOVlwpiQ%2C4YRxDV8wJFPHPTeXepOstw%2C7dGJo4pcD2V6oG8kP0tJRR%2C6qqNVTkY8uBg9cP3Jd7DAH%2C5ZsFI1h6hIdQRw2ti0hz81%2C0C8ZW7ezQVs4URX5aX7Kqx%2C4kYSro6naA4h99UJvo89HB'
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
    .then(result => {
      if(result.artists)
        {
          setArtists(result.artists)
          // console.log();
        }
  }).catch(error => {
      console.error("Promise rejected:", error);
  });}
  },[access_token])

  // useEffect(() => {
  //   if(access_token && Artists)
  //     console.log(Artists);
  // }, [Artists]);

  const navigate = useNavigate();


  
  
  return (
    <>
    <div className=' w-[100%] pt-3 flex justify-evenly overflow-x-scroll'>
    {
    Artists.map((items)=>{
      return(
            <div key={items.id} onClick={()=>navigate(`/artist/${items.id}`)} className="min-w-fit shadow-transparent p-2 h-fit rounded-lg overflow-hidden shadow-lg bg-transparent hover:bg-[#111e15] hover:cursor-pointer">
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

    </>
  )
}

export default Artist