import React, { Component } from "react";
import { View } from "react-native";
import { Button, Icon, Text, ListItem } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import colours from "../../../colours";
import styles from "../../../styles";
const myStyle = {
  item: {
    ...styles.item,
    backgroundColor: colours.white,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5
  },
  text: {
    fontSize: 10
  },
  between: {
    justifyContent: "space-between"
  },
  column: {
    justifyContent: "center",
    alignContent: "flex-start"
  }
};

export default class ContactRow extends Component {
  constructor(props) {
    super(props);
  }

  formatPrice = (price, suffix) => (price === 0 ? null : `$${price} ${suffix}`);

  render() {
    const {
      object,
      handleSelect = undefined,
      selected = false,
      companySettings,
      hireType
    } = this.props;
    const {
      SupplierCompanyName,
      RelationshipName,
      LocationSuburbName,
      ManufacturerName,
      Model,
      NhrDry,
      CurrentHirePeriodName
    } = object;
    const activeStyle = selected ? { backgroundColor: colours.gold } : {};
    const shouldShowCompanyName = companySettings.ShowSupplierName; // TODO: only for supplier rows
    const companyRelation = `[${RelationshipName}]`;
    const companyName = shouldShowCompanyName ? (
      <Col style={myStyle.column}>
        <Row>
          <Text style={myStyle.text}>{`${SupplierCompanyName}`}</Text>
        </Row>
        <Row>
          <Text style={myStyle.text}>{companyRelation}</Text>
        </Row>
      </Col>
    ) : (
      <Col style={myStyle.column}>
        <Row>
          <Text style={myStyle.text}>{companyRelation}</Text>
        </Row>
      </Col>
    );

    return (
      <ListItem
        style={{ ...myStyle.item, ...activeStyle }}
        button={handleSelect !== undefined}
        onPress={handleSelect}
      >
        <Grid style={myStyle.between}>
          {companyName}
          <Col style={{ ...myStyle.column, alignItems: "center" }}>
            <Row>
              <Text style={myStyle.text}>{`${ManufacturerName}`}</Text>
            </Row>
            <Row>
              <Text style={myStyle.text}>{`${Model}`}</Text>
            </Row>
          </Col>
          <Col style={{ ...myStyle.column, alignItems: "center" }}>
            <Row>
              <Text style={myStyle.text}>
                {this.formatPrice(
                  object[`CurrentDiscountedRate${hireType}`],
                  CurrentHirePeriodName.toLowerCase()
                )}
              </Text>
            </Row>
            <Row>
              <Text style={myStyle.text}>
                {this.formatPrice(object[`Nhr${hireType}`], "nhr")}
              </Text>
            </Row>
          </Col>
          <Col style={{ ...myStyle.column, alignItems: "flex-end" }}>
            <Row>
              <Text style={{ ...myStyle.text, textAlign: "right" }}>
                {LocationSuburbName}
              </Text>
            </Row>
          </Col>
        </Grid>
      </ListItem>
    );
  }
}
