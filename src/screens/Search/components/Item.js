import React, { Component } from "react";
import { Icon, Text, Left, CardItem } from "native-base";

import styles from "../../../styles";

// component for a item, which has right angle and item name
const Item = ({ node: { name }, traverse = undefined }) => (
  <CardItem
    style={styles.listItem}
    bordered={true}
    button={traverse !== undefined}
    onPress={traverse}
  >
    <Left>
      {traverse !== undefined && (
        <Icon style={styles.arrow} name="angle-right" />
      )}
      <Text style={styles.text}>{name}</Text>
    </Left>
  </CardItem>
);

export default Item;
