import { TouchableOpacity, } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { Home, Search, NewThread, Activity, Profile } from '../screens/dashboard';
import ImageIcon from '../components/ImageIcon';
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hook/useTypedSelector';
import { goBackNavigation } from '../redux/dashboardHelperSlices';


const Tab = createBottomTabNavigator();

export default function DashboardNavigator() {
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const selectBackNavigation = useAppSelector(state => state.dashboardHelper.goBackNavigation)
  const route = useRoute();
  const secondToTheLastRouteName = getFocusedRouteNameFromRoute(route);
  const getSecondToLastRouteName = () => {
    if (selectBackNavigation.length >= 2) {
      if (selectBackNavigation[selectBackNavigation.length - 2] === undefined) {
        return 'Home'
      }
      return selectBackNavigation[selectBackNavigation.length - 2];
    }
    return 'Home'
  };

  useEffect(() => {
    if (selectBackNavigation) {
      dispatch(goBackNavigation(secondToTheLastRouteName))
    }
  }, [secondToTheLastRouteName])

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(16,16,16,255)',
          elevation: 0,
          height: 60,
          borderTopWidth: 0
        },
        tabBarShowLabel: false
      }}
    >

      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <ImageIcon src={require('../assets/images/icons/active-home-icon.png')} opacity={1} />
              : <ImageIcon src={require('../assets/images/icons/inactive-home-icon.png')} opacity={0.3} />
          )
        }}
      />

      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <ImageIcon src={require('../assets/images/icons/active-search-alt-icon.png')} opacity={1} />
              : <ImageIcon src={require('../assets/images/icons/inactive-search-alt-icon.png')} opacity={0.3} />
          )
        }}
      />

      <Tab.Screen
        name='NewThread'
        component={NewThread}
        options={{
          // headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <ImageIcon src={require('../assets/images/icons/active-edit-report-icon.png')} opacity={1} />
              : <ImageIcon src={require('../assets/images/icons/active-edit-report-icon.png')} opacity={0.3} />
          ),
          tabBarStyle: {
            display: 'none'
          },
          headerTintColor: '#fff',
          headerTitle: 'New thread',
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'PoppinsRegular',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => nav.navigate(`${getSecondToLastRouteName()}`)}
              style={{
                marginLeft: 14
              }}
            >
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'rgba(16,16,16,255)',
            elevation: 1
          },


        }}

      />

      < Tab.Screen
        name='Activity'
        component={Activity}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <ImageIcon src={require('../assets/images/icons/active-heart-icon.png')} opacity={1} />
              : <ImageIcon src={require('../assets/images/icons/inactive-heart-icon.png')} opacity={0.3} />
          )
        }}
      />

      < Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            focused ? <ImageIcon src={require('../assets/images/icons/active-user-icon.png')} opacity={1} />
              : <ImageIcon src={require('../assets/images/icons/inactive-user-icon.png')} opacity={0.3} />
          )
        }}
      />
    </Tab.Navigator >
  )
}