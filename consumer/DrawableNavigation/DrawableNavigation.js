import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Alert, Button, View } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import ProfilePage from '../Screens/ProfilePage';
  
  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  const Drawer = createDrawerNavigator();
function DrawableNavigation() {
  return (
<Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="ProfilePage" component={ProfilePage}/>
    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
  </Drawer.Navigator>
  )
}

export default DrawableNavigation
