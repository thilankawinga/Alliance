import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import ProfileScreen from "./screens/Profile";
import SearchScreen from "./screens/Search/Search";
import OrderScreen from "./screens/Order/Order";

//TODO: Add support for Andorid back button

// include 3 screens: search, profile and order. by default, go into the SearchScreen
const Navigation = StackNavigator(
  {
    Search: { screen: SearchScreen },
    Profile: { screen: ProfileScreen },
    Order: { screen: OrderScreen }
  },
  {
    headerMode: "none",
    mode: "card"
  }
);

export default Navigation;
