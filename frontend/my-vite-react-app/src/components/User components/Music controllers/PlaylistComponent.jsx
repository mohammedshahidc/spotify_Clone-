import { useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";
import Navbar from "../Layout/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MusicCard from "../Cards/MusicCard";
import { getplaylist } from "../../../redux/slices/playlistSlice";
import { getartist } from "../../../redux/slices/artist.slice";
import { getAlbums } from "../../../redux/slices/albumSlice";
import { getuserplaylist } from "../../../redux/slices/userplaylistSlice";
import Smnavbar from "../Layout/Navbar/Smnavbar";
import { IoMdArrowBack } from "react-icons/io";

const PlaylistComponent = () => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.playlist);
  const artistSongs = useSelector((state) => state.artist.artist);
  const albums = useSelector((state) => state.albums.albums);
  const userplaylist = useSelector((state) => state.userplaylist.userplaylist);
  const { id, artist, albumid, userplaylists } = useParams();

  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredAlbum, setFilteredAlbum] = useState([]);
  const [filtereduserplaylist, setFilteredUserPlaylist] = useState([]);

  const playlistArray = Array.isArray(playlist) ? playlist : [playlist];

  useEffect(() => {
    dispatch(getplaylist());
    dispatch(getartist());
    dispatch(getAlbums());
    dispatch(getuserplaylist());
  }, [dispatch]);

  useEffect(() => {
    if (playlistArray.length > 0 && id) {
      const playlists = playlistArray[0].playlists.filter((item) => item._id === id);
      setFilteredPlaylists(playlists);
    }
  }, [playlist, id]);

  useEffect(() => {
    if (artistSongs.length > 0 && artist) {
      const foundArtist = artistSongs.find((art) => art.artist === artist);
      if (foundArtist) {
        setFilteredSongs(foundArtist.songs || []);
      }
    }
  }, [artistSongs, artist]);

  useEffect(() => {
    if (albums.length > 0 && albumid) {
      const filtered = albums.filter((album) => album._id === albumid);
      setFilteredAlbum(filtered || []);
    }
  }, [albums, albumid]);

  useEffect(() => {
    if (userplaylists) {
      const filtered = userplaylist.filter((playlist) => playlist._id === userplaylists);
      setFilteredUserPlaylist(filtered);
    }
  }, [userplaylists, userplaylist]);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-r from-black to-gray-900 text-white">
      {/* Sidebar */}
      <div className="hidden sm:block sm:w-[270px] flex-shrink-0 shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-none">
        {/* Navbar */}
        <div className="sticky top-0 z-40 bg-black">
          <Navbar />
        </div>

        {/* Back Button */}
        <div className="px-4 sm:px-6">
          <Link to={"/"}>
            <IoMdArrowBack size={35} className="m-5" />
          </Link>
        </div>

        {/* Content */}
        <div className="flex-grow px-4 sm:px-6 pb-32 fixed mt-36 overflow-y-auto">
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map((item) => (
              <MusicCard
                key={item._id}
                album={{
                  image: item.songs?.[0]?.image || item.image || "default-image-url.jpg",
                  title: item.name,
                  artist: "Playlist",
                  details: `${item.songs?.length || 0} songs`,
                  id: item._id,
                }}
                songs={item.songs.map((song) => ({
                  id: song._id,
                  image: song.image || item.image || "default-image-url.jpg",
                  title: song.title,
                  duration: song.duration || "N/A",
                  audioSrc: song.fileUrl,
                }))}
              />
            ))
          ) : filteredSongs.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold ml-10 mb-4">Songs by {artist}:</h2>
              <MusicCard
                album={{
                  image: filteredSongs[0]?.image || "default-image-url.jpg",
                  name: artist,
                  artist: artist,
                  id: artist,
                }}
                songs={filteredSongs.map((song) => ({
                  id: song._id,
                  image: song.image || "default-image-url.jpg",
                  title: song.title,
                  duration: song.duration || "N/A",
                  audioSrc: song.fileUrl,
                }))}
                gradient="bg-gradient-to-br from-purple-600 to-blue-600"
              />
            </div>
          ) : filteredAlbum.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold ml-10 mb-4">Songs in the Album:</h2>
              {filteredAlbum.map((album) =>
                album.songs.map((song) => (
                  <MusicCard
                    key={song._id}
                    album={{
                      image: album.songs[0]?.image || "default-image-url.jpg",
                      name: album._id,
                      artist: song.artist || "Unknown Artist",
                      id: album._id,
                    }}
                    songs={album.songs.map((s) => ({
                      image: s.image || "default-image-url.jpg",
                      title: s.title,
                      duration: s.duration || "N/A",
                      audioSrc: s.fileUrl,
                      id: s._id,
                    }))}
                    gradient="bg-gradient-to-br from-cyan-800  to-blue-900"
                  />
                ))
              )}
            </div>
          ) : filtereduserplaylist.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold ml-10 mb-4">User Playlists:</h2>
              {filtereduserplaylist.map((playlistitem) => (
                <div key={playlistitem._id}>
                  <h3 className="text-xl font-semibold mb-2">{playlistitem.name}</h3>
                  {playlistitem.songs.length > 0 && (
                    <MusicCard
                      key={playlistitem.songs[0]._id}
                      album={{
                        image: playlistitem.songs[0]?.image,
                        title: playlistitem.name,
                        artist: "User Playlist",
                        details: `${playlistitem.songs.length} songs`,
                        id: playlistitem._id,
                      }}
                      songs={playlistitem.songs.map((song) => ({
                        id: song._id,
                        image: song.image || "default-image-url.jpg",
                        title: song.title,
                        duration: song.duration
                          ? `${Math.floor(song.duration / 60)}:${(song.duration % 60)
                              .toString()
                              .padStart(2, "0")}`
                          : "N/A",
                        audioSrc: song.fileUrl,
                      }))}
                      gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-lg mt-20">
              <p>No content available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Smnavbar />
      </div>
    </div>
  );
};

export default PlaylistComponent;
