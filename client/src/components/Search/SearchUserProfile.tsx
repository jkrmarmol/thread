import { View, Text, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import type { ISearchUserProfileProps } from '../../typings/interfaces';


export default function SearchUserProfile({ name, username, verified, followers, avatar }: ISearchUserProfileProps) {
  const { width } = useWindowDimensions();
  const WIDTH = (90 / 100) * width;

  return (
    <>
      <View style={{
        width: WIDTH,
        alignSelf: 'center',
        marginTop: 10
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 4
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Image
              source={avatar}
              resizeMode='contain'
              style={{
                width: 40,
                height: 40,
                borderRadius: 100
              }}
            />
            <View style={{
              marginLeft: 10
            }}>

              <View style={{
                flexDirection: 'row'
              }}>
                <Text style={{
                  color: '#fff',
                  fontFamily: 'PoppinsRegular'
                }}>{username}</Text>
                {verified && <MaterialIcons
                  name="verified"
                  size={16}
                  color="rgba(0,149,249,255)"
                  style={{ marginLeft: 5 }}
                />}
              </View>
              <Text style={{
                color: '#fff',
                fontFamily: 'PoppinsRegular',
                opacity: 0.3
              }}>{name}</Text>
              <Text style={{
                color: '#fff',
                fontFamily: 'PoppinsRegular'
              }}>{Intl.NumberFormat('en', { notation: 'compact' }).format(followers)} followers</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={{
              borderWidth: 1,
              borderColor: 'rgba(256, 256, 256, 0.2)',
              paddingHorizontal: 24,
              paddingVertical: 2,
              borderRadius: 10
            }}>
              <Text style={{
                color: '#fff',
                fontFamily: 'PoppinsRegular',
                fontSize: 15,
                textAlign: 'center'
              }}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{
        height: 0.3,
        width: '100%',
        backgroundColor: '#fff',
        opacity: 0.15
      }}>

      </View>
    </>
  )
}