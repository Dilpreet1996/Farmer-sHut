import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Alert, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import PrimaryButton from '../Componenets/PrimaryButton'
import TextInputCustomSignup from '../Componenets/TextInputCustomSignup'
import { useLogin } from '../Context/LoginProvider'
import { Network } from '../Network/IPaddress'
import Welcome from '../UI/Welcome'

function Login({navigation}) {
 const [eorn,setEorN] = useState(null)
 const [password,setPassword] = useState('')

 const emailOrNumberHandler=(data)=>{
    setEorN(data)
 }
const passwordHandler=(data)=>{
  setPassword(data)
}

  const {setIsLoggedIn,setId} = useLogin()
  const login=async()=>{
    
      var email='';
      var mobileNumber=null;
     var loginCredientials = null;
      if(isNaN(eorn)){
         email=eorn
         email = email.toLowerCase();
         loginCredientials = {email,password}
      }else{
        mobileNumber=eorn
        loginCredientials = {mobileNumber,password}
      }
    
      console.log(isNaN(eorn))
       
      console.log(loginCredientials)
       const response = await fetch(Network.info.IP+'/api/farmerSignup/LogInValidator',{
        method : 'POST',
        body : JSON.stringify(loginCredientials),
        headers : {
          'Content-Type': 'application/json'
        }
       })
       const json = await response.json()
        if(json.id){
          setId(json.id)
          setIsLoggedIn(true)
        }else{
          Alert.alert('Invalid login Credientials')
        }

  }
  return (
    <LinearGradient
    colors={['yellow','green']}
    style={styles.container}
    >
    
     <ImageBackground
       source={require('../images/img.png')}
       resizeMode="cover"
       style={styles.container}
       imageStyle={styles.backgroundImage}
     >
    
    <Welcome />

      <View style={styles.one}>
          <TextInputCustomSignup
            title="Email or number: "
            placeholder='dsingh6567@conestogac.on.ca'
            onChangeText={txt=>emailOrNumberHandler(txt)}
            value={eorn}
          />

          <TextInputCustomSignup 
            title="Password: "
            placeholder='enter password'
            secure={true}
            onChangeText={txt=>passwordHandler(txt)}
            value={password}

          />
          
        <View style={styles.btn}>
         <PrimaryButton onPress={login}>Log in</PrimaryButton>
         </View>
        <Pressable onPress={()=>navigation.navigate('ResetPassword')}>
          <View style={styles.passwordContainer}>
            <Text style={styles.txt}>Forget Password</Text>
          </View>
        </Pressable>
        <View style={styles.registerContainer}>
          <Pressable onPress={()=>navigation.navigate('signup')}>
             <Text style={styles.txt}>Not a member? Register now</Text>
           </Pressable>
        </View>
      </View>
        </ImageBackground>
    </LinearGradient>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    backgroundImage: {
      opacity: 0.17
    },
    one:{
      flex:3
    },
    passwordContainer:{
      alignItems:'center',
      marginTop:20
    },
    registerContainer:{
      alignItems:'center',
      marginTop:10
    },
    txt:{
      fontSize:15,
      color:'blue'
    },
    btn:{
      marginLeft:'10%',
      marginRight:'10%'
    }
  
   
})