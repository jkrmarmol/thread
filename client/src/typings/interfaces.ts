import { ImageProps } from "react-native";


export interface IImageIcon {
  src: ImageProps | Readonly<ImageProps>;
  opacity: number
}

export interface ITreadPostProps {
  username: string;
  verified?: boolean;
  caption?: string;
  avatar: ImageProps;
  date: Date;
  repliesCount: number;
  images: ImageProps;
}


export interface ISearchUserProfileProps {
  name: string;
  username: string;
  followers: number;
  verified?: boolean;
  avatar: ImageProps;
}

export interface IDashboardHelperInitialState {
  goBackNavigation: any[];
  threadPostText: string;
  activityCurrentTab: string;
}

export interface IActivityTabsData {
  data: Array<{
    id: number;
    title: string;
  }>
}