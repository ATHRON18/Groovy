import React from 'react'
import Artist from './Artist';
import Album from './Album';
import Episode from './Episode';
import Navbar from './Navbar';

const Home = ({access_token}) => {
  return (
    <>
        
              <div className='Popular overflow-y-scroll h-[100%] w-full p-3'>

                {/* popular Artists */}
                <div className='flex justify-between'>
                  <a className='text-2xl ml-2 hover:underline' href="Popularartist/">Popular artist</a>
                  <a className='text-sm text-slate-400 hover:underline' href="ArtistsShowAll/">Show all</a>
                </div>
                <div>
                  <Artist access_token = {access_token} />
                </div>

                {/* popular Albums */}
                <div className='pt-10 flex justify-between'>
                  <a className='text-2xl ml-2 hover:underline' href="Popularalbums/">Popular albums</a>
                  <a className='text-sm text-slate-400 hover:underline' href="ArtistsShowAll/">Show all</a>
                </div>
                <div>
                  <Album access_token = {access_token} />
                </div>

                {/* popular Episodes */}
                <div className='flex justify-between'>
                  <a className='text-2xl ml-2 hover:underline' href="Popularartist/">Popular Episodes</a>
                  <a className='text-sm text-slate-400 hover:underline' href="ArtistsShowAll/">Show all</a>
                </div>
                <div>
                  <Episode access_token = {access_token} />
                </div>
              </div>
              

            
    </>
  )
}

export default Home