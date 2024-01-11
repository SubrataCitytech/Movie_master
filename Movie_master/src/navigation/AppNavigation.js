import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TvScreen from '../screen/TvScreen';
import ProfileScreen from '../screen/ProfileScreen';
import MovieScreen from '../screen/MovieScreen';
import MovieSearchScreen from '../screen/MovieSearchScreen';
import UpComingSeeAll from '../screen/UpComingSeeAll';






const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Movies"
                component={MovieScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Search"
                component={MovieSearchScreen}
                options={{
                    title: 'Search',
                    headerStyle: {
                        backgroundColor: '#f9fbff',
                    },
                    headerTintColor: '#e91e63',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="UpComingAll"
                component={UpComingSeeAll}
                options={{
                    title: 'Up coming all movies',
                    headerStyle: {
                        backgroundColor: '#f9fbff',
                    },
                    headerTintColor: '#e91e63',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={MovieScreen}
                screenOptions={{
                    tabBarActiveTintColor: '#e91e63',
                }}
            >
                <Tab.Screen
                    name="Movie"
                    component={MyStack}
                    options={{
                        tabBarLabel: 'Movie',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="movie" color={color} size={size} />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="TV"
                    component={TvScreen}
                    options={{
                        tabBarLabel: 'TV',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="remote-tv" color={color} size={size} />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        ),
                        headerShown: false
                    }}
                />

                {/* <Tab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="magnify" color={color} size={size} />
                        ),
                        headerShown: false
                    }}
                /> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}

