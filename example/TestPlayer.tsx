import * as React from "react";

import { Player } from "../src";

const TestPlayer = () => {
  return (
    <Player
      src={[
        {
          quality: "Full HD",
          url:
            "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/1080.mp4",
        },
        {
          quality: 720,
          url:
            "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/720.mp4",
        },
        {
          quality: 480,
          url:
            "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/480.mp4?v=1647351419495",
        },
      ]}
      subtitles={[
        {
          lang: "en",
          language: "English",
          url:
            "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/en.vtt",
        },
        {
          lang: "fr",
          language: "French",
          url:
            "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/fr.vtt",
        },
      ]}
      poster="https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/poster.png"
    />
  );
};

export default TestPlayer;
