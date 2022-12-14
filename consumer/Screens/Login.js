import React, { useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import ButtonCustom from '../Components/ButtonCustom'
import TextInputCustom from '../Components/TextInputCustom'
import { useLogin } from '../Context/LoginProvider'
import { Network } from '../Network/IPaddress'

function LogIn({navigation}) {
  const [eorn,setEorN] = useState(null)
  const [password,setPassword] = useState(null)


  const emailOrNumberHandler=(data)=>{
    setEorN(data)
   }
    const passwordHandler=(data)=>{
      setPassword(data)
    }
  const {setIsLoggedIn,setId} = useLogin()


   const signInHandler=async()=>{
       
    if(eorn == null && password == null){
      Alert.alert('Please enter the login Credientials')
    }
    else{
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
        console.log(loginCredientials)

        const response = await fetch(Network.info.IP+'/api/customerRoutes/loginValidator',{
          method:'POST',
          body: JSON.stringify(loginCredientials),
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

}




  const signUPHandler=()=>{
      navigation.navigate('Signup')
  }
  const EmailValidator=()=>{
      navigation.navigate('ForgetEmailValidation')
  }
  return (
    <ScrollView>
      <View style={styles.container}>
          <Image
          style={styles.logo}
          source={require('../images/logo.png')}
          />
    
        <View style={styles.form}>
          <TextInputCustom
              placeholder="E-mail or Mobile"
              onChangeText={txt=>emailOrNumberHandler(txt)}
          />
            <TextInputCustom
              placeholder="Password"
              onChangeText={txt=>passwordHandler(txt)}
              secureTextEntry={true}
          />
      
        </View>
        <View style={styles.btn}>
          <ButtonCustom onPress={signInHandler}>Sign In</ButtonCustom>
        </View>
        <View style={styles.txtForm}>
          <Pressable onPress={EmailValidator}>
            <View style={styles.txtInnerForm}>
              <Text style={styles.txt}>Forgot Password</Text>
            </View>
          </Pressable>
          <Pressable onPress={signUPHandler}>
              <View style={styles.txtInnerForm}>
                <Text style={styles.txt}>Don't have an account? Create one</Text>
              </View>
          </Pressable>
        </View>
        
      </View>
    </ScrollView>
  )
}

export default LogIn
const styles= StyleSheet.create({
   container:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:'30%'
    },
 logo:{
    height:200,
    width:200,
},
form:{
    marginTop:20,
    width:'90%',
},
btn:{
  width:'90%',
  marginTop:10
},
txtForm:{
    marginTop:10,
    alignItems: 'center'
   
},
txtInnerForm:{
    marginTop:5
},
txt:{
    fontWeight:'bold',
    color:'#948984',
}
})