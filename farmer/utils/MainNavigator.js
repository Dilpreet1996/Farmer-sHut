import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flash from '../screens/Flash';
import Login from '../screens/Login';
import EmailValidation from '../ResetPassword/EmailValidation';
import OTPValidation from '../ResetPassword/OTPValidation';
import ResetPassword from '../ResetPassword/ResetPassword';
import Signup from '../screens/Signup';
import { useLogin } from '../Context/LoginProvider';
import DrawableNavigation from '../DrawableNavigation/DrawableNavigation';
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
     headerShown: false
     }}
   >
       <Stack.Screen
         name="Flash"
         component={Flash}
       />
       <Stack.Screen
        name="Login"
        component={Login}
       />
       <Stack.Screen
        name="ResetPassword"
        component={EmailValidation}
       />
       <Stack.Screen
       name="otp"
       component={OTPValidation}
       />
       <Stack.Screen
        name='rp'
        component={ResetPassword}
       />
       <Stack.Screen
        name="signup"
        component={Signup}
       />
   
   </Stack.Navigator>
  )
}
const MainNavigator =()=>{
  const {isLoggedIn} = useLogin()
  return isLoggedIn ? <DrawableNavigation/> : <StackNavigator />
}

export default MainNavigator