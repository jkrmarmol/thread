import { View, Text, ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityTabs from '../../components/Activity/ActivityTabs';
import activityTabsData from '../../constants/activityTabsData';
import { useAppSelector } from '../../redux/hook/useTypedSelector';


export default function Activity() {
  const { width } = useWindowDimensions();
  const WIDTH = (90 / 100) * width;
  const selectCurrentTab = useAppSelector(state => state.dashboardHelper.activityCurrentTab)
  console.log(selectCurrentTab)


  return (
    <SafeAreaView style={{
      backgroundColor: 'rgba(16,16,16,255)',
      flex: 1,
      alignItems: 'center'
    }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
        }}>

        <View style={{
          paddingVertical: 10,
          alignSelf: 'center',
        }}>

          <Text style={{
            color: '#fff',
            fontFamily: 'PoppinsRegular',
            fontSize: 28,
            width: WIDTH,
            alignSelf: 'center'
          }}>Activity</Text>

          <ActivityTabs
            data={activityTabsData}
          />

        </View>

      </ScrollView >
    </SafeAreaView >
  )
}