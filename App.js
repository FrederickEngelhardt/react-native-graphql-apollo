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
import client, {GET_CART_ITEMS, GET_EMAIL, UPDATE_EMAIL} from './client';
import {
  ApolloProvider,
  useApolloClient,
  useMutation,
  useQuery,
} from '@apollo/react-hooks';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

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

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
