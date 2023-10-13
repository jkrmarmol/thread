import { TouchableOpacity } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';
import FullViewImages from '../components/Home/FullViewImages';
import { Feather, Entypo } from '@expo/vector-icons';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native'


const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const nav = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name='AuthNavigator'
        component={AuthNavigator}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name='DashboardNavigator'
        component={DashboardNavigator}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false
        }}
      />

      {/* Start Dashboard Stack  */}
      <Stack.Screen
        name='FullViewImages'
        component={FullViewImages}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgba(16, 16, 16, 255)'
          },
          headerTintColor: '#fff',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => nav.goBack()}
              style={{
                backgroundColor: '#ffffff26',
                borderRadius: 100,
                padding: 5
              }}>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={16} color="#fff" />
            </TouchableOpacity>
          ),
          animation: 'fade_from_bottom'
        }}
      />
      {/* End Dashboard Stack  */}
    </Stack.Navigator>
  )
}