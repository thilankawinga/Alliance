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
    Body,
    Button,
    Icon,
    Text,
    Item,
    Input,
    Left,
    Right,
    Card,
    CardItem
} from "native-base";
import lodash from "lodash";

import styles from "../styles";

// seems a unfinished empty page
// got a search Component, which is the same with search.js.
// left: null, right: null
export default class Search extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const navigation = this.props.navigation;
        const { navigate } = navigation;

        return (
            <Container style={styles.blue}>
                <Header
                    style={{
                        marginTop: StatusBar.currentHeight,
                        backgroundColor: "#FBF7EF"
                    }}
                >
                    <Left>
                        <Button transparent onPress={() => navigation.goBack(null)}>
                            <Icon style={styles.bt} name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.bt}>Alliance Hire</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content style={styles.container}>

                </Content>
            </Container>
        );
    }
}
