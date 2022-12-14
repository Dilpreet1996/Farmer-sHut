import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert} from 'react-native'
import ButtonCustom from '../../Components/ButtonCustom'
import TextInputCustom from '../../Components/TextInputCustom'

function Verification({navigation,route}) {
    const [OTP,setOTP] = useState(null)
    const otp = route.params.OTP;
    const email = route.params.email;
    const mobileNumber = route.params.mobileNumber;
  
    const otpHandler=(data)=>{
        setOTP(data)
    }
  
    const verifyHandler=()=>{
       if(otp == OTP){
        if(email){
          navigation.navigate('passwordUpdater',{
            email:email,
          })
        }
        if(mobileNumber){
          navigation.navigate('passwordUpdater',{
            mobileNumber:mobileNumber,
          })
        }
          
       }else{
        Alert.alert('Invalid OTP')
       }
    }
  return (
    <View style={styles.container}>
        <Text style={{fontSize:25,fontWeight:'bold'}}>Verification</Text>
        <View style={styles.title}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Enter verification code</Text>
        </View>
        <View style={styles.form}>
          <TextInputCustom 
           placeholder="enter code here...."
           onChangeText={txt=>otpHandler(txt)}
           keyboardType="numeric"
           value={OTP}
          />
        </View>
        <View style={styles.form}>
            <ButtonCustom onPress={verifyHandler}>Verify</ButtonCustom>
        </View>
    </View>
  )
}

export default Verification
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop:'40%'
    },
    title:{
            marginTop:'10%'
    },
    form:{
        width:'90%',
        marginTop:20
    }
})