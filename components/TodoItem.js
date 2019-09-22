import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, CheckBox, TextInput } from 'react-native';
//import PropTypes from 'prop-types';
//import {CheckBox } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from '@unimodules/core';

export default class TodoItem extends Component {
    /*onTodoItemToggle = (todo, propAction) => {
      propAction({
        ...todo,
        completed: !todo.completed,
      });
    };*/

    constructor(props){
        super(props);        
    }
  
    render() {
      //const { todo, onUpdate, onDelete } = this.props;
  
      return (
        <View style={styles.row}>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 10,
              paddingVertical: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.onCheck(this.props.todo._id)}
              style={{ paddingLeft: 25, paddingRight: 15 }}
            >
                { this.props.todo.completed ? 
                (<Ionicons
                    name={Platform.OS === 'ios' ? "ios-checkbox" : "md-checkbox"}
                    //color={`${todo.title.length > 0 ? 'black' : 'grey'}`}
                    size={23}
                  />)
                :
                (<Ionicons
                    name={Platform.OS === 'ios' ? "ios-square-outline" : "md-square-outline"}
                    //color={`${todo.title.length > 0 ? 'black' : 'grey'}`}
                    size={23}
                  />  )

                }
                
            </TouchableOpacity>
            <TouchableOpacity
              //onPress={() => this.onTodoItemToggle(todo, onUpdate)}
              style={{
                flex: 1,
                width: '100%',
                flexDirection: 'row',
              }}
            >
              <View
                //checked={todo.completed}
                //onPress={() => this.onTodoItemToggle(todo, onUpdate)}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingLeft: 25,
                }}
              >
                
                  
                <TextInput
                    style={{ width: '90%' }}
                    placeholder="What needs to be done?"
                    autoFocus
                    underLineColorAndroid="transparent"
                    underlineColor="transparent"
                    blurOnSubmit
                    //onSubmitEditing={this.onSubmit}
                    onChangeText={changedTitle => this.props.onUpdate(changedTitle, this.props.todo._id) }
                    value={this.props.todo.title}
                    autoCorrect={false}
                    autoCapitalize="none"
                    //onBlur={onBlur}
                />
                
                
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.onDelete(this.props.todo._id)}
              style={{ paddingLeft: 25, paddingRight: 15 }}
            >
              <Ionicons
                name={Platform.OS === 'ios' ? "ios-trash" : "md-trash"}
                //color={`${todo.title.length > 0 ? 'black' : 'grey'}`}
                size={23}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingVertical: 8,
    },
  
    row: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
  });