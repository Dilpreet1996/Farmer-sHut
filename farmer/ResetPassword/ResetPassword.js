import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import TextInputCustomSignup from '../Componenets/TextInputCustomSignup'
import PrimaryButton from '../Componenets/PrimaryButton'
import { Network } from '../Network/IPaddress'

function ResetPassword({navigation,route}) {
    const email = route.params.mail
    const mobileNumber = route.params.mobileNumber
    const [onePass,setOnePass] = useState(null)
    const [secpass,setSecPass] = useState(null)
    const setFpass=(password)=>{
        setOnePass(password)
        console.log(onePass)
    }
    const setSpass=(password)=>{
        setSecPass(password)
        console.log(secpass)
    }
  
    const resetPassword=async()=>{
        if(onePass === secpass && onePass!=null){
          console.log(onePass)

            const response = await fetch(Network.info.IP+'/api/farmerSignup/updatePassword',{
              method : 'PUT',
              body : JSON.stringify({email:email,password:onePass,mobileNumber:mobileNumber}),
              headers : {
                'Content-Type': 'application/json'
              }
             })
            // console.log(response)
             const json = await response.json()
        
            Alert.alert(json.mssg)
            navigation.navigate('Login')

        }
    }


  return (
     <>
     <View style={styles.title}>
        <Text style={styles.txt}>Set New Password</Text>
     </View>

     <View style={styles.form}>
        <TextInputCustomSignup 
        placeholder="New password"
        secure={true}
        onChangeText={txt=>setFpass(txt)}
        value={onePass}
         
        />
        <TextInputCustomSignup 
        placeholder="Confirm password"
        secure={true}
        onChangeText={txt=>setSpass(txt)}
        value={secpass}
         
        />
     </View>
     <View style={styles.btn}>
        <PrimaryButton
         onPress={resetPassword}
        >Save!!!!</PrimaryButton>
     </View>
     </>
  )
}

export default ResetPassword
const styles = StyleSheet.create({
    title:{
        alignItems: 'center',
        marginTop:'50%'
    },
    txt:{
        fontSize:30,
        fontWeight:'bold',
        fontStyle:'italic',
   },
   form:{
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'5%'
   },
   btn:{
    margin:10,
    marginLeft:"20%",
    marginRight:"20%",
   }
})

