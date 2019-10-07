import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,  Platform, TouchableOpacity, ScrollView,  FlatList, AsyncStorage, Text, TextInput, Button } from 'react-native';
import TodoItem from '../components/TodoItem';
import * as firebase from 'firebase';
import '@firebase/firestore';


export default class RegisterScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password : "",
      confirm_password : "",
      user : null,
      message : "",
    };   

  }

  onRegister = () => {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
        console.log("user : ", user);

        //this.state.user = user;
        
        this.setState({ 'message' : ""});
        this.setState({ 
          message : "",
          user : user.user
        });
        this._storeData();


      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
        console.log("code , message :" , code ,message);
        this.setState({ 'message' : message});
      });
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(this.state.user) );
    } catch (error) {
      // Error saving data
    }
  };  

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.row}>Email  : </Text>
            <TextInput        
                style={styles.row}         
                placeholder="Enter your email"      
                value={this.state.email}          
                onChangeText={changedTitle => this.setState({ "email" : changedTitle }) }                  
                keyboardType="email-address"
                
                autoCapitalize="none"
                autoCorrect={false}
                />
            <Text style={styles.row}>Password  : </Text>
            <TextInput 
                style={styles.row}
                placeholder="Enter your password"
                value={this.state.password}          
                onChangeText={changedTitle => this.setState({ "password" : changedTitle }) }
                
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                />    
            <Text style={styles.row}> Confirm Password  : </Text>
            <TextInput 
                style={styles.row}
                placeholder="Enter your comfirm password"
                value={this.state.confirm_password}          
                onChangeText={changedTitle => this.setState({ "confirm_password" : changedTitle }) }
                
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                />   
            <Button 
                style={styles.row}
                title="Register"
                onPress={() =>  this.onRegister() } 
                />    
            <Text style={styles.row}>{ this.state.message }</Text>
        </View>
    );
  }
}

RegisterScreen.navigationOptions = {
    title: 'New Account',
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding : 10,
  },
  row: {
    padding : 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});