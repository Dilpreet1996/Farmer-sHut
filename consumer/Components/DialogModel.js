import React from 'react'
import Dialog from "react-native-dialog";
import {  View } from 'react-native';

function DialogModel(props) {
  return (
    <View>
    <Dialog.Container visible={props.bool}>
      
      <Dialog.Title>{props.title}</Dialog.Title>
      
      <Dialog.Description>
        {props.description}
      </Dialog.Description>
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'row'}}>
          <Dialog.Button label={props.camera} onPress={props.onPressCamera}/>
          <Dialog.Button label={props.gallery} onPress={props.onPressGallery}/>
        </View>
        <View style={{marginLeft:'30%'}}>
           <Dialog.Button label={props.close} onPress={props.onClose}/>
        </View>
      </View>
    </Dialog.Container>
  </View>
  )
}

export default DialogModel
