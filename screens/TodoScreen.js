import React from 'react';
import { ScrollView, StyleSheet, View,  Platform, TouchableOpacity } from 'react-native';
import TodosContainer from '../components/TodosContainer';
import { Ionicons } from '@expo/vector-icons';

export default function TodoScreen() {

  return (
      < TodosContainer/>
  );
}

TodoScreen.navigationOptions = {
  title: 'Todo',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
