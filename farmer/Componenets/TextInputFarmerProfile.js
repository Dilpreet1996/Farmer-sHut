import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
function TextInputFarmerProfile(props) {
  return (
  <View style={[styles.container,{borderColor:props.borderColor}]}>
    <View style={styles.icon}>
       <Ionicons name={props.icon} style={{fontSize:30}}/>
    </View>
      <View style={styles.input}>
      <TextInput style={styles.btn}
          value={props.value}
          placeholderTextColor={props.color} 
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          keyboardType={props.keyboardType}
          editable={props.editable}

      />
      </View>
 </View>
)
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    borderWidth: 1,
    marginTop:5,
    borderRadius:100/10
  },
  input:{
  
      width: '100%',
      padding: 15,
   
  },
  icon:{
    alignItems:'center',
    justifyContent: 'center',
    marginLeft:10
  }
})

export default TextInputFarmerProfile