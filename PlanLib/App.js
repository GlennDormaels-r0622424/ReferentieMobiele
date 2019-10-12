import React from "react";
import { Alert, Button, View, Text,TextInput, ActivityIndicator, AsyncStorage, StatusBar, KeyboardAvoidingView, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import Plants from './screens/Plants';


const ScreenStack = createStackNavigator(
    {
      PlantsScreen: Plants
    },
    {
      initialRouteName: 'PlantsScreen',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#0074D9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
);

const AppContainer = createAppContainer(createSwitchNavigator(
    {
      App: ScreenStack,
    },
    {
      //initialRouteName: 'AuthLoading',
      initialRouteName:'App'
    }
  ));
  
export default class App extends React.Component {
    render() {
      return <AppContainer />;
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
});