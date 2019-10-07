import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,  Platform, TouchableOpacity, ScrollView,  FlatList, AsyncStorage } from 'react-native';
import TodoItem from '../components/TodoItem';
import * as firebase from 'firebase';
import '@firebase/firestore';


export default class TodosContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos : [
        { _id : '1' , completed : false,  title : "exercise @ 7.00" },
        { _id : '2' , completed : false,  title : "meeting @ 9.00"},
        { _id : '3' , completed : false,  title : "go to cinema @ 19.00"},
      ],
      user : null,
    };
    //LOAD TO STATE
    this._retrieveData();

    /*
    //LOAD FROM FIREBASE    
    var db = firebase.firestore();
    db.collection("todos")
      .where("user_id", "==", this.state.user ? this.state.user.uid : null)
      .onSnapshot((querySnapshot) => {
          //console.log("Query : " , querySnapshot.data());
          const data = querySnapshot.docs.map(doc => doc.data());
          console.log(data); // array of cities objects
          this.setState({"todos":data});
          //SAVE TO LOCAL STORAGE
          this._storeData();          
    });
    */
    this._retrieveDataFromDatabase();

  }

  onCreate = () => {
    let newData = {
        _id : '_' + Math.random().toString(36).substr(2, 9), //RANDOM NUMBER
        title : "", //Empty String
        completed : false, 
        user_id : this.state.user.uid, 
    };
    let todos = this.state.todos;
    todos.push(newData);

    //SAVE TO STATE
    this.setState({'todos': todos});
    console.log(this.state.todos);

    //SAVE TO LOCAL STORAGE
    this._storeData();

    //SAVE TO FIREBASE
    var db = firebase.firestore();
    db.collection("todos").doc(newData._id).set(newData)
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

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
    //SAVE TO FIREBASE
    var db = firebase.firestore();
    db.collection("todos").doc(todos[objIndex]._id).set(todos[objIndex])
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  };

  onDelete = (_id) => {
    let todos = this.state.todos; 
    objIndex = todos.findIndex((obj => obj._id == _id));
    todos.splice(objIndex, 1); 
    this.setState({'todos': todos});
    //SAVE TO LOCAL STORAGE
    this._storeData();
    //SAVE TO FIREBASE
    var db = firebase.firestore();
    db.collection("todos").doc(_id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

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
    //SAVE TO LOCAL STORAGE
    this._storeData();
    //SAVE TO FIREBASE
    var db = firebase.firestore();
    db.collection("todos").doc(todos[objIndex]._id).set(todos[objIndex])
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

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
      //TODOS
      const value = await AsyncStorage.getItem('todos');
      if (value !== null) {
        // We have data!!
        console.log(value);
        var todos = JSON.parse(value);
        this.setState({'todos' : todos})
      }
      //USER
      const value2 = await AsyncStorage.getItem('user');
      if (value2 !== null) {
        // We have data!!
        console.log(value2);
        var user = JSON.parse(value2);
        this.setState({'user' : user})
      }
      
      console.log("User : ", this.state);
    } catch (error) {
      // Error retrieving data
    }
  };

  _retrieveDataFromDatabase = async () => {
    try {
      //TODOS
      const value = await AsyncStorage.getItem('todos');
      if (value !== null) {
        // We have data!!
        console.log(value);
        var todos = JSON.parse(value);
        this.setState({'todos' : todos})
      }
      //USER
      const value2 = await AsyncStorage.getItem('user');
      if (value2 !== null) {
        // We have data!!
        console.log(value2);
        var user = JSON.parse(value2);
        this.setState({'user' : user})
      }
      
      console.log("User : ", this.state);
      //LOAD FROM FIREBASE    
      var db = firebase.firestore();
      db.collection("todos")
        .where("user_id", "==", this.state.user ? this.state.user.uid : null)
        .onSnapshot((querySnapshot) => {
            //console.log("Query : " , querySnapshot.data());
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data); // array of cities objects
            this.setState({"todos":data});
            //SAVE TO LOCAL STORAGE
            this._storeData();            
      });
    } catch (error) {
      // Error retrieving data
    }
  };

  /*storeHighScore(userId, score) {
    firebase.database().ref('users/' + userId).set({
      highscore: score
    });
  }

  setupHighscoreListener(userId) {
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }*/

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