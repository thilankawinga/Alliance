import React, { Component } from "react";
import { Linking } from "react-native";
import { Text, View, Content, Spinner } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";

import { actionCreators } from "../../../allianceRedux";
import { BackButton } from "../../../components/BackButton";
import ContactItem from "../components/order/ContactItem";
import ContactList from "../components/order/ContactList";
import moment from "moment-timezone";

import styles from "../../../styles";
import colours from "../../../colours";
const myStyle = {
  bottom: {
    height: 75,
    margin: 5,
    backgroundColor: "transparent"
  },
  h1: {
    fontWeight: "bold",
    color: colours.gold,
    marginBottom: 10
  }
};

class OrderInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactObj: null,
      isContactVisible: false
    };
  }

  handleBackButton = () => {
    const { contactObj, isContactVisible } = this.state;
    const { goToTab, orderDetails } = this.props;
    if (isContactVisible) {
      this.setState({ isContactVisible: false });
    } else {
      goToTab(2);
    }
  };

  selectContact = contact => this.setState({ contactObj: contact, isContactVisible: true });

  selectCity = cityId => {
    const { dispatch } = this.props;
    dispatch(actionCreators.updateOrder(cityId));
  };

  makePhoneCall = phoneNumber => this.openLink(`tel:${phoneNumber.replace(/[()/\s]/g, "")}`);

  emailBodyBuilder = ({
    recipient,
    companyName,
    myName,
    contactNumber,
    itemName,
    startDate,
    endDate
  }) => {
    return `To%20${recipient},%0D%0A%0D%0AI/We%20confirm%20we%20require%20to%20hire%20the%20equipment%20type%20below%20on%20the%20dates%20/times%20indicated.%0D%0A%0D%0ACompany:%0D%0A${companyName}%0D%0A%0D%0AContact:%0D%0A${myName}%0D%0A%0D%0APhone:%0D%0A${contactNumber}%0D%0A%0D%0AItem%20Required:%0D%0A${itemName}%0D%0A%0D%0ARequired%20From:%0D%0A${startDate}%0D%0A%0D%0ARequired%20Until:%0D%0A${endDate}%0D%0A%0D%0AAny%20queries%20please%20contact%20me%20directly%20via%20my%20phone.`;
  };

  createEmail = ({ email, name }, options) => this.openLink(`mailto:${email}?subject=Hire&body=${this.emailBodyBuilder({ ...options, recipient: name })}`);

  openLink = link =>
    Linking.canOpenURL(link)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + link);
        } else {
          return Linking.openURL(link);
        }
      })
      .catch(err => {
        console.log("An error occurred opening link", err);
        throw err;
      });

  render() {
    const { 
      goToTab, 
      orderDetails, 
      supplierCities, 
      orderSummary, 
      user, 
      companySettings, 
      selectedItem 
    } = this.props;
    const { contactObj, isContactVisible } = this.state;
    const options = {
      companyName: companySettings.CompanyName,
      myName: user.FullName,
      contactNumber: user.MobileNumber,
      itemName: selectedItem && `${selectedItem.category} ${selectedItem.name}`,
      startDate: moment(orderSummary.startDate).format('dddd[,] Do MMMM LT'),
      endDate: moment(orderSummary.endDate).format('dddd[,] Do MMMM LT')
    };
    const renderContent = () => {
      if (orderDetails === null) {
        return (
          <Content style={styles.content}>
            <Text style={myStyle.h1}>Contact Details</Text>
            <Spinner color="white" />
          </Content>
        );
      }
      if (contactObj && isContactVisible) {
        return (
          <ContactItem
            contact={contactObj}
            orderSummary={orderSummary}
            handlePhoneCall={this.makePhoneCall}
            handleEmail={(userDetails) => this.createEmail(userDetails, options)}
          />
        );
      }
      return (
        <ContactList
          contacts={orderDetails}
          cities={supplierCities}
          handleSelect={this.selectContact}
          handleCityChange={this.selectCity}
        />
      );
    };

    return (
      <Grid style={styles.blue}>
        <Row>{renderContent()}</Row>
        <Row style={myStyle.bottom}>
          <BackButton goBack={this.handleBackButton} />
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  orderDetails: state.orderDetails,
  companySettings: state.companySettings,
  user: state.user,
  supplierCities: state.supplierCities,
  orderSummary: state.orderSummary,
  selectedItem: state.selectedItem
});

export default connect(mapStateToProps)(OrderInstance);
