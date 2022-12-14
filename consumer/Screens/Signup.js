import React, { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native'
import ButtonCustom from '../Components/ButtonCustom'
import TextInputCustom from '../Components/TextInputCustom'
import { Network } from '../Network/IPaddress'

function Signup({navigation}) {
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  var [email,setMail] = useState('')
  const [mobileNumber,setMobile] = useState(null)
  const [password,setPassword] = useState('')

  const firstNameHandler=(data)=>{
      setFname(data)
     
  }
  const lastNameHandler=(data)=>{
        setLname(data)
  
  }

  const mailHandler=(data)=>{
    setMail(data)
  }

  const phoneHandler=(data)=>{
      setMobile(data)
  }

  const passwordHandler=(data)=>{
    setPassword(data)
  }
  
  const createAccount=async()=>{
    email = email.toLowerCase()
    const nameRegex = new RegExp(/^[a-zA-Z ]+$/);
    const EmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if(nameRegex.exec(fname) && nameRegex.exec(lname) && EmailRegex.exec(email) && mobileNumber.length == 10)
    {
     const customerSignup = {fname,lname,email,mobileNumber,password}
     const response = await fetch(Network.info.IP+'/api/customerRoutes/',{
      method: 'POST',
      body: JSON.stringify(customerSignup),
      headers : {
        'Content-Type': 'application/json'
      }
     })
     const json = await response.json()
     if(json.status === 'proced'){
          //Email
          var to = email
          var subject="Congratulations"
           var body=`Congratulations ${fname} ${lname} your account has been created`
          const emailData = {to,subject,body}
          const res =  await fetch(Network.info.IP+'/api/eMail/txt-mail',{
           method:'POST',
           body: JSON.stringify(emailData),
           headers : {
             'Content-Type': 'application/json'
           }
          })
          navigation.navigate('Login');
     }
      
    }
    else{
      Alert.alert("Please fill the form properly")
    }
  }


  return (
    <ScrollView>
      <View style={styles.container}>
          <Image
          style={styles.logo}
          source={require('../images/logo.png')}
          />
        
        <ScrollView style={styles.form}>
          <View>
        
            <TextInputCustom
                placeholder="Enter First Name : "
                onChangeText={txt=>firstNameHandler(txt)}
                value={fname}
            />
            <TextInputCustom
                placeholder="Enter Last Name : "
                onChangeText={txt=>lastNameHandler(txt)}
                value={lname}
            />
            <TextInputCustom
                placeholder="Enter E-mail Name : "
                onChangeText={txt=>mailHandler(txt)}
                value={email}
              
            />
            <TextInputCustom
                placeholder="Enter Phone Number : "
                onChangeText={txt=>phoneHandler(txt)}
                value={mobileNumber}
                keyboardType="numeric"
            />
            <TextInputCustom
                placeholder="Enter Password :"
                onChangeText={txt=>passwordHandler(txt)}
                value={password}
                secureTextEntry={true}
            />
            
          </View>
      
          <View style={styles.btn}>
              <ButtonCustom onPress={createAccount}>Create Account</ButtonCustom>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default Signup
const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent:'center',
    marginTop:'30%'
},
logo:{
  height:150,
  width:150,
},
form:{
  marginTop:30,
  width:'90%',
},
btn:{
  width:'90%',
  marginTop:20,
  marginLeft:20
},
})
