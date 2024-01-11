import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { fetchTrendingMovies, image500 } from '../api/ApiDB';
import Carousel from 'react-native-snap-carousel';
import {ImagePropTypes} from 'deprecated-react-native-prop-types';

var {width, height} = Dimensions.get('window');
const Profile = () => { 
const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

    const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies();
    console.log('got trending', data.results.length)
    if(data && data.results) setData(data.results);
    setLoading(false)
  }

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (

    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => {
            // console.log("image500" )
            return(
            <View style={{marginBottom: 10, backgroundColor: '#ddd', padding: 5, flex: 1}}>
              <Text>{item.title}, {item.release_date}</Text>              
              <Image
                source={{uri: image500(item.poster_path)}}
                style={{
                  resizeMode: 'contain',
                  width: width * 0.44,
                   height: height * 0.3
                }}
              />
            </View>)
          }}
        />
        
        
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default Profile;

