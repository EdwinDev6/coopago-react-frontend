import {
  HiOutlineUsers,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "Beneficiario",
    label: "Registrar Beneficiarios",
    path: "/RegistrarBeneficiarios",
    icon: <HiOutlineUsers />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
