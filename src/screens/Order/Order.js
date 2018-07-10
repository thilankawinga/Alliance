import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Button as NativeButton,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  ScrollView
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Body,
  Button,
  Icon,
  Text,
  Item,
  Input,
  Left,
  Right,
  Card,
  CardItem,
  Tabs,
  Tab,
  TabHeading,
  Thumbnail
} from "native-base";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";

import moment from "moment-timezone";
const logo = require("../../assets/logoname.png");
import styles from "../../styles";
import ChangeTime from "./views/ChangeTime";
import SelectInstance from "./views/SelectInstance";
import OrderInstance from "./views/OrderInstance";
import { actionCreators } from "../../allianceRedux";
import colours from "../../colours";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const myStyle = {
  itemDesc: {
    flexBasis: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colours.gold,
    zIndex: 3,
    padding: 10
  },
  more: {
    position: "absolute",
    bottom: -14,
    right: deviceWidth / 2 - 15,
    width: 30,
    height: 20,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: colours.gold,
    borderRadius: 15
  },
  moreIcon: {
    fontSize: 20,
    textAlign: "center",
    color: colours.white,
    backgroundColor: "transparent"
  },
  text: {
    fontSize: 14,
    color: colours.blue
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colours.blue
  },
  expand: {
    position: "absolute",
    width: deviceWidth,
    top: 37,
    backgroundColor: colours.gold,
    borderBottomColor: colours.white,
    borderBottomWidth: 2
  },
  itemNames: {
    flexDirection: "column",
    justifyContent: "center"
  },
  moreContext: {
    padding: 10,
    backgroundColor: "transparent"
  },
  hidden: {
    height: 0,
    display: "none"
  },
  detailAttrs: {
    paddingTop: 5
  },
  detailText: {
    fontSize: 11,
    color: colours.blue
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colours.blue
  },
  attrTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: colours.blue
  },
  detailBottom: {
    marginBottom: 20
  }
};

// list of detail attributes
const ListItem = ({ attr, idx = -1 }) => (
  <Row key={`${attr.Label}:${idx}`} style={myStyle.detailAttrs}>
    <Col>
      <Text style={myStyle.attrTitle}>{attr.Label}</Text>
    </Col>
    <Col>
      <Text style={myStyle.detailText}>{attr.Value}</Text>
    </Col>
  </Row>
);

// the details of the selected item
class Expand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      height: new Animated.Value(10)
    };
  }

  componentDidMount() {
    const { node: { name, parentId }, tree, dispatch } = this.props
    const category =
      tree && tree.getRoot() ? tree.getRoot().find(parentId).name : "Loading";
    dispatch(actionCreators.selectItem({ name, category }));
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.open !== nextState.open) {
      nextState.open ? this.open() : this.close();
    }
  };

  // open the order info
  open = () => {
    Animated.timing(this.state.height, {
      easing: Easing.inOut(Easing.ease),
      duration: 400,
      toValue: deviceHeight / 2
    }).start();
    // load content
  };

  // close the order info
  close = () => {
    Animated.timing(this.state.height, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: 10
    }).start();
  };

  // renderItemDetails: Description and order dateFrom - dateTo
  renderItemDetails = (itemDetails, orderSummary) =>
    !(itemDetails && itemDetails.Description) ? null : (
      <Grid>
        <Row>
          <Col>
            {/* <Text style={myStyle.detailTitle}>Description</Text> */}
            <Text style={myStyle.detailText}>{itemDetails.Description}</Text>
          </Col>
        </Row>
        <Row style={myStyle.detailBottom}>
          <Col>
            {/* <Text style={myStyle.detailTitle}>Attributes</Text> */}
            {itemDetails.Attributes.Attribute.map((attr, idx) => <ListItem attr={attr} idx={idx} key={`${attr.attrTitle}:${idx}`} />)}
            
           {/* {orderSummary && <ListItem attr={{ Label: "From", Value: moment(orderSummary.startDate).format('dddd[,] Do MMMM LT') }} />}
            {orderSummary && <ListItem attr={{ Label: "Until", Value: moment(orderSummary.endDate).format('dddd[,] Do MMMM LT') }} />}*/}
          </Col>
        </Row>
      </Grid>
    );

  render() {
    const { node: { name, parentId }, tree, itemDetails, orderSummary } = this.props;
    const { height } = this.state;
    const category =
      tree && tree.getRoot() ? tree.getRoot().find(parentId).name : "Loading";
    return (
      <View style={myStyle.itemDesc}>
        <View style={myStyle.itemNames}>
          <Text style={myStyle.title}>{category}</Text>
          <Text style={myStyle.text}>{name}</Text>
        </View>
        <Animated.View style={[myStyle.expand, { height }]}>
          <ScrollView style={myStyle.moreContext}>
            {this.state.open && this.renderItemDetails(itemDetails, orderSummary)}
          </ScrollView>
          <View style={myStyle.more}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ open: !this.state.open });
              }}
            >
              <Icon
                style={myStyle.moreIcon}
                name={this.state.open ? "angle-double-up" : "angle-double-down"}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
}

// show order details: have goback button
// can expand order details, have three tabs: ChangeTime, SelectInstance, and OrderInstance
class Order extends Component {
  constructor(props) {
    super(props);
  }

  // fetch item details and lead time
  componentDidMount() {
    const {
      dispatch,
      auth_token,
      navigation: {
        state: { params: { itemId, node: { deliveryLeadTimeHours } } }
      }
    } = this.props;
    console.log("order page. deliveryLeadTimeHours", deliveryLeadTimeHours)
    console.log("itemId: ", itemId)
    dispatch(actionCreators.getItemDetailsAndLeadTime(itemId, deliveryLeadTimeHours));
  }

  // Go back to the main screen of search
  goBack = () => {
    const navigation = this.props.navigation;
    navigation.goBack(null);
  };

  render() {
    const {
      itemDetails,
      navigation: { state: { params: { node } } },
      itemTree,
      orderSummary,
      dispatch
    } = this.props;
    // console.log("orderSummary in order:", orderSummary)
    // console.log("node in order:", node)
    // console.log("itemTree in order:", itemTree)
    return (
      <Container style={styles.blue}>
        <Header
          style={{
            marginTop: StatusBar.currentHeight,
            backgroundColor: "#FBF7EF"
          }}
          hasTabs
        >
          <Body>
            <Image
              style={{ height: 30, resizeMode: "contain" }}
              source={logo}
            />
          </Body>
          <Right />
        </Header>
        <Expand dispatch={dispatch} node={node} tree={itemTree} itemDetails={itemDetails} orderSummary={orderSummary} />
        <Tabs tabBgColor="black" ref={tabView => (this.tabView = tabView)}>
          <Tab
            tabBgColor="black"
            heading={<TabHeading style={myStyle.hidden} />}
          >
            <ChangeTime
              goBack={this.goBack}
              goToTab={id => this.tabView.goToPage(id - 1)}
            />
          </Tab>
          <Tab
            tabBgColor="black"
            heading={<TabHeading style={myStyle.hidden} />}
          >
            <SelectInstance
              goBack={this.goBack}
              goToTab={id => this.tabView.goToPage(id - 1)}
            />
          </Tab>
          <Tab heading={<TabHeading style={myStyle.hidden} />}>
            <OrderInstance
              goBack={this.goBack}
              goToTab={id => this.tabView.goToPage(id - 1)}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth_token: state.auth_token,
  itemDetails: state.itemDetails,
  itemTree: state.itemTree,
  orderSummary: state.orderSummary
});

export default connect(mapStateToProps)(Order);
