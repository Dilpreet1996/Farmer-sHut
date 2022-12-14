import React, { useLayoutEffect, useState } from 'react'
import { View,Text, Image, StyleSheet, Pressable } from 'react-native'
import {Card} from 'react-native-paper'
import { Network } from '../../Network/IPaddress'
function ItemCard(props) {
const [image,setImage] = useState(null)
useLayoutEffect(()=>{
  const fetchImages=async()=>{
    await setImage(Network.info.IP+"/api/productImage/productImage/"+props.id+"?"+new Date())
  }
  fetchImages()
},[])
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.root}>
        <Card style={{marginBottom:20, borderWidth:1}}>
        <Image
        style={styles.image}
        source={{uri:image}}
        />
        <View style={styles.data}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{props.type}</Text>
        </View>
        <View style={{flexDirection:'row',marginLeft:10,marginBottom:20}}>
          <Text>{props.name} |  </Text>
          <Text>$:-{props.price}</Text>
        </View>
        </Card>
      </View>
  </Pressable>
  )
}

export default ItemCard
const styles = StyleSheet.create({
  root:{
    flex:1,
   marginLeft:7,
   marginRight:7
  },
 image:{
  height:170,
  width:170,
  
 },
 data:{
  alignItems: 'center',
  marginTop:5
 }
})
