import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import PrimaryButton from '../Componenets/PrimaryButton'
import TextInputCustomSignup from '../Componenets/TextInputCustomSignup'

function OTPValidation({navigation,route}) {
    const otp = route.params.OTP
    const mail = route.params.email
    const mobileNumber = route.params.mobileNumber
    const [otpValue,setOtpValue] = useState('')
    const otpHandler=(otp)=>{
            setOtpValue(otp)
            console.log(otpValue)
    }
    const pressHandler=()=>{
        if(otp == otpValue){
            if(mail){
                navigation.navigate('rp',{
                    mail:mail
                 })
            }
            if(mobileNumber){
                navigation.navigate('rp',{
                    mobileNumber:mobileNumber
                 })
            }
           
        }
    }
  return (
    <>
        <View style={styles.root}>
            <Text style={styles.txt}>One Time Password </Text>
        </View>
        <View style={styles.form}>
        <TextInputCustomSignup
            title="OTP :"
            keyboardType="numeric"
            onChangeText={txt=>otpHandler(txt)}
            value={otpValue}

        />
        </View>
        <View style={styles.btn}>
          <PrimaryButton
          onPress={pressHandler}
          >Confirm</PrimaryButton>
        </View>
    </>
  )
}

export default OTPValidation
const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        marginTop:'70%',
    
    },
    txt:{
        fontWeight:'bold',
        fontStyle:'italic',
        fontSize:25,
    },
    form:{
        marginTop:30,
        marginLeft:'20%',
        marginRight:'20%'
    },
    btn:{
        marginLeft:'20%',
        marginRight:'20%'
    }
})
