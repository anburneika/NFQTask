import React, { useEffect, useState }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from './components/AppContext';



const Stack = createNativeStackNavigator();



export default function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken')
      if(userToken !== null) {
        if (userToken !== '')
        setToken(userToken);
        setLoggedIn(true);
        setLoading(false);
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    } catch(e) {
      // error reading value
    }
  }
  
  useEffect(() => {
    getToken();
  }, [])

  const appData = {
    loading,
    setLoading,
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
                  <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                </>
              ) : (

                <>
                  <Stack.Screen options={{headerShown: false}} name="Profile" component={ProfileScreen} />
                </>
              )
            } 
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
}
