import React, { useLayoutEffect, useState,useRef, useCallback} from 'react'
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View,ToastAndroid,Modal,Pressable, TextInput, RefreshControl, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import InventoryCard from '../../Componenets/InventoryCard';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useLogin } from '../../Context/LoginProvider'
import { Network } from '../../Network/IPaddress'
import TextInputFarmerProfile from '../../Componenets/TextInputFarmerProfile';
import PrimaryButton from '../../Componenets/PrimaryButton';
function InventoryManagement({navigation}) {
  const [isLoading,setLoading] = useState(true)
  const [products,setProducts] = useState(null)
  const [value,setValue] = useState(0)
  const [index,setIndex] = useState(null)
  const  [refresh,setRefresh] = useState(false)
  const sheetRef = useRef(null);
  const snapPoints = ["15%"];
  const [ide,setID] = useState(null)
    const {id} = useLogin()
    var json = ''
    useLayoutEffect(()=>{
      navigation.addListener('focus',async()=>{
       const fetchProducts=async()=>{
         const response = await fetch(Network.info.IP+"/api/products/"+id,{
          method: 'GET',
         })
           json = await response.json()
           if(response.ok){
            setProducts(json)
            setLoading(false)
           }
        
          }
       fetchProducts()
      })
    },[])
    const handleSnapPress = ((index,id,quantity,indexOfListItem)=>{
      sheetRef.current?.snapToIndex(index);
      setID(id)
      setValue(quantity)
      setIndex(indexOfListItem)
    })

 
    const changeHandler=(txt)=>{
      setValue(txt)
    }
    const deleteHandler=async(id)=>{
      setID(id)
      const response = await fetch(Network.info.IP+"/api/products/delete",{
            method: "DELETE",
            body:JSON.stringify({id:id}),
            headers : {
              'Content-Type': 'application/json'
            }
          })
          const json = await response.json()
          ToastAndroid.show(json.mssg,ToastAndroid.SHORT)
          setProducts(products.filter(product =>product._id !== id))
          sheetRef.current?.close()
        setIndex(null)
    }
    
    const pullMe = ()=>{
      setRefresh(true)
      setTimeout(()=>{
        setRefresh(false)
      },0.1)
    }

    const pressHandler=async()=>{
   
      let targetQuantity = products[index]
       targetQuantity.itemQuantity = value
       products[index] = targetQuantity
    console.log(value)
       
          const response = await fetch(Network.info.IP+"/api/products/update",{
            method: 'PUT',
            body:JSON.stringify({id:ide,itemQuantity:value}),
            headers : {
              'Content-Type': 'application/json'
            }
          })
          const json = await response.json()
          ToastAndroid.show(json.mssg,ToastAndroid.SHORT)
          console.log(json.result)
          pullMe()
    }
  return (
   <>
   <View style={{flex:1}}>
    <View style={styles.rootTitle}>
          <Text style={styles.title}>Inventory</Text>
    </View>
    <View style={styles.list}>
      {
        isLoading ? <ActivityIndicator /> :  <FlatList 
        data = {products}
        extraData={products}
        keyExtractor={({_id})=>_id}
        refreshControl={
          <RefreshControl
           refreshing={refresh}
           onRefresh={()=>pullMe()}
          
          />
        }
        renderItem={({item,index})=>{
          return (
           <InventoryCard 
              itemType = {item.itemType}
              id={item._id}
              itemName={item.itemName}
              itemQuantity={item.itemQuantity}
              itemPrice={item.itemPrice}
              index={index+1}
              onPress={()=>handleSnapPress(0,item._id,item.itemQuantity,index)}
              />
          )
        }}
        
        />
    }
    </View>
    {
      ide && 
    <BottomSheet
        ref = {sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        >
         <BottomSheetView>
           <View style={{flexDirection:'row',marginTop:10,justifyContent: 'center'}}>
            <Pressable onPress={txt=>deleteHandler(ide)}>
              <View style={{marginTop:5,marginRight:30,flexDirection: 'row'}}>
                <Ionicons name="trash" style={{fontSize:40}}/>
                <View style={{marginTop:'35%'}}>
                  <Text>{index+1}</Text>
                </View>
              </View>
            </Pressable>
            
           <Pressable onPress={()=>setValue(Number(value) + 1)}>
               <Ionicons name="add-circle-outline" style={{fontSize:50,marginTop:5}}/>
           </Pressable>
           <View style={{width:'20%',height:60,marginLeft:10,marginRight:10}}>
            <TextInputFarmerProfile
              placeholder={value ? value.toString():'enter value'}
              keyboardType="numeric"
              borderColor="green"
              value={value}
              color="#000"
              onChangeText={txt=>changeHandler(txt)}
            /> 
           </View>
           <Pressable onPress={()=>setValue(value <= 0 ? 0 : value - 1)}>
             <Ionicons name="remove-circle-outline" style={{fontSize:50,marginTop:5}}/>
           </Pressable>
           <View style={{marginLeft:20,width:'20%'}}>
             <PrimaryButton onPress={pressHandler}>SET</PrimaryButton>
          </View>
           </View>
         </BottomSheetView>
  
        </BottomSheet>
   } 
    </View>
   
   </>
  )
}

export default InventoryManagement
const styles = StyleSheet.create({
  rootTitle:{
    flex:0.15,
    backgroundColor:'rgb(255,76,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize:30,
    marginTop:'5%',
    color:'white'
  },
  list:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  listItem: {
    marginTop:10,
    borderWidth: 2,
    borderColor: 'white'
  },
  selectedItem: {
    borderColor: 'blue',
  },
})
