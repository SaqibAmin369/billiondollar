import React, { useEffect, useRef, useState } from 'react';
import audio from '../../assets/audio/The_Billion_Dollar_Homepage.mp3';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (!audioRef.current) return;

      audioRef.current.volume = 1;
      audioRef.current.muted = isMuted;

      audioRef.current
        .play()
        .then(() => console.log('🎵 Music started playing!'))
        .catch((error) => {
          console.warn('⚠️ Autoplay failed. Retrying...', error);
          setTimeout(playAudio, 3000);
        });
    };

    playAudio();
  }, [isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div>
      <audio ref={audioRef} loop autoPlay>
        <source src={audio} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <button onClick={toggleMute}>
        {isMuted ? ' 🔇' : '🔊'}
      </button>
    </div>
  );
};

export default BackgroundMusic;
