import AudioPlayer from 'react-h5-audio-player';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import 'react-h5-audio-player/lib/styles.css';  
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';


const ThreeDotsIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#808080" />
    <circle cx="7" cy="12" r="1.5" fill="white" />
    <circle cx="12" cy="12" r="1.5" fill="white" />
    <circle cx="17" cy="12" r="1.5" fill="white" />
  </svg>
);

const Player = ({ currentSong, handleNext, handlePrevious, setMobileScreen, isMobile, mobileScreen }) => {
  return (
    <div className={`w-full lg:w-1/2 px-4 my-auto ${isMobile && mobileScreen === 'sidebar' ? 'hidden' : 'block'}`}>
      {currentSong && (
        <div className='mb-4'>
          <h1 className='text-white font-extrabold' style={{ fontSize: 'max(1rem, 4vw)' }}>{currentSong.name}</h1>
          <p className='text-gray-300 mb-2'>{currentSong.artist}</p>
          <div className='w-full h-96 overflow-hidden relative'>
            <img
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              alt={currentSong.name}
              className='object-cover w-full h-full absolute inset-0'
            />
          </div>
        </div>
      )}
      <AudioPlayer
        src={currentSong?.url}
        autoPlay={false}
        showFilledVolume={false}
        onClickNext={handleNext}
        onClickPrevious={handlePrevious}
        customIcons={{
          next: <TbPlayerTrackNextFilled />,
          previous: <TbPlayerTrackPrevFilled />,
          volume: <FaVolumeUp className='bg-gray-500 text-white rounded-lg p-1' size={32} />,
          volumeMute: <FaVolumeMute className='bg-gray-500 text-white rounded-lg p-1' size={32} />,
        }}
        customControlsSection={[
        <div className=' flex flex-1' onClick={() => setMobileScreen('sidebar')}>
          <ThreeDotsIcon className='bg-gray-500 text-white' size={48} />,
        </div>,
        'MAIN_CONTROLS',
        'VOLUME_CONTROLS',
      ]}
        showSkipControls
        showJumpControls={false}
        onEnded={handleNext}
      />
    </div>
  );
};

export default Player;
