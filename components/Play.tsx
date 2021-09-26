import React from "react";
import { PlayArrowRounded } from "@mui/icons-material";


export default function Play(props) {
  const { handleClick } = props;

  return (
    <button className="player__button" onClick={() => handleClick()}>
      <PlayArrowRounded />
    </button>
  );
}
