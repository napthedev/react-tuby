<p align="center">
  <img src="https://res.cloudinary.com/naptest/image/upload/w_600/react-tuby/preview_jhnrup.png">
</p>

# React Tuby

[![Build Size](https://img.shields.io/bundlephobia/minzip/react-tuby?label=Bundle%20size&style=flat&color=success)](https://bundlephobia.com/result?p=react-tuby)
[![Version](https://img.shields.io/npm/v/react-tuby?style=flat&color=success)](https://www.npmjs.com/package/react-tuby)
[![Downloads](https://img.shields.io/npm/dt/react-tuby.svg?style=flat&color=success)](https://www.npmjs.com/package/react-tuby)

A React video player library with YouTube-like UI

## Demo

[https://react-tuby.vercel.app](https://react-tuby.vercel.app)

## Feature

- 📹 HTML Video, M3U8 support
- 🎛 Allow multiple qualities
- 📱 Fully responsive
- 🖥 FullScreen cross browser support, even safari on iphone
- 📖 Subtitles support
- ⏰ Speed control
- ⌨️ Keyboard shortcuts
- ⚙️ Support server side rendering (nextjs)
- 🛠 No extra dependencies
- ✅ Auto fallback to default video if render fails on old browsers

## Installation

```bash
npm i react-tuby
# or
# yarn add react-tuby
```

## Import

```jsx
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
```

## Example player

```jsx
<Player
  src={[
    {
      quality: "Full HD",
      url:
        "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/1080.mp4",
    },
    {
      quality: 720,
      url: "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/720.mp4",
    },
    {
      quality: 480,
      url: "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/480.mp4",
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
  chapters={[{startTime:0,endTime:30,name:'chapter1'},{startTime:30,endTime:183,name:'chapter2'}]}
  thumbnail={url:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-28b21827-dcf2-495f-8477-6d8cd79b4872/2726e15d-0276-4cd8-a82f-4b28586105ca.jpeg',width:80,height:45,frames:185}
/>
```

## Props

| prop                     | type                                                                                                                           | description                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **src**                  | { quality: number \| string; url: string; }[] \| string;                                                                       | One url of video or array of qualities                                                                 |
| **subtitles**            | { lang: string; language: string; url: string; }[]                                                                             | Array of subtitles, the first one will be default. Subtitle **must** be in .vtt format.                |
| **dimensions**           | number \| { width: number \| string; height: number \| string }                                                                | Number: aspect ratio (height/width). Default: 56.25% (9/16) Width, height: set custom width and height |
| **primaryColor**         | string                                                                                                                         | Customize the primary color. Default: #ff0000                                                          |
| **poster**               | string                                                                                                                         | The url of poster image                                                                                |
| **seekDuration**         | number                                                                                                                         | Seek duration when pressing left/right key. Default: 10                                                |
| **playerKey**            | string                                                                                                                         | Unique user key to store video state in localStorage                                                   |
| **internationalization** | string                                                                                                                         | See internationalization section below                                                                 |
| **playerRef**            | RefObject\<HTMLVideoElement\>                                                                                                  | Use your own ref to control the video player                                                           |
| **pictureInPicture**     | boolean                                                                                                                        | Show picture in picture button                                                                         |
| **keyboardShortcut**     | boolean \| { pause?: boolean; rewind?: boolean; forward?: boolean; fullScreen?: boolean; mute?: boolean; subtitle?: boolean; } | Customize keyboard shortcuts                                                                           |
| **chapters**     | { startTime:number;endTime:number;name:string; }[]                                                                                                                      | Array of chapters
| **thumbnail**     | { url:string;width:number;height:number;frames:number; }                                                                                                                     | Thumbnails info. All pictures need to be stitched into a row.

## Examples

### Single src

```jsx
<Player src="/your-video.mp4" />
```

### Full width, height

```jsx
<Player src="/your-video.mp4" dimensions={{ width: "100%", height: "100%" }} />
```

### Custom props for video

This library uses **render props** to allow user to set custom render component

```jsx
<Player src="/your-video.mp4">
  {(ref, props) => <video ref={ref} {...props} autoPlay loop />}
</Player>
```

### Custom event

```jsx
<Player src="/your-video.mp4">
  {(ref, { onPause, ...others }) => (
    <video
      ref={ref}
      {...others}
      onPause={e => {
        // The library original event
        onPause && onPause(e);

        // Do something here
        console.log("Paused");
      }}
    />
  )}
</Player>
```

### Usage with m3u8 / HLS

Install react-hls-player

```
npm i react-hls-player --force
```

Usage

```jsx
import ReactHlsPlayer from "react-hls-player";

<Player src="/your-video.m3u8">
  {(ref, props) => <ReactHlsPlayer playerRef={ref} {...props} />}
</Player>;
```

### Get video currentTime using custom ref

```jsx
const ref = useRef(null);

useEffect(() => {
  ref.current?.addEventListener("timeupdate", () => {
    console.log(ref.current?.currentTime);
  });
}, []);

<Player playerRef={ref} src="/your-video.mp4" />;
```

### Disable keyboard shortcuts

```jsx
<Player src="/your-video.mp4" keyboardShortcut={false} />

// or

<Player
  src="/your-video.mp4"
  keyboardShortcut={{
    pause: false,
    forward: true,
    rewind: true,
    fullScreen: true,
    mute: true,
    subtitle: true,
  }}
/>
```

## Internationalization

| property                    | default              |
| --------------------------- | -------------------- |
| tooltipsPlay                | Play (k)             |
| tooltipsPause               | Pause (k)            |
| tooltipsMute                | Mute (m)             |
| tooltipsUnmute              | Unmute (m)           |
| tooltipsSubtitles           | Subtitles (c)        |
| tooltipsSettings            | Settings             |
| tooltipsFullscreen          | Full Screen (f)      |
| tooltipsExitFullscreen      | Exit full screen (f) |
| settingsPlaybackSpeed       | Playback Speed       |
| settingsPlaybackSpeedNormal | Normal               |
| settingsSubtitles           | Subtitles            |
| settingsSubtitlesOff        | Off                  |
| settingsQuality             | Quality              |
| settingsModalOff            | OK                   |

## Issues

If you have some bug or have any feature request, feel free to submit an issue on the [github repo](https://github.com/napthedev/react-tuby.git).
