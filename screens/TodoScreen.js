import React from 'react';
import { StyleSheet } from 'react-native';
import TodosContainer from '../components/TodosContainer';

export default function TodoScreen() {

  return (
      < TodosContainer/>
  );
}

TodoScreen.navigationOptions = {
  title: 'Todo',
};


