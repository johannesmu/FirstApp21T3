import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants'
import { Item } from './components/Item'


export default function App() {

  const [ data, setData ] = useState()

  const AppData = [
    { id: "1", name: "Apple" },
    { id: "2", name: "Orange" },
    { id: "3", name: "Banana" },
    { id: "4", name: "Blueberry" },
    { id: "5", name: "Tomato" },
  ]

  const Renderer = ({ item }) => (<Item text={item.name} />)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.input} />
        <TouchableOpacity style={styles.button}>
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
});
