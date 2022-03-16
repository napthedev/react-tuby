import { HTMLProps, ReactElement } from "react";

export interface PlayerProps {
  playerKey?: string;
  src:
    | {
        quality: number | string;
        url: string;
      }[]
    | string;
  subtitles?: {
    lang: string;
    language: string;
    url: string;
  }[];
  dimensions?: number | { width: number | string; height: number | string };
  primaryColor?: string;
  poster?: string;
  seekDuration?: number;
  children?: (
    ref: any,
    props: HTMLProps<HTMLVideoElement> & { src: string }
  ) => ReactElement;
}

export interface SettingsProps {
  settingsActive: boolean;
  setSettingsActive: Function;
  subtitles?: {
    lang: string;
    language: string;
    url: string;
  }[];
  src:
    | {
        quality: number | string;
        url: string;
      }[]
    | string;
  playbackSpeed: number;
  setPlaybackSpeed: (value: number) => void;
  subtitleIndex: number;
  setSubtitleIndex: (value: number) => void;
  quality: number;
  setQuality: (value: number) => void;
}
