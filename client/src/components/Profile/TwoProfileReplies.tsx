import { View, Text, Image } from 'react-native'
import React from 'react'

export default function TwoProfileReplies() {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 6
    }}>
      <Image
        source={require('../../assets/images/sample-avatar1.jpg')}
        resizeMode='contain'
        style={{
          height: 14,
          width: 14,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: 'rgba(16,16,16,255)',
          padding: 9,

        }}
      />
      <Image
        source={require('../../assets/images/sample-avatar1.jpg')}
        resizeMode='contain'
        style={{
          height: 14,
          width: 14,
          borderRadius: 100,
          marginLeft: -10,
          borderWidth: 2,
          borderColor: 'rgba(16,16,16,255)',
          padding: 9,
        }}
      />
    </View>
  )
}