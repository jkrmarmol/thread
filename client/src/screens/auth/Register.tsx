import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { View, Text, Image, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginBackgroundImage from '../../assets/images/english-dark.png'


const Register = () => {
  const { width } = useWindowDimensions();
  const WIDTH = (95 / 100) * width;
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
          paddingVertical: 18,
          paddingHorizontal: 10
        }}>

          <View>
            <Text style={{
              color: '#fff',
              alignSelf: 'center',
              fontFamily: 'PoppinsMedium',
              marginBottom: 10
            }}>Register with email</Text>
          </View>


          <TextInput
            placeholder='Email'
            placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
            style={{
              fontFamily: 'PoppinsRegular',
              color: '#fff',
              backgroundColor: 'rgba(30,30,30,255)',
              padding: 12,
              borderRadius: 12,
              marginVertical: 4
            }}
          />

          <TextInput
            placeholder='Password'
            placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
            secureTextEntry
            style={{
              color: '#fff',
              backgroundColor: 'rgba(30,30,30,255)',
              padding: 12,
              borderRadius: 12,
              fontFamily: 'PoppinsRegular',
              marginVertical: 4
            }}
          />

          <Text style={{
            color: 'rgba(256, 256, 256, 0.6)',
            textAlign: 'right',
            fontFamily: 'PoppinsRegular',
            fontSize: 12,
            marginVertical: 4
          }}>Forgot password?</Text>

          <TouchableOpacity
            disabled={false}
            onPress={() => nav.navigate('VerifyOTP')}
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
              borderRadius: 12,
              marginVertical: 4
            }}>
            <MaterialCommunityIcons name="email-outline" size={24} color="#000"
              style={{
                position: 'absolute',
                left: 12
              }}
            />
            <Text style={{
              fontFamily: 'PoppinsMedium',
            }}>Register</Text>
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
            }}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => nav.navigate('Login')}
            >
              <Text style={{
                color: '#fff',
                fontFamily: 'PoppinsRegular',
                fontSize: 12
              }}>Login here</Text>
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

export default Register