import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import introVideo from "../imges/Files/WhatsApp Video 2026-05-30 at 21.00.55.mp4";

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock scrolling while the video intro is showing
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Attempt play and handle browser autoplay blocks (e.g. low power mode)
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Video autoplay prevented by browser permissions or low power mode:", error);
        });
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleFinish = () => {
    setIsFadingOut(true);
    // Wait for the fade-out zoom animation to finish before unmounting completely
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleFinish}
        className="w-full h-full object-contain transition-opacity duration-500"
      />

      {/* Cinematic Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={handleFinish}
        className="absolute top-6 right-6 md:top-8 md:right-12 z-20 px-4 py-2 border border-white/20 bg-black/40 backdrop-blur-md text-white hover:text-[#e03a2f] hover:border-white/35 transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded cursor-pointer pointer-events-auto hover:scale-105"
        aria-label="Skip Intro"
      >
        Skip Intro
      </button>

      {/* Sleek Controls Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex justify-between items-center z-10 pointer-events-none">
        
        {/* Sleek Mute / Unmute Button (Interactive) */}
        <button
          onClick={toggleMute}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e03a2f] hover:border-white/20 hover:scale-105 transition-all duration-350 cursor-pointer"
          aria-label={isMuted ? "Unmute Intro" : "Mute Intro"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

      </div>
    </div>
  );
}
