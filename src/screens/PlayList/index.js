import { View, FlatList } from 'react-native';
import { styles } from './index.css';
import Song from './components/Song';
import SearchBar from './components/SearchBar';
import SongPlayer from './components/SongPlayer';
import React, {useEffect, useState} from 'react';

export default function PlayList() {

  const [searchString, setSearchString] = useState('taylor swift');
  const [data, setData] = useState(false);
  const [selectedSong, setSelectedSong] = useState(false);

  // Initially load only 25 songs at most.
  const [limit, setLimit] = useState(25);

  // Use the iTunes Search API to search for an artist by name. 
  const getSongs = async () => {
    let results = fetch(`https://itunes.apple.com/search?term=${searchString}&limit=${limit}&entity=song`)
    .then((response)=>{
      if(response.status === 200){
        return response.json();
      }   
    })
    .then((data)=> setData(data)).catch((error)=>{
      console.log(error)
    });
    
    return results;
  }

  useEffect(() => {

    // Debounce to avoid frequent actions
    const timer = setTimeout(() => {
      getSongs();
    }, 1000)

    return () => clearTimeout(timer)

  },[limit, searchString]);

  const {results} = data;

  const handleSongOnPress = (songData) => {
    setSelectedSong(songData);
  }

  const fetchMoreSongs = () => {
    // When user scroll to the near bottom of the list,
    // Load 10 more songs
    setLimit(limit + 10);
  }

  return ( 
    <View style={styles.container}>
      <SearchBar onChange={setSearchString} searchString={searchString}/>
      <FlatList 
            style={styles.songList}
            extraData={results}
            onEndReached={fetchMoreSongs}
            onEndReachedThreshold={0.7}
            data={results}
            renderItem={({item}) => <Song selectedSong={selectedSong.trackId} data={item} onPress={() => handleSongOnPress(item)} />}
            keyExtractor={item => item.trackId.toString()}
        />

      {/* When we tap a song for the first time, a media player should show up
      at the bottom of the screen and optionally you can start to play the
      preview for that song. */}
      {selectedSong && <SongPlayer selectedSong={selectedSong} />}
    </View>
  );
}


