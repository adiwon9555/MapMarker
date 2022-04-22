import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios'

// You can import from local files
// import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

export default function Map() {
  const [datad, setDatad] = useState([])
  useEffect(()=>{
    axios.get('https://612c49f2ab461c00178b5c4c.mockapi.io/api/jm/intv/contacts-1')
      // .then((res)=>res.json)
      .then(res=>{
        
        if(res?.data?.status == 200){
          console.log('@aditya',res?.data?.data)
          setDatad(res?.data?.data)
        }
        
      }).catch(()=>{

      })
  },[])
  
  const renderItem = ({item,index}) => {
    return <View style={{flex:1, width: 360, flexDirection: 'row'}}>
      <Image source={{uri : item?.image}} style={{height: 20, width: 20}}/>
        <Text>{item?.first_name}</Text>
        <Text>{item?.last_name}</Text>
    </View>
  }
  
  return (
    <View style={styles.container}>
      <View><Text>asdsa</Text></View>
      <FlatList
        data={datad}
        renderItem={renderItem}
        onEndReached={onEndReached}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
