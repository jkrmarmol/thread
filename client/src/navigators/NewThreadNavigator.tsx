import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

import { NewThread } from '../screens/dashboard';


const Stack = createNativeStackNavigator();

export default function NewThreadNavigator() {
  const nav = useNavigation<NavigationProp<ParamListBase>>()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='NewThread'
        component={NewThread}
        options={{
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'PoppinsRegular'
          },
          headerTitle: '    New thread',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: 'rgba(16,16,16,255)'
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => console.log(nav.goBack())}>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          animation: 'slide_from_bottom'
        }}
      />
    </Stack.Navigator>
  )
}