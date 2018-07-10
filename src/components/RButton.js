import React, { Component } from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "native-base";

import colours from "../colours";
const myStyle = {
  button: {
    borderWidth: 3,
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 35,
    position: "absolute",
    backgroundColor: "transparent"
  },
  text: {
    color: colours.gold,
    textAlign: "center",
    marginTop: 5,
    fontSize: 13
  }
};

export default class RButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { large, disabled, text } = this.props;
    const buttonSize = large ? 70 : 50;
    const disabledButton = disabled
      ? { backgroundColor: "#ccc", borderColor: "#aaa" }
      : { backgroundColor: colours.gold, borderColor: colours.white };
    const disabledIcon = disabled
      ? { color: "#aaa" }
      : { color: colours.white };
    const disabledText = disabled ? { color: "#aaa" } : { color: colours.gold };
    const buttonStyle = {
      ...myStyle.button,
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize,
      ...disabledButton
    };
    return (
      <View
        style={{ width: buttonSize, display: "flex", alignSelf: "flex-end" }}
      >
        <Button style={buttonStyle} {...this.props}>
          <Icon
            style={{ ...myStyle.icon, ...disabledIcon }}
            name={large ? "check" : "angle-left"}
          />
        </Button>
        <Text style={{ ...myStyle.text, ...disabledText }}>
          {text ? text : large ? "NEXT" : "BACK"}
        </Text>
      </View>
    );
  }
}
