import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Sidebar = ({ songs, setCurrentSong, currentSong, isMobile, setMobileScreen, mobileScreen }) => {
  const [durations, setDurations] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [topTracks, setTopTracks] = useState([]);
  const [activeTab, setActiveTab] = useState('forYou');

  useEffect(() => {
    const topTracks = songs.filter((song) => song.top_track);
    setTopTracks(topTracks);
  }, [songs]);

  useEffect(() => {
    songs.forEach((song) => {
      const audio = new Audio(song.url);
      audio.addEventListener('loadedmetadata', () => {
        setDurations((prevDurations) => ({
          ...prevDurations,
          [song.id]: audio.duration,
        }));
      });
    });
  }, [songs]);

  useEffect(() => {
    setFilteredSongs(
      songs.filter((song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, songs]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`w-full lg:w-1/3 text-white p-4 overflow-x-auto no-scrollbar ${isMobile && mobileScreen === 'player' ? 'hidden' : 'block'}`}>
      <div className="flex mb-4 items-start gap-5">
        <h2
          onClick={() => setActiveTab('forYou')}
          className={`text-xl font-semibold`}
          style={{ color: activeTab === 'forYou' ? 'white' : currentSong?.accent, opacity: activeTab === 'forYou' ? 1 : 0.2 }}
        >
          For You
        </h2>
        <h2
          onClick={() => setActiveTab('topTracks')}
          className={`text-xl font-semibold`}
          style={{ color: activeTab === 'topTracks' ? 'white' : currentSong?.accent, opacity: activeTab === 'topTracks' ? 1 : 0.2 }}
        >
          Top Tracks
        </h2>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search songs, artists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pr-10 rounded-md bg-gray-200 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
      </div>

      {activeTab === 'topTracks' ? (
        <ul className="space-y-4 overflow-auto">
          {topTracks.map((song) => (
            <li
              key={song.id}
              onClick={() => setCurrentSong(song)}
              className={`${song === currentSong && 'bg-gray-500'} flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-500 transition`}
            >
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`} // Replace with the actual image URL
                alt={song.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{song.name}</span>
                <span className="text-xs text-gray-300">{song.artist}</span>
              </div>
              <span className="ml-auto text-xs text-gray-300">
                {durations[song.id] ? formatDuration(durations[song.id]) : 'Loading...'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-4 overflow-y-auto ">
          {filteredSongs.map((song) => (
            <li
              key={song.id}
              onClick={() => setCurrentSong(song)}
              className={`${song === currentSong && 'bg-gray-500'} flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-500 transition`}
            >
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{song.name}</span>
                <span className="text-xs text-gray-300">{song.artist}</span>
              </div>
              <span className="ml-auto text-xs text-gray-300">
                {durations[song.id] ? formatDuration(durations[song.id]) : 'Loading...'}
              </span>
            </li>
          ))}
        </ul>
      )}
      {isMobile && 
        <div
        onClick={() => setMobileScreen('player')}
        className={`w-auto fixed bottom-5 left-2 right-2 flex items-center bg-green-700 cursor-pointer p-2 rounded-md hover:bg-gray-500`}
          >
            <img
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              alt={currentSong.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{currentSong.name}</span>
              <span className="text-xs text-gray-300">{currentSong.artist}</span>
            </div>
          </div>
          }
    </div>
  );
};

export default Sidebar;
