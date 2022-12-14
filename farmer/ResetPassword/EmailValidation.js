import React, {  useState } from 'react'
import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import TextInputCustomSignup from '../Componenets/TextInputCustomSignup'
import { Network } from '../Network/IPaddress'
import { generateOTP } from '../OTP/Otp'





function EmailValidation({navigation}) {
  const [eorn,setEorN] = useState(null)
  const emailOrNumberHandler=(data)=>{
      setEorN(data)
  }

 const emailOTP=async(email)=>{
    const EmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if(EmailRegex.exec(email)){
        //POST REQUSET To Identify wheaher the mail is valid or not
            const farmerEmail = {email}
            console.log(farmerEmail)
            const response = await fetch(Network.info.IP+'/api/farmerSignup/resetPassword',{
              method : 'POST',
              body : JSON.stringify(farmerEmail),
              headers : {
                'Content-Type': 'application/json'
              }
             })
             const json = await response.json()
        
             console.log(json.mssg, json.status)

             //SEND POST OTP TO EMAIL
             if(json.status == "proceed")
             {
                    //Email
                    var otp = generateOTP()
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
                    navigation.navigate('otp',{
                        OTP:otp,
                        email: email
                    });
                  
                  }  
       }else{
        Alert.alert("Not a valid format")
    }
    
 }

 const mobileOTP=async(mobileNumber)=>{
    const farmerMobile = {mobileNumber}
    const response = await fetch(Network.info.IP+'/api/farmerSignup/resetPassword',{
      method: 'POST',
      body : JSON.stringify(farmerMobile),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
      if(json.status == 'proceed')
      {
        var otp = generateOTP()
        var to = mobileNumber
        var body = `Please do not share OTP with anyone\n OTP is ${otp}`
        const mobileData = {to,body};
        const res = await fetch(Network.info.IP+"/api/messageToNumber/txt-mobile",{
          method: 'POST',
          body : JSON.stringify(mobileData),
          headers : {
            'Content-Type': 'application/json'
          }
        })
        const mobileJson = res.json()
        console.log(mobileJson)
        navigation.navigate('otp',{
          OTP:otp,
          mobileNumber: mobileNumber
      });
      }
      else{
        Alert.alert('Please enter registered mail or mobile number')
      }
 }

 const formHandler=async()=>{
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
       if(mobileNumber.length == 10){
          mobileOTP(mobileNumber)
       }else{
        Alert.alert('Please enter a 10 digits mobile number')
       }
    }

      
    
   }
  return (
   <View style={styles.root}>
        <View style={styles.container}>
            <Text style={styles.txt}>Reset Password</Text>
        </View>
    
        <View style={styles.container1}>
         
            <TextInputCustomSignup 
            title="Enter registered email or Number: "
            placeholder="registered email or Number"
            onChangeText={txt=>emailOrNumberHandler(txt)}
            value={eorn}
            />
            

        
        </View>
        <View  style={styles.btn}>
        <Button
          style={styles.btnStyles}
          title=">"
          onPress={formHandler}
        
         />
       
         </View>
    
    </View>
 
  )
  
}


export default EmailValidation
const styles = StyleSheet.create({
    root:{
       flex:1
    },
    container: {
        alignItems: 'center',
        marginTop:'35%',
    },
    container1:{
        marginTop:'10%'
    },
    txt:{
        fontSize:25,
        fontStyle:'italic',
        fontWeight:'bold',
    },
    btn:{
        marginTop:'7%',
        marginLeft:'50%',
        marginRight:'20%',
        borderRadius:20
    },
    btnStyles:{
        paddingLeft:20,        
        
    }
})
