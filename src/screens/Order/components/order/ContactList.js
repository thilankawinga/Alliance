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
  Body,
  Button,
  Picker,
  Item
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import hash from "object-hash";
import { connect } from "react-redux";

import { actionCreators } from "../../../../allianceRedux";
import styles from "../../../../styles";
import colours from "../../../../colours";
const myStyle = {
  h1: {
    fontWeight: "bold",
    color: colours.gold,
    marginBottom: 10
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
    justifyContent: "center",
    alignContent: "center"
  },
  htext: {
    fontSize: 12,
    color: colours.gold
  },
  rowItem: {
    ...styles.item,
    backgroundColor: colours.white,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5
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
    fontSize: 10
  },
  cityList: {
    height: 30,
  },
  pickerView: {
    ...styles.item,
    backgroundColor: colours.white,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 5,
    flexDirection: 'column',
    marginBottom: 10,
    minHeight: 30
  },
  picker: {
    position: 'absolute',
    top: 0,
    width: 400,
    height: 30
  },
  pickerIcon: {
    position: 'absolute',
    zIndex: -10,
    right: 15,
    top: 8,
    color: colours.blue,
    fontSize: 14
  }
};

class ContactList extends Component {
  render() {
    const {
      contacts,
      handleSelect,
      handleCityChange,
      dispatch,
      supplierCities,
      cityId
    } = this.props;
    const renderRows = contacts => {
      if (contacts.length && contacts[0].Address) {
        return contacts.map(o => (
          <SuppContactRow
            key={hash(o)}
            details={o}
            selectContact={handleSelect}
          />
        ));
      }
      return contacts.map(o => (
        <InstContactRow
          key={hash(o)}
          details={o}
          selectContact={handleSelect}
        />
      ));
    };
    return (
      <Content style={{ ...styles.content, marginBottom: 0 }}>
        <Text style={myStyle.h1}>Contact Details</Text>
        {contacts.length && contacts[0].Address && <CityList
          onUpdate={(id) => dispatch(actionCreators.updateOrder(id))}
          cities={supplierCities}
          selectedCityId={cityId}
        />}
        <List style={{ borderRadius: 5, backgroundColor: colours.white }}>
          {renderRows(contacts)}
        </List>
      </Content>
    );
  }
}

const CityList = ({ onUpdate, cities, selectedCityId }) => {
  if (!cities || !selectedCityId) return null;
  const cityName = cities.filter(city => city.id === selectedCityId).Name;
  return (
    <View style={myStyle.pickerView}>
      <Picker
        style={myStyle.picker}
        textStyle={myStyle.text}
        mode="dropdown"
        placeholder={cityName}
        selectedValue={selectedCityId}
        onValueChange={onUpdate}
      >
        {cities.map(city => <Item label={city.Name} value={city.Id} key={city.Id} />)}
      </Picker>
      <Icon style={myStyle.pickerIcon} name="angle-down" />
    </View>
  );
};

const SuppContactRow = ({
  details: { BranchName, SuburbCity },
  selectContact,
  details
}) => (
    <ListItem
      style={myStyle.rowItem}
      button
      onPress={() => selectContact(details)}
    >
      <Grid style={myStyle.between}>
        <Col style={myStyle.column}>
          <Row>
            <Text style={{ ...myStyle.text, fontWeight: "bold" }}>
              {BranchName}
            </Text>
          </Row>
        </Col>
        <Col style={{ ...myStyle.column, alignItems: "flex-end" }}>
          <Row>
            <Text style={{ ...myStyle.text, textAlign: "right" }}>
              {SuburbCity}
            </Text>
          </Row>
        </Col>
        <Col
          style={{
            ...myStyle.column,
            width: 20,
            height: 14,
            alignItems: "flex-end",
            alignSelf: "center"
          }}
        >
          <Row>
            <Icon
              name="angle-right"
              style={{ fontSize: 14, textAlign: "right", color: colours.blue }}
            />
          </Row>
        </Col>
      </Grid>
    </ListItem>
  );

const InstContactRow = ({
  details: { Name, CityName },
  selectContact,
  details
}) => (
    <ListItem
      style={myStyle.rowItem}
      button
      onPress={() => selectContact(details)}
    >
      <Grid style={myStyle.between}>
        <Col style={myStyle.column}>
          <Row>
            <Text style={{ ...myStyle.text, fontWeight: "bold" }}>{Name}</Text>
          </Row>
        </Col>
        <Col style={{ ...myStyle.column, alignItems: "flex-end" }}>
          <Row>
            <Text style={{ ...myStyle.text, textAlign: "right" }}>
              {CityName}
            </Text>
          </Row>
        </Col>
        <Col
          style={{
            ...myStyle.column,
            width: 20,
            height: 14,
            alignItems: "flex-end",
            alignSelf: "center"
          }}
        >
          <Row>
            <Icon
              name="angle-right"
              style={{ fontSize: 14, textAlign: "right", color: colours.blue }}
            />
          </Row>
        </Col>
      </Grid>
    </ListItem>
  );

const mapStateToProps = state => ({
  supplierCities: state.supplierCities,
  cityId: state.user.CityId
});

export default connect(mapStateToProps)(ContactList);
