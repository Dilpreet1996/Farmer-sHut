import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { StyleSheet, View } from 'react-native'
function Welcome() {
  return (
    <View style={styles.container}>
    <AnimatedLottieView
          source={require('../flashData/welcome.json')}
          autoPlay loop
          style={styles.upper}
       />
    </View>
  )
}

export default Welcome
const styles = StyleSheet.create({
    container:{
        flex:1.5
    }
})
