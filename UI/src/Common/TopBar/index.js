import React, { useState, useEffect } from "react";
import './index.scss';
import help from '../../Assets/Images/help.png';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import UserIcon from '../../Assets/Images/userIcon.png';

function TopBar() {

    const [showDropDownSelected, setShowDropdownSelected] = useState(false);
    const [comparedPageVisited, setComparedPageVisited] = useState(false);
    const userId = localStorage.getItem('id');
    const userName = localStorage.getItem('name');
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams()

    let TOPBAR_TEXTS = [{ page: `/home/${userId}`, text: "Home" }, { page: "/CompareLists", text: "Compare Lists" }, { page: "/CompareInfluencers", text: "Compare Influencers" }, { page: "/influencerslist/", text: "Search Results" }, { page: "/basketInfluencers", text: "Influencer Bundle" }, { page: "/userLists", text: "List" }, { page: "/profile", text: "Influencer Profile" }, { page: `/updateprofile/${userId}`, text: "Profile Settings" }, { page: `/calculate`, text: "Calculate Cost" }]
    let textToShow = TOPBAR_TEXTS.find(el => location.pathname.includes(el.page))?.text

    const checkPage = () => {
        {
            textToShow === 'Compare Influencers' || textToShow === 'Compare Lists' ?
                setComparedPageVisited(true)
                :
                setComparedPageVisited(false)
        }
    }

    useEffect(()=>{
        checkPage();
    },[params])

    const handleShowProfileDropdown = () => {
        let data = showDropDownSelected ? false : true;
        setShowDropdownSelected(data)
    }

    const handleRedirectToProfileSettings = () => {
        navigate(`/updateprofile/${userId}`)
    }

    const handleRedireactToAbout = () => {
        navigate(`/about`)
    }

    const handleLogout = () => {
        <Link to='/' />
        localStorage.clear();
        // let url = `http://13.234.125.76:4000/logout`;
        // fetch((url), {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // })
    }

    return (
        <>
            <div className="topbar">
                <div className={comparedPageVisited === true ? "page_title_compared" : "page_title"}>
                    {textToShow}
                    {textToShow === 'Compare Influencers' || textToShow === 'Compare Lists' ?
                        <div style={{ display: 'flex', paddingTop: '1rem' }}>
                            <div style={{ paddingLeft: '1.25rem' }}>
                                <Link to="/CompareInfluencers" className="tab_text">Influencers</Link>
                            </div>
                            <div style={{ paddingLeft: '3.5rem' }}>
                                <Link to="/CompareLists" className="tab_text">List</Link>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="topbar_help_icon"><img src={help} /></span>
                    <img src={UserIcon} className="topbar_user_icon" />
                    <span className="topbar_username">{userName}</span>
                    <span style={{ marginRight: '4rem', cursor: 'pointer' }}><MdOutlineArrowDropDown onClick={handleShowProfileDropdown} /></span>
                </div>
            </div>
            {
                showDropDownSelected === true ?
                    <div className="dropdown">
                        <div onClick={handleRedirectToProfileSettings} className="dropdown_title">Profile Settings</div>
                        <div onClick={handleRedireactToAbout} className="dropdown_title">About</div>
                        <div onClick={handleLogout} className="dropdown_title"><Link to='/'>Logout</Link></div>
                    </div>
                    : null
            }
        </>
    )
}
export default TopBar;
