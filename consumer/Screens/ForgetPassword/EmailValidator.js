import React, { useState } from 'react'
import { View ,Text, StyleSheet, Pressable, ScrollView, Alert} from 'react-native'
import ButtonCustom from '../../Components/ButtonCustom'
import TextInputCustom from '../../Components/TextInputCustom'
import { Network } from '../../Network/IPaddress';
import { generateOTP } from '../../OTP/Otp'

function EmailValidator({navigation}) {
  const [eorn,setEorN] = useState(null)
  const emailOrNumberHandler=(data)=>{
      setEorN(data)
  }


    const backToSignIn=()=>{
        navigation.navigate('Login')
    }
    const signup=()=>{
        navigation.navigate('Signup')
    }
  
    const emailOTP=async(email)=>{
      email = email.toLowerCase()
      const EmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      if(EmailRegex.exec(email)){
          const customerEmail = {email}
          const response = await fetch(Network.info.IP+'/api/customerRoutes/emailAndNumber',{
           method: 'POST',
           body: JSON.stringify(customerEmail),
           headers : {
             'Content-Type': 'application/json'
           }
          })
          const status = await response.json()
          console.log(status)
          if(status.status == 'proced'){
             //Email
             var otp = generateOTP();
             var to = email
             var subject="Reset Password Request"
             var body=`Please do not share OTP with anyone\n OTP is ${otp}`
             const emailData = {to,subject,body}
             const res = await fetch(Network.info.IP+'/api/eMail/txt-mail',{
             method:'POST',
             body: JSON.stringify(emailData),
             headers : {
                 'Content-Type': 'application/json'
             }
             })
             const mailJson = await res.json()
             console.log(mailJson)
             navigation.navigate('verification',{
                 OTP:otp,
                 email: email
             });
          }else{
            Alert.alert('Please enter registered e-mail')
          }
      }
      else
      {
          Alert.alert('Please enter a valid email address')
      }
    }
    const mobileOTP = async(mobileNumber)=>{
      const customerMobile = {mobileNumber}
      const response = await fetch(Network.info.IP+'/api/customerRoutes/emailAndNumber',{
        method: 'POST',
        body: JSON.stringify(customerMobile),
        headers : {
          'Content-Type': 'application/json'
        }
       })
       const status = await response.json()
       console.log("mitti"+status.status)
       if(status.status == 'proced'){
        var otp = generateOTP();
        var to = mobileNumber
        var body = `Please do not share OTP with anyone\n OTP is ${otp}`

        const mobileData = {to,body}
          await fetch(Network.info.IP+'/api/messageToNumber/txt-mobile',{
          method: 'POST',
          body: JSON.stringify(mobileData),
          headers : {
            'Content-Type': 'application/json'
          }
        })
        if(status.status == 'proced'){
          navigation.navigate('verification',{
            OTP:otp,
            mobileNumber: mobileNumber
        });
        }

       }
       else{
        Alert.alert('Please enter registered mobile number')
       }
    }

   const send=async()=>{
      console.log(eorn)
      if(eorn === ''){
        Alert.alert('Please enter the email or phone number')
      }
      else{
        var email='';
        var mobileNumber=null;
        var loginData = null;
        if(isNaN(eorn)){
           email = eorn.toLowerCase();
           loginData = {email}
        }else{
          mobileNumber=eorn
          loginData = {mobileNumber}
        }
      
        console.log(isNaN(eorn))
         
        console.log(loginData)
        if(loginData.email){
          const EmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
           if(EmailRegex.exec(email)){
            emailOTP(email)
           }
           else
           {
            Alert.alert(email+' is not valid email address')
           }
        }
        if(loginData.mobileNumber){
          if(mobileNumber.length != 10){
            Alert.alert('Please enter 10 digits Mobile Number')
          }
          else{
              mobileOTP(mobileNumber)
          }
        }

      }
     
      
       
    }
  return (
    <ScrollView>
     <View style={styles.title}>
        <Text style={styles.txt}>Forget Password</Text>
            <View style={styles.form}>
                <View style={styles.mailTitle}>
                   <Text style={{fontSize:15,fontWeight:'bold'}}>Enter Email Address or Number</Text>
                </View>
                <TextInputCustom 
                  placeholder="enter mail or number"
                  onChangeText={txt=>emailOrNumberHandler(txt)}
                  value={eorn}
                />
                <Pressable onPress={backToSignIn}>
                    <View style={styles.form1}>
                        <Text style={{color:'#676767'}}>Back to sign in</Text>
                    </View>
                </Pressable>
                <View style={{marginTop:30}}>
                 <ButtonCustom onPress={send}>Send</ButtonCustom>
                </View>
                <View style={styles.form2}>
                  <Text style={{color:'#676767'}}>Don't have an account?</Text>
                </View>
                <View style={styles.btn}>
                  <ButtonCustom onPress={signup}>Sign up</ButtonCustom>
                </View>
            </View>
     </View>
    </ScrollView>
  )
}

export default EmailValidator
const styles = StyleSheet.create({
  title:{
    alignItems: 'center',
    marginTop:'30%'
  },
  txt:{
    fontSize:25,
    fontWeight:'bold',
  },
  form:{
    width:'90%',
    marginTop:'18%'
  },
  mailTitle:{
    alignItems: 'center',
  },
  form1:{
    alignItems: 'center',
    marginTop:10,
  },
  form2:{
    alignItems: 'center',
    marginTop:'10%',
  },
  btn:{
    marginTop:20
  }
})
