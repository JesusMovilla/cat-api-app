import { Image } from "expo-image";
import { useRef } from "react";
import { Dimensions, StyleProp, View, ViewStyle } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

interface BaseCarouselProps {
  data: string[];
  style?: StyleProp<ViewStyle>;
}

export default function BaseCarousel(props: BaseCarouselProps) {
  const { data, style = {} } = props;
  const ref = useRef<ICarouselInstance>(null);

  return (
    <View style={style}>
      <Carousel
        ref={ref}
        data={data}
        width={width}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item, index }) => (
          <Image
            key={index}
            source={item}
            contentFit="cover"
            style={{ flex: 1 }}
          />
        )}
      />
    </View>
  );
}
