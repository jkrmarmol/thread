import { View, Text, useWindowDimensions, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import SearchUserProfile from '../../components/Search/SearchUserProfile';


export default function Search() {
  const { width } = useWindowDimensions();
  const WIDTH = (90 / 100) * width;

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
          flex: 1
        }}>
        <View style={{
          paddingVertical: 10,
          width: WIDTH,
          alignSelf: 'center'
        }}>
          <Text style={{
            color: '#fff',
            fontFamily: 'PoppinsRegular',
            fontSize: 28
          }}>Search</Text>
          <View style={{
            backgroundColor: 'rgba(38,38,38,255)',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            borderRadius: 10,
            overflow: 'hidden'
          }}>
            <Feather
              name="search"
              size={18}
              color="rgba(256, 2556, 256, 0.2)"
              style={{
                marginHorizontal: 8
              }}
            />
            <TextInput
              placeholder='Search'
              placeholderTextColor={'rgba(256, 2556, 256, 0.2)'}
              cursorColor={'rgba(256, 2556, 256, 0.2)'}
              style={{
                fontFamily: 'PoppinsRegular',
                width: '100%',
                color: '#fff',
                opacity: 0.8,
                fontSize: 14
              }}
            />
          </View>
        </View>

        <SearchUserProfile
          name='Kurt Russelle Marmol'
          username='jkrmarmol'
          verified
          avatar={require('../../assets/images/sample-avatar.jpg')}
          followers={100}
        />

        <SearchUserProfile
          name='Kurt Russelle Marmol'
          username='jkrmarmol'
          verified
          avatar={require('../../assets/images/sample-avatar1.jpg')}
          followers={2900}
        />

        <SearchUserProfile
          name='Kurt Russelle Marmol'
          username='jkrmarmol'
          verified
          avatar={require('../../assets/images/sample-avatar2.jpg')}
          followers={2900}
        />

        <SearchUserProfile
          name='Kurt Russelle Marmol'
          username='jkrmarmol'
          // verified
          avatar={require('../../assets/images/sample-avatar3.jpg')}
          followers={2900}
        />
      </ScrollView>
    </SafeAreaView>
  )
}