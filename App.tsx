import React, { useState }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'

import AppContext from './components/AppContext';




const Stack = createNativeStackNavigator();


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
;

  const appData = {
    loggedIn,
    setLoggedIn,
    token,
    setToken,
  }


  return (
    <NavigationContainer>
      <AppContext.Provider value={appData}>
        <Stack.Navigator>
            {
              !loggedIn ? (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                </>
              )
            }
          
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
}