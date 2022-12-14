import React, {  useState } from 'react'
import { View, StyleSheet, Alert, ScrollView} from 'react-native'
import TextInputCustomSignup from '../Componenets/TextInputCustomSignup'
import Title from '../Componenets/Title'
import Svg, { Path } from "react-native-svg";
import PrimaryButton from '../Componenets/PrimaryButton';
import { Network } from '../Network/IPaddress';

function Signup({navigation}) {
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  var [email,setMail] = useState('')
  const [mobileNumber,setMobile] = useState(null)
  
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')




  const setFnameHandler=(fname)=>{
 
   
      setFname(fname)
       
  }
  const setLnameHandler=(lname)=>{
    setLname(lname)
}
const setEmailHandler=(email)=>{
  
  setMail(email)
}
const setMobileHandler=(mobileNumber)=>{
  setMobile(mobileNumber)
}
const setPasswordHandler=(password)=>{
  setPassword(password)
}



const createAccount= async()=>{

 email = email.toLowerCase();
   const EmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
   const nameRegex = RegExp(/^[a-zA-Z ]+$/)
   if(EmailRegex.exec(email) && nameRegex.exec(fname) && nameRegex.exec(lname) && mobileNumber.length == 10){
    const farmerSignup = {fname,lname,email,mobileNumber,password}
    const response = await fetch(Network.info.IP+'/api/farmerSignup',{
      method : 'POST',
      body : JSON.stringify(farmerSignup),
      headers : {
        'Content-Type': 'application/json'
      }
     })
     const json = await response.json()

     console.log(json.mssg, json.status)
     if(json.status === 'proced'){

         //Email
         var to = email
         var subject="congratulations"
          var body="congratulations your account has been created"
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

          setError(null)
            setFname('')
            setLname('')
            setMobile(null)
            setMail('')
            setPassword('')
           
      Alert.alert(json.mssg)
      navigation.navigate('Login')
     }
    
     if(json.status === 'notProced'){
        Alert.alert(json.mssg)
     }
  
 
   }else{
    Alert.alert('Please fill the form properly')
   }

   //email validation
   if(EmailRegex.exec(email)){
    console.log(email)
   }

   //name validation
    if(nameRegex.exec(fname)){
      console.log('perfect')
    }
    if(nameRegex.exec(lname)){
      console.log('perfect')
    }

   //mobileNumber validation
   if(mobileNumber.length == 10)
   {
    console.log(mobileNumber)
   }
 }


  return (
<>
  <View style={styles.container}>
   <Svg
       height="60%"
       width="100%"
       style={{ position: 'absolute' }}
   >
     <Path
     fill="#0099ff"
     d="M0,288L6.3,293.3C12.6,299,25,309,38,266.7C50.5,224,63,128,76,117.3C88.4,107,101,181,114,218.7C126.3,256,139,256,152,245.3C164.2,235,177,213,189,192C202.1,171,215,149,227,144C240,139,253,149,265,176C277.9,203,291,245,303,240C315.8,235,328,181,341,144C353.7,107,366,85,379,106.7C391.6,128,404,192,417,192C429.5,192,442,128,455,122.7C467.4,117,480,171,493,176C505.3,181,518,139,531,112C543.2,85,556,75,568,101.3C581.1,128,594,192,606,218.7C618.9,245,632,235,644,224C656.8,213,669,203,682,165.3C694.7,128,707,64,720,85.3C732.6,107,745,213,758,266.7C770.5,320,783,320,796,288C808.4,256,821,192,834,181.3C846.3,171,859,213,872,240C884.2,267,897,277,909,272C922.1,267,935,245,947,234.7C960,224,973,224,985,208C997.9,192,1011,160,1023,138.7C1035.8,117,1048,107,1061,128C1073.7,149,1086,203,1099,197.3C1111.6,192,1124,128,1137,117.3C1149.5,107,1162,149,1175,160C1187.4,171,1200,149,1213,144C1225.3,139,1238,149,1251,133.3C1263.2,117,1276,75,1288,64C1301.1,53,1314,75,1326,74.7C1338.9,75,1352,53,1364,80C1376.8,107,1389,181,1402,197.3C1414.7,213,1427,171,1434,149.3L1440,128L1440,0L1433.7,0C1427.4,0,1415,0,1402,0C1389.5,0,1377,0,1364,0C1351.6,0,1339,0,1326,0C1313.7,0,1301,0,1288,0C1275.8,0,1263,0,1251,0C1237.9,0,1225,0,1213,0C1200,0,1187,0,1175,0C1162.1,0,1149,0,1137,0C1124.2,0,1112,0,1099,0C1086.3,0,1074,0,1061,0C1048.4,0,1036,0,1023,0C1010.5,0,998,0,985,0C972.6,0,960,0,947,0C934.7,0,922,0,909,0C896.8,0,884,0,872,0C858.9,0,846,0,834,0C821.1,0,808,0,796,0C783.2,0,771,0,758,0C745.3,0,733,0,720,0C707.4,0,695,0,682,0C669.5,0,657,0,644,0C631.6,0,619,0,606,0C593.7,0,581,0,568,0C555.8,0,543,0,531,0C517.9,0,505,0,493,0C480,0,467,0,455,0C442.1,0,429,0,417,0C404.2,0,392,0,379,0C366.3,0,354,0,341,0C328.4,0,316,0,303,0C290.5,0,278,0,265,0C252.6,0,240,0,227,0C214.7,0,202,0,189,0C176.8,0,164,0,152,0C138.9,0,126,0,114,0C101.1,0,88,0,76,0C63.2,0,51,0,38,0C25.3,0,13,0,6,0L0,0Z"
      stroke="#F24E1E"
    
      
     />
   </Svg>
     <Title 
      title="Create Account"
      />
     
      <ScrollView>
     <View style={styles.signupForm}>
     
      <TextInputCustomSignup 
        title="First Name"
        placeholder="e.g. dilpreet"
        onChangeText={text => setFnameHandler(text)}
        value={fname}
   
      />

      <TextInputCustomSignup 
        title="Last Name"
        placeholder="e.g. singh"
        onChangeText={text => setLnameHandler(text)}
        value={lname}
       
      />

      
      <TextInputCustomSignup 
        title="Mobile Number"
        placeholder="e.g. 6476171448"
        onChangeText={text => setMobileHandler(text)}
        value={mobileNumber}
        keyboardType="numeric"
        
      />

      
       <TextInputCustomSignup 
        title="E-mail"
        placeholder="e.g. dilpreetsingh@gmail.com"
        onChangeText={text=>setEmailHandler(text)}
        value={email}
        
      />
      
      <TextInputCustomSignup 
       title="Password"
       placeholder="enter password"
       onChangeText={text => setPasswordHandler(text)}
       value={password}
       secure={true}
      
      />
   
      </View>
        <View style={styles.btn}>
            <PrimaryButton
            onPress={createAccount}
            >Submit</PrimaryButton>
        </View>
        </ScrollView>
    
    
  </View>

  </>
  )
}

export default Signup
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#CDE8CF",
  },
  signupForm:{
    marginTop:'50%',
   
  },
  image:{
    width:'100%',
    height:'60%'
  },
  btn:{
    marginLeft:'20%',
    marginRight:'20%'
  }
})

