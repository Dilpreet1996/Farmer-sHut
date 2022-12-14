import React from 'react'
import {View,Text,StyleSheet,Pressable} from 'react-native'

const PrimaryButton=({children,onPress})=> {

  return (
      <View style={[styles.buttonOuterContainer]}>
        <Pressable
          style={({pressed})=>
          pressed
          ? [styles.buttonInnerContainer,styles.pressed]
          : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{color:'#640233'}}
        >
            <Text 
              style={styles.buttonText}
            >{children}</Text>
        </Pressable> 
      </View>
  )
}

const styles = StyleSheet.create({
  buttonOuterContainer:{
    borderRadius:28,
    margin:4,
    backgroundColor:'#F24E1E',
    overflow: 'hidden',
    marginTop:20,
    
  },
  buttonInnerContainer:{
    backgroundColor:'#0099ff',
    paddingVertical:8,
    paddingHorizontal:16,
    elevation:2,
  },
  buttonText:{
    color:'white',
    textAlign:'center',
  },
  pressed:{
    opacity:0.75
  }
})

export default PrimaryButton