import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import AppContext, {storeData} from '../components/AppContext';





export default function LoginScreen() {

    const appData = useContext(AppContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 



    const onPressLogin = async (username:string, password:string) => {

      const url = 'https://vidqjclbhmef.herokuapp.com/credentials';
          
      if (username.length > 0 && password.length > 0){
          //add some proper validation

          // var data = {
          // 'username': `${username}`,
          // 'password': `${password}`,
          // }
          var requestParams= "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
          var token: string | undefined;
          // Object.entries(data).forEach(
          //   ([key, value]) => requestParams = requestParams + encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&",
          // );
          //token = await getToken(url, requestParams.slice(0, -1));

          token = await getToken(url, requestParams);
          {token !== undefined? (appData.setToken(token), appData.setLoggedIn(true), storeData(token)): console.log('nothing received from server')}
      } else {
          //add some warnning to enter correct info
          console.log("username or password not entered")
      }
    }
    
    const getToken = async (url:string, formBody:string) => {
      let receivedToken = '';
      try {
          const response = await fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
      });
      const json = await response.json(); 
      receivedToken = json.token;
      return receivedToken;
      } catch (error) {
          console.error(error);
      }
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://placeimg.com/80/80/tech',
          }}
          />
        <TextInput
          style={styles.input}
          placeholder='Username'
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Pressable
          style={styles.logInButton}
          onPress={() => onPressLogin(username,password)}
        >
            <Text style={styles.logInText}>SUBMIT</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
input: {
    height: 50,
    width: '80%',
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
},
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
},
logo: {
    marginBottom: 60,
    marginTop: 110,
    width: 120,
    height: 120,
},
logInButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#4C7FFF',
},
logInText: {
    fontSize: 20,
}
});
  