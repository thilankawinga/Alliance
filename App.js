import { Asset, Font } from "expo";
import React, { Component } from "react";
import { View, Image } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware";
import Spinner from "react-native-loading-spinner-overlay";
import thunk from "redux-thunk";
import Sentry from "sentry-expo";
import { reducers } from "./src/allianceRedux";
import Setup from "./src/setup";
import styles from "./src/styles";

Sentry.enableInExpoDevelopment = true;
Sentry.config(
  "https://e84e6b63afbd46caac4349aecdae658b:cb5f87dc6b524e2394c09d1716711bc9@sentry.io/244104"
).install();

const store = createStore(
  reducers,
  applyMiddleware(promiseMiddleware(), thunk)
);

const cacheImages = images =>
  images.map(
    image =>
      typeof image === "string"
        ? Image.prefetch(image)
        : Asset.fromModule(image).downloadAsync()
  );

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    const fontAssets = cacheFonts([
      { Roboto: require("native-base/Fonts/Roboto.ttf") },
      { Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf") },
      { Ionicons: require("native-base/Fonts/Ionicons.ttf") },
      { FontAwesome: require("native-base/Fonts/FontAwesome.ttf") }
    ]);
    const imageAssets = cacheImages([
      require("./src/assets/logonamecap.png"),
      require("./src/assets/logoname.png")
    ]);
    await Promise.all([...fontAssets, ...imageAssets]);
    this.setState({ isReady: true });
  }

  async loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./src/assets/logonamecap.png"),
      require("./src/assets/logoname.png")
    ]);
    const fontAssets = cacheFonts({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf")
    });
    await Promise.all([...fontAssets]);
  }

  renderLoader() {
    return (
      <View style={styles.loading}>
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>
    );
  }

  render() {
    if (!this.state.isReady) return this.renderLoader();
    return (
      <Provider store={store}>
        <Setup />
      </Provider>
    );
  }
}

export default App;
