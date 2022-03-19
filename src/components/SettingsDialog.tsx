import React, { FC, useEffect, useRef, useState } from "react";

import Check from "./Icons/Check";
import ChevronLeft from "./Icons/ChevronLeft";
import ChevronRight from "./Icons/ChevronRight";
import Quality from "./Icons/Quality";
import SelectSubtitle from "./Icons/SelectSubtitle";
import { SettingsProps } from "../shared/types";
import Speed from "./Icons/Speed";

const SettingsDialog: FC<SettingsProps> = ({
  settingsActive,
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
  const [height, setHeight] = useState(0);

  const [activeSection, setActiveSection] = useState("main");

  const mainSectionRef = useRef<HTMLDivElement>(null);
  const speedSectionRef = useRef<HTMLDivElement>(null);
  const subtitlesSectionRef = useRef<HTMLDivElement>(null);
  const qualitySectionRef = useRef<HTMLDivElement>(null);

  const sections: { [key: string]: any } = {
    main: mainSectionRef,
    speed: speedSectionRef,
    subtitles: subtitlesSectionRef,
    quality: qualitySectionRef,
  };

  useEffect(() => {
    if (sections[activeSection].current) {
      const elementHeight = sections[activeSection].current.offsetHeight;
      setHeight(elementHeight > 250 ? 250 : elementHeight);
      sections[activeSection].current.scrollTo &&
        sections[activeSection].current.scrollTo(0, 0);
    }

    // eslint-disable-next-line
  }, [activeSection]);

  return (
    <div
      className={`tuby-settings-dialog ${settingsActive ? "tuby-show" : ""}`}
    >
      <div style={{ height }} className="tuby-settings-outer">
        <div
          ref={mainSectionRef}
          className={`tuby-settings-section tuby-settings-py ${
            activeSection === "main"
              ? "tuby-settings-translate-center"
              : "tuby-settings-translate-left"
          }`}
        >
          <div
            onClick={() => setActiveSection("speed")}
            className="tuby-settings-item"
          >
            <div className="tuby-settings-item-left">
              <Speed className="tuby-icon-sm" />
              <p>
                {internationalization?.settingsPlaybackSpeed ||
                  "Playback Speed"}
              </p>
            </div>
            <ChevronRight className="tuby-chevron" />
          </div>
          {subtitles && (
            <div
              onClick={() => setActiveSection("subtitles")}
              className="tuby-settings-item"
            >
              <div className="tuby-settings-item-left">
                <SelectSubtitle className="tuby-icon-sm" />
                <p>{internationalization?.settingsSubtitles || "Subtitles"}</p>
              </div>
              <ChevronRight style={{ width: 15, height: 15 }} />
            </div>
          )}
          {typeof src !== "string" && (
            <div
              onClick={() => setActiveSection("quality")}
              className="tuby-settings-item"
            >
              <div className="tuby-settings-item-left">
                <Quality className="tuby-icon-sm" />
                <p>{internationalization?.settingsQuality || "Quality"}</p>
              </div>
              <ChevronRight className="tuby-chevron" />
            </div>
          )}
        </div>

        <div
          ref={speedSectionRef}
          className={`tuby-settings-section ${
            activeSection === "speed"
              ? "tuby-settings-translate-center"
              : "tuby-settings-translate-right"
          }`}
        >
          <div
            onClick={() => setActiveSection("main")}
            className="tuby-settings-section-header"
          >
            <ChevronLeft className="tuby-chevron" />
            <span>
              {internationalization?.settingsPlaybackSpeed || "Playback speed"}
            </span>
          </div>
          <div className="tuby-settings-py">
            {new Array(8)
              .fill("")
              .map((_, index) =>
                index === 3
                  ? internationalization?.settingsPlaybackSpeedNormal ||
                    "Normal"
                  : (index + 1) / 4
              )
              .map((item, index) => (
                <div
                  key={item}
                  onClick={() => {
                    setPlaybackSpeed((index + 1) / 4);
                    setActiveSection("main");
                  }}
                  className="tuby-settings-item-2"
                >
                  {playbackSpeed === (index + 1) / 4 ? (
                    <Check className="tuby-chevron" />
                  ) : (
                    <div style={{ width: 15, height: 15 }}></div>
                  )}
                  <span>{item}</span>
                </div>
              ))}
          </div>
        </div>

        {subtitles && (
          <div
            ref={subtitlesSectionRef}
            className={`tuby-settings-section ${
              activeSection === "subtitles"
                ? "tuby-settings-translate-center"
                : "tuby-settings-translate-right"
            }`}
          >
            <div
              onClick={() => setActiveSection("main")}
              className="tuby-settings-section-header"
            >
              <ChevronLeft className="tuby-chevron" />
              <span>
                {internationalization?.settingsSubtitles || "Subtitles"}
              </span>
            </div>
            <div className="tuby-settings-py">
              <div
                onClick={() => {
                  setSubtitleIndex(-1);
                  setActiveSection("main");
                }}
                className="tuby-settings-item-2"
              >
                {subtitleIndex === -1 ? (
                  <Check className="tuby-chevron" />
                ) : (
                  <div style={{ width: 15, height: 15 }}></div>
                )}
                <span>
                  {internationalization?.settingsSubtitlesOff || "Off"}
                </span>
              </div>
              {subtitles.map((subtitle, index) => (
                <div
                  key={subtitle.lang}
                  onClick={() => {
                    setSubtitleIndex(index);
                    setActiveSection("main");
                  }}
                  className="tuby-settings-item-2"
                >
                  {subtitleIndex === index ? (
                    <Check className="tuby-chevron" />
                  ) : (
                    <div style={{ width: 15, height: 15 }}></div>
                  )}
                  <span>{subtitle.language}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {typeof src !== "string" && (
          <div
            ref={qualitySectionRef}
            className={`tuby-settings-section ${
              activeSection === "quality"
                ? "tuby-settings-translate-center"
                : "tuby-settings-translate-right"
            }`}
          >
            <div
              onClick={() => setActiveSection("main")}
              className="tuby-settings-section-header"
            >
              <ChevronLeft className="tuby-chevron" />
              <span>{internationalization?.settingsQuality || "Quality"}</span>
            </div>
            <div className="tuby-settings-py">
              {src.map((source, index) => (
                <div
                  key={source.quality}
                  onClick={() => {
                    setQuality(index);
                    setActiveSection("main");
                  }}
                  className="tuby-settings-item-2"
                >
                  {quality === index ? (
                    <Check className="tuby-chevron" />
                  ) : (
                    <div style={{ width: 15, height: 15 }}></div>
                  )}
                  <span>
                    {typeof source.quality === "number"
                      ? `${source.quality}p`
                      : source.quality}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SettingsDialog;
