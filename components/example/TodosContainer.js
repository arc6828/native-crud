import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,  Platform, TouchableOpacity, ScrollView,  FlatList } from 'react-native';
import TodoItem from '../components/TodoItem';

export default class TodosContainer extends React.Component {
  constructor(){
    this.state = {
      todos : [
        { _id : '1' , completed : false,  title : "exercise @ 7.00" },
        { _id : '2' , completed : false,  title : "meeting @ 9.00"},
        { _id : '3' , completed : false,  title : "go to cinema @ 19.00"},
      ],
    };
  } 

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            style={{ width: '100%', top: 15 }}
            data={this.state.todos}
            keyExtractor={item => item._id}
            renderItem={ ({ item }) => (                
                <TodoItem todo={ item }  />
            )}
            />          
        </ScrollView>
        
        <TouchableOpacity 
          onPress={() => this.onCreate() }
          style={{ 
                backgroundColor: "lightblue" , 
                padding : 10, 
                width : 50, 
                height : 50, 
                alignItems : "center", 
                alignContent : "center", 
                borderRadius:100, 
                position : 'absolute'  , 
                right : 10, 
                bottom : 10,
            }}>
          <Ionicons
            name={ Platform.OS === 'ios' ? 'ios-add' : 'md-add' }
            size={26}
            />
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