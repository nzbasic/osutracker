import {
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  CodeBracketIcon,
  HomeIcon,
  ArrowsRightLeftIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

export interface MenuItem {
  title: string;
  link: string;
  Icon: Icon;
  subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Tracking",
    link: "/app/tracking",
    Icon: ArrowTrendingUpIcon,
    subItems: [
      {
        title: "Home",
        link: "/app/tracking",
        Icon: HomeIcon,
      },
      {
        title: "Historic",
        link: "/app/tracking/historic",
        Icon: BookOpenIcon,
      },
      {
        title: "Compare",
        link: "/app/tracking/compare",
        Icon: ArrowsRightLeftIcon,
      },
    ],
  },
  {
    title: "Meta",
    link: "/app/meta",
    Icon: Square3Stack3DIcon,
    subItems: [],
  },
  {
    title: "Query",
    link: "/app/query",
    Icon: MagnifyingGlassIcon,
    subItems: [],
  },
  {
    title: "API",
    link: "/app/api",
    Icon: CodeBracketIcon,
    subItems: [],
  },
];
