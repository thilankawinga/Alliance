import React, { Component } from "react";
import { StatusBar, StyleSheet, View, Image } from "react-native";
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

import styles from "../styles";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.resetForm = this.resetForm.bind(this);
    const companies = [{
      name: "Downers",
      default: true,
      role: "administrator"
    }, {
      name: "Hawkins",
      default: false,
      role: "administrator"
    }, {
      name: "March Cato",
      default: false,
      role: "administrator"
    }
    ];
    this.state = {
      companies,
      selectedCompany: 1
    }
  }

  handleSave() {
  }

  resetForm() {
  }

  showToast() {
    Toast.show({
      text: "Saved!",
      position: "bottom",
      type: "info",
      duration: 1000
    });
  }

  render() {
    const navigation = this.props.navigation;
    const { navigate } = navigation;

    const editProfile = (
      <List>
        <ListItem>
          <InputGroup>
            <Input inlineLabel label="First Name" placeholder="John" />
          </InputGroup>
        </ListItem>
        <ListItem>
          <InputGroup>
            <Input inlineLabel label="Last Name" placeholder="Doe" />
          </InputGroup>
        </ListItem>

        <ListItem>
          <InputGroup>
            <Icon name="ios-person" style={{ color: '#0A69FE' }} />
            <Input placeholder="EMAIL" />
          </InputGroup>
        </ListItem>
        <ListItem>
          <InputGroup>
            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
            <Input placeholder="PASSWORD" secureTextEntry />
          </InputGroup>
        </ListItem>
        <ListItem>
          <InputGroup>
            <Icon name="ios-call" style={{ color: '#0A69FE' }} />
            <Input
              placeholder="PHONE"
              keyboardType="numeric"
            />
          </InputGroup>
        </ListItem>
        <ListItem iconLeft>
          <Icon name="ios-transgender" style={{ color: '#0A69FE' }} />
          <Text>GENDER</Text>
          <Picker
            iosHeader="Select one"
            mode="dropdown"
          >
            <Item label="Male" value="key0" />
            <Item label="Female" value="key1" />
            <Item label="Other" value="key2" />
          </Picker>
        </ListItem>

        <ListItem>
          <InputGroup >
            <Input stackedLabel label="Permanent Address" placeholder="Address" />
          </InputGroup>
        </ListItem>
      </List>
    );

    const editProfileActions = (
      <Row style={styles.bottom}>
        <Col>
          <Button onPress={this.handleSave} block style={styles.profileSaveBtn}>
            <Text style={styles.bt}>Save</Text>
          </Button>
        </Col>
        <Col>
          <Button onPress={this.resetForm} block style={styles.profileCancelBtn}>
            <Text style={styles.bt}>Cancel</Text>
          </Button>
        </Col>
      </Row>
    );

    const switchCompany = (
      <List>
        <ListItem>
          <Text>Downers [default]</Text>
          <Text style={{ color: '#f0f0f0' }}>[administrator]</Text>
          <Right>
            <Radio selected={false} />
          </Right>
        </ListItem>
        <ListItem>
          <Text>Hawkins</Text>
          <Text style={{ color: '#f0f0f0' }}>[administrator]</Text>
          <Right>
            <Radio selected={true} />
          </Right>
        </ListItem>
        <ListItem>
          <Text>March Cato</Text>
          <Text style={{ color: '#f0f0f0' }}>[administrator]</Text>
          <Right>
            <Radio selected={false} />
          </Right>
        </ListItem>
      </List>
    );
    const switchDefault = (
      <Row style={styles.bottom}>
        <Col>
          <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text>Set as my default company</Text>
            </Body>
          </ListItem>
        </Col>
      </Row>
    );
    const swtichActions = (
      <Row style={styles.bottom}>

        <Col>
          <Button onPress={this.handleSave} block style={styles.profileSaveBtn}>
            <Text style={styles.bt}>Save</Text>
          </Button>
        </Col>
        <Col>
          <Button onPress={this.resetForm} block style={styles.profileCancelBtn}>
            <Text style={styles.bt}>Cancel</Text>
          </Button>
        </Col>
      </Row>
    );

    return (
      <Container>
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
            <Title style={styles.bt}>Profile</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Grid style={styles.blue}>
          <Row>
            <Content style={styles.content}>
              {switchCompany}
            </Content>
          </Row>
          {switchDefault}
          {swtichActions}
        </Grid>
      </Container >
    );
  }
}
