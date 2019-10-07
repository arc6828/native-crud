import React from 'react';
import TodosContainer from '../components/TodosContainer';

import { StyleSheet, View,  Platform, TouchableOpacity, ScrollView,  FlatList, AsyncStorage, Text, TextInput } from 'react-native';

import * as firebase from 'firebase';
import '@firebase/firestore';


export default function TodoScreen() {

  return  < TodosContainer/> ;
}

TodoScreen.navigationOptions = {
  title: 'Todo',
};


