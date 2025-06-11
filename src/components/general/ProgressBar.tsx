import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface ProgressBarProps {
  label?: string;
  progress: number;
  color?: string;
  total: number;
}
export default function ProgressBar(props: ProgressBarProps) {
  const { label, progress, color = "#fbba00", total } = props;

  const progressView: StyleProp<ViewStyle> = {
    width: `${(progress / total) * 100}%`,
    backgroundColor: color,
    ...styles.progress,
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {Boolean(label) && <Text style={{ flex: 1 }}>{label}</Text>}
      <View style={styles.bgBar}>
        <View style={progressView} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bgBar: {
    backgroundColor: "#E4E4E4",
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
