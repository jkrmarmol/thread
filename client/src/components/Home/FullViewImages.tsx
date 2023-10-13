import { View, TouchableOpacity, useWindowDimensions, Text, StyleSheet } from 'react-native'
import React, { useRef, useMemo, useCallback } from 'react'
import { setStatusBarBackgroundColor, setStatusBarTranslucent, setStatusBarStyle } from 'expo-status-bar'
import { RouteProp, useRoute, useNavigation, NavigationProp, ParamListBase, useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Entypo } from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ImageZoom } from '@likashefqet/react-native-image-zoom'
import type { FullViewImagesRoute } from '../../typings/types'


export default function FullViewImages() {
  const route = useRoute<RouteProp<FullViewImagesRoute, 'Params'>>();
  const { imageSrc } = route.params;
  const nav = useNavigation<NavigationProp<ParamListBase>>();
  const { width } = useWindowDimensions();
  const WIDTH = (90 / 100) * width;

  setStatusBarStyle('light')
  setStatusBarTranslucent(true)
  setStatusBarBackgroundColor('rgba(16,16,16,255)', true)

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['13%'], []);
  const handleBottomOpen = () => bottomSheetRef.current?.present();

  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, [])
  );


  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{
        backgroundColor: 'rgba(16, 16, 16, 255)',
        flex: 1
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: WIDTH,
          alignSelf: 'center',
          marginTop: 16
        }}>
          <TouchableOpacity
            onPress={() => nav.goBack()}
            style={{
              backgroundColor: '#ffffff26',
              borderRadius: 100,
              padding: 3,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Feather name="x" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBottomOpen}
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Entypo name="dots-three-horizontal" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ImageZoom
            source={imageSrc}
            maxScale={3}
            resizeMode='contain'
            style={{
              width: '100%'
            }}
          />
        </View>

        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          enableContentPanningGesture={false}
          backdropComponent={(props) => (<BottomSheetBackdrop {...props}
            opacity={0.5}
            enableTouchThrough={false}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} />)}
          snapPoints={snapPoints}
          handleIndicatorStyle={{
            backgroundColor: 'rgba(38,38,38,255)'
          }}
          backgroundStyle={{
            backgroundColor: 'rgba(24,24,24,255)'
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity style={{
            backgroundColor: 'rgba(38,38,38,255)',
            padding: 10,
            marginTop: 5,
            paddingVertical: 12,
            width: WIDTH,
            borderRadius: 12,
            justifyContent: 'center'
          }}>
            <Text style={{
              fontFamily: 'PoppinsRegular',
              color: '#fff'
            }}>Save Image</Text>
          </TouchableOpacity>
        </BottomSheetModal>



      </SafeAreaView>
    </ BottomSheetModalProvider>
  )
}