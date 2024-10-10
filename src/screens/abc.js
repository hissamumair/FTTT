import React from "react";
import {View, Text} from "react-native";
import { IconButton } from "react-native-paper";

export default function ABC() {
  return (
    <View>
      <IconButton
        icon="menu"
        size={20}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </View>
  );
}
