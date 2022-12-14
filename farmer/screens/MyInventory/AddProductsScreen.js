import React, { useLayoutEffect,useEffect, useState } from 'react'
import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import PrimaryButton from '../../Componenets/PrimaryButton';
import TextInputCustomSignup from '../../Componenets/TextInputFarmerProfile'
import { useLogin } from '../../Context/LoginProvider';
import { Network } from '../../Network/IPaddress';
import { useNavigation } from '@react-navigation/native';
import DialogModel from '../../Componenets/DialogModel';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

function AddProductsScreen(props) {
  const navigation = useNavigation();
  var [image,setImage] = useState(null);
  const [dialog,setDialog] = useState(false);
  const [title,setTitle] = useState('Please Select the item from drop down')
  const [priceUnit,setPriceUnit] = useState('')
  const [quantity,setQuantity] = useState('')
  const [price,setPrice] = useState('')
  const [dropDownValue,setDropDownValue] = useState('')
  const [txtTitleColor,setTitleTextColor] = useState('black')
  const [txtQuantityColor,settxtQuantityColor] = useState('black')
  const [txtPriceColor,settxtPriceColor] = useState('black')
  const [borderColor,setBorderColor] = useState('green')
  const [symbol,setSymbol] = useState('image-sharp')
  const {id} = useLogin()

    useLayoutEffect(()=>{
      if(props.title == 'Milk'){
        setTitle('Select Milk fat: ')
        setPriceUnit('Enter price per Litre')
        
      }
      if(props.title == 'Eggs'){
        setTitle('Select Egg type: ')
        setPriceUnit('Enter price per piece')
        
      }
      if(props.title == 'Fruits' || props.title == 'Vegetables' || props.title == 'Grains')
      {
        setTitle(`Enter ${(props.title).slice(0,-1)} name: `)
        setPriceUnit('Enter price per lB: ')
      }
     
    })

    const openCamera = async()=>{
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      if(result){
        setDialog(false)
      }
      // Explore the result
      console.log(result);
  
      if (!result.cancelled) {
        setSymbol('')
        setImage(result.uri);
        setBorderColor('green')
        console.log(result.uri);
      }
  
    }
  
    const PickImage = async ()=>{
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.All,
        allowsEditing : true,
        aspect:[4,3],
        quality:1
      })
      if(result){
        setDialog(false)
      }
      if(!result.cancelled){
        console.log(result)
        setBorderColor('green')
        setSymbol('')
        setImage(result.uri)
      }
    }
 const dialogCloseHandler=()=>{
     
      setDialog(false)
     }

 const milk = [
  {fat:"2%"},
  {fat: "3%"}
 ]

 const eggs = [
  {type:"Brown"},
  {type:"White"}
 ]

 const selector=type=>{
    if(type == 'Milk'){
      return(
        <Dropdown 
        style={styles.txtDropdown}
        data={milk}
        labelField="fat"
        valueField='fat'
        onChange={item=>{
          setDropDownValue(item.fat)
        }}
        value={dropDownValue}
      />
      )
    }
    else if(type == 'Eggs'){
      return(
        <Dropdown
         style={styles.txtDropdown}
         data={eggs}
         labelField="type"
         valueField="type"
         onChange={item=>{
          setDropDownValue(item.type)
         }}
         value={dropDownValue}
        />
       )
    }
    else if(type == 'Fruits' || type == 'Vegetables' || type == 'Grains'){
      return(
       <View style={{width:'40%',marginRight:10}}>
          <TextInputCustomSignup 
          placeholder="Enter item name"
          onChangeText={txt=>setDropDownValue(txt)}
          value={dropDownValue}
          />
        </View>
      )
    }
  }
 const qualityHandler=(txt)=>{
    setQuantity(txt)
 }
 const priceHandler=(txt)=>{
  setPrice(txt)
 }
 const pressHandler=async()=>{
  if(dropDownValue == ''){
    setTitleTextColor('red')
  }else{
    setTitleTextColor('black')
  }
  if(price == ''){
    settxtPriceColor('red')
  }else{
    settxtPriceColor('black')
  }
  if(quantity == ''){
    settxtQuantityColor('red')
  }else{
    settxtQuantityColor('black')
  }
  if(image == null){
     setBorderColor('red')
  }
   
  if(dropDownValue != '' && price != '' && quantity != '' && image != null){
     const userID = id;
     const itemType = props.title;
     const itemName = dropDownValue;
     const itemQuantity = quantity;
     const itemPrice = price
     const productData = {userID,itemType,itemName,itemQuantity,itemPrice}
     const response = await fetch(Network.info.IP+"/api/products/",{
      method:'POST',
      body:JSON.stringify(productData),
      headers : {
        'Content-Type': 'application/json'
      }
     })

     const json = await response.json()
     ToastAndroid.show(json.mssg,ToastAndroid.SHORT);
     navigation.navigate('InventoryManagement')

     
  const formData = new FormData();
  formData.append("image",{
    name: json.result+"_productImage.jpg",
    uri:image,
    type:'image/jpg'
  })
  let res = await fetch(Network.info.IP+'/api/productImage/upload',{
    method: 'POST',
    body:formData,
     headers:{
       'Content-Type': 'multipart/form-data'
     }
  });
  let jsonImage = await res.json();
   setDropDownValue('')
     
  }

 


 }
  return (
   <ScrollView>
    <View style={{marginTop:30}}>
      <View style={styles.form}>
        <View style={{marginRight:'7%'}}>
           <Text style={{fontSize:17,color:txtTitleColor}}>{title}</Text>
        </View> 
        {
          selector(props.title)
        }
      </View>
      <View style={styles.form}>
           <Text style={[{fontSize:17},{color:txtQuantityColor}]}>Enter Quantity: </Text>
           <View style={styles.inputBtn}>
              <TextInputCustomSignup 
                placeholder="Enter Quantity: "
                keyboardType="numeric"
                onChangeText={txt=>qualityHandler(txt)}
                value={quantity}
              />
          </View>
     </View>
     <View style={styles.form}>
           <Text style={[{fontSize:17},{color:txtPriceColor}]}>Enter Price:       </Text>
           <View style={styles.inputBtn}>
              <TextInputCustomSignup 
                placeholder={priceUnit}
                keyboardType="numeric"
                onChangeText={txt=>priceHandler(txt)}
                value={price}
              />
          </View>
     </View>
      
     <Pressable onPress={()=>setDialog(true)}>
       
       <View style={{alignItems: 'center'}}>
       <ImageBackground
         style={[styles.imageView,{borderColor:borderColor}]}
         source={{uri: image}}>
           <Ionicons name={symbol} style={{fontSize:100}}/>
         </ImageBackground>
   
          <DialogModel 
             title="Select an Action" 
             description="Do you want to select Camera or Gallery"
             camera="Camera"
             gallery="Gallery"
             bool={dialog}
             onPressCamera={openCamera}
             onPressGallery={PickImage}
             close="Close"
             onClose={dialogCloseHandler}
          />
       </View>
     </Pressable>
     <View>
         <PrimaryButton onPress={pressHandler}>Add</PrimaryButton>
        </View>
     </View>
   </ScrollView>
  )
}

export default AddProductsScreen
const styles=StyleSheet.create({
  form:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  dropdown:{
    justifyContent: 'flex-end',
    marginLeft:'auto',
    marginRight:20,
    width:'40%',
    
   },
   txtDropdown:{
    width:'50%',
    height: 50,
    backgroundColor: 'white',
    color:'black',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
   },
   inputBtn:{
    width:'60%',
    justifyContent: 'flex-end',
   },
   imageView:{
    marginTop:'5%',
    width: 380,
    height: 180,
    borderRadius: 50 / 2,
    borderWidth:4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden'
  },
})