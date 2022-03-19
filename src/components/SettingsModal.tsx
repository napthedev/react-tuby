import React, { FC } from "react";

import { SettingsProps } from "../shared/types";

const SettingsModal: FC<SettingsProps> = ({
  settingsActive,
  setSettingsActive,
  src,
  subtitles,
  playbackSpeed,
  setPlaybackSpeed,
  subtitleIndex,
  setSubtitleIndex,
  quality,
  setQuality,
  internationalization,
}) => {
  return (
    <div
      onClick={() => setSettingsActive(false)}
      className={`tuby-backdrop ${settingsActive ? "tuby-show" : ""}`}
    >
      <div onClick={e => e.stopPropagation()} className="tuby-modal">
        <h1>{internationalization?.tooltipsSettings || "Settings"}</h1>

        <div>
          <p>{internationalization?.settingsPlaybackSpeed || "Speed"}</p>
          <select
            value={playbackSpeed * 4 - 1}
            onChange={e => setPlaybackSpeed((+e.target.value + 1) / 4)}
          >
            {new Array(8)
              .fill("")
              .map((_, index) =>
                index === 3
                  ? internationalization?.settingsPlaybackSpeedNormal ||
                    "Normal"
                  : (index + 1) / 4
              )
              .map((item, index) => (
                <option key={item} value={index}>
                  {item}
                </option>
              ))}
          </select>
        </div>

        {subtitles && (
          <div>
            <p>{internationalization?.settingsSubtitles || "Subtitles"}</p>
            <select
              value={subtitleIndex}
              onChange={e => setSubtitleIndex(+e.target.value)}
            >
              <option value={-1}>
                {internationalization?.settingsSubtitlesOff || "Off"}
              </option>

              {subtitles.map((subtitle, index) => (
                <option
                  key={subtitle.lang}
                  onClick={() => {
                    setSubtitleIndex(index);
                  }}
                  value={index}
                >
                  {subtitle.language}
                </option>
              ))}
            </select>
          </div>
        )}

        {typeof src === "object" && (
          <div>
            <p>{internationalization?.settingsQuality || "Quality"}</p>
            <select value={quality} onChange={e => setQuality(+e.target.value)}>
              {src.map((source, index) => (
                <option
                  key={source.quality}
                  onClick={() => {
                    setQuality(index);
                  }}
                  value={index}
                >
                  {typeof source.quality === "number"
                    ? `${source.quality}p`
                    : source.quality}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="tuby-modal-btn-container">
          <button
            style={{ padding: 5 }}
            onClick={() => setSettingsActive(false)}
          >
            {internationalization?.settingsModalOff || "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
