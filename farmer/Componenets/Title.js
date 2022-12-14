import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Title(props) {
  return (
   <View style={styles.container}>
      <Text style={styles.innerText}>{props.title}</Text>
   </View>
  )
}

export default Title
const styles = StyleSheet.create({
    container:{
     alignItems:'center',
     marginTop:'15%',
     marginRight:'25%'
    },
    innerText:{
        fontWeight:'bold',
        fontSize:30,
        color:'white'
    }

})
