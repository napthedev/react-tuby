import React, { FC, useEffect } from "react";

import { SeekBarProps } from "../shared/types";

const SeekBar: FC<SeekBarProps> = ({
    currentTime,
    duration,
    chapters,
    seekPreviewTime
}) => {

    useEffect(() => {
        // eslint-disable-next-line className="tuby-seek-wrapper-bar-left"
    });//className={currentTime> data.startTime&&currentTime< data.endTime?"tuby-seek-wrapper-bar-left1":"tuby-seek-wrapper-bar-left"}

    return (
        chapters ?
            (<div className="tuby-seek-wrapper">
                {chapters.map((data) => {
                    return (
                        <div key={data.name} className="tuby-seek-wrapper-bar" style={{ width: `${Math.round(((data.endTime - data.startTime) / duration) * 1000) / 10}%`, marginRight: 4 }}>
                            {

                                <div
                                    style={{
                                        width:
                                            currentTime > data.endTime
                                                ? '100%' :
                                                currentTime > data.startTime
                                                    ? `${Math.round(((currentTime - data.startTime) / (data.endTime - data.startTime)) * 1000) / 10}%`
                                                    : 0,
                                    }}
                                    className={currentTime> data.startTime&&currentTime< data.endTime&&seekPreviewTime>-1?"tuby-seek-wrapper-bar-left1":"tuby-seek-wrapper-bar-left"}
                                ></div>


                            }

                        </div>)
                })}
            </div>)

            :
            (<div className="tuby-seek-wrapper">
                <div className="tuby-seek-wrapper-bar">
                    {

                        <div
                            style={{
                                width:
                                    duration !== 0
                                        ? `${Math.round((currentTime / duration) * 1000) / 10}%`
                                        : 0,
                            }}
                            className="tuby-seek-wrapper-bar-left"
                        ></div>


                    }

                </div>
            </div>)


    );
};
export default SeekBar;
