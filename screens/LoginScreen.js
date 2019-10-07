import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,  Platform, TouchableOpacity, ScrollView,  FlatList, AsyncStorage, Text, TextInput, Button } from 'react-native';
import TodoItem from '../components/TodoItem';
import * as firebase from 'firebase';
import '@firebase/firestore';


export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password : "",
      user : null,
      message : "",
    };   

  }

  
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(this.state.user) );
    } catch (error) {
      // Error saving data
    }
  };

  onLogin = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the 
        // `onAuthStateChanged` listener we set up in App.js earlier
        console.log("user : ", user);

        //this.state.user = user;
        
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




  render() {
    return (        
        <View style={styles.container}>
            <Text style={styles.row} >Email  : </Text>
            <TextInput 
                style={styles.row}                 
                placeholder="Enter your email"
                value={this.state.email}          
                keyboardType="email-address"
                onChangeText={changedTitle => this.setState({ "email" : changedTitle }) }
                  
                autoCapitalize="none"
                autoCorrect={false}
                
                />
            <Text  style={styles.row} >Password  : </Text>
            <TextInput 
                style={styles.row} 
                placeholder="Enter your password"
                value={this.state.password}          
                onChangeText={changedTitle => this.setState({ "password" : changedTitle }) }
                
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                />    

            <Button 
                style={styles.row}
                title="Login"
                onPress={() =>  this.onLogin() } 
                />    
            <Text style={styles.row}>{ this.state.message }</Text>    

            <Button 
                style={{ padding : 10, paddingTop: 100 }}
                title="Regester a new account"
                onPress={() =>  this.props.navigation.navigate("Register") } 
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