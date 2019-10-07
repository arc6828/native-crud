import React from 'react';
import TodosContainer from '../components/TodosContainer';

import {  AsyncStorage, Button } from 'react-native';

import * as firebase from 'firebase';
import '@firebase/firestore';


export default function TodoScreen() {

  return  < TodosContainer/> ;
}

_clearUserData = async () => {
  try {
    await AsyncStorage.setItem('user', null );    
    //Redirect
    this.props.navigation.navigate("AuthLoading");
  } catch (error) {
    // Error saving data
  }
};

TodoScreen.navigationOptions = {
  title: 'Todo',
  /*headerRight: (
    <Button
      onPress={() => _clearUserData() }
      title="Logout"
      color="#111"
    />
  ),*/
};


