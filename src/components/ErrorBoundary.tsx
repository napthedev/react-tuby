import React, {
  Component,
  HTMLProps,
  ReactElement,
  Ref,
  createRef,
} from "react";

import { PlayerProps } from "../shared/types";

class ErrorBoundary extends Component<
  PlayerProps & {
    renderer?: (
      ref: any,
      props: HTMLProps<HTMLVideoElement> & { src: string }
    ) => ReactElement;
    children?: any;
  },
  { hasError: boolean }
> {
  playerRef: Ref<HTMLElement>;
  videoProps: HTMLProps<HTMLVideoElement> & { src: string };

  constructor(props: PlayerProps) {
    super(props);
    this.state = { hasError: false };
    this.playerRef = createRef();

    this.videoProps = {
      crossOrigin: "anonymous",
      playsInline: true,
      controls: true,
      src:
        typeof this.props.src === "string"
          ? this.props.src
          : this.props.src[0].url,
      children: (
        <>
          {this.props.subtitles &&
            this.props.subtitles.length > 0 &&
            this.props.subtitles.map((subtitle, index) => (
              <track
                key={subtitle.lang}
                kind="subtitles"
                srcLang={subtitle.lang}
                label={subtitle.language}
                src={subtitle.url}
                default={index === 0}
              />
            ))}
        </>
      ),
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="tuby-container">
          {this.props.renderer ? (
            this.props.renderer(this.playerRef, this.videoProps)
          ) : (
            <video ref={this.playerRef as any} {...this.videoProps} />
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
