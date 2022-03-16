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
- 🖥 FullScreen cross browser support, event safari on iphone
- 📖 Subtitles support
- ⏰ Speed control
- ⌨️ Keyboard shortcuts
- ⚙️ Support server side rendering (nextjs)
- 🛠 No extra dependencies

## Installation

```bash
npm i react-tuby
# or
# yarn add react-tuby
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
/>
```

## Props

| prop             | type                                                            | description                                                                                            |
| ---------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **src**          | { quality: number \| string; url: string; }[] \| string;        | One url of video or array of qualities                                                                 |
| **subtitles**    | { lang: string; language: string; url: string; }[]              | Array of subtitles, the first one will be default. Subtitle **must** be in .vtt format.                |
| **dimensions**   | number \| { width: number \| string; height: number \| string } | Number: aspect ratio (height/width). Default: 56.25% (9/16) Width, height: set custom width and height |
| **primaryColor** | string                                                          | Customize the primary color. Default: #ff0000                                                          |
| **poster**       | string                                                          | The url of poster image                                                                                |
| **seekDuration** | number                                                          | Seek duration when pressing left/right key. Default: 10                                                |
| **playerKey**    | string                                                          | Unique user key to store video state in localStorage                                                   |

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

<Player src="/your-video.mp4">
  {(ref, props) => <ReactHlsPlayer playerRef={ref} {...props} />}
</Player>;
```

## Issues

If you have some bug or have any feature request, feel free to submit an issue on the [github repo](https://github.com/napthedev/react-tuby.git).
