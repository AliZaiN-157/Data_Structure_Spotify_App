import React, { useState } from "react";
import styled from "styled-components";

import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { reducerCases } from "../utils/Constants";
import axios from "axios";

export default function Navbar({ navBackground }) {
  const [searchInput, setSearchInput] = useState("");

  let [{ userInfo, token, cdll  }, dispatch] = useStateProvider();

  const findSong = () =>{
    for (let i = 0; i < cdll.length; i++) {
      if (cdll.head.musicNode.name === searchInput) {
        console.log("found");
        let path = cdll.head.musicNode.path;
        console.log(path);
        axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        }).then((response) => {
          axios.put(`https://api.spotify.com/v1/me/player/play`,{
            uris: [`spotify:track:${response.data.tracks.items[0].id}`],
          },{
            headers: { Authorization: "Bearer " + token },
          })
          if (response.status === 204) {
            const currentPlaying = {
              id: response.data.tracks.items.id,
              name: response.data.tracks.items.name,
              artists: response.data.tracks.items.artists.map((artist) => artist.name),
              image: response.data.tracks.items.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
          } else {
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
          }
        });
      }
      cdll.head = cdll.head.next;
    }
  }

  // search and play the song 
  const searchSong = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  
    const PlaySong = async () => {
      if (searchInput.length > 0) {
      await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        }).then((response) => {
          console.log(response.data.tracks.items[0].id);
          axios.put(`https://api.spotify.com/v1/me/player/play`,{
            uris: [`spotify:track:${response.data.tracks.items[0].id}`],
          },{
            headers: { Authorization: "Bearer " + token },
          })
          if (response.status === 204) {
            const currentPlaying = {
              id: response.data.tracks.items.id,
              name: response.data.tracks.items.name,
              artists: response.data.tracks.items.artists.map((artist) => artist.name),
              image: response.data.tracks.items.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
          } else {
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
          }
        })};
      };
  return (
    <Container navBackground={navBackground}>
      <div className="search__bar">
        <input type="text" placeholder="Artists, songs, or podcasts" value={searchInput} onChange={searchSong} />
        <FaSearch onClick={findSong}/>
      </div>
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  height: 10vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 0.8rem;
    border-radius: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 1.8rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
