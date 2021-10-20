import React from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'

export const Item = (props) => {

  const Buttons = (props) => {
    if( props.status ){
      return (
        <TouchableOpacity onPress={ () => props.delete(props.id) } >
          <Image source={ require('../assets/trash-alt-regular.png') } style={styles.icon} />
        </TouchableOpacity>
      )
    }
    else {
      return ( 
        <TouchableOpacity onPress={ () => props.done(props.id) } >
          <Image source={ require('../assets/check-circle-regular.png') } style={styles.icon} />
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={(props.status) ? styles.textDone : styles.text}>{props.text}</Text>
      <Buttons status={props.status} done={ props.done } delete={props.delete} id={props.id} />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'lightgreen',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    color: "black",
  },
  textDone: {
    flex: 1,
    textDecorationLine: "line-through",
    color: "gray"
  },
  icon: {
    width: 30,
    height: 30,
  },
})