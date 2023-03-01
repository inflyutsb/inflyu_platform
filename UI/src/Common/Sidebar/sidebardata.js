import React, { useEffect } from "react";
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
const userId = localStorage.getItem('id');
export const SidebarData = [

    {
        title: 'Home',
        path: `/home/${userId}`,
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Compare',
        icon: <MdIcons.MdCompare />,
        path: "/CompareInfluencers",
        cName: 'nav-text',
        // children: [
        //     {
        //         title: "Influencers",
        //         cName: 'nav-nested',
        //     },
        //     {
        //         title: "Lists",
        //         path: "/CompareLists",
        //         cName: 'nav-nested',
        //     }
        // ]
    },
    {
        title: 'Calculator',
        path: '/calculate',
        icon: <AiIcons.AiFillCalculator />,
        cName: 'nav-text'
    },
]