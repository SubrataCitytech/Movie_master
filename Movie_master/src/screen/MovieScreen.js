import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { ActivityIndicator, TouchableOpacity, FlatList, Text, View, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies, fetchMovieDetails, image500, image342 } from '../api/ApiDB';
import Carousel from 'react-native-snap-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchScreen from './MovieSearchScreen';
import SamllCardListing from '../component/SamllCardListing';


var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const MovieScreen = () => {
  const {params: item} = useRoute();
  const [isLoading, setLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const navigation = useNavigation();

  const getTrendingMovies = async () => {
    const trendingMovies = await fetchTrendingMovies();
    // console.log('got trending', trendingMovies.results.length)
    if (trendingMovies && trendingMovies.results) setTrendingMovies(trendingMovies.results);
    setLoading(false)
  }

  const getUpcomingMovies = async () => {
    const upcomingMovies = await fetchUpcomingMovies();
    // console.log('got trending', upcomingMovies.results.length) 
    if (upcomingMovies && upcomingMovies.results) setUpcomingMovies(upcomingMovies.results);
    setLoading(false)
  }

  const getTopRatedMovies = async () => {
    const topRatedMovies = await fetchTopRatedMovies();
    // console.log('got trending', topRatedMovies.results.length)
    if (topRatedMovies && topRatedMovies.results) setTopRatedMovies(topRatedMovies.results);
    setLoading(false)
  }

  const getMovieDetials = async id=>{
    const data = await fetchMovieDetails(id);
    console.log('got movie details');
    setLoading(false);
    if(data) {
        setMovie({...movie, ...data});
    }
  }

  const handleClick = item=>{
    navigation.navigate('Movie', item);
    console.log("Click")
}

  useEffect(() => {
    setLoading(true);
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    //  getMovieDetials(item.id);
  }, []);

  _rendertrendingMoviesItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 8,
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={ios ? styles.mb_2 : styles.mb_3}>
        <StatusBar style="dark" />
        <View style={styles.headerStyle}>
          <TouchableOpacity>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="#e91e63" />
          </TouchableOpacity>
          <Text style={{ color: "#e91e63", fontSize: 30, fontWeight: '700' }}>
            <Text style={{ color: "#FF933E" }}>M</Text>ovies</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="24" strokeWidth={2} color="#e91e63" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={{ flexGrow: 0, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: "#1E1E1E", marginBottom: 10, paddingHorizontal: 15 }}>Trending</Text>
            <Carousel
              data={trendingMovies}
              renderItem={_rendertrendingMoviesItem}
              firstItem={1}
              inactiveSlideOpacity={0.60}
              sliderWidth={width}
              itemWidth={width * 0.62}
              slideStyle={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}
            />
          </View>

          <View style={{ flexGrow: 0, marginBottom: 10, paddingHorizontal: 15, }}>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: "#1E1E1E", marginBottom: 10 }}>Upcoming</Text>
              <TouchableOpacity onPress={() => navigation.navigate("UpComingAll")}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: "#e91e63", }}>See All</Text>
              </TouchableOpacity>
            </View>
            {upcomingMovies.length > 0 && <SamllCardListing title="Upcoming" data={upcomingMovies.slice(0, 5)} horizontal={true}  showsHorizontalScrollIndicator ={false} onPress={handleClick} />}
          </View>

          <View style={{ flexGrow: 0, marginBottom: 10, paddingHorizontal: 15, }}>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: "#1E1E1E", }}>Top Rated Movies</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: '400', color: "#e91e63", }}>See All</Text>
              </TouchableOpacity>
            </View>
            {topRatedMovies.length > 0 && <SamllCardListing title="TopRated" data={topRatedMovies.slice(0, 5)} horizontal={true} showsHorizontalScrollIndicator ={false} />}
          </View>
        </ScrollView>

      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  mb_3: {
    marginTop: 30,

  },
  mb_2: {
    marginTop: 20
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "f9fbff"
  }
});


export default MovieScreen;




