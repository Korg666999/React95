import * as React from 'react';
import { Mplayer113, User4 } from '@react95/icons';

import * as styles from './Video.css';

import { Frame, FrameProps } from '../Frame/Frame';
import Button from '../Button';
import Range from '../Range';
import TitleBar from '../TitleBar';
import { Play, Pause, Stop, Fullscreen } from './buttons';
import cn from 'classnames';

type SourceProps = Pick<HTMLSourceElement, 'src'>;

const Source: React.FC<SourceProps> = ({ src }) => (
  <source src={src} type={`video/${src.substring(src.length - 3)}`} />
);

const PlayOrPause = ({ playing }: { playing: boolean }) =>
  playing ? <Pause /> : <Play />;

const arrayFy = (str: string | string[]) => ([] as string[]).concat(str);

function updateProgressBar(
  player: HTMLVideoElement,
  updateProgress: (value: number) => void,
) {
  const percentage = Math.floor((100 / player.duration) * player.currentTime);

  updateProgress(percentage);
}

function parseCurrentTime(secs: number): string {
  if (!secs) {
    return '00:00';
  }

  const sec = parseInt(secs.toString(), 10);
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor(sec / 60) % 60;
  const seconds = sec % 60;

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
}

export type VideoProps = {
  name?: string;
  src: string;
  videoProps?: React.HTMLProps<HTMLVideoElement>;
} & FrameProps;

export type VideoRefs = {
  video: React.Ref<HTMLVideoElement>;
  progress: React.Ref<HTMLInputElement>;
  wrapper: React.Ref<HTMLDivElement>;
  playpause: React.Ref<HTMLButtonElement>;
  stop: React.Ref<HTMLButtonElement>;
  fullScreen: React.Ref<HTMLButtonElement>;
};

const VideoRenderer = (
  { name, src, videoProps, ...props }: VideoProps,
  ref: React.Ref<VideoRefs>,
) => {
  const [playing, setPlaying] = React.useState(false);
  const [loadeddata, setLoadeddata] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const player = React.useRef<HTMLVideoElement>(null);
  const progressRef = React.useRef<HTMLInputElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const playPauseRef = React.useRef<HTMLButtonElement>(null);
  const stopRef = React.useRef<HTMLButtonElement>(null);
  const fullScreenRef = React.useRef<HTMLButtonElement>(null);

  const paths = arrayFy(src);
  const [pathname] = paths;

  const normalizedName = name || pathname.replace(/^.*[\\/]/, '');
  const title = `${normalizedName}${!loadeddata ? ' (Opening)' : ''}`;

  React.useImperativeHandle(ref, () => ({
    get video() {
      return player;
    },
    get progress() {
      return progressRef;
    },
    get wrapper() {
      return wrapperRef;
    },
    get playpause() {
      return playPauseRef;
    },
    get stop() {
      return stopRef;
    },
    get fullScreen() {
      return fullScreenRef;
    },
  }));

  React.useEffect(() => {
    player.current?.addEventListener(
      'ended',
      () => {
        setPlaying(false);
        setProgress(0);
      },
      false,
    );

    player.current?.addEventListener(
      'timeupdate',
      () => {
        if (player.current) {
          updateProgressBar(player.current, setProgress);
        }
      },
      false,
    );

    player.current?.addEventListener(
      'loadeddata',
      () => {
        setLoadeddata(true);
      },
      false,
    );

    player.current?.addEventListener(
      'playing',
      () => {
        setPlaying(true);
      },
      false,
    );
  }, [player.current]);

  return (
    <Frame
      {...props}
      padding="$2"
      boxShadow="$out"
      backgroundColor="$material"
      ref={wrapperRef}
    >
      <TitleBar icon={<Mplayer113 variant="16x16_4" />} title={title} />
      <video
        className={styles.videoTag({ visible: loadeddata })}
        {...videoProps}
        ref={player}
      >
        {paths.map(s => (
          <Source key={s} src={s} />
        ))}
      </video>
      {loadeddata && <span className={styles.divider} />}
      <Frame maxWidth="250px" mx="auto" mb="$4">
        <div className={styles.countDownContainer}>
          <Frame display="flex" flexDirection="column" w="40%">
            <div
              className={styles.videoFont}
              style={{
                marginTop: 'auto',
              }}
            >
              {player.current && parseCurrentTime(player.current.duration)}
            </div>

            <div className={styles.videoFont} style={{ height: 12 }}>
              {!loadeddata && 'Openning'}
            </div>
          </Frame>
          <Frame display="flex" flexDirection="column" w="40%">
            <div className={cn(styles.videoFont, styles.currentTime)}>
              {player.current && parseCurrentTime(player.current.currentTime)}
            </div>

            <div className={cn(styles.videoFont, styles.elapsedTime)}>time</div>
          </Frame>
        </div>
        <div className={styles.controls}>
          <Button
            className={styles.controlBtn}
            disabled={!loadeddata}
            onClick={() => {
              if (!playing) {
                player.current?.play();
              } else {
                player.current?.pause();
              }
              setPlaying(!playing);
            }}
            ref={playPauseRef}
          >
            {loadeddata ? (
              <PlayOrPause playing={playing} />
            ) : (
              <User4
                style={{ borderRight: 'none', borderBottom: 'none' }}
                variant="32x32_4"
              />
            )}
          </Button>
          <Button
            className={styles.controlBtn}
            disabled={!loadeddata}
            onClick={() => {
              if (player.current) {
                player.current.pause();
                player.current.currentTime = 0;
              }

              setPlaying(false);
            }}
            ref={stopRef}
          >
            <Stop />
          </Button>
          <Button
            className={styles.controlBtn}
            disabled={!loadeddata}
            onClick={() => {
              player?.current?.requestFullscreen();
            }}
            ref={fullScreenRef}
          >
            <Fullscreen />
          </Button>

          <Range
            className={styles.range}
            ref={progressRef}
            min="0"
            max="100"
            step="1"
            value={progress}
            style={{
              width: '70%',
              marginLeft: 20,
            }}
            onChange={({ target }) => {
              const { current: video } = player;

              if (video) {
                const value = parseInt(target.value);
                const percent = value / 100;

                video.currentTime = percent * video.duration;

                setProgress(value);
              }
            }}
          />
        </div>
      </Frame>
    </Frame>
  );
};

export const Video = React.forwardRef<VideoRefs, VideoProps>(VideoRenderer);
