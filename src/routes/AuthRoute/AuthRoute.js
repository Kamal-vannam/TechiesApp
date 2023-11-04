import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HOME_SCREEN } from '../RouteConst';
import BottomTab from '../../BottomTab/BottomTab'


const AuthStack = createNativeStackNavigator();

export const AuthRoute = (props) => {
  return (

    <NavigationContainer >
      <AuthStack.Navigator
        // initialRouteName={SPLASH}
      >
        <AuthStack.Screen
          name={HOME_SCREEN}
          options={{ headerShown: false }}
          component={BottomTab}
        />

      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

