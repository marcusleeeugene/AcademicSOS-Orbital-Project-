import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class RadioButton extends Component {
  state = {
    value: null,
  };

  render() {
    const { type } = this.props;
    const { value } = this.state;

    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          {type.map((item) => {
            return (
              <View key={item.key} style={styles.buttonContainer}>
                <Text style={styles.text}>{item.text}</Text>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => {
                    this.setState({
                      value: item.key,
                    });
                  }}
                >
                  {value === item.key && <View style={styles.checkedCircle} />}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* <Text style={styles.text}> Selected: {this.state.value} </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
  },

  circle: {
    backgroundColor: "white",
    marginHorizontal: 2,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "black",
  },
  text: {
    marginHorizontal: 8,
    marginVertical: 10,
    color: "white",
    fontFamily: "Righteous-Regular",
  },
});

// import React, { Component } from "react";
// import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// export default class RadioButton extends Component {
//   state = {
//     value: null,
//   };

//   render() {
//     const { options } = this.props;
//     const { value } = this.state;

//     return (
//       <View styles={{ flex: 1, flexDirection: "row" }}>
//         {options.map((res) => {
//           return (
//             <View key={res.key} style={styles.container}>
//               <Text style={styles.radioText}>{res.text}</Text>
//               <TouchableOpacity
//                 style={styles.radioCircle}
//                 onPress={() => {
//                   this.setState({
//                     value: res.key,
//                   });
//                 }}
//               >
//                 {value === res.key && <View style={styles.selectedRb} />}
//               </TouchableOpacity>
//             </View>
//           );
//         })}
//         <Text> Selected: {this.state.value} </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "center",
//     // flexDirection: "row",
//     // justifyContent: "center",
//     // alignItems: "center",
//     // marginLeft: 90,
//     // marginHorizontal: -70,
//   },
//   radioText: {
//     marginRight: 15,
//     fontSize: 20,
//     color: "#000",
//     fontWeight: "700",
//   },
//   radioCircle: {
//     height: 30,
//     width: 30,
//     borderRadius: 100,
//     borderWidth: 2,
//     borderColor: "black",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   selectedRb: {
//     width: 15,
//     height: 15,
//     borderRadius: 10,
//     backgroundColor: "black",
//   },
//   result: {
//     marginTop: 10,
//     color: "white",
//     fontWeight: "600",
//     backgroundColor: "#F3FBFE",
//   },
// });
