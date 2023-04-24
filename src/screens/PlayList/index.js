import { View, FlatList } from 'react-native';
import { styles } from './index.css';
import Song from './components/Song';
import SearchBar from './components/SearchBar';
import SongPlayer from './components/SongPlayer';
import React, {useEffect, useState} from 'react';

export default function PlayList() {

  const [searchString, setSearchString] = useState('taylor swift');
  const [data, setData] = useState(false);
  const [limit, setLimit] = useState(25);
  const [selectedSong, setSelectedSong] = useState(false);

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
     setLimit(limit + 10);
  }

  return ( 
    <View style={styles.container}>
      <SearchBar onChange={setSearchString} searchString={searchString}/>
      <FlatList 
            style={{flex:1,width:'100%'}}
            extraData={results}
            onEndReached={fetchMoreSongs}
            onEndReachedThreshold={0.7}
            data={results}
            renderItem={({item}) => <Song selectedSong={selectedSong.trackId} data={item} onPress={() => handleSongOnPress(item)} />}
            keyExtractor={item => item.trackId.toString()}
        />

      {selectedSong && <SongPlayer selectedSong={selectedSong} />}
    </View>
  );
}


