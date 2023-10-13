import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigators/MainNavigator';
import store from './src/redux/store';
import { Provider as ReduxProvider } from 'react-redux/es/exports';


export default function App() {

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    PoppinsLight: require('./src/assets/fonts/Poppins/Poppins-Light.ttf'),
    PoppinsRegular: require('./src/assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsMedium: require('./src/assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./src/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PoppinsBold: require('./src/assets/fonts/Poppins/Poppins-Bold.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    try {
      if (fontsLoaded) {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 300)
      }
    } catch (err) {
      console.log(err)
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        <ReduxProvider store={store}>
          <MainNavigator />
        </ReduxProvider>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}