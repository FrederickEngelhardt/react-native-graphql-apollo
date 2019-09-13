/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import {Navigation} from 'react-native-navigation';

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import client, {CREATE_ACCOUNT} from '../client';
import {
  ApolloProvider,
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import {WELCOME_SCREEN} from "../index";
import {create} from "react-native/jest/renderer";

const Login = () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);

const RootComponent = () => {
  const [ emailValue, updateEmail ] = useState('')
  const [ passwordValue, updatePassword ] = useState('')
  const [createAccount] = useMutation(CREATE_ACCOUNT);

  const showOverlay = () => Navigation.showOverlay({
    component: {
      name: WELCOME_SCREEN,
      id: WELCOME_SCREEN,
      options: {
        overlay: {
          interceptTouchOutside: true
        }
      }
    }
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.inputContainer}>
        <TextInput placeholder={'Type your email here'} autoFocus style={styles.input} placeholderTextColor={'#ffffff'} value={emailValue} onChangeText={updateEmail}/>
        </View>
        <View style={styles.inputContainer}>
        <TextInput placeholder={'Type your password here'} placeholderTextColor={'#ffffff'} style={styles.input} value={passwordValue} onChangeText={updatePassword}/>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await createAccount({variables: {email: emailValue, password: passwordValue }})
            await showOverlay()
          }}>
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    flex: 1,
    backgroundColor: '#00b7ff'
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center'
  },
  button: {
    width: 180,
    backgroundColor: '#64d3ff',
    borderRadius: 50,
  },
  input: {
    color: '#fff',
    width: '100%',
    height: 80,
    padding: 24,
  },
  text: {
    color: '#ffffff',
    padding: 24,
  }
});

export default Login;
