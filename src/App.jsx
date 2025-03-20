import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar';
import RightContainer from './Components/RightContainer';
import Navbar from './Components/Navbar';
import Player from './Components/Player';



function App() {

  const [Track, setTrack] = useState([]);
const [access_token, setaccess_token] = useState("");
const [auth, setAuth] = useState(0)
 
  
  const checkAuthorization = ()=>{
    const client_id = "78be33eb4e8a42f3b5169211500fb87a"
    const redirect_uri = "http://localhost:5173/"
    const auth_url = "https://accounts.spotify.com/authorize?";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-recently-played",
      "app-remote-control",
      "streaming",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing"
    ];
    window.location.href = `${auth_url}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
    setAuth(!auth);

  }
  
  
  useEffect(() => {
    // Check weather user is autorized or not!
    // setAuth(1);
    // if(auth){checkAuthorization();}
    
    if(window.location.href === 'http://localhost:5173/')
    {
      checkAuthorization()
    }

    
    // Extracting Access Token from URL
    if(window.location.hash){
      let AT = window.location.hash.substr(1).split("=")[1].split("&")[0];
      // setaccess_token(AT);
      localStorage.setItem("access_token",AT);
      setaccess_token(localStorage.getItem("access_token"));
    }
  },[])



  
  
  //  console.log(access_token);
 
  return (
    <>
          <RightContainer access_token={access_token}/>
      
    </>
  )
}

export default App
