import { Platform, StyleProp, ViewStyle } from "react-native";

type TCardStyles = "shadow";
const cardStyles: Record<TCardStyles, StyleProp<ViewStyle>> = {
  shadow: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
};

export default cardStyles;
