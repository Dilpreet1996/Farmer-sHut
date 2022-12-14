import React from 'react'
import { useLogin } from '../Context/LoginProvider'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../Screens/Login';
import Signup from '../Screens/Signup';
import EmailValidator from '../Screens/ForgetPassword/EmailValidator';
import Verification from '../Screens/ForgetPassword/Verification';
import PasswordUpdater from '../Screens/ForgetPassword/PasswordUpdater';
import DrawableNavigation from '../DrawableNavigation/DrawableNavigation'
const Stack = createNativeStackNavigator();

const StackScreens=()=>{
   return(
    <Stack.Navigator
    screenOptions={{
       headerShown: false
      }}
     >
        <Stack.Screen
          name="Login"
          component={LogIn}
        />
        <Stack.Screen
        name="Signup"
         component={Signup}
        />
        <Stack.Screen
         name="ForgetEmailValidation"
         component={EmailValidator}
        />
        <Stack.Screen
        name="verification"
        component={Verification}
        />
        <Stack.Screen
        name="passwordUpdater"
        component={PasswordUpdater}
        />
    </Stack.Navigator>
   )
}
function MainNavigator() {
  const {isLoggedIn} = useLogin()
  return  isLoggedIn ? <DrawableNavigation /> : <StackScreens />
}

export default MainNavigator
