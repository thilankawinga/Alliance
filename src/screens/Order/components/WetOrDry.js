import React, { Component } from "react";
import { Button, Text } from "native-base";
import { Col, Grid } from "react-native-easy-grid";

import colours from "../../../colours";
import styles from "../../../styles";
const myStyle = {
  button: {
    padding: 15,
    borderWidth: 2
  },
  title: {
    fontWeight: "bold"
  },
  gap: {
    width: 20,
    marginTop: 50
  },
};

const WET = 'Wet';
const DRY = 'Dry';

const HireTypeButton = ({label, selected, notSupported,  disabled, updateHireType }) => {
  const backgroundColour = disabled || notSupported ? '#ccc' : selected ? colours.gold : colours.blue;
  const borderColour = disabled || notSupported ? '#aaa' : colours.gold;
  const textColour = disabled || notSupported ? '#aaa' : selected ? colours.blue : colours.gold;
  const handlePress = disabled
    ? () => alert("This item doesn't support that option")
    : notSupported
      ? () => alert("Your company doesn't support this option")
      : updateHireType;
  return (
    <Button
      block
      style={{ ...myStyle.button, borderColor: borderColour, backgroundColor: backgroundColour }}
      onPress={handlePress}
    >
      <Text style={{ ...myStyle.title, color: textColour }}>{label}</Text>
    </Button>
  );
};

// click but for dry or wet, execute onValueChange
export default class WetOrDry extends Component {
  render() {
    const { disabled, selectedValue, onValueChange, hireTypeOptions } = this.props;
    if (!hireTypeOptions) return null;
    const { ItemHireTypeOption, HasDryOptions, HasWetOptions } = hireTypeOptions;
    return (
      <Grid>
        <Col>
          <HireTypeButton
            label="DRY"
            selected={selectedValue === DRY}
            notSupported={ItemHireTypeOption === WET}
            disabled={disabled || !HasDryOptions}
            updateHireType={() => onValueChange(DRY)}
          />
        </Col>
        <Col style={myStyle.gap}></Col>
        <Col>
          <HireTypeButton
            label="WET"
            selected={selectedValue === WET}
            notSupported={ItemHireTypeOption === DRY}
            disabled={disabled || !HasWetOptions}
            updateHireType={() => onValueChange(WET)}
          />
        </Col>
      </Grid>
    );
  }
}