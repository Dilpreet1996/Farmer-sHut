import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

function TextInputCustomSignup(props) {
  return (
    <View style={[styles.container]}>
        <Text style={styles.text}>{props.title}</Text>
        <TextInput 
         placeholder= {props.placeholder}
         style={[styles.numberInput,props.style]}
         secureTextEntry={props.secure}
         onChangeText={props.onChangeText}
         value={props.value}
         keyboardType={props.keyboardType}
        />
    </View>
  )
}

export default TextInputCustomSignup
const styles = StyleSheet.create({
    container:{
         alignItems: 'flex-start',
         marginBottom:10,
         marginLeft:'10%'
    },
    text:{
        fontSize:20,
        fontStyle:'italic',
        //color:'#4F4848',
       fontWeight:'bold',
      
    },
    numberInput:{
        width:'90%',
        fontSize:15,
        borderBottomColor:'#4F4848',
        borderBottomWidth:2,
        color:'#141313',
        textAlign:'left',
        tintColor:'#FFFFFF',
      
    },
})