import { View, useWindowDimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import { setStatusBarBackgroundColor, setStatusBarTranslucent, setStatusBarStyle } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThreadPost from '../../components/NewThread/ThreadPost'


export default function Home() {
  const { width } = useWindowDimensions();
  const WIDTH = (90 / 100) * width;
  setStatusBarStyle('light')
  setStatusBarTranslucent(true)
  setStatusBarBackgroundColor('rgba(16,16,16,255)', true)

  return (
    <SafeAreaView style={{
      backgroundColor: 'rgba(16,16,16,255)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
          width: '100%'
        }}>

        <View style={{
          alignItems: 'center',
          // borderWidth: 1,
          // borderColor: 'green',
          marginVertical: 10
        }}>
          <Image
            source={require('../../assets/images/icons/kumatechlogo.png')}
            resizeMode='contain'
            style={{
              height: 40,
              width: 40,
            }}
          />
        </View>

        <ThreadPost
          username='@jkrmarmol'
          verified={true}
          caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet venenatis felis, nec molestie erat.'
          date={new Date('2023-09-07T07:52:48Z')}
          avatar={require('../../assets/images/sample-avatar.jpg')}
          repliesCount={20}
          images={require('../../assets/images/sample-post-images.jpg')}
        />

        <ThreadPost
          username='@jkrmarmol'
          verified={true}
          caption='ksadfiyjsdf'
          date={new Date('2023-09-05T07:52:48Z')}
          avatar={'' || require('../../assets/images/noprofile-avatar.jpg')}
          repliesCount={5}
          images={require('../../assets/images/sample-post-images1.png')}
        />

        <ThreadPost
          username='@jkrmarmol'
          verified={true}
          caption='ksadfiyjsdf'
          date={new Date('2023-09-05T07:52:48Z')}
          avatar={'' || require('../../assets/images/noprofile-avatar.jpg')}
          repliesCount={5}
          images={require('../../assets/images/sample-post-images1.png')}
        />

        <ThreadPost
          username='@jkrmarmol'
          verified={true}
          caption='ksadfiyjsdf'
          date={new Date('2023-09-05T07:52:48Z')}
          avatar={'' || require('../../assets/images/noprofile-avatar.jpg')}
          repliesCount={5}
          images={require('../../assets/images/sample-post-images1.png')}
        />

        <ThreadPost
          username='@jkrmarmol'
          verified={true}
          caption='ksadfiyjsdf'
          date={new Date('2023-09-05T07:52:48Z')}
          avatar={'' || require('../../assets/images/noprofile-avatar.jpg')}
          repliesCount={5}
          images={require('../../assets/images/sample-post-images1.png')}
        />

        <ThreadPost
          username='@jkrmarmol'
          verified={true}
          caption='ksadfiyjsdf'
          date={new Date('2023-09-05T07:52:48Z')}
          avatar={'' || require('../../assets/images/noprofile-avatar.jpg')}
          repliesCount={5}
          images={require('../../assets/images/sample-post-images1.png')}
        />

      </ScrollView>
    </SafeAreaView>
  )
}