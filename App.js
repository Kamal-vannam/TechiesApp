import React from 'react'
import { View, Text } from 'react-native'
import HomePage from './src/Pages/HomePage/HomePage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/BottomTab/BottomTab'


const App= () => {
    return (
        <NavigationContainer>
           <BottomTab/>
        </NavigationContainer>
    )
}

export default App
