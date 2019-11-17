import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,AsyncStorage
} from "react-native";


class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
   
  };
  state = {
    Email : '' ,
    Password : ''
  }
  FindUser= async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user)
      if(parsed.email === this.state.Email && parsed.password === this.state.Password ){
        //alert(parsed.email);
        this.props.navigation.navigate('Home')
      }else{
        alert("no user exist with this email");
        
      }
      
    } catch (error) {
      alert(error);

    }
  }
  render() {
    console.disableYellowBox = true;
    return (
      <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#F4F4F4"
      }}>
      <View style={{ flex:0.02,backgroundColor: "#c4d436"}}/>
      <View
        style={{
          flex: 0.35,
          backgroundColor: "#FFFFFF",
          
          alignItems: "center",
          justifyContent: "center"
        }}>
        <View style={styles.Logo}>
        <View style={styles.outerCircle}>
          <Image
            style={styles.stretch}
            source={require("../images/logo.png")}
          />
        </View>
        </View>
      </View>
      <View style={{ flex: 0.65 }}>
        <TextInput
          onChangeText={(Email) => this.setState({Email})}
          value={this.state.Email}
          // Adding hint in Text Input using Place holder.
          placeholder='Email'
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
          // Calling the custom TextInputStyleClass.
          style={styles.TextInputStyleClass}
        />
        <TextInput
         onChangeText={(Password) => this.setState({Password})}
         value={this.state.Password}
          // Adding hint in Text Input using Place holder.
          placeholder='Password'
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
          // Calling the custom TextInputStyleClass.
          secureTextEntry={true}
          style={styles.TextInputStyleClass}
        />
        <Text style={styles.textPassword}>Forget Password ?</Text>

        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity={0.5}
          onPress={this.ButtonClickCheckFunction}>
          <Text style={styles.TextStyle}  onPress={this.FindUser }> Login </Text>
        </TouchableOpacity>

        <Text style={{ paddingLeft: "25%", marginTop: "22%" }} onPress={() => this.props.navigation.navigate('Register')}>
          Don't have an account ?
          <Text style={{ color: "#c4d436" }}>{""} Register</Text>
        </Text>
      </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  SubmitButtonStyle: {
    marginTop: 50,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#c4d436",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff"
  },
  text: {
    justifyContent: "center",
    alignItems: "center"
  },
  textPassword: {
    paddingTop: 10,
    paddingLeft: "60%"
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  TextInputStyleClass: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
    textAlign: "center",
    marginTop: 30,
    marginLeft: 30,
    height: 50,
    width: "85%",
    borderBottomWidth: 0,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    backgroundColor: "#FFFFFF"
  },
  Logo: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "white"
    
  },
  stretch: {
    flex: 1,
    
    marginLeft: 13,
    width: "80%",
    height: "8%",
    resizeMode: "contain"
  },
  outerCircle: {
    width: "100%",
  height: "100%",
  borderRadius: 150 / 2,
 
  borderColor: '#c4d436',
  borderWidth: 3
  },
});
export default LoginScreen;
