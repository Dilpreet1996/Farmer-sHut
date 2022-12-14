import React, { useState, useLayoutEffect } from 'react'
import { Alert, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import { Network } from '../../Network/IPaddress';

function CarouselData(props) {
 const width = Dimensions.get('window').width
 const carouselHandler=(index)=>{
    console.log(index)
 }
  return (
      <Carousel
       loop
       width={width}
       height={width / 2}
       autoPlay={true}
       data={props.data}
       scrollAnimationDuration={5000}
       renderItem={({item})=>(
        <TouchableOpacity
           onPress={()=>carouselHandler(item._id)}
            style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
            }}>
            <ImageBackground
            style={styles.imageView}
            source={{uri:Network.info.IP+"/api/productImage/productImage/"+item._id+"?"+new Date()}}
            >
                <View style={styles.data}>
                   <Text style={styles.details}>{item.itemType}|{item.itemName}|${item.itemPrice}</Text>
                </View>
            </ImageBackground>
    
        </TouchableOpacity>
       )}
      />
  )
}

export default CarouselData
const styles = StyleSheet.create({
    imageView:{
        width: "100%",
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden',
      },
      data:{
        backgroundColor:'#171616',
        opacity:0.6,
        width: "100%",
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
      },
      details:{
        color:'white',
        fontSize:30,
      }
})