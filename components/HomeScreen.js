import React, { Component } from "react";
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import ImagePicker from "react-native-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
//import RNFetchBlob from 'rn-fetch-blob';
import axios from "axios";
const options = {
  title: "my pic app",
  takePhotoButtonTitle: "Take photo with your camera",
  chooseFromLibraryButtonTitle: "Choose photo from library"
};

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      BtnDisabled: true,
      Mydata: null,
      Activty: false,
      Name : ''
  
    };
  }
  OnClick = () => {
    try {
      ImagePicker.showImagePicker(options, response => {
        console.log("Response = ", response);
  
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("Image Picker Error: ", response.error);
        } else {
          let source = { uri: response.uri };
          console.log(response.path);
  
          // You can also display the image using data:
          //let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.setState({
            avatarSource: source,
            Mydata: response,
            BtnDisabled: false,
            Name : response.fileName,
          });
        }
      });
   }
   catch (e) {
     console.error(e.message);
   }
    
  };
  Send = () => {
    this.setState({
      Activty: true
    });
    console.log(this.state.Mydata.uri);
    console.log(this.state.Mydata.type);
    console.log(this.state.Mydata.fileName);
    
    
    const data = new FormData();
    data.append('file', {
      uri : this.state.Mydata.uri,
      type: this.state.Mydata.type,
      name: this.state.Mydata.fileName
     });
    //https://articles.free.beeceptor.com/upload_file
    //http://web001.fogits.com:8000/api/prediction/check_prediction/
    //http://192.168.0.14:8000/upload/

    const url = "http://web001.fogits.com:8000/api/prediction/check_prediction/";
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body:data
    })
    .then(res => res.json())
    .then(response => {
      this.setState({
        Activty: false
      });
      console.log(response);
     

       this.props.navigation.navigate("states", {
         Benign: response.Benign,
         Malignant: response.Malignant,
         Image : this.state.avatarSource,
         Name : this.state.Name
       });
     })
    .catch(error => console.error("Error:", error.Text));
  };

  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        {this.state.Activty ? (
          <ActivityIndicator size="large" />
        ) : (
          <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "stretch",
            backgroundColor: "#FFFFFF"
          }}>
            <View style={{ flex:0.02,backgroundColor: "#c4d436"}}/>
            <View
             style={{
              flex: 0.60,
              flexDirection: "column",
              alignItems: "stretch",
              backgroundColor: "#FFFFFF"
            }}>
            <Image
              source={this.state.avatarSource}
              style={{ height: 300, margin: 50 }}
            />
            <Text style={{fontSize: 20, textAlign: "center",}}>{this.state.Name}</Text>
            </View>
            <View
              style={{
                flex: 0.4,
                flexDirection: "column",
                alignItems: "stretch",
                backgroundColor: "#F4F4F4"
              }}>
            
            <TouchableOpacity
            style={styles.SelectButtonStyle}
            activeOpacity={0.5}
            onPress={this.OnClick}>
            <Text style={styles.TextStyle} > Upload Image </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButtonStyle}
            activeOpacity={0.5}
            onPress={this.Send}
            disabled={this.state.BtnDisabled}>
            <Text style={styles.TextSendStyle} > OK,Treat IMAGE </Text>
          </TouchableOpacity>
            </View>
            
            
           

          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  SelectButtonStyle: {
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
  sendButtonStyle: {
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff"
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  TextSendStyle: {
    color: "#c4d436",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
});
