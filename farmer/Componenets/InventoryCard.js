import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { Card,Title } from 'react-native-paper';
import { Network } from '../Network/IPaddress';
function InventoryCard(props) {
  const [image,setImage] = useState(null)

  useLayoutEffect(()=>{
    const fetchImage=async()=>{
      await setImage(Network.info.IP+"/api/productImage/productImage/"+props.id+"?"+new Date())
    }
    fetchImage()
  },[])
  return (
  <Pressable onPress={props.onPress}>
    <Card style={[styles.root]}>
        <View style={styles.header}>
           <Text style={styles.title}>{props.itemType}</Text>
        </View>
        <View style={styles.body}>
          <ImageBackground
           style={styles.imageView}
           source={{uri: image}}
          />
           <View style={styles.data}>
              <Text style={{fontSize:20}}>Name :-   <Text style={{fontSize:20,fontWeight:'bold'}}>{props.itemName}</Text></Text>
              <View style={{marginTop:10}}>
              <Text style={{fontSize:20}}>Unit:- <Text style={{fontSize:20,fontWeight:'bold'}}>{props.itemQuantity}</Text> | <Text style={{fontSize:20,fontWeight:'bold'}}>${props.itemPrice}</Text></Text>
              <Text style={{fontSize:20}}>Index:-  <Text style={{fontSize:20,fontWeight:'bold'}}>{props.index}</Text></Text>
              </View>
           </View>
        </View>
    </Card>
  </Pressable>    
)
}

export default InventoryCard
const styles = StyleSheet.create({
  root:{
  marginTop:10,
   width:'100%',
  },
  title:{
    fontSize:25,
    fontWeight:'bold',
    fontStyle:'italic'
  },
  header:{
    alignItems: 'center'
  },
  body:{
    flexDirection:'row',
  },
  data:{
    marginTop:'10%',
    marginLeft:'7%'
  },
  imageView:{
    marginTop:10,
    width: 150,
    height: 150,
    borderColor: 'green',
    borderRadius: 70 / 2,
    borderWidth:4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden'
  },
 
})