import { HTMLProps, ReactElement, RefObject } from "react";

interface Internationalization {
  tooltipsPlay?: string;
  tooltipsPause?: string;
  tooltipsMute?: string;
  tooltipsUnmute?: string;
  tooltipsSubtitles?: string;
  tooltipsSettings?: string;
  tooltipsFullscreen?: string;
  tooltipsExitFullscreen?: string;
  settingsPlaybackSpeed?: string;
  settingsPlaybackSpeedNormal?: string;
  settingsSubtitles?: string;
  settingsSubtitlesOff?: string;
  settingsQuality?: string;
  settingsModalOff?: string;
}

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
  internationalization?: Internationalization;
  pictureInPicture?: boolean;
  keyboardShortcut?:
    | boolean
    | {
        pause?: boolean;
        rewind?: boolean;
        forward?: boolean;
        fullScreen?: boolean;
        mute?: boolean;
        subtitle?: boolean;
      };
  playerRef?: RefObject<HTMLVideoElement>;
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
  internationalization?: Internationalization;
}
