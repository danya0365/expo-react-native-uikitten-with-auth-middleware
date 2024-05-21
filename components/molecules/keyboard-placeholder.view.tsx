"use client";

import { useKeyboard } from "@react-native-community/hooks";
import { useMemo } from "react";
import { Animated } from "react-native";

type Props = {
  height?: number;
};
const KeyboardPlaceholder = ({ height }: Props) => {
  const { keyboardShown, keyboardHeight } = useKeyboard();
  const customHeight = useMemo(() => {
    return height ?? keyboardHeight;
  }, [keyboardHeight, height]);
  const viewHeight = useMemo(() => {
    if (!keyboardShown) {
      return 0;
    }
    return customHeight;
  }, [keyboardShown, customHeight]);
  return (
    <Animated.View
      style={{
        height: viewHeight,
      }}
    ></Animated.View>
  );
};

export default KeyboardPlaceholder;
