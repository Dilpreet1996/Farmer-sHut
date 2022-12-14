import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
function SeachInput() {
  return (
    <View style={styles.root}>
        <View style={styles.searchInputArea}>
            <View style={{justifyContent:'center',marginLeft:5}}>
              <Ionicons name="search" style={{fontSize:30}}/>
            </View>
            <View style={{justifyContent:'center',marginLeft:10}}>
                <TextInput
                placeholder="Search here...."
                />
            </View>
        </View>
    </View>
  )
}

export default SeachInput
const styles = StyleSheet.create({
    root:{
        justifyContent:'center',
        alignItems: 'center'
    },
    searchInputArea:{
       backgroundColor:'white',
       width:'80%',
       height:'80%',
       borderRadius: 5,
       flexDirection:'row',
       marginTop:5
    }
})