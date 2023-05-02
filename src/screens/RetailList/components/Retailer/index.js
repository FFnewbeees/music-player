import { Text, View, Image } from 'react-native';
import { styles } from './index.css';
import React, { memo } from 'react';


// Retailer item component
export default function Retailer(props) { 

  const {data} = props;

  const{ rewardPercent, logoUri } = data; 
 
  return (
    <View style={styles.container}>
          <Image resizeMode='contain' style={styles.logo} alt='logo' source={{uri: `https://cards.wagesplitter-dev.com/api/Retailer/logo/${logoUri}`}}/> 
          <View>
            <Text>{`Earn ${rewardPercent} %`}</Text>
          </View>
    </View>
  );
}

