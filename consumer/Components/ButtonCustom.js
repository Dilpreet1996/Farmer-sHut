import React from 'react'
import {View,Text,StyleSheet,Pressable} from 'react-native'
function ButtonCustom({children,onPress}) {
    return (
        <View style={styles.buttonOuterContainer}>
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

export default ButtonCustom

const styles = StyleSheet.create({
    buttonOuterContainer:{
        width: '100%',
      
        borderRadius: 5,
      
    },
    buttonInnerContainer:{
      backgroundColor:'#6DB877',
      paddingVertical:8,
      paddingHorizontal:16,
      elevation:2,
    },
    buttonText:{
      color:'white',
      fontSize:18,
      textAlign:'center',
    },
    pressed:{
      opacity:0.75
    }
  })