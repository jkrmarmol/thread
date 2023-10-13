import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Register, VerifyOTP } from '../screens/auth'


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen
        name='VerifyOTP'
        component={VerifyOTP}
        options={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      />
    </Stack.Navigator>
  )
}