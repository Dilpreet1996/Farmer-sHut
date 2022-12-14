import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, Button, TouchableOpacity, Alert, ScrollView, ImageBackground} from 'react-native'
import { useLogin } from '../Context/LoginProvider'
import { Network } from '../Network/IPaddress'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path } from "react-native-svg";
import Ionicons from '@expo/vector-icons/Ionicons';
import DialogModel from '../Components/DialogModel';
import TextInputConsumerProfile from '../Components/TextInputConsumerProfile'
import PrimaryButton from '../Components/PrimaryButton'
function ProfilePage() {
  const navigation = useNavigation();
    var [image,setImage] = useState(null);
    const [dialog,setDialog] = useState(false);
    const [name,setName] = useState('')
    const [person,setPerson] = useState('person-outline')
    var [email,setEmail] = useState('')
    const [mobileNumber,setMobileNumber] = useState(null)
    const [location,setLocation] = useState('')
    const [editable,setEditable] = useState(false);
    const [mailBorderColor,setMailBorderColor] = useState('green')
    const [phoneBorderColor,setPhoneBorderColor] = useState('green')
    const {id} = useLogin();


 useLayoutEffect(()=>{
    async function fetchData(){
        const response = await fetch(Network.info.IP+'/api/customerRoutes/getSingleConsumer',{
            method:'POST',
            body: JSON.stringify({id:id}),
            headers : {
                'Content-Type': 'application/json'
              }
        })
        const json = await response.json()
        console.log(json)
        setName(json.fname+' '+json.lname)
        setEmail(json.email)
        setMobileNumber(json.mobileNumber.toString())
        setLocation(json.address)
    }
    async function fetchProfileImage(){ 
      const response = await fetch(Network.info.IP+'/api/image/profileImage/'+id,{
       method: 'GET',
      })
      
      if(response.status == 200){
       setPerson('')
     
       setImage(Network.info.IP+'/api/image/profileImage/'+id+'?'+new Date())
      }
    
     }
    fetchData()
    fetchProfileImage()
 },[])


 const upadateData=async()=>{
  if(editable){
    try {
       if(image){
         const formData = new FormData();
         formData.append("image",{
           name: id+"_profile.jpg",
           uri:image,
           type:'image/jpg'
         })
        
        
   
         let res = await fetch(Network.info.IP+'/api/image/upload',{
           method: 'POST',
           body:formData,
            headers:{
              'Content-Type': 'multipart/form-data'
            }
         });
         let json = await res.json();
         console.log(json.file.path)
        }
        email = email.toLowerCase();
        const EmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
         if(!EmailRegex.exec(email)){
           setMailBorderColor('red')
         }
         if(mobileNumber.length != 10){
           setPhoneBorderColor('red')
         }
         

        if(EmailRegex.exec(email) && mobileNumber.length == 10){
         setMailBorderColor('green')
         setPhoneBorderColor('green')
         const response = await fetch(Network.info.IP+'/api/customerRoutes/updateConsumer',{
           method: 'PUT',
           body:JSON.stringify({id:id, email: email,mobileNumber: mobileNumber,address: location}),
           headers : {
             'Content-Type': 'application/json'
           }
         })
         const json = await response.json()
         Alert.alert(json.mssg)
         navigation.navigate('Home')
        }
       
     } catch (error) {
       console.log(error)
     }
     }else{
       setEditable(true)
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
    setPerson('')
    setImage(result.uri)
  }
}
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
    setPerson('')
    setImage(result.uri);
    console.log(result.uri);
  }

}
const dialogCloseHandler=()=>{
     
  setDialog(false)
 }
  return (
    <View style={styles.container}>
    <Svg
      height="100%"
      width="100%"
     
      style={{ position: 'absolute' }}>
           <Path
           fill="#CDE8CF"
           d="M0,288L30,266.7C60,245,120,203,180,165.3C240,128,300,96,360,106.7C420,117,480,171,540,208C600,245,660,267,720,250.7C780,235,840,181,900,149.3C960,117,1020,107,1080,106.7C1140,107,1200,117,1260,138.7C1320,160,1380,192,1410,208L1440,224L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
           stroke="green"
           />
     </Svg>  
       <View style={styles.title}>
           <Text style={styles.titleName}>{name}</Text>
       </View> 
   
       
       <Pressable onPress={()=>setDialog(true)}>
      
         <View>
         <ImageBackground
           style={styles.imageView}
           source={{uri: image}}>
             <Ionicons name={person} style={{fontSize:100}}/>
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
       <ScrollView style={styles.form}>
       <View>
          <TextInputConsumerProfile
             placeholder="Email Address: "
             icon="mail-outline"
             onChangeText={(txt)=>setEmail(txt)}
             value={email}
             borderColor={mailBorderColor}
             editable={editable}
             />
          <TextInputConsumerProfile
             placeholder="Phone Number: "
             icon="call-outline"
             keyboardType="numeric"
             onChangeText={(txt)=>setMobileNumber(txt)}
             value={mobileNumber}
             borderColor={phoneBorderColor}
             editable={editable}
             />
           <TextInputConsumerProfile 
             placeholder="Enter address  "
             icon="location-outline"
             onChangeText={(txt)=>setLocation(txt)}
             value={location}
             />
         </View>
         <View style={{marginTop:10}}>
            <PrimaryButton onPress={upadateData}>{editable?'Save':'Edit'}</PrimaryButton>
         </View>
       </ScrollView>
   </View>
  )
}

export default ProfilePage
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1, 
       
    },
    title:{
     marginTop:10
    },
    imageView:{
      marginTop:'5%',
      width: 200,
      height: 200,
      borderRadius: 200 / 2,
      borderColor: 'green',
      borderWidth:4,
      justifyContent: 'center',
      alignItems: 'center',
      overflow:'hidden'
    },
    titleName:{
      fontSize:25,
      fontWeight:'bold',
      fontStyle:'italic'
    },
    form:{
      width:'90%',
      marginTop:40
    },
  
})
