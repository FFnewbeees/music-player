import { Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './index.css';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'; 

// Song item component
export default function Song(props) { 

  const {data, selectedSong, onPress} = props;

  // Each song’s title, artist, album and album art should be displayed
  const{artistName, trackName, collectionName, artworkUrl100, trackId } = data; 

  // Determine if current selected song is the same as the one that is playing
  // If yes, change background colour and show playing indication 
  const songIsSelected = trackId === selectedSong;

  return (
    <TouchableOpacity style={[styles.container, songIsSelected && styles.selected]} onPress={onPress}>
        <View style={styles.songInfoContainer}>
          <Image style={styles.artwork} alt='album-art' source={{uri: artworkUrl100}}/> 
          <View>
            <Text style={styles.songName}>{trackName}</Text>  
            <Text>{artistName}</Text>
            <Text>{collectionName}</Text>  
          </View>
        </View>
        {selectedSong && <Ionicons name="md-barcode-outline" size={40} color="white" /> }
    </TouchableOpacity>
  );
}

