import React, { Component } from "react";
import { StatusBar, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Button,
  Body,
  Icon,
  Input,
  Item,
  Text,
  Footer,
  Toast,
  Left,
  Right,
  ListItem,
  List,
  InputGroup,
  Picker,
  Radio,
  CheckBox
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";

import RButton from "../components/RButton";
const logo = require("../assets/logoname.png");
import { actionCreators } from "../allianceRedux";

import styles from "../styles";
import colours from "../colours";
const myStyle = {
  list: {
    backgroundColor: colours.white,
    borderRadius: 5
  },
  column: {
    justifyContent: "center",
    alignContent: "center"
  },
  rowItem: {
    ...styles.item,
    backgroundColor: colours.white,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5
  },
  text: {
    color: colours.blue,
    fontSize: 12
  },
  iconCol: {
    justifyContent: "center",
    alignContent: "center",
    width: 20,
    height: 14,
    alignItems: "flex-end",
    alignSelf: "center"
  },
  defaultItem: {
    ...styles.item,
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 40,
    backgroundColor: colours.white,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5
  },
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompanyId: props.user.DefaultCompanyId,
      setDefault: false
    };
  }

  // set selectedCompanyId
  changeCompany = () => {
    const { selectedCompanyId, setDefault } = this.state;
    const { dispatch, navigation } = this.props;
    // TODO: need to update the user on server side
   dispatch(actionCreators.changeCompany(selectedCompanyId, setDefault));
    navigation.goBack(null);
  };

  // selectCompany setState
  selectCompany = selectedCompanyId => this.setState({ selectedCompanyId });

  // change default value
  toggleDefault = () => {
    const curr = this.state.setDefault;
    this.setState({ setDefault: !curr });
  };

  render() {
    const { selectedCompanyId } = this.state;
    const { navigation, userCompanies } = this.props;
    const isItemSelected = companyId => selectedCompanyId == companyId;
    // header includes 2 items. left: logo; right: nav.
    return (
      <Container>
        <Header style={{ marginTop: StatusBar.currentHeight, backgroundColor: "#FBF7EF" }}>
          <Body>
            <Image
              style={{ height: 30, resizeMode: "contain" }}
              source={logo}
            />
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.goBack(null)}>
              <Icon style={styles.bt} name="angle-left" />
            </Button>
          </Right>
        </Header>
        <Grid style={styles.blue}>
          <Row>
            <Content style={styles.content}>
              <List style={myStyle.list}>
                {userCompanies.map(({ CompanyName, CompanyId, IsDefault }) => (
                  <CompanyItem
                    name={CompanyName}
                    onUpdate={() => this.selectCompany(CompanyId)}
                    selected={isItemSelected(CompanyId)}
                    isDefault={IsDefault}
                    key={CompanyId}
                  />
                ))}
              </List>
            </Content>
          </Row>
          <Row style={styles.bottom}>
            <Col>
              <TouchableOpacity onPress={this.toggleDefault}>
                <View style={myStyle.defaultItem}>
                  <Grid style={{ justifyContent: "space-between" }}>
                    <Col style={myStyle.column}>
                      <Row>
                        <Text style={myStyle.text}>
                          Set as my default company
                        </Text>
                      </Row>
                    </Col>
                    <Col style={myStyle.iconCol}>
                      <Row>
                        <Icon
                          name={this.state.setDefault ? "check-circle-o" : "circle-o"}
                          style={{ fontSize: 14, textAlign: "right", color: colours.blue }}
                        />
                      </Row>
                    </Col>
                  </Grid>
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={myStyle.bottom}>
            <Col style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
              <View style={{ position: "absolute", bottom: 0, left: 20 }}>
                <RButton onPress={() => navigation.goBack(null)} />
              </View>
              <RButton text="SAVE" large onPress={this.changeCompany} />
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

// CompanyItem: got a name and select button
const CompanyItem = ({ name, onUpdate, selected, isDefault }) => (
  <ListItem
    style={myStyle.rowItem}
    button
    onPress={onUpdate}
  >
    <Grid style={{ justifyContent: "space-between" }}>
      <Col style={myStyle.column}>
        <Row>
          <Text style={myStyle.text}>
            {name}
          </Text>
        </Row>
      </Col>
      {isDefault && <Col style={{ ...myStyle.column, alignItems: "flex-end" }}>
        <Row>
          <Text style={{ ...myStyle.text, textAlign: "right", color: "#c0c0c0" }}>
            [default]
            </Text>
        </Row>
      </Col>}
      <Col style={myStyle.iconCol}>
        <Row>
          <Icon
            name={selected ? "check-circle-o" : "circle-o"}
            style={{ fontSize: 14, textAlign: "right", color: colours.blue }}
          />
        </Row>
      </Col>
    </Grid>
  </ListItem>
);

const mapStateToProps = state => ({
  userCompanies: state.userCompanies,
  user: state.user
});

export default connect(mapStateToProps)(Profile);
