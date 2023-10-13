import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ThreeProfileReplies() {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 6
    }}>
      <Image
        source={require('../assets/images/sample-avatar1.jpg')}
        resizeMode='contain'
        style={{
          height: 8,
          width: 8,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: 'rgba(16,16,16,255)',
          padding: 7,
          bottom: 4,
          right: 4
        }}
      />
      <Image
        source={require('../assets/images/sample-avatar2.jpg')}
        resizeMode='contain'
        style={{
          height: 14,
          width: 14,
          borderRadius: 100,
          marginLeft: -10,
          borderWidth: 2,
          borderColor: 'rgba(16,16,16,255)',
          padding: 9,
          bottom: 8,
          left: 6
        }}
      />
      <Image
        source={require('../assets/images/sample-avatar2.jpg')}
        resizeMode='contain'
        style={{
          height: 6,
          width: 6,
          borderRadius: 100,
          marginLeft: -10,
          borderWidth: 2,
          borderColor: 'rgba(16,16,16,255)',
          padding: 5,
          top: 12,
          position: 'absolute'
        }}
      />
    </View>
  )
}