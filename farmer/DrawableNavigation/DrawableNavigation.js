import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Alert, Button, Text, View } from 'react-native';
import { useLogin } from '../Context/LoginProvider';
import ProfilePage from '../screens/ProfilePage';
import MyInventory from '../screens/MyInventory/MyInventory';

const Drawer = createDrawerNavigator();



function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}


function DrawableNavigation({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Profile" component={ProfilePage}/>
    <Drawer.Screen name="My Inventory" component={MyInventory} />
    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
  </Drawer.Navigator>
  )
}

export default DrawableNavigation
