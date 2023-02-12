import axios from "axios";
import React from "react";
import { FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

export default function Volume() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <Container>
      <FaVolumeDown color="white" fontSize={'1.5rem'}/>
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
      <FaVolumeUp color="white" fontSize={'1.5rem'}/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  margin-right: 2rem;
  input {
    width: 10rem;
    border-radius: 2rem;
    height: 0.5rem;
    
  }
`;
