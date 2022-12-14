import React, { useLayoutEffect, useState } from 'react'
import { Alert, Button, Image, Text, View } from 'react-native'
import { useLogin } from '../../Context/LoginProvider'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddProduct from './AddProduct';
import InventoryManagement from './InventoryManagement';
const Tab = createMaterialBottomTabNavigator();


function MyInventory({navigation}) {
  return (
  <Tab.Navigator
  activeColor="#cc8500"
  inactiveColor="#3e2465"
  barStyle={{ backgroundColor: '#d9d9d9'}}
  >
    <Tab.Screen 
    name="Add Products" 
    component={AddProduct} 
    options={{
        tabBarIcon:()=>(
            <Ionicons name="add-circle-outline" size={25} />
        ),  
    }}
    />
    <Tab.Screen 
    name="InventoryManagement" 
    component={InventoryManagement} 
    options={{
        tabBarIcon:()=>(
            <Ionicons name="reader-outline" size={25}/>
        )
    }}
    />
  </Tab.Navigator>
);
  
}

export default MyInventory
