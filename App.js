import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import MainHome from './src/component/MainHome'
import Complete from './src/component/Complete'
import AddNoteForm from './src/component/AddNoteForm'
import DetailsNote from './src/component/DetailsNote'
import EditNote from './src/component/EditNote';
import UnComplete from './src/component/UnComplete';

const Tabs = createBottomTabNavigator()
const StackComponent = createStackNavigator()

const HomeStackScreen = () => (
    <StackComponent.Navigator>
         <StackComponent.Screen 
           name="Home" 
           component={MainHome} 
         />
          <StackComponent.Screen 
           name="Add" 
           component={AddNoteForm} 
         />
         <StackComponent.Screen 
           name="Details" 
           component={DetailsNote} 
         />
          <StackComponent.Screen 
           name="Edit" 
           component={EditNote} 
         />
    </StackComponent.Navigator>
  )

  const UnCompleteStackScreen = () => (
    <StackComponent.Navigator>
      <StackComponent.Screen 
        name="Not Yet Done" 
        component={UnComplete} 
      />
    </StackComponent.Navigator>
  )

const CompleteStackScreen = () => (
    <StackComponent.Navigator>
      <StackComponent.Screen 
        name="Complete" 
        component={Complete} 
      />
    </StackComponent.Navigator>
  )

  const myStack = () => {
    return (
      <StackComponent.Navigator>
         <StackComponent.Screen 
           name="Home" 
           component={MainHome} 
         />
          <StackComponent.Screen 
           name="Add" 
           component={AddNoteForm} 
         />
      </StackComponent.Navigator>
    )
  }

export default () => (
     <NavigationContainer>
     <Tabs.Navigator>
         <Tabs.Screen 
            name="Home" 
            component={HomeStackScreen} 
            options={{ headerTitleAlign: 'center' }} 
            options={{ 
                  headerShown: false, 
                  tabBarIcon: () => {
                    return <Entypo name="home" size={24} color="black" />
            }}}  
          />
         <Tabs.Screen 
            name="Not Yet Done" 
            component={UnCompleteStackScreen} 
            options={{ 
              headerShown: false, 
              tabBarIcon: () => {
                return <Entypo name="list" size={24} color="black" />
        }}} 
          />
         <Tabs.Screen 
            name="Complete" 
            component={CompleteStackScreen} 
            options={{ 
              headerShown: false, 
              tabBarIcon: () => {
                return <AntDesign name="checkcircle" size={24} color="black" />
        }}} 
        />
      </Tabs.Navigator>
    </NavigationContainer>
)