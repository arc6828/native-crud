import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,  Platform, TouchableOpacity, ScrollView,  FlatList, AsyncStorage, Text, TextInput } from 'react-native';
import TodoItem from '../components/TodoItem';
import * as firebase from 'firebase';
import '@firebase/firestore';


export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };   

  }


  render() {
    return (        
        <View style={styles.container}>
            <Text>Username  : </Text>
            <TextInput                 
                placeholder="Enter your username"
                />
            <Text>Password  : </Text>
            <TextInput 
                placeholder="Enter your password"
                />        
        </View>
    );
  }
}

LoginScreen.navigationOptions = {
    title: 'Login',
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row: {
    top: 15,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});