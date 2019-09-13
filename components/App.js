/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import client, {GET_EMAIL, UPDATE_EMAIL} from '../client';
import {
  ApolloProvider,
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import {Navigation} from "react-native-navigation";
import {WELCOME_SCREEN} from "../index";

const App = () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);

const RootComponent = () => {
  const [ inputValue, updateInput ] = useState('')
  const {data} = useQuery(GET_EMAIL);
  const [updateEmail] = useMutation(UPDATE_EMAIL);

  useEffect(() => {
    console.log('Email was update!')
  } ,[data])

  const hideOverlay = () => Navigation.dismissOverlay(WELCOME_SCREEN);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Change Your Email</Text>
        <TextInput placeholder={'Type your email here'} autoFocus style={styles.input} value={inputValue} onChangeText={updateInput}/>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            updateEmail({variables: {email: inputValue }})
            updateInput('')
          }}>
          <Text style={styles.text}>Update Email</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Current Email: {data.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={hideOverlay}>
          <Text style={styles.text}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#00b7ff'
  },
  button: {
    width: 180,
    backgroundColor: '#64d3ff',
    borderRadius: 50,
  },
  input: {
    borderColor: 'black',
    width: 200,
    height: 80,
    padding: 24,
  },
  text: {
    padding: 24,
  }
});

export default App;
