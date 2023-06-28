import { IconType } from "react-icons";
import {
    HiArrowTrendingUp,
    HiMagnifyingGlass,
    HiBookOpen,
    HiCodeBracket,
    HiHome,
    HiArrowsRightLeft,
    HiOutlinePuzzlePiece,
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
        link: "/tracking",
        Icon: HiArrowTrendingUp,
        subItems: [
            {
                title: "Home",
                link: "/tracking",
                Icon: HiHome,
            },
            {
                title: "Historic",
                link: "/tracking/historic",
                Icon: HiBookOpen,
            },
            {
                title: "Compare",
                link: "/tracking/compare",
                Icon: HiArrowsRightLeft,
            },
        ],
    },
    {
        title: "Meta",
        link: "/meta",
        Icon: HiOutlinePuzzlePiece,
        subItems: [],
    },
    {
        title: "Query",
        link: "/query",
        Icon: HiMagnifyingGlass,
        subItems: [],
    },
    {
        title: "API",
        link: "/api-docs",
        Icon: HiCodeBracket,
        subItems: [],
    },
];
