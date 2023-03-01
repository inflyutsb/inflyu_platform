import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Navbar from '../../../Common/Sidebar/sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom'
import TopBar from '../../../Common/TopBar';
import './index.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRupeeSign } from 'react-icons/fa';
import { HiOutlineUser } from 'react-icons/hi';
import NFormatter from '../../../Common/NumberFormatter/numFormatter';
import LikeIcon from '../../../Assets/Images/likeIcon.png'
import CommentIcon from '../../../Assets/Images/commentIcon.png'
import ER from '../../../Assets/Images/er.png'
import ViewIcon from '../../../Assets/Images/viewIcon.png'
import Loader from '../../../Common/Loader';

function CompareLists() {

    const [comparedlistsData, setComparedlistsData] = useState([]);
    const [addToCompareClicked, setAddToCompareClicked] = useState(false);
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [autoSuggestedData, setAutoSuggestedData] = useState([]);
    const [addToCompareData, setAddToCompareData] = useState([]);

    const userId = localStorage.getItem('id');
    let autoSuggestedArray = [];
    const params = useParams();
    const navigate = useNavigate();

    const handleComparelists = () => {
        setAddToCompareClicked(!addToCompareClicked)
        let result = '';
        let string = '';
        addToCompareData.map((item) => {
            result += (`&lists=${item.listName}`)
            string = result.substring(1);
            {
                JSON.stringify(params) !== '{}' ?
                    navigate(`/CompareLists/${result}`)
                    :
                    navigate(`/CompareLists/${string}`)
            }
        })
    }

    const compareList = () => {
        if (JSON.stringify(params) !== '{}') {
            const url = `http://13.234.125.76:4000/compareUsersLists/${userId}?${params.lists}`;
            fetch(url)
                .then((res) => {
                    res.json()
                        .then((data) => {
                            setComparedlistsData(data)
                        })
                })
        }
        else {
            setComparedlistsData([])
        }
    }

    const handleRemoveComparedList = (item) => {
        let newStr = '';
        let updateStr = params.lists.substring(params.lists.indexOf('?') + 1);
        if (updateStr.split('=').length - 1 > 2) {
            let abc = updateStr.split('&');
            for (let i in abc) {
                if (!abc[i].includes(item.listName)) {
                    newStr += abc[i] + '&';
                }
            }
            let finalstring = newStr.substring(0, newStr.length - 1)
            navigate(`/CompareLists/${finalstring}`)
        }
    }

    const getListData = () => {
        const url = `http://13.234.125.76:4000/getListData/${userId}`;
        fetch(url)
            .then((data) => {
                data.json()
                    .then((result) => {
                        result.forEach((item) => {
                            autoSuggestedArray.push(item.listName)
                            setAutoSuggestedData(autoSuggestedArray)
                        })
                    })
            })
    }

    const redirectToList = (item) => {
        navigate(`/userLists/${item.listName}`)
    }

    const handleAddToCompare = () => {
        const toggle = addToCompareClicked ? false : true;
        setAddToCompareClicked(toggle);
    }

    const handleRemoveList = (data) => {
        setAddToCompareData((current) => current.filter((item) =>
            item.listName !== data.listName
        ))
    }


    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        if (query.length > 0) {
            const filterSuggestions = autoSuggestedData.filter(
                (suggestion) =>
                    suggestion.toLowerCase().indexOf(query) > -1
            );
            setSuggestions(filterSuggestions);
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
            const abc = addToCompareData.find((item) => item.listName === e.target.innerText)
            if (!abc) {
                setAddToCompareData([...addToCompareData, { listName: e.target.innerText }])
            }
        }
    };

    const Suggestions = () => {
        return (
            <>
                <div className="suggestions">
                    {suggestions.map((suggestion, index) => {
                        return (
                            <div
                                className={index === suggestionIndex ? "active_inf" : "non_active"}
                                key={index}
                                onClick={handleClick}
                            >
                                {suggestion}
                            </div>
                        );
                    })}
                </div>
                {/* <div className="suggestions">
                    NO LISTS FOUND
                </div> */}
            </>
        );
    };

    const handleRemoveAllLists = () => {
        navigate(`/CompareLists`)
    }

    useEffect(() => {
        getListData();
    }, [])

    useEffect(() => {
        compareList();
    }, [params])

    return (
        <div className='compare_lists_container row no-gutters'>
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                <Navbar />
            </div>
            <div className='col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                <TopBar />
                <div className='clear_btn_pane'>
                    <div className='clear_all_btn'>
                        <Button className='clear_btn' onClick={handleRemoveAllLists}>Clear All</Button>
                    </div>
                </div>
                <div className='result_pane'>
                    {
                        comparedlistsData.map((item) =>
                            <div className='results'>
                                <div className='listname'>{item.listName}</div>
                                <div className='inf_count'>{item.totalInfluencers} Influencers</div>
                                <div className='list_view' onClick={() => { redirectToList(item) }}>View list </div>
                                <div className='category'>
                                    {item.totalCategory.map((data) =>
                                        data !== null ?
                                            <div className='category_box'>
                                                {data.split('_')}
                                            </div>
                                            : null


                                    )
                                    }
                                </div>
                                <div className='cost'><FaRupeeSign />{NFormatter(item.totalCost)}</div>
                                <div className='detail_label'>Estimated Cost</div>
                                <div className='followers_count'><HiOutlineUser />{NFormatter(item.totalFollowers)}</div>
                                <div className='detail_label'>Total Followers</div>
                                <div className='avg_like'><img src={LikeIcon} />{NFormatter(item.totalAvgLike)}</div>
                                <div className='detail_label'>Average Likes</div>
                                <div className='avg_comment'><img src={CommentIcon} />{NFormatter(item.totalAvgComment) > 1000 ? NFormatter(item.totalAvgComment) : (item.totalAvgComment).toFixed(0).replace(/\.0$/, '')}</div>
                                <div className='detail_label'>Average Comments</div>
                                <div className='avg_reach'><img src={ViewIcon} />{NFormatter(item.totalReach)}</div>
                                <div className='detail_label'>Average Reach</div>
                                <div className='avg_reach'><img src={ER} />{item.averageEr.toFixed(2)}</div>
                                <div className='detail_label_last'>Average Engagement Rate%</div>
                                <div className='remove_btn' onClick={() => { handleRemoveComparedList(item) }}>Remove</div>
                            </div>
                        )
                    }
                    <div className='add_influencers'>
                        <div className='add_btn' onClick={() => handleAddToCompare()}>+</div>
                        <div className='add_inf' onClick={() => handleAddToCompare()}>Add Lists</div>
                        {
                            addToCompareClicked === true ?
                                <div className='overlay'>
                                    <div className="compare_section">
                                        <div className="close_btn"><AiOutlineClose onClick={() => handleAddToCompare()} /></div>
                                        <div className="compare_headers">
                                            Add to Compare
                                        </div>
                                        <div className="compare_title">
                                            Select the List(s) from results to
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
                                                                        {data.listName}<span><AiOutlineClose onClick={() => { handleRemoveList(data) }} /></span>
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
                                                <Button onClick={handleComparelists} className='add_list_btn'>
                                                    Compare Now
                                                </Button>
                                                <Button className="clear_btn">
                                                    Compare Later
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CompareLists;