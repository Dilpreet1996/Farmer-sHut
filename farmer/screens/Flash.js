import { LinearGradient } from 'expo-linear-gradient'
import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect} from 'react'
import { StyleSheet, Text } from 'react-native'

function Flash({navigation}) {
  useEffect(()=>{
    setTimeout(()=>{
        navigation.navigate('Login')
    },1000)
  })
  return (
    <>
      <LinearGradient
       colors={['yellow','green']}
       style={styles.container}
      >
            <AnimatedLottieView
            source={require('../flashData/flashrn.json')}
            autoPlay loop
            />
      </LinearGradient>
    </>

  )
}

 export default Flash
const styles = StyleSheet.create({
    container: {
       flex:1
    }
})
