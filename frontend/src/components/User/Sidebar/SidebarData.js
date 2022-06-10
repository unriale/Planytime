import * as ImIcons from "react-icons/im";
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: "Calendar",
    path: "/",
    icon: <AiIcons.AiTwotoneCalendar />,
  },
  {
    title: "Statistics",
    path: "/stats",
    icon: <ImIcons.ImStatsDots />,
  },
  {
    title: "Logout",
    path: "",
    icon: <RiIcons.RiLogoutBoxLine />,
  },
];
