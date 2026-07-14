"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  BsPlayFill, 
  BsPauseFill, 
  BsVolumeUpFill, 
  BsVolumeMuteFill, 
  BsFullscreen,
  BsFullscreenExit
} from "react-icons/bs";

interface PortfolioVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  showControls?: boolean;
}

export function PortfolioVideoPlayer({ src, poster, className = "", showControls = true }: PortfolioVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!videoRef.current || !containerRef.current) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const clickedProgress = Math.max(0, Math.min(1, x / rect.width));
    
    videoRef.current.currentTime = clickedProgress * videoRef.current.duration;
    setProgress(clickedProgress * 100);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Smart Autoplay with IntersectionObserver
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {
              // Autoplay might be blocked by browser
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative group overflow-hidden bg-black ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        key={src}
        src={src}
        poster={poster}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover cursor-pointer"
        playsInline
        autoPlay
        muted
        loop
      />

      {/* Controls Overlay */}
      {showControls && (
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-end transition-opacity duration-300 ${
            isPlaying && !isHovering ? "opacity-0" : "opacity-100"
          } bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none`}
        >
          {/* Center Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.button
              initial={false}
              animate={{ 
                scale: isPlaying && isHovering ? 0.8 : 1,
                opacity: !isPlaying || isHovering ? 1 : 0 
              }}
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-primary-500/90 text-white flex items-center justify-center backdrop-blur-md shadow-2xl pointer-events-auto hover:scale-110 transition-transform active:scale-95"
            >
              {isPlaying ? <BsPauseFill size={32} /> : <BsPlayFill size={32} className="ml-1" />}
            </motion.button>
          </div>

          {/* Bottom Controls Bar */}
          <div className="p-4 md:p-6 w-full pointer-events-auto">
            {/* Progress Bar */}
            <div 
              className="relative w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer group/progress transition-all hover:h-1.5"
              onClick={handleSeek}
            >
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" 
                   style={{ left: `${progress}%`, marginLeft: '-6px' }} />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlay}
                  className="text-white hover:text-primary-500 transition-colors"
                >
                  {isPlaying ? <BsPauseFill size={24} /> : <BsPlayFill size={24} />}
                </button>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleMute}
                    className="text-white hover:text-primary-500 transition-colors"
                  >
                    {isMuted ? <BsVolumeMuteFill size={20} /> : <BsVolumeUpFill size={20} />}
                  </button>
                  <span className="text-[12px] text-white/80 font-medium tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleFullscreen}
                  className="text-white hover:text-primary-500 transition-colors"
                >
                  {isFullscreen ? <BsFullscreenExit size={20} /> : <BsFullscreen size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
