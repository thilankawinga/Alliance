import React, { Component } from "react";
import {
  Text,
  View,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Body
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment-timezone";

import styles from "../../../../styles";
import colours from "../../../../colours";
const myStyle = {
  h1: {
    fontWeight: "bold",
    color: colours.gold,
    marginBottom: 20,
    fontSize: 20,
  },
  item: {
    ...styles.item,
    paddingTop: 5,
    paddingBottom: 5
  },
  between: {
    justifyContent: "space-between"
  },
  column: {
    marginBottom: 5,
    alignContent: "center"
  },
  tableColumn: {
    marginBottom: 5,
    alignContent: "left"
  },
  columnLeft: {
    width: 60,
    marginBottom: 5,
    alignContent: "left"
  },
  columnRight: {
    // width:100,
    marginBottom: 5,
    alignContent: "left"
  },
  htext: {
    color: colours.gold
  },
  rowItem: {
    ...styles.item,
    backgroundColor: colours.white,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  pad: {
    marginLeft: 10,
    marginRight: 10
  },
  padL: {
    marginLeft: 5
  },
  text: {
    color: colours.blue,
    fontSize: 14,
    textAlign: "left"
  },
  tableText: {
    color: colours.blue,
    fontSize: 14,
    textAlign: "left"
  },
  br: {
    height: 20
  },
  rowItemStyle: {
    backgroundColor: colours.white,
    borderRadius: 5,
    padding: 10,
    minHeight: 40
  },
  colItemStyle: {
    width: 40,
    alignItems: "flex-end",
    alignSelf: "center"
  }
};

// details page: Location, email, phone number,
class ContactItem extends Component {
  // order summary 
  // TODO: SHOW LIKE TABLE
  renderOredrSummary(orderSummary) {
    if (!orderSummary) return null;
    return (
      <Grid>
        <Row style={{marginTop: 10}}>
          <Col style={{ ...myStyle.columnLeft }}>
            <Text style={{ fontWeight: "bold", color: colours.gold }}>{`From: `}</Text>
          </Col>
          <Col style={{ ...myStyle.columnRight }}>
            <Text style={{ color: colours.white }}>{`${moment(orderSummary.startDate).format('dddd[,] Do MMMM LT')}`}</Text>
          </Col>
        </Row>
        <Row>
          <Col style={{ ...myStyle.columnLeft }}>
            <Text style={{ fontWeight: "bold", color: colours.gold }}>{`To: `}</Text>
          </Col>
          <Col style={{ ...myStyle.columnRight }}>
            <Text style={{ color: colours.white }}>{`${moment(orderSummary.endDate).format('dddd[,] Do MMMM LT')}`}</Text>
          </Col>
        </Row>
      </Grid>
    );
  }

  renderRow(labelName, name, icon, handleAction) {
    if (!name) return null;
    return (
      <TouchableOpacity onPress={() => handleAction(name)}>
        <View style={myStyle.br} />
        <Col>
          <Row>
            <Text style={myStyle.htext}>{labelName}</Text>
          </Row>
          <Row style={myStyle.rowItemStyle}>
            <Col>
              <Text style={myStyle.text}>{name}</Text>
            </Col>
            <Col style={myStyle.colItemStyle}>
              <Icon
                style={{ ...myStyle.padL, color: colours.blue, fontSize: 20 }}
                name={icon}
              />
            </Col>
          </Row>
        </Col>
      </TouchableOpacity>
    );
  }

  // supplier
  renderSupplier() {
    const {
      contact: { BranchName, Address, Email, Phone, CityName },
      handlePhoneCall,
      handleEmail,
      orderSummary
    } = this.props;
    const convertLineBreaks = str => {
      const replace_map = {
        "<br />": "\n",
        "<br/>": "\n"
      };
      return str.replace(/(<br \/>|<br\/>)/g, match => {
        return replace_map[match];
      });
    };
    return (
      <Content style={styles.content}>
        <Grid style={myStyle.between}>
          {this.renderOredrSummary(orderSummary)}
          <Text style={myStyle.h1}>{BranchName}</Text>
          <Row>
            <Col>
              <Row>
                <Text style={myStyle.htext}>Address</Text>
              </Row>
              <Row style={myStyle.rowItemStyle}>
                <Text style={myStyle.text}>
                  {`${convertLineBreaks(Address)}`}
                </Text>
              </Row>
            </Col>
          </Row>
          {this.renderRow("Email address", Email, "envelope", (email) => handleEmail({ email, name: BranchName }))}
          {this.renderRow("Phone number", Phone, "phone", handlePhoneCall)}
        </Grid>
      </Content>
    );
  }

  renderInstance() {
    const {
      contact: { Name, CityName, Email, Phone, Mobile },
      handlePhoneCall,
      handleEmail,
      orderSummary
    } = this.props;
    return (
      <Content style={styles.content}>
        <Grid style={myStyle.between}>
          {this.renderOredrSummary(orderSummary)}
          <Text style={myStyle.h1}>{Name}</Text>
          <Row>
            <Text style={myStyle.htext}>Location</Text>
          </Row>
          <Row style={myStyle.rowItemStyle}>
            <Col>
              <Text style={myStyle.text}>{CityName}</Text>
            </Col>
          </Row>
          {this.renderRow("Email address", Email, "envelope", (email) => handleEmail({ email, name: Name }))}
          {this.renderRow("Phone number", Phone, "phone", handlePhoneCall)}
          {this.renderRow("Mobile number", Mobile, "mobile", handlePhoneCall)}
        </Grid>
      </Content>
    );
  }

  render() {
    const { contact } = this.props;
    if (contact && contact.Address) {
      return this.renderSupplier();
    }
    return this.renderInstance();
  }
}

export default ContactItem;
