import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../utils/styles/icons/icons';
import Colors from '../utils/styles/colors/colors';
import * as Animatable from 'react-native-animatable';
import HomePage from '../Pages/HomePage/HomePage';
import CatergoriesPage from '../Pages/CatergoriesPage/CatergoriesPage';
import CartPage from '../Pages/CartPage/CartPage';
import AccountPage from '../Pages/AccountPage/AccountPage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialBottomTabNavigator();


const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: HomePage, tabBarColor: Colors.primary },
  { route: 'Categories', label: 'Catergories', type: Icons.MaterialIcons, icon: 'category', component: CatergoriesPage, tabBarColor: Colors.green },
  { route: 'Cart', label: 'Cart', type: Icons.AntDesign, icon: 'shoppingcart', component: CartPage, tabBarColor: Colors.red },
  { route: 'Account', label: 'Account', type: Icons.MaterialCommunityIcons, icon: 'account', component: AccountPage, tabBarColor: Colors.yellow },
  // { route: 'Account', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: AccountPage, tabBarColor: Colors.purple },
];

export default function Tab4() {
  return (
    <Tab.Navigator>
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen key={index} name={_.route} component={_.component}
            options={{
              tabBarColor: _.tabBarColor,
              tabBarIcon: ({color, size}) => (
                <Icon name={_.icon} type={_.type} size={size} color={color} />
              )
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({})
