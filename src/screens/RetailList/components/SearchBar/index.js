import { TextInput } from 'react-native';
import { styles } from './index.css';

// Search input component
export default function SearchBar({onChange, searchString}) {

  return (
      <TextInput 
        placeholder="Seach by retailer name"
        style={styles.input}
        onChangeText={onChange}
        value={searchString}
      />
  );
}

