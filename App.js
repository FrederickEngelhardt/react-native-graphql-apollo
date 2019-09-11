/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
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
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);

const RootComponent = () => {
  const {data} = useQuery(GET_EMAIL);
  console.log(data);
  const [updateEmail] = useMutation(UPDATE_EMAIL);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => updateEmail({variables: {email: 'fredo@gmail.com'}})}>
          <Text>Click to update email</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
