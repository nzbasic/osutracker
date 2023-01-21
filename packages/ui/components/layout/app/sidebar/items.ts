import { IconType } from "react-icons";
import {
  HiArrowTrendingUp,
  HiMagnifyingGlass,
  HiBookOpen,
  HiCodeBracket,
  HiHome,
  HiArrowsRightLeft,
  HiOutlinePuzzlePiece
} from "react-icons/hi2";

export interface MenuItem {
  title: string;
  link: string;
  Icon: IconType;
  subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Tracking",
    link: "/app/tracking",
    Icon: HiArrowTrendingUp,
    subItems: [
      {
        title: "Home",
        link: "/app/tracking",
        Icon: HiHome,
      },
      {
        title: "Historic",
        link: "/app/tracking/historic",
        Icon: HiBookOpen,
      },
      {
        title: "Compare",
        link: "/app/tracking/compare",
        Icon: HiArrowsRightLeft,
      },
    ],
  },
  {
    title: "Meta",
    link: "/app/meta",
    Icon: HiOutlinePuzzlePiece,
    subItems: [],
  },
  {
    title: "Query",
    link: "/app/query",
    Icon: HiMagnifyingGlass,
    subItems: [],
  },
  {
    title: "API",
    link: "/app/api",
    Icon: HiCodeBracket,
    subItems: [],
  },
];
