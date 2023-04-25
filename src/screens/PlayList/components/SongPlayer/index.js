import { TouchableOpacity } from 'react-native';
import { styles } from './index.css';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
 
// Player component
export default function SongPlayer(props) {
  const {selectedSong} = props

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(false); 
  const [playingSong, setPlayingSong] = useState(false);

  const playSound = async () => {
    setIsPlaying(true);
    // remember the song you played 
    setPlayingSong(selectedSong);

    const { sound } = await Audio.Sound.createAsync({uri:selectedSong.previewUrl});
    setSound(sound);
    await sound.playAsync();

  }

  const stopSound = async () => {
    setIsPlaying(false);
    await sound.pauseAsync();
  }

 const handleOnPress  = async () => {
    // Case 1: if the selected song is the same as the playing song 
    // Just stop the song
    if(isPlaying && playingSong.trackId === selectedSong.trackId){
      stopSound();
    }else if(isPlaying && playingSong.trackId !== selectedSong.trackId){
      // Case 2: if the selected song is different to the playing song 
      // Stop and unload the playing song
      // Play the selected song
      stopSound();
      await sound.unloadAsync();
      playSound();
    }else{
      // Case 3: if no song is playing
      // Play the selected song
      playSound();
    }
 }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const showPlaying = isPlaying && playingSong.trackId === selectedSong.trackId;

  return (
      <TouchableOpacity style={styles.container} onPress={handleOnPress}>
        <Ionicons name={showPlaying ? "stop": "play" } size={24} color="black" />
      </TouchableOpacity>
  );
}

