declare module "color-name-list" {
  interface ColorName {
    name: string;
    hex: string;
  }
  const colorNameList: ColorName[];
  export = colorNameList;
}

declare module "nearest-color" {
  interface RGB {
    r: number;
    g: number;
    b: number;
  }
  interface ColorSpec {
    name: string;
    value: string;
    rgb: RGB;
    distance: number;
  }
  interface ColorMatcher extends NearestColor {
    (needle: RGB | string): ColorSpec;
    or: (alternateColors: string[] | Record<string, string>) => ColorMatcher;
  }

  interface NearestColor {
    (needle: RGB | string, colors?: ColorSpec[]): string;
    from: (availableColors: string[] | Record<string, string>) => ColorMatcher;
  }

  const nearestColor: NearestColor;

  export default nearestColor;
}
