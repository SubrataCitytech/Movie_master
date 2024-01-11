import React from 'react';
import { View, FlatList, Image, Dimensions, TouchableOpacity} from 'react-native';
import {image500 } from '../api/ApiDB';

var { width, height } = Dimensions.get('window');

export default function SamllCardListing({ data, horizontal, showsHorizontalScrollIndicator, onPress }) {    
    return (
        <View>
            <FlatList
                data={data}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{ marginBottom: 10, backgroundColor: '#fff', padding: 5, flex: 1 }} onPress={onPress}>
                            <Image
                                source={{ uri: image500(item.poster_path) }}
                                style={{
                                    resizeMode: 'contain',
                                    width: width * 0.3,
                                    height: height * 0.2,
                                    borderRadius: 10
                                }}
                            />
                        </TouchableOpacity>)
                }}
            />

        </View>
    )
}
