import { StyleProp, TextStyle } from "react-native";

type TInputStyles = "simpleInput";
const inputStyles: Record<TInputStyles, StyleProp<TextStyle>> = {
  simpleInput: {
    height: 35,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
};

export default inputStyles;
