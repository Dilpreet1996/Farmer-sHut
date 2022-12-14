import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

function TextInputCustom(props) {
  return (
            <View style={styles.input}>
            <TextInput 
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            />
            </View>
  )
}

export default TextInputCustom
const styles = StyleSheet.create({
    input:{
        backgroundColor: 'white',
        width: '100%',

        padding: 15,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    }
})