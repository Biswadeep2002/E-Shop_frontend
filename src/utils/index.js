import { current } from "@reduxjs/toolkit";
import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa"

export const bannerList = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "iPhone 16 Pro",
        subTitle: "Titanium. Power. Perfection.",
        description: "The iPhone 16 Pro is the pinnacle of smartphone technology, featuring a stunning titanium design, unparalleled performance, and cutting-edge features that redefine what a phone can do.",
        facts: ["2 & 3 BHK homes", "Clubhouse", "Site visits open"],
    },
     {
        id: 2,
        image: "https://images.unsplash.com/photo-1698502453332-03fa2ddceb71?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Canon EOS R5 Mark II",
        subTitle: "Redefining Professional Photography",
        description: "The Canon EOS R5 Mark II is a groundbreaking mirrorless camera that sets new standards for professional photography and cinematic filmmaking.",
        facts: ["2 & 3 BHK homes", "Clubhouse", "Site visits open"],
    },
     {
        id: 3,
        image: "https://images.unsplash.com/photo-1760604359549-8921b6139a1c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Google Pixel 10 Pro",
        subTitle: "The Power of Google. Perfected.",
        description: "Capture breathtaking photos with an advanced AI-powered camera system, enjoy lightning-fast performance, and experience the pure Android ecosystem with intelligent features built to simplify your day.",
         facts: ["2 & 3 BHK homes", "Clubhouse", "Site visits open"],
    }
];

export const adminNavigation = [
    {
        name: "Dashboard",
        href: "/admin",

        icon: FaHome,
        current: true,
    },
    {
        name: "Orders",
        href: "/admin/orders",
        icon: FaShoppingCart,
    },
    {
        name: "Products",
        href: "/admin/products",
        icon: FaBoxOpen,
    },
    {
        name: "Categories",
        href: "/admin/categories",
        icon: FaThList,
    },
    {
        name: "Sellers",
        href: "/admin/sellers",
        icon: FaStore,
    }
];



export const sellerNavigation = [
    
    {
        name: "Orders",
        href: "/admin/orders",
        icon: FaShoppingCart,
        current: true,
    },
    {
        name: "Products",
        href: "/admin/products",
        icon: FaBoxOpen,
    }
];
