import React, { useEffect, useRef, useState } from 'react';
import { fetchSongs } from './services/api';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import { SlSocialSpotify } from "react-icons/sl";
import Loading from './components/Loading';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const colorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileScreen, setMobileScreen] = useState('player');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const updateAccentColor = () => {
      if (currentSong) {
        const accentColor = currentSong.accent;
        colorRef.current.style.setProperty('--gradient-color-right', accentColor);
        colorRef.current.style.setProperty('--gradient-color-left', `${accentColor}90`);
      }
    };

    updateAccentColor();
  }, [currentSong]);

  useEffect(() => {
    const getSongs = async () => {
      setIsLoading(true);
      const data = await fetchSongs();
      if (data.length > 0) {
        setSongs(data);
        setCurrentSong(data[0]);
      }
      setIsLoading(false);
    };

    getSongs();
  }, []);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(newIndex);
    setCurrentSong(songs[newIndex]);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(newIndex);
    setCurrentSong(songs[newIndex]);
  };

  return (
    <>
      {isLoading ? <Loading /> :
        <div
          ref={colorRef}
          className={`flex lg:justify-end flex-1 h-screen overflow-hidden p-5 lg:pr-20 transition-colors [transition-property:_--gradient-color-right,_--gradient-color-left] ease-in duration-500 bg-gradient-to-l from-[--gradient-color-right] to-[--gradient-color-left] ${isMobile ? 'flex-col' : 'flex-row'}`}
        >
          <div className='flex space-x-3 h-10 items-center mr-14 mt-2 px-4'>
            <SlSocialSpotify className='bg-white rounded-2xl' size={36} />
            <h2 className={`text-xl font-semibold text-white`}>
              Spotify
            </h2>
          </div>
          <Sidebar songs={songs} setCurrentSong={setCurrentSong} currentSong={currentSong} isMobile={isMobile} setMobileScreen={setMobileScreen} mobileScreen={mobileScreen} />
          <Player currentSong={currentSong} handleNext={handleNext} handlePrevious={handlePrevious} setMobileScreen={setMobileScreen} isMobile={isMobile} mobileScreen={mobileScreen} />
        </div>}
    </>
  );
};

export default App;
