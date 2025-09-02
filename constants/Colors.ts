/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const lightGrey = "#A0A0A0";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    mainBg: "#0C101C",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  product: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    accentPink: "#FF6B9D",
    lightGrey: lightGrey,
    darkGrey: "#23262F",
    gradientStart: "#F5F5F5",
    borderGrey: "#E5E5E5",
    veryLightGrey: "#F8F8F8",
    gradientEnd: "#FFFFFF",
    white: "#FFFFFF",
    borderLightWhite: "rgba(255, 255, 255, 0.1)",
    bgWhite: "#1C212E",
    tabIconDefault: "#9BA1A6",
    lightPink: "#FFB6C1",
    darkPink: "#FF1493",
    tabIconSelected: tintColorDark,
  },
};
