import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    Button as NativeButton
} from "react-native";
import { StackNavigator } from "react-navigation";
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Button,
    Icon,
    Text,
    Item,
    Input
} from "native-base";

import styles from "../styles";

export default class Head extends Component {
    render() {
        const navigation = this.props.navigation;
        const { navigate } = navigation;

        return (
            <Header
                style={{
                    marginTop: StatusBar.currentHeight,
                    backgroundColor: "#FBF7EF"
                }}
            >
                <Left>
                    <Button transparent onPress={() => navigation.goBack(null)}>
                        <Icon style={styles.bt} name="ios-arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.bt}>Alliance Hire</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => navigate("Search")}>
                        <Icon style={styles.bt} name="md-search" />
                    </Button>
                    <Button transparent>
                        <Icon style={styles.bt} name="md-chatboxes" />
                    </Button>
                </Right>
            </Header>
        );
    }
}