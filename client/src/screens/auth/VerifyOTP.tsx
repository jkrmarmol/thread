import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { View, Text, Image, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginBackgroundImage from '../../assets/images/english-dark.png'


const VerifyOTP = () => {
  const { width } = useWindowDimensions();
  const WIDTH = (90 / 100) * width;
  const nav = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={{
      backgroundColor: 'rgba(16,16,16,255)',
      flex: 1,
      alignItems: 'center'
    }}>

      <ExpoStatusBar style='light' />

      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
      }}>
        <Image
          source={LoginBackgroundImage}
          resizeMode='contain'
          style={{
            width: 1500,
            height: 410,
          }}
        />
      </View>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        width: WIDTH
      }}>
        <View style={{
          backgroundColor: 'rgba(16,16,16,255)',
          borderRadius: 12,
          paddingVertical: 18
        }}>

          <View>
            <Text style={{
              color: '#fff',
              alignSelf: 'center',
              fontFamily: 'PoppinsMedium',
              marginBottom: 10
            }}>One-Time PIN</Text>
          </View>


          <TextInput
            inputMode='decimal'
            maxLength={6}
            placeholder='******'
            textContentType='oneTimeCode'
            textAlign='center'
            placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
            style={{
              fontFamily: 'PoppinsRegular',
              color: '#fff',
              backgroundColor: 'rgba(30,30,30,255)',
              padding: 12,
              borderRadius: 12,
              marginVertical: 4,
              letterSpacing: 12
            }}
          />

          <TouchableOpacity
            onPress={() => nav.navigate('DashboardNavigator')}
            // disabled={false}
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
              borderRadius: 12,
              marginVertical: 4
            }}>
            <Text style={{
              fontFamily: 'PoppinsMedium',
            }}>Verify</Text>
          </TouchableOpacity>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              color: 'rgba(256, 256, 256, 0.6)',
              fontFamily: 'PoppinsRegular',
              fontSize: 12,
              marginVertical: 4,
            }}>Resend code in </Text>
            <TouchableOpacity
              onPress={() => nav.navigate('Register')}
            >
              <Text style={{
                color: '#fff',
                fontFamily: 'PoppinsRegular',
                fontSize: 12
              }}>30</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      <View style={{
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        width: WIDTH,
        marginBottom: 10
      }}>
        <Text style={{
          color: 'rgba(256, 256, 256, 0.4)',
          fontFamily: 'PoppinsRegular',
          fontSize: 10
        }}>© 2023</Text>
        <Text style={{
          color: 'rgba(256, 256, 256, 0.4)',
          fontFamily: 'PoppinsRegular',
          fontSize: 10
        }}>Kuma Technologies</Text>
        <Text style={{
          color: 'rgba(256, 256, 256, 0.4)',
          fontFamily: 'PoppinsRegular',
          fontSize: 10
        }}>|</Text>
        <Text style={{
          color: 'rgba(256, 256, 256, 0.4)',
          fontFamily: 'PoppinsRegular',
          fontSize: 10
        }}>Kurt Russelle Marmol</Text>
      </View>

    </View>
  )
}

export default VerifyOTP