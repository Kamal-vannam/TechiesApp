import React from 'react'
import { View, Text } from 'react-native'
import HomePage from './src/Pages/HomePage/HomePage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/BottomTab/BottomTab'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react';


const App= () => {
    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
           <BottomTab/>
        </NavigationContainer>
        </PersistGate>
        </Provider>
    )
}

export default App

// import { View, Text } from 'react-native'
// import React from 'react'
// import RootNavigator from './src/navigation/RootNavigator'
// import { Provider } from 'react-redux'
// import { store, persistor } from './src/redux/store'
// import { PersistGate } from 'redux-persist/integration/react';


// const App = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <RootNavigator />
//       </PersistGate>
//     </Provider>
//   )
// }

// export default App
