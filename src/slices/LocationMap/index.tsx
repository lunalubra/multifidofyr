import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

type LocationMapProps = SliceComponentProps<Content.LocationMapSlice>;

// Map is now embedded in ContactSection
const LocationMap: FC<LocationMapProps> = () => {
  return null;
};

export default LocationMap;
