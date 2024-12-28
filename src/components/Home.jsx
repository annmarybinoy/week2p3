import React, { useContext, useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import { MusicContext } from '../context';
import './Home.css';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const audioRef = useRef(new Audio());

  const { isLoading, setIsLoading, resultOffset, setResultOffset } = useContext(MusicContext);

  const fetchMusicData = async (query = '', offset = 0) => {
    if (!token) {
      console.error('No token found');
      return;
    }
    setTracks([]);
    setMessage('');
    window.scrollTo(0, 0);
    setIsLoading(true);

    try {
      const searchQuery = query || keyword;
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=10&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const jsonData = await response.json();
      setTracks(jsonData.tracks.items.slice(0, 10));
      setHasSearched(true);
    } catch (error) {
      setMessage('We could not find the song you are looking for');
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPopularSongs = async () => {
    // if (!token) {
    //   console.error('No token found');
    //   return;
    // }
    // setIsLoading(true);

    // try {
    //   const response = await fetch('https://api.spotify.com/v1/playlists/{playlist_id}/tracks', {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to fetch popular songs');
    //   }

    //   const data = await response.json();
    //   console.log('Popular Songs Data:', data); // Debugging line
    //   setPopularSongs(data.items);
    // } catch (error) {
    //   console.error('Error fetching popular songs:', error);
    // } finally {
    //   setIsLoading(false);
    // }const fetchPopularSongs = async () => {
  if (!token) {
    console.error('No token found');
    return;
  }
  setIsLoading(true);

  try {
    const response = await fetch('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch popular songs');
    }

    const data = await response.json();
    console.log('Popular Songs Data:', data);  // Log the data to inspect its structure

    setPopularSongs(data.items);
  } catch (error) {
    console.error('Error fetching popular songs:', error);
  } finally {
    setIsLoading(false);
  }


  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setResultOffset(0);
      fetchMusicData(keyword);
    }
  };

  const handleSearchClick = () => {
    setResultOffset(0);
    fetchMusicData(keyword);
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'be593d2aa0c4406dae493d50a557eae0',
            client_secret: 'dc936cc4a95943068a85839873475323',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch token');
        }

        const data = await response.json();
        setToken(data.access_token);
      } catch (error) {
        console.error('Failed to fetch token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchPopularSongs();
    }
  }, [token]);

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
        handleSearchClick={handleSearchClick}
      />
      <div className="container">
        <div className={`row ${isLoading ? '' : 'd-none'}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: '3rem', height: '3rem' }}
              role="status"
            >
              <span className="visually-hidden"></span>
            </div>
          </div>
        </div>
        <div className={`row ${message ? '' : 'd-none'}`}>
          <div className="col-12 py-2 text-center">
            <h4 className="text-center text-danger">{message}</h4>
          </div>
        </div>
        <div className="row">
          {hasSearched && tracks.length > 0 ? (
            tracks.map((track) => (
              <div key={track.id} className="col-12 mb-3">
                <div className="track-info p-3 border rounded">
                  <h5>{track.name}</h5>
                  <p>{track.artists[0].name}</p>
                  <button
                    onClick={() => {
                      audioRef.current.src = track.preview_url;
                      audioRef.current.play();
                      setCurrentTrack(track);
                      setIsPlaying(true);
                    }}
                  >
                    Play
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <h2>Popular Songs</h2>
              <div className="popular-songs">
                {popularSongs.map((song) => (
                  <div key={song.track.id} className="song-card">
                    <img src={song.track.album.images[0].url} alt={song.track.name} />
                    <div className="song-info">
                      <h5>{song.track.name}</h5>
                      <p>{song.track.artists.map((artist) => artist.name).join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
