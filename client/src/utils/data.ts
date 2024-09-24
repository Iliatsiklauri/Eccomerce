import { userType } from "../store/features/usersSlice";

type panelDataType = {
  name: string;
  imageUrl: string;
};
export const panelData: panelDataType[] = [
  {
    name: "Dashboard",
    imageUrl: "/icons/adminPanel/dashboard.png",
  },
  {
    name: "Products",
    imageUrl: "/icons/adminPanel/box.png",
  },
  {
    name: "User management",
    imageUrl: "/icons/adminPanel/multiple-users-silhouette.png",
  },
  {
    name: "Notifications",
    imageUrl: "/icons/adminPanel/notification.png",
  },
  {
    name: "Messages",
    imageUrl: "/icons/adminPanel/email.png",
  },
  {
    name: "Settings",
    imageUrl: "/icons/adminPanel/setting.png",
  },
];

export type Category = {
  id: number;
  title: string;
};

export type CardType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  filepath: string;
  category: Category;
  pinned: boolean;
  createdAt: string;
  comments: commentType[];
};
export type commentType = {
  id: number;
  content: string;
  user: userType;
  createdAt: Date;
};
