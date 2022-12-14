import React, {useLayoutEffect, useState,useRef } from 'react'
import { View,Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, ImageBackground, Pressable, Alert, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons';
import SeachInput from '../Components/HomePage/SeachInput'
import CarouselData from '../Components/HomePage/CarouselData'
import { useLogin } from '../Context/LoginProvider'
import { Network } from '../Network/IPaddress'
import ItemCard from '../Components/HomePage/ItemCard'
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from '@react-navigation/native';
function HomeScreen() {
  const navigation = useNavigation();
   const {id} = useLogin();
   const [products,setProducts] = useState([]);
   const [sortedProductsByCreatedAt,setSortedProductsByCreatedAt] = useState([]);
   const [isLoading,setLoading] = useState(true);
   const [type,setType] = useState()
   const [ide,setIde] = useState();
   const [address,setAddress] = useState();
   const [price,setPrice] = useState();
   const [name,setName] = useState();
   var [quantityCounter,setQuantityCounter] = useState(0);
   const [productQuantity,setProductQuantity] = useState(null);
   const sheetRef = useRef(null);
   const snapPoints= ["70%"];
   useLayoutEffect(()=>{
    navigation.addListener('focus',async()=>{
      const fetchProducts=async()=>{
        const response = await fetch(Network.info.IP+'/api/customerRoutes/getSingleConsumer',{
         method: 'POST',
         body : JSON.stringify({id:id}),
         headers : {
           'Content-Type': 'application/json'
         }
        })
        const jsonAddress = await response.json()
        setAddress(jsonAddress.address ? jsonAddress.address : null);
        const responseForProducts = await fetch(Network.info.IP+'/api/products/getProductsForConsumers',{
         method: 'POST',
         body : jsonAddress.address ? JSON.stringify({address:jsonAddress.address}) : JSON.stringify({address:null}),
         headers:{
           'Content-Type': 'application/json'
         }
        })
        const jsonProducts = await responseForProducts.json()
        setProducts(jsonProducts)
        const a = jsonProducts.sort((a,b)=>(a.itemPrice < b.itemPrice) ? -1 : 1)
        setSortedProductsByCreatedAt(a);
        setLoading(false)
        
     }
     fetchProducts()
    })
   },[])

   const pressHandler=(index,id,type,price,name,product_quantity)=>{
    sheetRef.current?.snapToIndex(index);
    setIde(id);
    setType(type);
    setPrice(price);
    setName(name);
    setProductQuantity(product_quantity);
   }

    const BottomStyleViewMethod = ()=>{
    if(address == null){
      return(
        <BottomSheetView>
          <View style={{justifyContent: 'center',alignItems: 'center',marginTop:'50%'}}>
              <Text style={{fontSize:20}}>Please add the <Text onPress={()=>navigation.navigate('ProfilePage')} style={{color:'red',textDecorationLine: 'underline',fontWeight:'bold',fontStyle:'italic'}}>address</Text> before adding products to the cart.</Text>
           </View>
      </BottomSheetView>
      )
    }else{
      return(
        <BottomSheetView>
           <View>
              <View style={{alignItems: 'center',marginTop:'15%'}}>
                <Image
                  style={styles.image}
                  source={{uri:Network.info.IP+"/api/productImage/productImage/"+ide+"?"+new Date()}}
                />
              </View>
              <View style={{alignItems:'center'}}>
                 <Text style={{fontSize:30,fontWeight:'bold',fontStyle:'italic', marginTop:10}}>{type}</Text>
                 <Text style={{fontSize:20,fontWeight:'bold',fontStyle:'italic', marginTop:5}}>{name}</Text>
                 <Text style={{fontSize:25,fontWeight:'bold',fontStyle:'italic', marginTop:5,color:'green'}}>${price} CAD</Text>
              </View>
              <View style={{justifyContent:'center', flexDirection:'row', marginTop:5}}>
                <Pressable onPress={()=>quantityCounter <= productQuantity ? setQuantityCounter(1 + quantityCounter) : setQuantityCounter(quantityCounter)}>
                 <Ionicons name="add-circle-outline" style={{fontSize:45}}/>
                </Pressable>
                  <Text style={{fontSize:30, marginLeft:10,marginRight:10}}>{quantityCounter}</Text>
               <Pressable onPress={()=>quantityCounter == 0 ? 0: setQuantityCounter(quantityCounter - 1)}>
                <Ionicons name="remove-circle-outline" style={{fontSize:45}}/>
              </Pressable>
              </View>
           </View>
      </BottomSheetView>
      )
    }
   }
 
  return (
    <View style={styles.root}>
    
      <LinearGradient
       colors={['#85D9E3','#A5E6CE']}
       style={styles.header}
       start={{x:0.10,y:0.20}}
      >
        <SeachInput />
      </LinearGradient>
      <CarouselData 
          data={sortedProductsByCreatedAt}
        />
        <View style={{alignItems:'center',padding:5}}>
          <Text style={{fontSize:25,fontWeight:'bold',fontStyle:'italic'}}>Organic Products</Text>
        </View>
      
      <View style={styles.list}>
        {
          isLoading ? <ActivityIndicator/> : <FlatList
          data={products}
          keyExtractor={({_id})=>_id}
          numColumns={2}
          renderItem={({item,index})=>{
            return (
              <ItemCard
              id={item._id}
              name={item.itemName}
              type={item.itemType}
              price={item.itemPrice}
              onPress={()=>pressHandler(0,item._id,item.itemType,item.itemPrice,item.itemName,item.itemQuantity)}
              />
            )
          }}
          />
        }
      </View>
        {
          ide && <BottomSheet
              ref = {sheetRef}
              snapPoints={snapPoints}
              enablePanDownToClose={true}>
                
                {
                  BottomStyleViewMethod()
                }  
          </BottomSheet>
        }
   
    
    </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
    root:{
        flex:1
    },
    header:{
        height:70,
         backgroundColor:'green'
    },
    list:{
      flex:1,
      marginTop:10,
      alignItems: 'center'
    },
    image:{
      height:200,
      width:200,
      borderWidth:4,
      borderRadius: 70 / 2,
    },
})