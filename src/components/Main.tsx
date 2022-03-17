import React, { FC, HTMLProps, useEffect, useRef, useState } from "react";
import { formatVideoTime, isMobile } from "../shared/utils";

import CircularProgress from "./Icons/CircularProgress";
import ClickAwayListener from "./ClickAwayListener";
import Cog from "./Icons/Cog";
import ExitFullScreen from "./Icons/ExitFullScreen";
import FullScreen from "./Icons/FullScreen";
import Pause from "./Icons/Pause";
import PauseEffect from "./Effect/PauseEffect";
import Play from "./Icons/Play";
import PlayEffect from "./Effect/PlayEffect";
import { PlayerProps } from "../shared/types";
import SettingsDialog from "./SettingsDialog";
import SettingsModal from "./SettingsModal";
import Subtitle from "./Icons/Subtitle";
import VolumeFull from "./Icons/VolumeFull";
import VolumeHalf from "./Icons/VolumeHalf";
import VolumeMuted from "./Icons/VolumeMuted";
import { useEffectUpdate } from "../hooks/useEffectUpdate";

const Player: FC<PlayerProps> = ({
  playerKey,
  src,
  subtitles,
  children,
  poster,
  seekDuration = 10,
}) => {
  const [quality, setQuality] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(
    Number(localStorage.getItem("tuby-speed")) || 1
  );
  const [paused, setPaused] = useState(true);
  const [onFullScreen, setOnFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingsActive, setSettingsActive] = useState(false);
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [seekPreview, setSeekPreview] = useState<null | {
    time: number;
    offset: number;
  }>(null);

  const [loadedData, setLoadedData] = useState(false);

  const [volume, setVolume] = useState(
    isNaN(parseInt(localStorage.getItem("tuby-volume") as string))
      ? 100
      : Number(localStorage.getItem("tuby-volume"))
  );
  const [isMuted, setIsMuted] = useState(
    Boolean(Number(localStorage.getItem("tuby-muted")))
  );

  const [hoverEnabled, setHoverEnabled] = useState(true);

  const [pauseDidUpdate, setPauseDidUpdate] = useState(false);

  const playerRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef<HTMLDivElement>(null);
  const mouseDownRef = useRef<Boolean>(false);
  const timeoutRef = useRef<any>(null);
  const fullscreenToggleButton = useRef<HTMLButtonElement>(null);
  const pauseButton = useRef<HTMLButtonElement>(null);
  const volumeButtonRef = useRef<HTMLButtonElement>(null);

  const seekTime = (amount: number) => {
    playerRef.current && (playerRef.current.currentTime += amount);
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    setVolume(volume === 0 ? 100 : volume);
  };

  const handleSeeking = (offsetX: number) => {
    if (!playerRef.current || !seekRef.current) return;

    const offset =
      (offsetX - seekRef.current.getBoundingClientRect().left) /
      seekRef.current.offsetWidth;

    const newTime =
      (Math.abs(offset) === Infinity || isNaN(offset) ? 0 : offset) *
      playerRef.current.duration;

    playerRef.current.currentTime = newTime;

    setCurrentTime(newTime);
  };

  const handleSeekPreview = (offsetX: number) => {
    if (!playerRef.current || !seekRef.current) return;

    const left = seekRef.current.getBoundingClientRect().left;

    let offsetInPercentage = (offsetX - left) / seekRef.current.offsetWidth;

    offsetInPercentage =
      Math.abs(offsetInPercentage) === Infinity || isNaN(offsetInPercentage)
        ? 0
        : offsetInPercentage;

    let offsetInPixel = offsetInPercentage * seekRef.current.offsetWidth;

    let newTime = offsetInPercentage * playerRef.current.duration;

    if (isNaN(newTime)) setSeekPreview(null);

    if (newTime < 0) newTime = 0;

    setSeekPreview({
      time: Math.round(newTime),
      offset: offsetInPixel,
    });
  };

  const handleScreenClicked = (e: any) => {
    if (settingsActive) {
      setSettingsActive(false);
    } else {
      setPaused(prev => !prev);
    }

    if (e.detail === 2 && !isMobile()) {
      setOnFullScreen(prev => !prev);
    }
  };

  useEffectUpdate(() => {
    setPauseDidUpdate(true);
    paused ? playerRef.current?.pause() : playerRef.current?.play();
    (document?.activeElement as any)?.blur();
  }, [paused]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.muted = isMuted;
      playerRef.current.volume = isMuted ? 0 : volume / 100;
    }

    localStorage.setItem("tuby-volume", String(volume));
    localStorage.setItem("tuby-muted", String(+isMuted));
  }, [volume, isMuted]);

  useEffect(() => {
    const changeHandler = () => {
      let doc = document as any;
      const fullscreenElement =
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.webkitCurrentFullScreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement;

      if (fullscreenElement) {
        setOnFullScreen(true);
      } else {
        setOnFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", changeHandler);
    document.addEventListener("webkitfullscreenchange", changeHandler);
    document.addEventListener("mozfullscreenchange", changeHandler);
    document.addEventListener("MSFullscreenChange", changeHandler);

    const endFullScreenHandler = () => {
      changeHandler();
      setPaused(true);
    };

    playerRef.current?.addEventListener(
      "webkitendfullscreen",
      endFullScreenHandler
    );

    return () => {
      document.removeEventListener("fullscreenchange", changeHandler);
      document.removeEventListener("webkitfullscreenchange", changeHandler);
      document.removeEventListener("mozfullscreenchange", changeHandler);
      document.removeEventListener("MSFullscreenChange", changeHandler);

      playerRef.current?.removeEventListener(
        "webkitendfullscreen",
        endFullScreenHandler
      );
    };
  }, []);

  useEffectUpdate(() => {
    if (onFullScreen) {
      if (isMobile()) {
        let elem = playerRef.current as any;
        const requestFullScreen =
          elem.requestFullscreen ||
          elem.webkitRequestFullscreen ||
          elem.webkitRequestFullScreen ||
          elem.webkitEnterFullscreen ||
          elem.mozRequestFullScreen ||
          elem.msRequestFullscreen;
        requestFullScreen?.call(elem);
      } else {
        let elem = containerRef.current as any;
        const requestFullScreen =
          elem.requestFullscreen ||
          elem.webkitRequestFullscreen ||
          elem.webkitRequestFullScreen ||
          elem.webkitEnterFullscreen ||
          elem.mozRequestFullScreen ||
          elem.msRequestFullscreen;
        requestFullScreen?.call(elem);
      }
    } else {
      let doc = document as any;

      const exitFullScreen =
        doc.exitFullscreen ||
        doc.webkitExitFullscreen ||
        doc.webkitCancelFullScreen ||
        doc.mozCancelFullScreen ||
        doc.msExitFullscreen;

      exitFullScreen?.call(document);
    }
  }, [onFullScreen]);

  useEffectUpdate(() => {
    if (!playerRef.current) return;

    playerRef.current.addEventListener(
      "loadeddata",
      () => {
        if (playerRef.current) {
          playerRef.current.currentTime = currentTime;
          playerRef.current.play();
        }
      },
      { once: true }
    );
  }, [quality]);

  useEffect(() => {
    if (!playerRef.current) return;

    localStorage.setItem("tuby-speed", String(playbackSpeed));

    playerRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (containerRef.current?.contains(document.activeElement))
        (document.activeElement as any)?.blur();
      // Pause
      if (e.key === " " || e.key === "k") pauseButton.current?.click();
      // Rewind
      if (e.key === "ArrowLeft") seekTime(-seekDuration);
      // Forward
      if (e.key === "ArrowRight") seekTime(seekDuration);
      // Full screen
      if (e.key === "f") fullscreenToggleButton.current?.click();
      // Mute
      if (e.key === "m") volumeButtonRef.current?.click();
    };

    const spacePressHandler = (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();
    };

    window.addEventListener("keyup", keyHandler);

    window.addEventListener("keydown", spacePressHandler);

    return () => {
      window.removeEventListener("keyup", keyHandler);
      window.removeEventListener("keydown", spacePressHandler);
    };
  }, []);

  const videoProps: HTMLProps<HTMLVideoElement> & { src: string } = {
    crossOrigin: "anonymous",
    playsInline: true,
    onClickCapture: handleScreenClicked,
    controls: false,
    src: typeof src === "string" ? src : src[quality].url,
    onWaiting: () => setLoading(true),
    onPlaying: () => {
      setLoading(false);
      setPaused(false);
    },
    onLoadedData: () => {
      setLoadedData(true);
      setDuration(playerRef.current?.duration || 0);
      let currentTime;
      if (playerKey) {
        currentTime = Number(
          localStorage.getItem(`${playerKey}-time`) as string
        );
      } else currentTime = 0;

      setCurrentTime(currentTime);
      playerRef.current && (playerRef.current.currentTime = currentTime);
    },
    onTimeUpdate: () => {
      if (playerKey)
        localStorage.setItem(
          `${playerKey}-time`,
          String(playerRef.current?.currentTime || 0)
        );
      setCurrentTime(playerRef.current?.currentTime || 0);
      setDuration(playerRef.current?.duration || 0);
    },
    onEnded: () => {
      setPaused(true);
    },
    onMouseMove: () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setHoverEnabled(true);

      timeoutRef.current = setTimeout(() => {
        setHoverEnabled(false);
      }, 2000);
    },

    children: (
      <>
        {subtitles && subtitleIndex >= 0 && loadedData && (
          <track
            kind="subtitles"
            srcLang={subtitles[subtitleIndex].lang}
            label={subtitles[subtitleIndex].language}
            src={subtitles[subtitleIndex].url}
            default
          />
        )}
      </>
    ),
  };

  return (
    <>
      {poster && !pauseDidUpdate && (
        <img src={poster} className="tuby-poster" />
      )}
      <div ref={containerRef} className="tuby-container">
        {children ? (
          children(playerRef, videoProps)
        ) : (
          <video ref={playerRef} {...videoProps} />
        )}

        {((!loadedData && pauseDidUpdate) || (loading && !paused)) && (
          <div className="tuby-center">
            <CircularProgress />
          </div>
        )}

        {paused && pauseDidUpdate && (
          <div className="tuby-center" onClickCapture={handleScreenClicked}>
            <PauseEffect />
          </div>
        )}

        {!paused && pauseDidUpdate && (
          <div className="tuby-center" onClickCapture={handleScreenClicked}>
            <PlayEffect />
          </div>
        )}

        {!pauseDidUpdate && (
          <div className="tuby-center" onClickCapture={handleScreenClicked}>
            <Play className="tuby-icon-md" />
          </div>
        )}

        <div
          onTouchEnd={() => setHoverEnabled(true)}
          onClick={() => setHoverEnabled(true)}
          onMouseEnter={() =>
            timeoutRef.current && clearTimeout(timeoutRef.current)
          }
          className={`tuby-controls ${
            paused || settingsActive ? "tuby-show" : ""
          } ${hoverEnabled ? "tuby-controls-hovered" : ""}`}
        >
          <div
            ref={seekRef}
            onMouseDown={e => {
              mouseDownRef.current = true;
              handleSeeking(e.clientX);
            }}
            onTouchStart={e => {
              mouseDownRef.current = true;
              handleSeeking(e.touches?.[0]?.pageX);
            }}
            onMouseMove={e => {
              handleSeekPreview(e.clientX);
              if (mouseDownRef.current) {
                handleSeeking(e.clientX);
              }
            }}
            onTouchMove={e => {
              handleSeekPreview(e.touches?.[0]?.pageX);
              if (mouseDownRef.current) {
                handleSeeking(e.touches?.[0]?.pageX);
              }
            }}
            onMouseUp={() => (mouseDownRef.current = false)}
            onTouchEnd={() => (mouseDownRef.current = false)}
            onMouseLeave={() => {
              mouseDownRef.current = false;
              setSeekPreview(null);
            }}
            className="tuby-seek"
          >
            <div className="tuby-seek-bar">
              <div
                style={{
                  width:
                    duration !== 0
                      ? `${Math.round((currentTime / duration) * 1000) / 10}%`
                      : 0,
                }}
                className="tuby-seek-left"
              ></div>
            </div>
            {seekPreview !== null && (
              <div
                className="tuby-seek-preview"
                style={{
                  left:
                    seekPreview.offset < 16
                      ? 0
                      : seekPreview.offset >
                        (seekRef.current?.offsetWidth || 0) - 16
                      ? "auto"
                      : seekPreview.offset,
                  right:
                    seekPreview.offset >
                    (seekRef.current?.offsetWidth || 0) - 16
                      ? 0
                      : "auto",
                  transform:
                    seekPreview.offset < 16 ||
                    seekPreview.offset >
                      (seekRef.current?.offsetWidth || 0) - 16
                      ? "none"
                      : "translateX(-50%)",
                }}
              >
                {formatVideoTime(seekPreview.time)}
              </div>
            )}
          </div>
          <div className="tuby-controls-main">
            <div className="tuby-controls-left">
              <button
                ref={pauseButton}
                className="tuby-center-container tuby-tooltips-left"
                data-tuby-tooltips={paused ? "Play (k)" : "Pause (k)"}
                onClickCapture={() => setPaused(prev => !prev)}
              >
                {paused ? (
                  <Play className="tuby-icon-sm" />
                ) : (
                  <Pause className="tuby-icon-sm" />
                )}
              </button>

              <div className="tuby-volume-container">
                <button
                  ref={volumeButtonRef}
                  className="tuby-center-container"
                  data-tuby-tooltips={
                    isMuted || volume === 0 ? "Unmute (m)" : "Mute (m)"
                  }
                  onClickCapture={toggleSound}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeMuted className="tuby-icon-sm" />
                  ) : volume === 100 ? (
                    <VolumeFull className="tuby-icon-sm" />
                  ) : (
                    <VolumeHalf className="tuby-icon-sm" />
                  )}
                </button>
                <div className="tuby-volume-wrapper">
                  <input
                    className="tuby-volume-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={isMuted ? 0 : volume}
                    onChange={e => {
                      setVolume(+e.target.value);
                      setIsMuted(+e.target.value === 0);
                    }}
                  />
                  <div
                    className="tuby-volume-left-bar"
                    style={{ width: isMuted ? 0 : volume * 0.52 }}
                  ></div>
                </div>
              </div>

              <div className="tuby-time">
                {formatVideoTime(currentTime)}
                {" / "}
                {formatVideoTime(duration)}
              </div>
            </div>

            <div className="tuby-controls-right">
              {Boolean(subtitles) && (
                <button
                  className={`tuby-center-container ${
                    subtitleIndex >= 0 ? "tuby-icon-underline" : ""
                  }`}
                  data-tuby-tooltips="Subtitles (c)"
                  onClickCapture={() =>
                    subtitleIndex >= 0
                      ? setSubtitleIndex(-1)
                      : setSubtitleIndex(0)
                  }
                >
                  <Subtitle className="tuby-icon-sm" />
                </button>
              )}
              <ClickAwayListener onClickAway={() => setSettingsActive(false)}>
                {ref => (
                  <div ref={ref} style={{ position: "relative" }}>
                    <button
                      className="tuby-center-container"
                      onClickCapture={() => setSettingsActive(prev => !prev)}
                      {...(!settingsActive
                        ? { "data-tuby-tooltips": "Settings" }
                        : {})}
                    >
                      <Cog className="tuby-icon-sm" />
                    </button>

                    {!isMobile() ? (
                      <SettingsDialog
                        settingsActive={settingsActive}
                        setSettingsActive={setSettingsActive}
                        src={src}
                        subtitles={subtitles}
                        playbackSpeed={playbackSpeed}
                        setPlaybackSpeed={setPlaybackSpeed}
                        subtitleIndex={subtitleIndex}
                        setSubtitleIndex={setSubtitleIndex}
                        quality={quality}
                        setQuality={setQuality}
                      />
                    ) : (
                      <SettingsModal
                        settingsActive={settingsActive}
                        setSettingsActive={setSettingsActive}
                        src={src}
                        subtitles={subtitles}
                        playbackSpeed={playbackSpeed}
                        setPlaybackSpeed={setPlaybackSpeed}
                        subtitleIndex={subtitleIndex}
                        setSubtitleIndex={setSubtitleIndex}
                        quality={quality}
                        setQuality={setQuality}
                      />
                    )}
                  </div>
                )}
              </ClickAwayListener>

              <button
                className="tuby-center-container tuby-tooltips-right"
                ref={fullscreenToggleButton}
                data-tuby-tooltips={`${
                  onFullScreen ? "Exit full screen (f)" : "Fullscreen (f)"
                }`}
                onClickCapture={() => setOnFullScreen(prev => !prev)}
              >
                {onFullScreen ? (
                  <ExitFullScreen className="tuby-icon-sm" />
                ) : (
                  <FullScreen className="tuby-icon-sm" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
