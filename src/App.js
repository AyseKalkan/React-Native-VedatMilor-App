import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackView, createStackNavigator } from '@react-navigation/stack';
import Acilis from './screens/Acilis';
import 'react-native-gesture-handler';
import Sehirler from './screens/Sehirler';
import Restoranlar from './screens/Restoranlar'
import RestoranDetay from './screens/RestoranDetay';
import Map from './screens/Map';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Acilis"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Acilis"
          component={Acilis}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Sehirler"
          component={Sehirler}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Restoranlar"
          component={Restoranlar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RestoranDetay"
          component={RestoranDetay}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;