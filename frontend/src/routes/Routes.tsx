import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Proposta from '../pages/Proposta';
import NCut from '../pages/NCut';
import Knapsack from '../pages/Knapsack';
import YesNo from '../pages/YesNo';
import ApprovalOne from '../pages/ApprovalOne';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Proposta"
          component={Proposta}
          initialParams={{
            id: 0,
            titulo: '',
          }}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Votação N-CUT"
          component={NCut}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Votação Mochileiro"
          component={Knapsack}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Votação Aprova-Um"
          component={ApprovalOne}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Votação Sim-Não"
          component={YesNo}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
