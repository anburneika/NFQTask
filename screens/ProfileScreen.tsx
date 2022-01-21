import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import AppContext from '../components/AppContext';


export default function ProfileScreen() {

const appData = useContext(AppContext);
const [user, setUser] = useState({
                                  uuid:  '',
                                  image: '',
                                  firstName: '',
                                  lastName: '',
                                  address: '',
                                  phone: '',
                                });

const logout = () => {
    //clean user data here?
    setUser(
      {uuid:  '',
      image: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',}
    );
    appData.setLoggedIn(false);
  }

const getUserData = async (token:string) => {

    //console.log('did getUserData receive token? ' + token);

    const url = 'https://vidqjclbhmef.herokuapp.com/user';
    try {
      const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    });
    const json = await response.json(); 
        if (typeof json.uuid === "undefined") {
        //add some warnings about not finding user data
        console.log("user data not received");
      } else {
        setUser(json);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserData(appData.token);
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
              <Pressable
              style={styles.logoutButton}
              onPress={() => logout()}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </Pressable>
            </View>
      {
        user.uuid === '' ? (
          <>
            <ActivityIndicator size="large" color="#00ff00" />
          </>
        ) : (
          <>
            <Image
              style={styles.logo}
              source={{
                uri: `${user.image}`,
              }}
              />
            <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.text}>{user.address}</Text>
            <Text style={styles.text}>{user.phone}</Text>
            <StatusBar style="auto" />
          </>
        )
      }
      
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logoutContainer: {
      marginTop: 30,
      borderBottomWidth: 0.5,
      //top: 30,
      width: '100%',
      alignItems: 'flex-end',
    },
    logoutButton: {
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: '30%',
    },
    logo: {
      marginBottom: 20,
      marginTop: 20,
      width: '90%',
      aspectRatio: 1,
    },
    text: {
      fontSize: 20,
      marginTop: 20,
    },
    logoutText: {
      fontSize: 20,
    }
  });