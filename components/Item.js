import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
export const Item = (props) => {
  
  return(
    <View style={styles.container}>
      <Text style={styles.text }>{props.text}</Text>
      <Button title="delete" onPress={ () => props.delete( props.id ) } />
      <Button title="done"  />
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
  },
})