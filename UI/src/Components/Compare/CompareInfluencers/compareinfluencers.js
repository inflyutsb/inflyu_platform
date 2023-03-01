import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Navbar from '../../../Common/Sidebar/sidebar'
import './cpinf.scss';
import Topbar from '../../../Common/TopBar/index';
import Testing from '../.././../Assets/Images/testing.png';
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiOutlineUser } from 'react-icons/hi';
import { FcRating } from 'react-icons/fc';
import NFormatter from '../../../Common/NumberFormatter/numFormatter';
import LikeIcon from '../../../Assets/Images/likeIcon.png'
import CommentIcon from '../../../Assets/Images/commentIcon.png'
import ER from '../../../Assets/Images/er.png'
import ViewIcon from '../../../Assets/Images/viewIcon.png'
import { AiOutlineClose } from 'react-icons/ai';
import Loader from '../../../Common/Loader';
import Tooltip from '@mui/material/Tooltip';

function CompareInfluencers() {

    const [comparedInfluencersData, setComparedInfluencersData] = useState([]);
    const [paramsChanged, setParamsChanged] = useState(false);
    const [addToListTableClicked, setAddToListTableClicked] = useState(false);
    const [listData, setListData] = useState([]);
    const [resultClickedData, setResultClickedData] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState('');
    const [addToCompareClicked, setAddToCompareClicked] = useState(false);
    const [addToCompareData, setAddToCompareData] = useState([]);
    const [loader, setLoader] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');
    let autoSuggestedArray = [];


    const handleAddToListTable = (e) => {
        setResultClickedData(e.username)
        const toggle = addToListTableClicked ? false : true;
        setAddToListTableClicked(toggle);
    }

    const getListData = () => {
        const url = `http://13.234.125.76:4000/getListData/${userId}`;
        fetch(url)
            .then((data) => {
                data.json()
                    .then((result) => {
                        setListData(result)
                    })
            })
    }

    const addInfluencerToList = (element, elm) => {
        const url = `http://13.234.125.76:4000/addInfluencersToList/${userId}?list=${elm.listName}&username=${element.username}`
        fetch((url), {
            method: 'POST',
        })
            .then((data) => { data.json() })
            .then((res) => {
                console.log(res)
            })
        setAddToListTableClicked(false)
    }

    const redirectToProfile = (item) => {
        navigate(`/profile/${item.username}`)
    }

    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        if (query.length > 1) {
            let url = `http://13.234.125.76:4000/filterUsers?username=${query}`
            fetch(url)
                .then((data) => {
                    data.json()
                        .then((res) => {
                            setSuggestions(res)
                        })
                })
            setSuggestionsActive(true);
        } else {
            setSuggestionsActive(false);
        }
    };

    const handleClick = (e) => {
        setSuggestions([]);
        setValue('');
        setSuggestionsActive(false);
        {
            const abc = addToCompareData.find((item) => item.username === e.target.innerText)
            if (!abc) {
                setAddToCompareData([...addToCompareData, { username: e.target.innerText }])
            }
        }
    };

    const Suggestions = () => {
        return (
            <div className="suggestions">
                {suggestions.map((suggestion, index) => {
                    return (
                        <div
                            className={index === suggestionIndex ? "active_inf" : "non_active"}
                            key={index}
                            onClick={handleClick}
                        >
                            <div className='sug_user'>
                                <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Images/${suggestion.username}/${suggestion.username}_profile_image.png`} className='profile_image' />
                                <div style={{ marginLeft: '0.5rem' }}>{suggestion.username}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleRemoveComparedInfluencer = (item) => {
        let newStr = '';
        let updateStr = params.influencers.substring(params.influencers.indexOf('?') + 1);
        if (updateStr.split('=').length - 1 > 2) {
            let abc = updateStr.split('&');
            for (let i in abc) {
                if (!abc[i].includes(item.username)) {
                    newStr += abc[i] + '&';
                }
            }
            let finalstring = newStr.substring(0, newStr.length - 1)
            navigate(`/CompareInfluencers/${finalstring}`)
        }


    }

    const handleAddToCompare = () => {
        const toggle = addToCompareClicked ? false : true;
        setAddToCompareClicked(toggle);
    }

    const handleRemoveInfluencer = (data) => {
        setAddToCompareData((current) => current.filter((item) =>
            item.username !== data.username
        ))
    }

    const handleCompareInfluencers = () => {
        let result = ''
        addToCompareData.map((item) => {
            result += (`&influencers=${item.username}`)
            {
                JSON.stringify(params) !== '{}' ?
                    navigate(`/CompareInfluencers/${params.influencers}${result}`)
                    :
                    navigate(`/CompareInfluencers/${result.substring(1)}`)
            }
        })
        handleAddToCompare();
        setAddToCompareData([])
    }


    const handleCompareInfluencersByParams = () => {
        setLoader(true);
        if (JSON.stringify(params) !== '{}') {
            const url = `http://13.234.125.76:4000/compareInfluencers?${params.influencers}`;
            fetch(url)
                .then((res) => {
                    res.json()
                        .then((data) => {
                            setComparedInfluencersData(data)
                            setLoader(false);
                        })
                })
        }
        else {
            setComparedInfluencersData([])
            setLoader(false)
        }

    }

    const handleRemoveAllInfluencers = () => {
        navigate('/CompareInfluencers')
    }

    useEffect(() => {
        handleCompareInfluencersByParams();
        getListData();
    }, [params])

    return (
        <div className='compare_influencers_container row no-gutters'>
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                <Navbar />
            </div>
            <div className='col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                <Topbar />
                <div className='clear_btn_pane'>
                    <div className='clear_all_btn'>
                        <Button className='clear_btn' onClick={handleRemoveAllInfluencers}>Clear All</Button>
                    </div>
                </div>
                <div className='result_pane'>
                    {
                        loader === true ?
                            <div className='inline_loader'>
                                <Loader />
                            </div>
                            :
                            comparedInfluencersData.map((item) =>
                                <div className='results'>
                                    <div className='profile_container'>
                                        <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Images/${item.username}/${item.username}_profile_image.png`} className='image' />
                                        {/* <img src={Testing} className='image' /> */}
                                    </div>
                                    <div className='profile_name' onClick={() => { redirectToProfile(item) }}>{item.full_name}</div>
                                    <div className='profile_username'>@{item.username}</div>
                                    <div className='profile_location'>{item.city_name ? item.city_name : item.final_city}</div>
                                    {
                                        item.category_enum ?
                                            <div style={{ padding: '0.75rem' }}>
                                                <div className='profile_category'>{item.category_enum}</div>
                                            </div>
                                            :
                                            item.final_category ?
                                                <div style={{ padding: '0.75rem' }}>
                                                    <div className='profile_category'>{item.final_category}</div>
                                                </div>
                                                :
                                                null
                                    }
                                    <div className='profile_followers'>
                                        <Tooltip title="Followers">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <HiOutlineUser />
                                                {NFormatter(item.edge_followed_by.count)}
                                            </div>
                                        </Tooltip>
                                        {/* <div className='descr_title' style={{ marginLeft: '1rem' }}>
                                            Followers
                                        </div> */}
                                    </div>
                                    <div className='like_comment_box'>
                                        <div className='profile_like'>
                                            <Tooltip title="Average Likes">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={LikeIcon} /><span>{NFormatter(item?.edge_owner_to_timeline_media?.edges[0]?.avg_likes)}</span>
                                                </div>
                                            </Tooltip>
                                            {/* <div className='descr_title'>
                                                Average Likes
                                            </div> */}
                                        </div>
                                        <div className='profile_comment'>
                                            <Tooltip title="Average Comments">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={CommentIcon} /><span>{NFormatter(item?.edge_owner_to_timeline_media?.edges[0]?.avg_comment)}</span>
                                                </div>
                                            </Tooltip>
                                            {/* <div className='descr_title'>
                                                Average Comments
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='like_comment_box'>
                                        <div className='profile_like'>
                                            <Tooltip title="Average Views">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={ViewIcon} /><span>{NFormatter(item?.edge_felix_video_timeline?.edges[0]?.averageReelView)}</span>
                                                </div>
                                            </Tooltip>
                                            {/* <div className='descr_title'>
                                                Average Views
                                            </div> */}
                                        </div>
                                        <div className='profile_comment'>
                                            <Tooltip title="Engagement Rate">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={ER} /><span>{NFormatter(item?.edge_owner_to_timeline_media?.edges[0]?.er)}</span>
                                                </div>
                                            </Tooltip>
                                            {/* <div className='descr_title'>
                                                Engagement Rate%
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='list_remove_pane'>
                                        <div onClick={() => { handleAddToListTable(item) }}>+Add to my List</div>
                                        {addToListTableClicked === true ?
                                            item.username == resultClickedData ?
                                                [item].map((elm) =>
                                                    <section className="addList_section" id={item.id}>
                                                        <div className="addList_option">
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={handleAddToListTable}><AiOutlineClose /></div>
                                                            <div className="section_list_title">
                                                                Select the list to which you want to add the
                                                                influencer.
                                                            </div>
                                                            <div style={{ overflowY: 'auto', height: '20vh', padding: '0.75rem' }}>
                                                                {listData.map((element) =>
                                                                    <div className="list_options" onClick={() => { addInfluencerToList(elm, element) }}>
                                                                        {element.listName}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </section>
                                                )

                                                : null
                                            : null}
                                        <div onClick={() => { handleRemoveComparedInfluencer(item) }}>Remove</div>
                                    </div>
                                    <div className='recent_posts'>
                                        <div className='recent_posts_title'>Recent Posts</div>
                                        <div className='recent_post_box'>
                                            <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Images/${item.username}/${item.username}_recent_image_1.png`} />
                                            <div style={{ paddingLeft: '0.5rem' }}>
                                                <div className='profile_like'>
                                                    <Tooltip title="Likes">
                                                        <img src={LikeIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_owner_to_timeline_media.edges[1]?.node.edge_liked_by.count)}</span></div>
                                                <div className='profile_comment'>
                                                    <Tooltip title='Comments'>
                                                        <img src={CommentIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_owner_to_timeline_media.edges[1]?.node.edge_media_to_comment.count)}</span></div>
                                                <div className='profile_like'>
                                                    <Tooltip title='Views'>
                                                        <img src={ViewIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_felix_video_timeline.edges[1]?.node.video_view_count)}</span></div>
                                            </div>
                                        </div>
                                        <div className='recent_post_box'>
                                            <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Images/${item.username}/${item.username}_recent_image_2.png`} />
                                            <div style={{ paddingLeft: '0.5rem' }}>
                                                <div className='profile_like'>
                                                    <Tooltip title="Likes">
                                                        <img src={LikeIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_owner_to_timeline_media.edges[2]?.node.edge_liked_by.count)}</span></div>
                                                <div className='profile_comment'>
                                                    <Tooltip title='Comments'>
                                                        <img src={CommentIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_owner_to_timeline_media.edges[2]?.node.edge_media_to_comment.count)}</span></div>
                                                <div className='profile_like'>
                                                    <Tooltip title='Views'>
                                                        <img src={ViewIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_felix_video_timeline.edges[2]?.node.video_view_count)}</span></div>
                                            </div>
                                        </div>
                                        <div className='recent_post_box'>
                                            <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Images/${item.username}/${item.username}_recent_image_3.png`} />
                                            <div style={{ paddingLeft: '0.5rem' }}>
                                                <div className='profile_like'>
                                                    <Tooltip title="Likes">
                                                        <img src={LikeIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_owner_to_timeline_media.edges[3]?.node.edge_liked_by.count)}</span></div>
                                                <div className='profile_comment'>
                                                    <Tooltip title='Comments'>
                                                        <img src={CommentIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_owner_to_timeline_media.edges[3]?.node.edge_media_to_comment.count)}</span></div>
                                                <div className='profile_like'>
                                                    <Tooltip title='Views'>
                                                        <img src={ViewIcon} />
                                                    </Tooltip>
                                                    <span>{NFormatter(item.edge_felix_video_timeline.edges[3]?.node.video_view_count)}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    <div className='add_influencers'>
                        <div className='add_btn' onClick={() => handleAddToCompare()}>+</div>
                        <div className='add_inf' onClick={() => handleAddToCompare()}>Add Influencer</div>
                        {
                            addToCompareClicked === true ?

                                // [data].map((item) =>
                                <div className='overlay'>
                                    <div className="compare_section">
                                        <div className="close_btn"><AiOutlineClose onClick={() => handleAddToCompare()} /></div>
                                        <div className="compare_headers">
                                            Add to Compare
                                        </div>
                                        <div className="compare_title">
                                            Select the influencer(s) from results to
                                            add to the selection you want to compare.
                                        </div>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={handleChange}
                                            className="compare_input"
                                        />
                                        {suggestionsActive && <Suggestions />}
                                        <div className="influencers_box">
                                            <div style={{ overflowY: 'auto', height: '20vh' }}>
                                                {
                                                    addToCompareData.length > 0 ?
                                                        <>
                                                            {
                                                                addToCompareData.map((data) =>
                                                                    <div className="added_influencer">
                                                                        {data.username}<span><AiOutlineClose onClick={() => { handleRemoveInfluencer(data) }} /></span>
                                                                    </div>
                                                                )
                                                            }
                                                        </>
                                                        : null
                                                }
                                            </div>
                                            <div onClick={() => setAddToCompareData([])} className="clear_all">
                                                Clear all
                                            </div>
                                            <div className="btn_pane">
                                                <Button onClick={handleCompareInfluencers} className='compare_influencers_btn'>
                                                    Compare Now
                                                </Button>
                                                <Button className="clear_btn">
                                                    Compare Later
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                // )
                                : null
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
export default CompareInfluencers;