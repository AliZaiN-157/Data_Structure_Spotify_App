import React from 'react'
import styled from 'styled-components'

const Login = () => {

    const handleClick = () => {
        console.log('Login button clicked')
        const clientId = "3183c4d23f7c4bcaba9ff53a2d1f3c72";
        const redirectUri = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scopes = [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "user-read-email",
            "user-read-private",
            "user-read-playback-position",

        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`; 
        //const scopesString = scopes.join("%20");
        //const url = `${apiUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopesString}`;

    }
  return (
    <Container>
        {/* Spotify Logo with transparent background*/}
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify Logo" />
        {/* Login Button */}
        <button onClick={handleClick} >LOGIN WITH SPOTIFY</button>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1.2rem 3rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;