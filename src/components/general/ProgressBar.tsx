import { useTheme } from "@/src/hooks/useTheme";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface ProgressBarProps {
  progress: number;
  total: number;
  label?: string;
  color?: string;
}
export default function ProgressBar(props: ProgressBarProps) {
  const { label, progress, color = "#000000", total } = props;
  const { theme } = useTheme();

  const progressView: StyleProp<ViewStyle> = {
    width: `${(progress / total) * 100}%`,
    backgroundColor: color,
    ...styles.progress,
  };

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      {Boolean(label) && (
        <Text
          style={{ flex: 1, textAlign: "center", color: theme.textPrimary }}
        >
          {label}
        </Text>
      )}
      <View style={[styles.bgBar, { backgroundColor: color + "4D" }]}>
        <View style={progressView} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bgBar: {
    borderRadius: 20,
    marginTop: 2,
    height: 13,
    flex: 1,
  },
  progress: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: 13,
  },
});
