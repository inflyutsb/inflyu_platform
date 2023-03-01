import React, { useState, useEffect } from "react";
import './sidebar.scss';
import { Link } from 'react-router-dom';
import { SidebarData } from "./sidebardata";
import * as FaIcons from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretRight } from 'react-icons/ai';
import logo from '../../Assets/Images/inflyu1.png';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const showSidebar = () => {
        if (isMobile) {
            setSidebar(true)
        }
        else if (!isMobile) {
            setSidebar(false)
        }
    }

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        showSidebar()
    }, [width])

    const isMobile = width <= 700;

    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className={sidebar ? 'nav-menu' : 'nav-menu-active'}>
                <nav className="navbar">
                    {/* <div className={sidebar ? 'navbar-inactive' : 'navbar'} >
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                    </div> */}
                    <img src={logo} className={isMobile ? 'logo_hide' : 'logo'} />
                    <ul className="nav-menu-items">
                        {
                            SidebarData.map((item, index) => {
                                return (
                                    <li className={item.cName}>
                                        {
                                            sidebar === true ?
                                                <Link to={item.path}>
                                                    {item.icon}
                                                </Link>
                                                :
                                                <Link to={item.path}>
                                                    {item.icon}
                                                    <span
                                                    >{item.title}</span>
                                                </Link>
                                        }

                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>
            </div >
        </IconContext.Provider >
    )
}
export default Navbar;