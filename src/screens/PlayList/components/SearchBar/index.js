import {  Text, View, TextInput } from 'react-native';
import { styles } from './index.css';
 
export default function SearchBar({onChange, searchString}) {

  return (
      <TextInput 
        placeholder="Seach a new song"
        style={styles.input}
        onChangeText={onChange}
        value={searchString}
      />
  );
}

