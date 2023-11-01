import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Booklist from '../Screens/BookList'
import BookmarksList from '../Screens/BookMarklist';
import BooksList from '../Screens/BookList';

// Import mock screens


const Tab = createBottomTabNavigator();
const RootNavigator = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='BooksList'
          tabBarOptions={tabBarOptions}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => screenOptions(route, color)
          })}
        >
          <Tab.Screen name='BooksList' component={BooksList} />
          <Tab.Screen name='BookmarksList' component={BookmarksList} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
  
export default RootNavigator;
const tabBarOptions = {
    showLabel: false,
   
    style: {
      height: '10%',
      //backgroundColor: '#1E1B26'
    }
  };
  
  const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'BooksList':
        iconName = 'view-dashboard';
        break;
      case 'BookmarksList':
        iconName = 'bookmark-multiple-outline';
        break;
      default:
        break;
    }
  
    return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
  };