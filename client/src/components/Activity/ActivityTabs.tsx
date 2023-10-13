import { Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook/useTypedSelector'
import { activityCurrentTab } from '../../redux/dashboardHelperSlices'
import type { IActivityTabsData } from '../../typings/interfaces'

const Tabs = ({ item }: { item: { title: string; id: number } }) => {
  const dispatch = useAppDispatch();
  const selectCurrentTab = useAppSelector(state => state.dashboardHelper.activityCurrentTab)
  return (
    <TouchableOpacity
      onPress={() => dispatch(activityCurrentTab(item.title))}
      style={{
        backgroundColor: item.title === selectCurrentTab ? '#fff' : 'transparent',
        width: 100,
        paddingVertical: 6,
        marginRight: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 0.6,
        borderColor: 'rgba(256, 256, 256, 0.2)'
      }}>
      <Text style={{
        color: item.title === selectCurrentTab ? '#000' : '#fff',
        fontFamily: 'PoppinsRegular'
      }}>{item.title}
      </Text>
    </TouchableOpacity>
  )
}

export default function ActivityTabs({ data }: IActivityTabsData) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Tabs item={item} />}
      horizontal
      style={{
        paddingHorizontal: 16
      }}
    />
  )
}