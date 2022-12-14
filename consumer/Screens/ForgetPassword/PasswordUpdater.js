import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Network } from '../../Network/IPaddress'
import ButtonCustom from '../../Components/ButtonCustom'
import TextInputCustom from '../../Components/TextInputCustom'
function PasswordUpdater({navigation,route}) {
    const email = route.params.email;
    const mobileNumber = route.params.mobileNumber;

    const [password,setPassword] = useState(null)
    const [cpassword,csetPassword] = useState(null)

    const passwordHandler=(data)=>{
        setPassword(data)
    }

    const cpasswordHandler=(data)=>{
        csetPassword(data)
    }

    const submitHandler=async()=>{
        if(password == cpassword && password!=null){
         const response = await fetch(Network.info.IP+'/api/customerRoutes/passwordReset',{
            method: 'PUT',
            body : JSON.stringify({email:email, password:password,mobileNumber:mobileNumber}),
            headers : {
                'Content-Type': 'application/json'
              }
         })
         const json = await response.json()
         Alert.alert(json.mssg)
         navigation.navigate('Login')
        }
        else{
            Alert.alert('Password does not match')
        }
    }
  return (
    <>
   <View style={styles.container}>
       <Text style={{fontSize:25,fontWeight:'bold'}}>New Password</Text>
   </View>
   <View style={styles.form}>
       <Text style={{fontSize:20,fontWeight:'bold'}}>Enter New Password</Text>
       <View style={{marginTop:10}}>
            <TextInputCustom
                placeholder="enter password here...."
                onChangeText={txt=>passwordHandler(txt)}
                secureTextEntry={true}
            />
       </View>
       <Text style={{fontSize:20,fontWeight:'bold',marginTop:'7%'}}>Confirm Password</Text>
       <View style={{marginTop:10}}>
            <TextInputCustom
                placeholder="Re-enter password here...."
                onChangeText={txt=>cpasswordHandler(txt)}
                secureTextEntry={true}
            />
       </View>
        <View style={{marginTop:'5%'}}>
          <ButtonCustom onPress={submitHandler}>Submit</ButtonCustom>
        </View>
    </View>
   </>
  )
}

export default PasswordUpdater
const styles= StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop:'20%'
    },
    form:{
       padding:'10%',
       marginTop:'10%',
    }
})