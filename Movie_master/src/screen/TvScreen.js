import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { ActivityIndicator, TouchableOpacity, FlatList, Text, View, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { fetchArrangingTv, fetchOntheairTv, fetchPopularTv, fetchTopratedTv, image500, image342 } from '../api/ApiDB';
import Carousel from 'react-native-snap-carousel';
import SamllCardListing from '../component/SamllCardListing';



var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

function TvScreen() {
  const [isLoading, setLoading] = useState(true);
  const [arrangingTv, setArrangingTv] = useState([]);
  const [ontheairTv, setOntheairTv] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [topratedTv, setTopratedTv] = useState([]);

  const getArrangingTv = async () => {
    const arrangingTv = await fetchOntheairTv();
    // console.log('got trending', arrangingTv.results.length)
    if (arrangingTv && arrangingTv.results) setArrangingTv(arrangingTv.results);
    setLoading(false)
  }

  const getPopularTv = async () => {
    const popularTv = await fetchPopularTv();
    // console.log('got trending', popularTv.results.length)
    if (popularTv && popularTv.results) setPopularTv(popularTv.results);
    setLoading(false)
  }

  const getOntheairTv = async () => {
    const ontheairTv = await fetchArrangingTv();
    // console.log('got trending', ontheairTv.results.length)
    if (ontheairTv && ontheairTv.results) setOntheairTv(ontheairTv.results);
    setLoading(false)
  }

  const getTopratedTv = async () => {
    const topratedTv = await fetchTopratedTv();
    console.log("Top rated TV", topratedTv.results.length)
    if (topratedTv && topratedTv.results) setTopratedTv(topratedTv.results);
    setLoading(false)
  }

  useEffect(() => {
    getArrangingTv();
    getOntheairTv();
    getPopularTv();
    getTopratedTv();
  }, []);

  _renderarrangingTvItem = ({ item, index }) => {
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
            <Text style={{ color: "#FF933E" }}>T</Text>V</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <MagnifyingGlassIcon size="24" strokeWidth={2} color="#e91e63" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={{ flexGrow: 0, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: "#1E1E1E", marginBottom: 10, paddingHorizontal: 15 }}>Popular Tv</Text>
            <Carousel
              data={popularTv}
              renderItem={_renderarrangingTvItem}
              firstItem={1}
              inactiveSlideOpacity={0.60}
              sliderWidth={width}
              itemWidth={width * 0.62}
              slideStyle={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}
            />
          </View>
          
          <View style={{ flexGrow: 0, marginBottom: 10, paddingHorizontal: 15, }}>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: "#1E1E1E", }}>Arranging Tv</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: '400', color: "#e91e63", }}>See All</Text>
              </TouchableOpacity>
            </View>
            {arrangingTv.length > 0 && <SamllCardListing title="Arranging Tv" data={arrangingTv.slice(15, 20)} horizontal={true} showsHorizontalScrollIndicator ={false} />}
          </View>          
          
          <View style={{ flexGrow: 0, marginBottom: 10, paddingHorizontal: 15, }}>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: "#1E1E1E", }}>On Air TV</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: '400', color: "#e91e63", }}>See All</Text>
              </TouchableOpacity>
            </View>
            {ontheairTv.length > 0 && <SamllCardListing title="On the Air Tv" data={ontheairTv.slice(0, 5)} horizontal={true} showsHorizontalScrollIndicator ={false} />}
          </View>          
          
          <View style={{ flexGrow: 0, marginBottom: 10, paddingHorizontal: 15, }}>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: "#1E1E1E", }}>Top Rated TV</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: '400', color: "#e91e63", }}>See All</Text>
              </TouchableOpacity>
            </View>
            {topratedTv.length > 0 && <SamllCardListing title="Top Rated Tv" data={topratedTv.slice(0, 5)} horizontal={true} showsHorizontalScrollIndicator ={false} />}
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

export default TvScreen;

