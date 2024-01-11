import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { FunnelIcon } from 'react-native-heroicons/outline';
import RBSheet from "react-native-raw-bottom-sheet";
import { fetchUpcomingMovies, image500 } from '../api/ApiDB';
import SmallCardGrid from '../component/SmallCardGrid';


var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const sortData = ["Sort By Named ( A - Z )", "Sort By Latest Date", "Sort By Old Date"];

export default function UpComingSeeAll() {

    const [isLoading, setLoading] = useState(true);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [data, setData] = useState([]);
    const [result, setResult] = useState(0);
    const refRBSheet = useRef();

    const getUpcomingMovies = async () => {
        const upcomingMovies = await fetchUpcomingMovies();
        // console.log('got trending', upcomingMovies.results.length);

        if (upcomingMovies && upcomingMovies.results){
            setUpcomingMovies(upcomingMovies.results);
            setData(upcomingMovies.results);
            setResult(upcomingMovies.results.length);
        }
        setLoading(false)
    }

    // const alphabetSort = () => {
    //     let templist = upcomingMovies.sort((a, b)=>
    //         a.original_title < b.original_title ? 1 : -1,
    //     );
    //     console.log("templist", templist);
    //     setUpcomingMovies(templist);
    //     setLoading(false)
    // }

    // const getSortedState = (data) => {
    //     let templist = data.sort((a, b) => parseInt(a.original_title) < parseInt(b.original_title) ? 1 : -1);
    //     setData(templist);
    // };
    // const sortData = (original_title) => {
    //     setUpcomingMovies(upcomingMovies.slice().sort((a, b) => {
    //       if (a.original_title < b.original_title) return -1;
    //       if (a.original_title > b.original_title) return 1;
    //       refRBSheet.current.close()
    //       return 0;
    //     }));
    //   };

    useEffect(() => {
        getUpcomingMovies();
    }, []);
    return (
        <View style={{ flex: 1, marginVertical: 10, paddingHorizontal: 15, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#000' }}>Up coming all <Text style={{ fontSize: 14, fontWeight: '600', color: '#e91e63' }}>( Results: {result} )</Text></Text>

                <TouchableOpacity
                    onPress={() => refRBSheet.current.open()}
                >
                    <FunnelIcon size="30" fill="#e91e63" />
                </TouchableOpacity>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={200}
                    openDuration={250}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent",
                            borderRadius: 10,
                            overflow: 'hidden'
                        },
                        draggableIcon: {
                            backgroundColor: "#e91e63"
                        }
                    }}
                >
                    <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
                        <TouchableOpacity style={{ marginBottom: 5, marginBottom: 10 }}
                            onPress={() => {
                                let sortAcendingTitle = upcomingMovies.slice().sort((a, b) =>
                                    a.original_title > b.original_title ? 1 : -1,
                                );
                                // console.log("templist", templist[0]);
                                setUpcomingMovies(sortAcendingTitle);
                                refRBSheet.current.close()
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#ff0000' }}>Sort By Named ( A - Z )</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginBottom: 5, marginBottom: 10 }}
                            onPress={() => {
                                let sortDecendingTitle = upcomingMovies.slice().sort((a, b) =>
                                    a.original_title < b.original_title ? 1 : -1,
                                );
                                // console.log("templist", templist[0]);
                                setUpcomingMovies(sortDecendingTitle);
                                refRBSheet.current.close()
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#ff0000' }}>Sort By Named ( Z - A )</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{ marginBottom: 5, marginBottom: 10 }}
                            onPress={() => {
                                let sortAcendingDate = upcomingMovies.slice().sort((a, b) =>
                                new Date(a.release_date) - new Date(b.release_date),
                                );
                                // console.log("templist", sortAcendingDate[0]);
                                setUpcomingMovies(sortAcendingDate);
                                refRBSheet.current.close()
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#ff0000' }}>Sort By Date ( Ascending order)</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </View >

            {upcomingMovies.length > 0 &&<SmallCardGrid title="Upcoming" data={upcomingMovies} numColumns={2} />}
        </View >
    )
}
