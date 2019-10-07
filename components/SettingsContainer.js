import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,  Platform, TouchableOpacity, ScrollView,  FlatList, AsyncStorage, Text } from 'react-native';
import TodoItem from '../components/TodoItem';
import * as firebase from 'firebase';
import '@firebase/firestore';


export default class SettingsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };   

  }


  render() {
    return (
        <View style={{ flexDirection : 'column' }}>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Register') }
                style={{
                    flexDirection : 'row',               
                    padding : 10, 
                    /*backgroundColor: "lightblue" , 
                    width : 50, height : 50, 
                    alignItems : "center", 
                    alignContent : "center", 
                    borderRadius:100, 
                    position : 'absolute'  , 
                    right : 10, bottom : 10*/
                    }}>
                <Ionicons
                    name={ Platform.OS === 'ios' ? 'ios-add' : 'md-add' }
                    size={26}
                    />
                <Text style={{ padding : 10 }}>New Account</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Login') }
                style={{             
                    flexDirection : 'row',         
                    padding : 10, 
                    /*backgroundColor: "lightblue" , 
                    padding : 10, 
                    width : 50, height : 50, 
                    alignItems : "center", 
                    alignContent : "center", 
                    borderRadius:100, 
                    position : 'absolute'  , 
                    right : 10, bottom : 10*/
                    }}>
                <Ionicons
                    name={ Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in' }
                    size={26}
                    />
                <Text style={{ padding : 10 }}>Log in</Text>
                </TouchableOpacity>
            </View>
    );
  }
}


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