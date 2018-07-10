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

export default class ItemRow extends Component {
  constructor(props) {
    super(props);
  }

  formatPrice = (price, suffix = "") => price === 0 ? "NA" : `$${Math.round(price)} ${suffix}`;

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
      Rating,
      NhrDry,
      ListHourlyRateDry,
      RelationshipName,
      ClosestBranchCityName,
      CurrentHirePeriodName
    } = object;
    const activeStyle = selected ? { backgroundColor: colours.gold } : {};
    const { ShowSupplierName: shouldShowCompanyName } = companySettings; // TODO: only for supplier rows
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
          <Col style={{ ...myStyle.column}}>
            <Row>
             {/*} <Text style={myStyle.text}>{`${Rating}/5`}</Text>*/}
              <Text style={myStyle.text}></Text>
            </Row>
          </Col>
          <Col style={{ ...myStyle.column, alignItems: "flex-end"}}>
            <Row>
              <Text style={{ ...myStyle.text, textAlign: "right" }}>
                {this.formatPrice(
                  object[`CurrentDiscountedRate${hireType}`],
                  CurrentHirePeriodName.toLowerCase()
                )}
              </Text>
            </Row>
            <Row>
              <Text  style={{ ...myStyle.text, textAlign: "right" }}>
                {this.formatPrice(object[`Nhr${hireType}`], "nhr")}
              </Text>
            </Row>
          </Col>
          <Col style={{ ...myStyle.column, alignItems: "flex-end" }}>
            <Row>
              <Text style={{ ...myStyle.text, textAlign: "right" }}>
                {ClosestBranchCityName}
              </Text>
            </Row>
          </Col>
        </Grid>
      </ListItem>
    );
  }
}
