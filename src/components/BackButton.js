import React, { Component } from "react";
import { View } from "native-base";
import { Col } from "react-native-easy-grid";

import RButton from "./RButton";

export const BackButton = ({ goBack }) => (
  <Col
    style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "row"
    }}
  >
    <View style={{ position: "absolute", bottom: 0, left: 20 }}>
      <RButton onPress={goBack} />
    </View>
  </Col>
);
