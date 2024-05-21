import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BookmarkSvg = (props: any): React.ReactElement => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" {...props}>
    <Path fill="currentColor" d="M1.5 0v12L6 9.818 10.5 12V0z" />
  </Svg>
);
export default BookmarkSvg;
