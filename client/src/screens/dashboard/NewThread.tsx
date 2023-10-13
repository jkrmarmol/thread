import { View, Text, Image, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hook/useTypedSelector';
import { threadPostText } from '../../redux/dashboardHelperSlices';


export default function NewThread() {
  const { width } = useWindowDimensions();
  const WIDTH = (95 / 100) * width;
  const dispatch = useAppDispatch();
  const selectThreadPostText = useAppSelector(state => state.dashboardHelper.threadPostText)
  console.log(!(selectThreadPostText.length >= 1))
  return (
    <View style={{
      backgroundColor: 'rgba(16,16,16,255)',
      flex: 1,
    }}>
      <View style={{
        width: WIDTH,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flex: 1
      }}>
        <View style={{
          flexDirection: 'row',
          marginTop: 10
        }}>
          <Image
            source={require('../../assets/images/sample-avatar2.jpg')}
            resizeMode='contain'
            style={{
              width: 40,
              height: 40,
              borderRadius: 100
            }}
          />
          <View style={{
            flex: 1,
            marginLeft: 12
          }}>
            <View style={{
              flexDirection: 'row',
              // alignItems: 'center',
            }}>
              <Text style={{
                color: '#fff',
                fontFamily: 'PoppinsRegular',
                marginRight: 2
              }}>@jkrmarmol</Text>
              <MaterialIcons name="verified" size={16} color="rgba(0,149,249,255)" />
            </View>
            <TextInput
              placeholder='Start a thread...'
              placeholderTextColor={'rgba(256, 256, 256, 0.4)'}
              multiline
              onChangeText={text => dispatch(threadPostText(text))}
              style={{
                fontFamily: 'PoppinsLight',
                marginBottom: 10,
                color: 'rgba(256, 256, 256, 1)'
              }}
            />
            <TouchableOpacity>
              <Entypo name="attachment" size={18} color="rgba(256, 256, 256, 0.4)" />
            </TouchableOpacity>

          </View>
        </View>

        <View style={{
          width: (92 / 100) * width,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity>
            <Text style={{
              color: '#fff',
              fontFamily: 'PoppinsLight',
              opacity: 0.4
            }}>Anyone can reply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!(selectThreadPostText.length >= 1)}
            onPress={() => console.log('HAHAH')}
          >
            <Text style={{
              color: 'rgba(0,149,249,255)',
              fontFamily: 'PoppinsLight',
              opacity: !(selectThreadPostText.length >= 1) ? 0.4 : 1,
              fontSize: 18
            }}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}