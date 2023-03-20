import React, { useEffect, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import styled from "@emotion/styled";
import nearestColor from "nearest-color";
import colorNameList from "color-name-list";

export enum ColorType {
  HumanSkin = "HumanSkin",
  Normal = "Normal",
}

type SimpleColorProps = {
  colorType?: ColorType;
  initColor?: string;
  updateColor?: (color: string) => void;
};

const colorNameMap: Record<string, string> = colorNameList.reduce(
  (o, { name, hex }) => Object.assign(o, { [name]: hex }),
  {},
);
const nearest = nearestColor.from(colorNameMap);
const hexToRgbString = (hex: string) => {
  const { rgb } = nearest(hex);
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};
const defaultColor = "rgb(255, 255, 255)";

function SimpleColorPicker(props: SimpleColorProps) {
  const [color, setColor] = useState(defaultColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    const initColor = props.initColor && colorNameMap[props.initColor.replace(/ color$/, "")];
    setColor(initColor ? hexToRgbString(initColor) : defaultColor);
  }, [props.initColor]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: ColorResult) => {
    const newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setColor(newColor);
    if (props.updateColor) {
      const colorName = nearest(color.hex).name;
      // we should add color after the color name, so the StableDiffusion can parse it
      props.updateColor(colorName + " color");
    }
  };

  return (
    <>
      <Swatch onClick={handleClick}>
        <StyleColor color={color} />
      </Swatch>
      {displayColorPicker && (
        <StylePopover>
          <StyleCover onClick={handleClose} />
          <ChromePicker color={color} onChange={handleChange} />
        </StylePopover>
      )}
    </>
  );
}

const StyleColor = styled.div`
  width: 16px;
  height: 14px;
  border-radius: 2px;
  background: ${(props) => props.color};
`;

const Swatch = styled.div`
  display: inline-block;
  padding: 1px;
  top: 4px;
  left: 4px;
  position: relative;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const StylePopover = styled.div`
  position: absolute;
  z-index: 2;
`;

const StyleCover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default SimpleColorPicker;
