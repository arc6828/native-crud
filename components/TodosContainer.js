import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,  Platform, TouchableOpacity, ScrollView,  FlatList, AsyncStorage } from 'react-native';
import TodoItem from '../components/TodoItem';
import Fire from '../Fire';

export default class TodosContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos : [
        { _id : '1' , completed : false,  title : "exercise @ 7.00" },
        { _id : '2' , completed : false,  title : "meeting @ 9.00"},
        { _id : '3' , completed : false,  title : "go to cinema @ 19.00"},
      ],
    };
    //LOAD TO STATE
    this._retrieveData();

    //CONNECT WITH FIREBASE
    fire = new Fire();
    this.dbh = fire.getDB();
    this.dbh.collection("characters").doc("mario").set({
      employment: "plumber",
      outfitColor: "red",
      specialAttack: "fireball"
    })


  }

  onCreate = () => {
    let newData = {
        _id : '_' + Math.random().toString(36).substr(2, 9), //RANDOM NUMBER
        title : "", //Empty String
        completed : false, 
    };
    let todos = this.state.todos;
    todos.push(newData);

    //SAVE TO STATE
    this.setState({'todos': todos});
    console.log(this.state.todos);
    //SAVE TO LOCAL STORAGE
    this._storeData();
  };

  onUpdate = (changedTitle, _id) => {    
    let todos = this.state.todos;
    //Find index of specific object using findIndex method.    
    objIndex = todos.findIndex((obj => obj._id == _id));
    //Log object to Console.
    //console.log("Before update: ", myArray[objIndex])

    //Update object's name property.
    todos[objIndex].title = changedTitle;
    //Log object to console again.
    //console.log("After update: ", myArray[objIndex])

    //SAVE TO STATE
    this.setState({'todos': todos});
    //SAVE TO LOCAL STORAGE
    this._storeData();
  };

  onDelete = (_id) => {
    let todos = this.state.todos; 
    objIndex = todos.findIndex((obj => obj._id == _id));
    todos.splice(objIndex, 1); 
    this.setState({'todos': todos});
    //SAVE TO LOCAL STORAGE
    this._storeData();
  };

  onCheck = (_id) => {    
    let todos = this.state.todos;
    //Find index of specific object using findIndex method.    
    objIndex = todos.findIndex((obj => obj._id == _id));
    //Log object to Console.
    //console.log("Before update: ", myArray[objIndex])

    //Update object's name property.
    todos[objIndex].completed = !todos[objIndex].completed;
    //Log object to console again.
    //console.log("After update: ", myArray[objIndex])

    this.setState({'todos': todos});
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.state.todos) );
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('todos');
      if (value !== null) {
        // We have data!!
        console.log(value);
        var todos = JSON.parse(value);
        this.setState({'todos' : todos})
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  storeHighScore(userId, score) {
    firebase.database().ref('users/' + userId).set({
      highscore: score
    });
  }

  setupHighscoreListener(userId) {
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
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
            <TodoItem 
              todo={ item }  
              onUpdate={ this.onUpdate } 
              onDelete={ this.onDelete } 
              onCheck={ this.onCheck } 
              />
              )}
            />          
        </ScrollView>
        
        <TouchableOpacity 
          onPress={() => this.onCreate() }
          style={{ 
              backgroundColor: "lightblue" , 
              padding : 10, 
              width : 50, height : 50, 
              alignItems : "center", 
              alignContent : "center", 
              borderRadius:100, 
              position : 'absolute'  , 
              right : 10, bottom : 10
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