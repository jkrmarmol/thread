import { View, Text, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { OneProfileReplies, TwoProfileReplies, ThreeProfileReplies } from '../Profile/profileReplies'
import type { ITreadPostProps } from '../../typings/interfaces'
import moment from 'moment';


export default function ThreadPost({ username, verified, caption, avatar, date, repliesCount, images }: ITreadPostProps) {
  const { width } = useWindowDimensions();
  const WIDTH = (90 / 100) * width;
  const nav = useNavigation<NavigationProp<ParamListBase>>()
  return (
    <>
      <View style={{
        // borderWidth: 1,
        // borderColor: 'blue',
        flexDirection: 'row',
        width: WIDTH,
        // flex: 1,
        marginVertical: 10,
        alignSelf: 'center'
      }}>

        <View style={{
          // borderWidth: 1,
          // borderColor: 'red',
          // flex: 1,
          flexDirection: 'column'
        }}>
          <Image
            source={avatar}
            resizeMode='contain'
            style={{
              height: 45,
              width: 45,
              borderRadius: 100
            }}
          />
          {repliesCount !== 0 && <View style={{
            alignSelf: 'center',
            backgroundColor: '#fff',
            opacity: 0.3,
            borderRadius: 100,
            width: 1,
            flex: 1,
            marginTop: 8
          }}></View>}

          {/* <OneProfileReplies /> */}
          {/* <TwoProfileReplies /> */}
          {(repliesCount >= 1 && repliesCount <= 5) ? <OneProfileReplies />
            : (repliesCount >= 5 && repliesCount < 20) ? <TwoProfileReplies />
              : (repliesCount >= 20) ? <ThreeProfileReplies /> : ''}
          {/* <ThreeProfileReplies /> */}


        </View>

        <View style={{
          flex: 1
        }}>
          <View style={{
            flexDirection: 'row',
            // flex: 1,
            justifyContent: 'space-between',
            // borderWidth: 1,
            marginLeft: 10
          }}>
            <View style={{
              // borderWidth: 1,
              // borderColor: 'green',
              // alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              // flex: 1
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

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth: 1,
              // borderColor: 'red',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: '#fff',
                marginRight: 12,
                fontFamily: 'PoppinsLight',
                opacity: 0.4
              }}>{moment(date).startOf('m').fromNow()}</Text>
              <Entypo name="dots-three-horizontal" size={16} color="#fff" />
            </View>

          </View>


          {caption && <View style={{
            marginLeft: 10
          }}>
            <Text style={{
              color: '#fff',
              fontFamily: 'PoppinsLight',
              fontSize: 14
            }}>{caption}</Text>
          </View>}


          <TouchableOpacity
            onPress={() => nav.navigate('FullViewImages', { imageSrc: images })}
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              overflow: 'hidden',
              borderRadius: 10,
              marginLeft: 10,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              // aspectRatio: 1

            }}>
            <Image
              source={images}
              resizeMode='contain'

              style={{
                // borderRadius: 10,
                height: 250
                // width: 120
              }}
            />
          </TouchableOpacity>

          <View style={{
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginVertical: 10
          }}>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/icons/inactive-heart-icon.png')}
                resizeMode='contain'
                style={{
                  height: 20,
                  width: 20
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/images/icons/active-comment-icon.png')}
                resizeMode='contain'
                style={{
                  height: 20,
                  width: 20
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/images/icons/active-reshare-icon.png')}
                resizeMode='contain'
                style={{
                  height: 20,
                  width: 20
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/images/icons/active-send-icon.png')}
                resizeMode='contain'
                style={{
                  height: 20,
                  width: 20
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginBottom: 8
          }}>
            {repliesCount !== 0 && <>
              <Text style={{
                color: '#fff',
                opacity: 0.4,
                fontSize: 14
              }}>{repliesCount} replies</Text>
              <Text style={{
                color: '#fff',
                opacity: 0.4,
                fontSize: 14
              }}> &#x2219; </Text>
            </>}


            <Text style={{
              color: '#fff',
              opacity: 0.4,
              fontSize: 14
            }}>View likes</Text>
          </View>

        </View>

      </View>

      <View style={{
        backgroundColor: '#fff',
        height: 0.2,
        opacity: 0.1,
        width: '100%'
      }}>
      </View>
    </>
  )
}