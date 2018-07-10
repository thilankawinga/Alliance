import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleProvider } from "native-base";
import { Text } from "react-native";

import getTheme from "../native-base-theme/components";
import commonColor from "../native-base-theme/variables/commonColor";

import { actionCreators } from "./allianceRedux";
import Login from "./screens/Login";
import Navigation from "./Navigation";

// dreamy
console.disableYellowBox = true;

// set up page: first log in; if success, go to the navigation page. it calls the login action in redux.
class Setup extends Component {
  constructor() {
    super();
    Text.defaultProps.allowFontScaling = false;
  }

  onLogin = (username, password) => {
    const { dispatch } = this.props;
    dispatch(actionCreators.login(username, password));
  };

  render() {
    const { isLoggedIn } = this.props;
    const container = !isLoggedIn ? (
      <Login onLogin={this.onLogin} />
    ) : (
      <Navigation />
    );
    return (
      <StyleProvider style={getTheme(commonColor)}>{container}</StyleProvider>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(Setup);
