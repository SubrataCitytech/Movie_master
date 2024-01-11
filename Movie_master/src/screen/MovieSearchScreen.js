import { ActivityIndicator, View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native'
import React, { useCallback, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon, FunnelIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185, searchMovies } from '../api/ApiDB';
import { debounce } from 'lodash';
import { Svg, Path } from 'react-native-svg';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import RBSheet from "react-native-raw-bottom-sheet";

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const refRBSheet = useRef();

  const handleSearch = search => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: 'en-US',
        page: '1'
      }).then(data => {
        console.log('got search results');
        setLoading(false);
        if (data && data.results) setResults(data.results);
      })
    } else {
      setLoading(false);
      setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);



  return (

    <SafeAreaView style={ios ? styles.mb_1 : styles.mb_2}>
      <Dialog
        visible={modalVisible}
        onTouchOutside={() => {
          setModalVisible(!modalVisible)
        }
        }
      >
        <DialogContent>
          <View style={{ flex: 0, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 15 }}>
            <TouchableOpacity
              style={{ marginBottom: 5 }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#e91e63' }}>Sort by name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginBottom: 5 }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#e91e63' }}>Sort by Latest Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginBottom: 5 }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#e91e63' }}>Sort By Old Date</Text>
            </TouchableOpacity>
          </View>
        </DialogContent>
      </Dialog>
      <StatusBar style="dark" />

      {/* <View
        style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 5,
          paddingLeft: 10,
          paddingRight: 5,
        }}
      > */}
        {/* search input */}
        <View
          style={{
            // marginRight: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: "#e91e63",
            paddingVertical: 5,
            paddingLeft: 10,
            paddingRight: 5,
            borderRadius: 30,
            flexWrap: 'wrap',
            marginHorizontal: 15,
            marginBottom: 10,
            width: width * 0.9,
          }}
        >
          <TextInput
            onChangeText={handleTextDebounce}
            placeholder="Search Movie"
            placeholderTextColor={'#e91e63'}
            style={{
              color: '#e91e63',
              width: width * 0.7,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Movies')}
            style={{ backgroundColor: '#e91e63', borderRadius: 100, padding: 5, }}
          >
            <XMarkIcon size="18" color="#fff" />

          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
        >
          <FunnelIcon size="35" color="#e91e63" />
        </TouchableOpacity>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#e91e63"
            }
          }}
        >
          <View>
            <Text>Subrata</Text>
          </View>
        </RBSheet> */}
      {/* </View> */}
      {/* search results */}
      {
        loading ? (
          <ActivityIndicator />
        ) :
          results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 10 }}>Results ({results.length})</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 50 }}>
                {
                  results.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                      // onPress={() => navigation.push('Movie', item)}
                      >
                        <View style={{ marginBottom: 10, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' }}>
                          <Image
                            source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                            style={{ width: width * 0.44, height: height * 0.3, resizeMode: 'cover' }}
                          />
                          <Text style={{ color: '#e91e63', fontSize: 14, fontWeight: '600', paddingVertical: 5, paddingLeft: 5 }}>
                            {
                              item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title
                            }
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>

            </ScrollView>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/images/movieTime.png')}
                style={{
                  width: width * 0.9,
                  height: height * 0.45,
                }}
              />
            </View>
          )
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  mb_1: {
    marginTop: 10,

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

  },
});
