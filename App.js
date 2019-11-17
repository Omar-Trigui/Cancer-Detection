

import React, {Fragment} from 'react';
import {Platform, StyleSheet, Text, View, YellowBox} from 'react-native';



import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import StatesScreen from './components/StatesScreen';

  const Router = createStackNavigator({
    
    Login : LoginScreen,
    Home : HomeScreen,
    Register : RegisterScreen ,
    states : StatesScreen , 
   }, {headerMode: 'none'});
 const Root = createAppContainer(Router);

  export default class App extends React.Component {
    render() {
      return <Root />;
    }
  }



