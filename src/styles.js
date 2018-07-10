import { StatusBar, Dimensions, Platform } from "react-native";

const blue = "#253982";
const white = "#FBF7EF";
const black = "#666666";
const gold = "#FFBF24";
const grey = "#53585F";
const red = "#ff0000";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const third = deviceHeight / 3;

// Check if it's an iPhone 10
export const isiPhoneX = () => (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (deviceHeight === 812 || deviceWidth === 812)
);

// TODO: Setup the theme, instead of manual overrides

export default {
  bold: {
    fontWeight: "bold",
    fontSize: 14
  },
  reset: {
    padding: 0,
    margin: 0
  },
  loginHeader: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: white,
    height: third
  },
  header: {
    height: third
  },
  loginHeaderC: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginTitle: {
    fontSize: 40,
    color: blue
  },
  info: {
    position: "absolute",
    left: 0,
    right: 0,
    top: Platform.OS === "android" ? third : third - 25,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3
  },
  infoButton: {
    borderRadius: 25,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: white,
    margin: 0,
    padding: 0,
    backgroundColor: blue,
    justifyContent: "center",
    alignItems: "center"
  },
  infoIcon: {
    color: white,
    fontSize: 35,
    position: "absolute",
    backgroundColor: "transparent"
  },
  loginContainer: {
    backgroundColor: blue,
    padding: 20
  },
  input: {
    borderRadius: 3,
    backgroundColor: white,
    marginTop: 20,
    marginBottom: 20
  },
  searchInput: {
    backgroundColor: white,
    marginBottom: 5,
    height: 30,
    paddingRight: 2,
    paddingLeft: 2
  },
  container: {
    backgroundColor: blue,
    margin: 10
  },
  whiteText: {
    color: white
  },
  text: {
    color: grey,
    fontSize: 14
  },
  bt: {
    color: blue
  },
  arrow: {
    color: blue,
    fontSize: 14
  },
  offwhite: {
    backgroundColor: white
  },
  blue: {
    backgroundColor: blue
  },
  gold: {
    backgroundColor: gold
  },
  loading: {
    flex: 1,
    backgroundColor: blue
  },
  bottom: {
    height: 100,
    margin: 10
  },
  loginContent: {
    margin: 10
  },
  logoName: {
    resizeMode: "contain",
    width: 250,
    height: 60
  },
  subtitle: {
    color: blue
  },
  profileCancelBtn: {
    marginLeft: 5,
    backgroundColor: gold
  },
  profileSaveBtn: {
    marginRight: 5,
    backgroundColor: gold
  },
  content: {
    margin: 10
  },
  listItem: {
    backgroundColor: white,
    minHeight: 40
  },
  loginBtn: {
    backgroundColor: gold,
    width: deviceWidth / 2,
    marginLeft: deviceWidth / 4 - 10
  },
  disabledBtn: {
    width: deviceWidth / 2,
    marginLeft: deviceWidth / 4 - 10
  },
  error: {
    color: red,
    textAlign: "center",
    fontSize: 14
  },
  treeBack: {
    paddingRight: 0
  },
  twenty: {
    height: 20
  },
  item: {
    margin: 0,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    minHeight: 40
  },
  nada: {
    flex: 0
  }
};
