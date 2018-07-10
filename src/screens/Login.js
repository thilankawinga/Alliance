import React, { Component } from "react";
import { StatusBar, StyleSheet, View, Image, Platform, Keyboard, Animated } from "react-native";
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
  Spinner
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";

import styles from "../styles";
import colours from "../colours";
import { actionCreators } from "../allianceRedux";
import RButton from "../components/RButton";
import UList from "../components/UList";

const logoName = require("../assets/logonamecap.png");

const myStyle = {
  heading: {
    color: colours.white,
    fontWeight: "bold"
  },
  text: {
    fontSize: 14,
    color: colours.white
  },
  bottom: {
    height: 90,
    margin: 10
  },
};

// show login/info, has add keyboard listener
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoVisible: false,
      username: "",
      password: "",
      keyboardVisible: false
    };
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  // Animated.parallel: start multiple React Native animations at once, with one callback for all animations. 
  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
    ]).start();
    this.setState({ keyboardVisible: true });
  }

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
    this.setState({ keyboardVisible: false });
  }


  // login of dev
  componentDidMount() {
    if (__DEV__) {
      const { dispatch } = this.props;
      dispatch(actionCreators.login("DickM", "ScottC1961"));
    }
  }

  handleInfo = () => this.setState({ infoVisible: !this.state.infoVisible });

  handleChange = (key, value) => {
    const obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  handleLogin = () => {
    const { onLogin } = this.props;
    const { username, password } = this.state;
    onLogin(username, password);
  }

  render() {
    const { isFetching, toastError } = this.props;
    const { infoVisible, keyboardVisible } = this.state;
    const inputPaddingTop = keyboardVisible ? 0 : Platform.OS === "android" ? 65 : 40;
    const input = (
      <Row>
        <Col
          style={{
            justifyContent: "space-around",
            paddingTop: inputPaddingTop
          }}
        >
          {toastError ? (
            <Text style={styles.error}>
              {toastError == "Your session has expired"
                ? toastError
                : "Invalid username and password combination"}
            </Text>
          ) : null}
          <Item regular style={styles.input}>
            <Input
              name="username"
              onChangeText={val => this.handleChange("username", val)}
              placeholder="Username"
            />
          </Item>
          <Item regular style={styles.input}>
            <Input
              name="password"
              onChangeText={val => this.handleChange("password", val)}
              secureTextEntry={true}
              placeholder="Password"
            />
          </Item>
        </Col>
      </Row>
    );
    const info = (
      <Col>
        <Text style={myStyle.heading}>Vision</Text>
        <Text style={myStyle.text}>
          To consolidate and align two key groups of businesses and create more
          value to both entities using online technology. Coupled with this
          service we compile and furnish performance fleet management reporting
          to our Customers and to the Hire Companies supplying the equipment.
        </Text>
        <Text style={{ ...myStyle.heading, paddingTop: 5 }}>
          Methodology & Offering
        </Text>
        <UList item="We provide online mobile services via a unique and innovative hire platform which effectively operates as a conduit presenting and offering a consolidated ‘One-Stop Hire-Shop’ for its customers" />
        <UList item="We facilitate the Hire or Rent of a wide range of equipment available from multiple specialist & general Hire Equipment companies who are selected by the Customer as their hire Equipment Suppliers" />
        <UList item="Our methodology enables Customers to: Search, View, Book, Secure and Manage the best value hire solution every time from their chosen Preferred Service Providers" />
        <UList item="The platform provides capability for our Customers to Fleet Manage and internally or externally the hire of their own equipment if desired" />
        <Text style={{ ...myStyle.heading, paddingTop: 5 }}>
          Customer Strengths & Benefits
        </Text>
        <UList item="It maintains competitiveness in every hire transaction" />
        <UList item="Ensures competition on hire equipment suppliers based on the wider opportunity from the nationwide network of Alliance Hire system users participating" />
        <UList item="It highlights and provides the opportunity to select and hire the Customers own underutilised plant & equipment within their wider organisation or even externally to chosen qualifying companies assisting with improved equipment ROI" />
        <UList item="It ensures hire suppliers rates/pricing are consistent nationally and are kept in check with nationwide transparency" />
        <UList item="Identifies and compares current PSA/negotiated hire rates for equipment groups or individual items of equipment against other capable and potential hire suppliers" />
        <UList item="Provides filtering capability of hire equipment suppliers based on preferred selection – deciding influences being Rates, H&S Standards, Fleet Capability etc. based on regular performance reporting versus agreed KPI’s" />
        <UList item="Provides 24 x 7 accessibility via a web based platform for its Customers" />
        <UList item="Provides online visibility of equipment on hire and the future pipeline of hire bookings" />
      </Col>
    );

    const renderHeader = (
      <Row style={styles.offwhite} style={styles.header}>
        <Col>
          <Header noShadow={true} style={styles.loginHeader}>
            <Body style={styles.loginHeaderC}>
              <Image style={styles.logoName} source={logoName} />
            </Body>
          </Header>
        </Col>
      </Row>
    );

    const renderInfo = (
      <View style={styles.info}>
        <Button onPress={this.handleInfo} style={styles.infoButton}>
          <Icon
            style={styles.infoIcon}
            name={infoVisible ? "times" : "info-circle"}
          />
        </Button>
      </View>
    );

    return (
      <Container>
        <Grid style={styles.blue}>
          {!keyboardVisible && renderHeader}
          <Row>
            <Content style={styles.loginContent}>
              {infoVisible ? info : input}
            </Content>
          </Row>
          <Row style={myStyle.bottom}>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              {isFetching ? <Spinner color="white" /> : <RButton
                large
                onPress={this.handleLogin}
                disabled={isFetching}
                text="LOGIN"
              />}
            </Col>
          </Row>
          <Animated.View style={[{ height: this.keyboardHeight }]} />
        </Grid>
        {!keyboardVisible && renderInfo}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  toastError: state.toastError
});

export default connect(mapStateToProps)(Login);
