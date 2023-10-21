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

const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Foundation, icon: 'home', component: HomePage },
  { route: 'CatergoriesPage', label: 'Catergories', type: Icons.MaterialIcons, icon: 'event', component: CatergoriesPage },
  { route: 'CartPage', label: 'Cart', type: Icons.Fontisto, icon: 'shopping-store', component: CartPage },
  { route: 'AccountPage', label: 'Account', type: Icons.FontAwesome, icon: 'cubes', component: AccountPage },
//   { route: 'Services', label: 'Services', type: Icons.MaterialCommunityIcons, icon: 'cog-transfer-outline', component: Services },
];


const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : "grey"} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}
          >
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
       
        
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen  key={index}  name={item.route} component={item.component}
            options={{
             tabBarButton: (props) => <TabButton  {...props} item={item} />,             
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 60,
    position: 'absolute',
    // borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.primary,
  }
})
