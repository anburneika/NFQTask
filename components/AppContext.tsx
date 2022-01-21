import * as React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (token:string) => {
    try {
      await AsyncStorage.setItem('userToken', token)
    } catch (e) {
      // saving error
    }
  }
  

interface AppContextInterface {
    loggedIn: boolean,
    setLoggedIn: (loggedIn: boolean) => void,
    token: string,
    setToken: (token: string) => void,
    //setToken: React.Dispatch<React.SetStateAction<string>>,
  }

const AppContext = React.createContext<AppContextInterface>({
    loggedIn: false,
    setLoggedIn: (loggedIn= false) => false ,
    token: '',
    setToken: (token= '') => '',
});

export default AppContext;