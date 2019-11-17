import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const chartConfig = {
  backgroundColor: "#c4d436",
  backgroundGradientFrom: "#6E8305",
  backgroundGradientTo: "#BCE200",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
};
const screenWidth = Dimensions.get("window").width;

export default class StatesScreen extends Component {
  static navigationOptions = {
    title: "states"
  };
  constructor(props) {
    super(props);

    this.state = {
      Benign: props.navigation.state.params.Benign,
      Malignant: props.navigation.state.params.Malignant,
      Image : props.navigation.state.params.Image,
      Name : props.navigation.state.params.Name
    };
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#F4F4F4"
      }}>
        <View style={{ flex:0.02,backgroundColor: "#c4d436"}}/>
       
        <View style={{ flex:0.49,backgroundColor: "#FFFFFF"}}>
        <Image
              source={this.state.Image}
              style={{ height: 350, width : 350 ,marginLeft: 5 }}
          />
             
          <Text style={{color: "#c4d436",fontSize: 20, textAlign: "center",marginBottom: 3}}>This image has Successfully Treated </Text>
        </View>
        <View
        style={{
          flex: 0.34,
          backgroundColor: "#F4F4F4",
        
         }}>
       
        {/* <BarChart
         
          data={{
            labels: ['Benign', 'Malignant'],
            datasets: [{
              data: [ this.state.Benign, this.state.Malignant]
            }]
            
          }
          
          }
          width={screenWidth}
          height={220}
          yAxisLabel={"%"}
          chartConfig={chartConfig}
          fromZero = {true}
          
        /> */}
        <PieChart
          data={[
            {
              name: "Benign",
              population: Math.round(this.state.Benign*100)/100 ,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "Malignant",
              population: Math.round(this.state.Malignant*100)/100,
              color: "#c4d436",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            }
          ]}
          width={screenWidth}
          height={180}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          
        />
         </View>
         <View
         style={{
          flex: 0.15,
          backgroundColor: "#FFFFFF",
        
         }}>
              <TouchableOpacity
                style={styles.SelectButtonStyle}
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.TextStyle} > Upload An other Image </Text>
              </TouchableOpacity>
         </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  SelectButtonStyle: {
    marginTop: 25,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#c4d436",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff"
  }, TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  }
);
