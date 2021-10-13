import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { Item } from './components/Item'


export default function App() {

  const [ data, setData ] = useState([])
  const [ validInput, setValidInput ] = useState(false)
  const [ input, setInput ] = useState()

  const onTextChange = (value) => {
    setInput( value )
    if( value.length >= 3 ) 
    { 
      setValidInput(true)
    }
    else
    {
      setValidInput(false)
    }
  }

  const onSubmit = ( event ) => {
    const id = new Date().getTime().toString()
    const item = { id: id, name: input }
    setData([...data, item ])
    setInput(null)
    storeData()
  }

  const onDelete = (id) => {
    let items = [...data]
    let newData = items.filter( (item) => {
      if( item.id !== id ) {
        return item
      }
    })
    setData( newData )
    storeData()
  }

  const storeData = async () => {
    const stringified = JSON.stringify( data )
    try {
      await AsyncStorage.setItem( "listData" , stringified ) 
    } catch (error) {
      console.log( error )
    }
  }

  const getData = async () => {
    try {
      const stringified = await AsyncStorage.getItem("listData")
      console.log( stringified )
      setData( (stringified !== null) ? JSON.parse(stringified) : [] )
    } catch (error) {
      console.log( error )
    }
  }

  useEffect( () => {
    if( !data ) {
      getData()
    }
  }, [data])

  const Renderer = ({ item }) => (<Item text={item.name} delete={onDelete} id={item.id} />)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.input} 
          onChangeText={ onTextChange } 
          placeholder="min 3 characters" 
          value={input}
        />
        <TouchableOpacity 
          style={ (validInput) ? styles.button : styles.buttonDisabled } 
          disabled={ (validInput) ? false : true }
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>Add to list</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={data} keyExtractor={(item) => item.id} renderItem={Renderer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  button: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: "lightgray"
  },
});
