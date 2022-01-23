import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, TouchableHighlight, ActivityIndicator, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import AppContext, {storeData} from '../components/AppContext';





export default function LoginScreen() {

    const appData = useContext(AppContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 

    const onPressLogin = async (username:string, password:string) => {
      const url = 'https://vidqjclbhmef.herokuapp.com/credentials';
          
      if (username.length > 6 && password.length > 6){
          //add some proper validation? sanitize is needed?
          //could use foreach with array or something to show that i know it works, but it seems too much for this...
          var requestParams= "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
          var token: string | undefined;
          token = await getToken(url, requestParams);
          {token !== undefined? (appData.setToken(token), appData.setLoggedIn(true), storeData(token))
            //do we want to alert that username is incorrect or just invalid?
            : alert('Please enter valid username and password!'), console.log('nothing received from server')}
      } else {
          alert('Please enter valid username and password!')
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
      <KeyboardAvoidingView style={{flex: 1}}>
        {
          appData.loading? (
            <>
              <ActivityIndicator style={styles.loading} size="large" color="#00ff00" />
            </>
          ) : (
            <>
              <View style={styles.container}>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: 'https://placeimg.com/80/80/tech',
                    }}
                    />
                </View>
                <View style={styles.formContainer}>
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
                  <TouchableHighlight
                    style={styles.logInButton}
                    underlayColor="#60C5FF"
                    activeOpacity={0.7}
                    onPress={() => onPressLogin(username,password)}
                  >
                      <Text style={styles.logInText}>SUBMIT</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </>
          )
        }
        
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    );
  }

const styles = StyleSheet.create({
input: {
    height: 50,
    width: '80%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
},
loading : {
  marginTop: '50%',
},
container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
},
logoContainer: {
    flex: 1.5,     
    alignItems: 'center',
    justifyContent: 'space-around',
},
logo: {
    marginBottom: 0,
    marginTop: 50,
    width: 120,
    height: 120,
},
formContainer : {
    flex: 2,alignItems: 'center',
    justifyContent: 'flex-start',
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
