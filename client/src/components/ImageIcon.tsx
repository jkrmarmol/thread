import { View, Text, Image, ImageProps } from 'react-native'
import React from 'react'
import type { IImageIcon } from '../typings/interfaces'

export default function ImageIcon({ src, opacity }: IImageIcon) {
  return (
    <Image
      source={src}
      resizeMode='contain'
      style={{
        height: 30,
        width: 30,
        opacity
      }}
    />
  )
}