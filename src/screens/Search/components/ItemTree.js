import React, { Component } from "react";
import { Text, Card, CardItem, Left, Right, Button, Icon } from "native-base";
import { connect } from "react-redux";
import { TouchableHighlight, View, ScrollView } from "react-native";

import NodeItem from "./Item";
import styles from "../../../styles";
import colours from "../../../colours";
import { actionCreators } from "../../../allianceRedux";

const myStyle = {
  bold: {
    fontWeight: "bold",
    fontSize: 14
  },
  back: {
    paddingRight: 10,
    paddingLeft: 15,
    fontSize: 20,
    color: colours.blue
  },
  treeHeading: {
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
    paddingRight: 15,
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colours.white,
    height: 40
  },
  backBtn: {
    height: 40,
    width: 20,
    paddingRight: 10,
    paddingLeft: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  pad: {
    paddingLeft: 15
  },
  card: {
    flex: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 0.3333,
    backgroundColor: colours.white,
    margin: 10,
    marginBottom: 0
  }
};

class ItemTree extends Component {
  changeItem(node) {
    const { dispatch, handleItemSelect, resetSearch } = this.props;
    let { treePath } = this.props;
    if (!treePath) treePath = [];
    if (node.type === "category") {
      resetSearch();
      dispatch(actionCreators.navigateItemTree(node.id));
    } else {
      handleItemSelect(node);
    }
  }

  // show all the items in the results
  renderItems = items => {
    if (!items.length) return <NodeItem node={{ name: "No matches" }} />;
    return items.map(item => (
      <NodeItem
        node={item}
        key={`${item.type}:${item.id}`}
        traverse={() => this.changeItem(item)}
      />
    ));
  };

  render() {
    const { categoryName, items, treePath, goBack } = this.props;

    return (
      <ScrollView style={myStyle.card}>
        <TreeHeading name={categoryName} navigateBack={goBack} />
        {this.renderItems(items)}
        <View style={myStyle.blank} />
      </ScrollView>
    );
  }
}

const TreeHeading = ({ name, navigateBack }) => (
  <TouchableHighlight disabled={!name} onPress={navigateBack}>
    <View style={myStyle.treeHeading}>
      {name ? <Icon style={myStyle.back} name="angle-left" /> : null}
      {name ? (
        <Text style={myStyle.bold}>{name}</Text>
      ) : (
          <Text style={{ ...myStyle.bold, ...myStyle.pad }}>
            Hire Equipment Categories
        </Text>
        )}
    </View>
  </TouchableHighlight>
);

const mapStateToProps = state => ({
  treePath: state.treePath
});

export default connect(mapStateToProps)(ItemTree);
