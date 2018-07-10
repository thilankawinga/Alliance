import React, { Component } from "react";
import { StatusBar, Image, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  Body,
  Button,
  Icon,
  Item,
  Input,
  Left,
  Right,
  Thumbnail,
  Spinner,
  Text
} from "native-base";
import lodash from "lodash";
import { connect } from "react-redux";

import styles from "../../styles";
import colours from "../../colours";
import { actionCreators } from "../../allianceRedux";
import ItemTree from "./components/ItemTree";
import RButton from "../../components/RButton";

const logo = require("../../assets/logoname.png");

const myStyle = {
  header: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#FBF7EF"
  },
  logo: {
    height: 30,
    resizeMode: "contain"
  },
  bottom: {
    height: 75,
    margin: 5
  }
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: [],
      node: null,
      items: [],
      searchEnabled: false
    };
  }

  // first show all the tree "/search/tree"
  componentDidMount() {
    const { dispatch, auth_token } = this.props;
    dispatch(actionCreators.getItemTree());

    if (__DEV__) {
      // this.selectItem({
      //   deliveryLeadTimeHours: 3,
      //   hireType: "Dry",
      //   id: 88,
      //   name: "10m Working Height",
      //   parentId: 64,
      //   pickupLeadTimeHours: 2,
      //   type: "item"
      // });
    }
  }

  // when props change, call this func to set navigate path, if no curr node, set to root node
  componentWillReceiveProps(nextProps) {
    const { itemTree, treePath } = nextProps;
    if (!itemTree) return;
    const { node, path } = this.state;
    if (!node) {
      const newNode = itemTree.navigate();
      this.setState({ node: newNode, items: newNode.children, path: [] });
    } else if (treePath && treePath !== path) {
      const newNode = itemTree.navigate(treePath);
      this.setState({ node: newNode, path: treePath, items: newNode.children });
    }
  }

  // search items which include the text
  search = text => {
    if (text && text.trim().length) {
      const { itemTree } = this.props;
      const items = itemTree.search(text);
      this.setState({ items });
    } else {
      const { node } = this.state;
      this.setState({ items: node.children });
    }
  };

  // use navigate inherited StackNavigator
  selectItem = node => {
    const { navigation: { navigate } } = this.props;
    const { id: itemId } = node;
    navigate("Order", { itemId, node });
  };

  // set parentId or root for NavBack
  handleNavBackItemList = () => {
    const { node } = this.state;
    const { dispatch } = this.props;
    const parent = node ? node.parentId : null;
    dispatch(actionCreators.itemTreeGoBack(parent));
  };

  // toggle search state ???? why set searchEnabled to false before search
  toggleSearch = () => {
    const { searchEnabled } = this.state;
    if (searchEnabled) {
      this.resetSearch();
      this.search();
      return;
    }
    this.setState({ searchEnabled: true });
  };

  // set searchEnabled to be false
  resetSearch = () => this.setState({ searchEnabled: false });

  // header: has two different states. while searching, has input (onPress to set searchEnabled); while not searching, has logo for search and profile
  renderHeader = () => {
    const { navigation: { navigate } } = this.props;
    const { searchEnabled } = this.state;
    if (searchEnabled) {
      return (
        <Header style={myStyle.header}>
          <Body>
            <Input
              style={styles.text}
              placeholder="Search for equipment"
              onChangeText={lodash.debounce(text => this.search(text), 1000)}
              autoFocus={true}
            />
          </Body>
          <Right>
            <Button transparent onPress={this.toggleSearch}>
              <Icon style={styles.bt} name="times" />
            </Button>
          </Right>
        </Header>
      );
    }
    return (
      <Header style={myStyle.header}>
        <Body>
          <Image style={myStyle.logo} source={logo} />
        </Body>
        <Right>
          <Button transparent onPress={this.toggleSearch}>
            <Icon style={styles.bt} name="search" />
          </Button>
          <Button transparent onPress={() => navigate("Profile")}>
            <Icon style={styles.bt} name="home" />
          </Button>
        </Right>
      </Header>
    );
  };

  render() {
    const { node, items } = this.state;
    const { isFetching, companySettings } = this.props;

    const renderContent = () => {
      // note: what if companySettings doesn't exist?
      if (companySettings && companySettings.CompanyType !== "Customer") {
        return (
          <Content style={styles.container}>
            <Text style={styles.error}>
              Only customer accounts can access search
            </Text>
          </Content>
        );
      }
      if (node) {
        return (
          <Container>
            <Grid>
              <Row>
                <ItemTree
                  categoryName={node.name}
                  items={items}
                  handleItemSelect={this.selectItem}
                  goBack={this.handleNavBackItemList}
                  resetSearch={this.resetSearch}
                />
              </Row>
              <Row style={myStyle.bottom}>
                <View style={{ position: "absolute", bottom: 0, left: 20 }}>
                  <RButton
                    disabled={!node.parentId}
                    onPress={this.handleNavBackItemList}
                  />
                </View>
              </Row>
            </Grid>
          </Container>
        );
      } else if (isFetching) {
        return (
          <Content style={styles.container}>
            <Spinner color="white" />
          </Content>
        );
      }
      return (
        <Content style={styles.container}>
          <Text style={styles.error}>Can't communicate with the server</Text>
        </Content>
      );
    };

    return (
      <Container style={styles.blue}>
        {this.renderHeader()}
        {renderContent()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  auth_token: state.auth_token,
  itemTree: state.itemTree,
  treePath: state.treePath,
  companySettings: state.companySettings
});

export default connect(mapStateToProps)(Search);
