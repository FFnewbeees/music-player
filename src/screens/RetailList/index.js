import { View, FlatList } from 'react-native';
import { styles } from './index.css';
import Retailer from './components/Retailer';
import SearchBar from './components/SearchBar';
import React, {useEffect, useState, memo} from 'react';

const RetailList = () => {

  const [searchString, setSearchString] = useState('');
  const [data, setData] = useState(false);

  const getRetailers = async () => {
    const results = await fetch(`https://app.wagesplitter-dev.com/api/retailer/details?page_size=200`, { 
      headers:{
      "X-User-Identification-Id":"c914304f-5a3e-44e3-9add-0d03c931c6a3", 
      "X-User-Auth-Token":"aJyuDUSkauNV3AIq0s8wEw"
    }}) 
    .then((response)=>{
      if(response.status === 200){
        return response.json(); 
      }   
    })
    .then((res)=> setData(res.data.items)).catch((error)=>{
      console.log(error)
    });
    
    return results;
  }

  useEffect(() => {
    getRetailers();
  },[]);

  const renderItem = ({item}) => <Retailer data={item} />;
  const keyExtractor = (item) => item.id.toString();

  const ITEM_HEIGHT = 65; // fixed height of item component
  const getItemLayout = (data, index) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  };
  
  const retailerListFiltered = data && data.filter(item =>
    item.name.toLowerCase().includes(searchString.toLowerCase()),
  );

  return ( 
    <View style={styles.container}>
      <SearchBar onChange={setSearchString} searchString={searchString}/>
      <FlatList 
            style={styles.songList}
            onEndReachedThreshold={0.7}
            data={retailerListFiltered}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
        />
    </View>
  );
}

export default memo(RetailList);