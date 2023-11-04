import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { AuthRoute } from './src/routes/AuthRoute/AuthRoute';


const App= () => {
    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
           <AuthRoute/>
        </PersistGate>
        </Provider>
    )
}

export default App;
