import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "native-base";

import colours from "../colours";
const myStyle = {
  text: {
    color: colours.white,
    fontSize: 14
  }
};

export default class UList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, itemStyle = {} } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={myStyle.text}> {'\u2022'}</Text>
        <Text style={{ ...myStyle.text, ...itemStyle, flex: 1, paddingLeft: 5 }}>{item}</Text>
      </View>
    );
  }
}