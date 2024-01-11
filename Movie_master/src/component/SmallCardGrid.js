import React, { useEffect } from 'react';
import { View, FlatList, Image, Dimensions, Text } from 'react-native';
import { image500 } from '../api/ApiDB';

var { width, height } = Dimensions.get('window');

export default function SmallCardGrid(props) {
    const { data, numColumns } = props;

useEffect(()=>{
    // console.log("Small card Dada", data[0]);
});

    return (
        <View>
            <FlatList
                data={data}
                numColumns={numColumns}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginBottom: 5, flex: 1 }}>
                            <Image
                                source={{ uri: image500(item.poster_path) }}
                                style={{
                                    resizeMode: 'contain',
                                    width: width * 0.45,
                                    height: height * 0.35,
                                    borderRadius: 10
                                }}
                            />
                            <Text>{item.original_title}</Text>
                        </View>)
                }}
            />

        </View>
    )
}
