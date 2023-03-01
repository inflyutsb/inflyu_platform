import React, { useState, useEffect } from 'react'
import './index.scss';
import Navbar from '../../Common/Sidebar/sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import NFormatter from '../../Common/NumberFormatter/numFormatter';
import { useNavigate, useParams } from "react-router-dom";
import { MdAdd } from 'react-icons/md';
import { AiFillCaretDown, AiOutlineClose } from 'react-icons/ai';
import { MdOutlineArrowDropUp } from 'react-icons/md';
import { Input } from 'reactstrap';
import TopBar from '../../Common/TopBar/index';
import checkbundles from '../../Assets/Images/checkbundle.png'
import checklists from '../../Assets/Images/checklists.png'
import checklistselected from '../../Assets/Images/checklistselected.png';
import checkbundleselected from '../../Assets/Images/checkbundleselected.png';
import ListIcon from '../../Assets/Images/listicon.png';
import CostIcon from '../../Assets/Images/costicon.png';
import CompareIcon from '../../Assets/Images/compareicon.png';
import MyLists from '../MyLists/index';
import Sport from '../../Assets/Images/sport.jpg';
import Loader from '../../Common/Loader/index';


function BasketInfluencers() {

    const [inputField, setInputField] = useState('');
    const [influencersData, setInfluencersData] = useState([]);
    const [addToListTableClicked, setAddToListTableClicked] = useState(false);
    const [listData, setListData] = useState([]);
    const [newPlanClicked, setNewPlanClicked] = useState(false);
    const [rowClickedData, setRowClickedData] = useState('');
    const [isfilterFollowerClicked, setIsFilterFollowerClicked] = useState(false);
    const [isfilterCategoryClicked, setIsFilterCategoryClicked] = useState(false);
    const [isfilterErClicked, setIsFilterErClicked] = useState(false);
    const [filterFollowerClicked, setFilterFollowerClicked] = useState(false);
    const [filterCategoryClicked, setFilterCategoryClicked] = useState(false);
    const [filterErClicked, setFilterErClicked] = useState(false);
    const [minRange, setMinrange] = useState();
    const [maxRange, setMaxRange] = useState();
    const [category, setCategory] = useState('');
    const [minErRange, setMinErrange] = useState();
    const [maxErRange, setMaxErRange] = useState();
    const [followersRangeBasedInfluencers, setFollowersRangeBasedInfluencers] = useState([]);
    const [categoryBasedInfluencers, setCategoryBasedInfluencers] = useState([]);
    const [erBasedInfluencers, setErBasedInfluencers] = useState([]);
    const [basketData, setBasketData] = useState([]);
    const [changeBasket, setChangeBasket] = useState(false);
    const [listIconSelected, setListIconSelected] = useState(false);
    const [bundleIconSelected, setBundleIconSelected] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState('');
    const [autoSuggestedData, setAutoSuggestedData] = useState([]);
    const [influencer, setInfluencer] = useState([]);
    const [addToCompareClicked, setAddToCompareClicked] = useState(false);
    const [addToCompareData, setAddToCompareData] = useState([]);
    const [costModalOpened, setCostModalOpened] = useState(false);
    const [costUser, setCostUser] = useState('');
    const [mainLoader, setMainLoader] = useState(false);
    const [desc, setDesc] = useState('');

    let navigate = useNavigate();
    let { categoryName } = useParams();
    const userId = localStorage.getItem('id');
    let autoSuggestedArray = [];

    const fetchInfluencers = () => {
        setMainLoader(true);
        const url = `http://13.234.125.76:4000/showBasketInfluencers?categoryName=${categoryName}`;
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setInfluencersData(result)
                setMainLoader(false);
            })
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

    const redirectProfile = (data) => {
        navigate(`/profile/${data.username}`)
    }

    const handleAddToListTable = (data) => {
        setRowClickedData(data.username)
        const toggle = addToListTableClicked ? false : true;
        setAddToListTableClicked(toggle);
    }

    const handleFollowerFilterClicked = () => {
        setIsFilterFollowerClicked(value => !value)
    };

    const handleCategoryFilterClicked = () => setIsFilterCategoryClicked(value => !value);

    const handleErFilterClicked = () => setIsFilterErClicked(value => !value);

    const addInfluencerToList = (data, item) => {
        const url = `http://13.234.125.76:4000/addInfluencersToList/${userId}?list=${item.listName}&username=${data.username}`
        fetch((url), {
            method: 'POST',
        })
            .then((data) => { data.json() })
            .then((res) => {
                setAddToListTableClicked(!addToListTableClicked)
                console.log(res)
            })
    }

    const filterByFollowersRange = () => {
        setFilterFollowerClicked(true);
        setIsFilterFollowerClicked(false);
        const url = `http://13.234.125.76:4000/followersfilteredBasketData?minFollowers=${minRange}&maxFollowers=${maxRange}&listName=${categoryName}`;
        fetch(url)
            .then((data) => {
                data.json()
                    .then((res) => {
                        setFollowersRangeBasedInfluencers(res)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const filterCategory = () => {
        setFilterCategoryClicked(true)
        setIsFilterCategoryClicked(false);
        const url = `http://13.234.125.76:4000/filtered_basket_list?listName=${categoryName}&category=${category}`;
        fetch(url)
            .then((data) => {
                data.json()
                    .then((res) => {
                        setCategoryBasedInfluencers(res)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const filterByErRange = () => {
        setFilterErClicked(true);
        setIsFilterErClicked(false);
        const url = `http://13.234.125.76:4000/erfilteredBasketData?minEr=${minErRange}&maxEr=${maxErRange}&listName=${categoryName}`;
        fetch(url)
            .then((data) => {
                data.json()
                    .then((res) => {
                        setErBasedInfluencers(res)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const fetchBasketsName = () => {
        const url = `http://13.234.125.76:4000/showCategorizedBasket`;
        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                setBasketData(response)
            })
    }

    const handleRedirectToBasket = (item) => {
        setChangeBasket((prev) => !prev);
        navigate(`/basketInfluencers/${item.categoryName}`);
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
        setInfluencer(e.target.innerText)
        setSuggestions([]);
        setValue('');
        setSuggestionsActive(false);
        {
            const abc = addToCompareData.find((item) => item.username === e.target.innerText)
            if (!abc) {
                setAddToCompareData([...addToCompareData, { username: e.target.innerText }])
            }
        }
        console.log(addToCompareData)
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
                                <div style={{marginLeft: '0.5rem'}}>{suggestion.username}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleAddToCompare = (data) => {
        const toggle = addToCompareClicked ? false : true;
        setAddToCompareClicked(toggle);
        setAddToCompareData([{ username: data.username }])
    }

    const handleRemoveInfluencer = (data) => {
        setAddToCompareData((current) => current.filter((item) =>
            item.username !== data.username
        ))
    }

    const handleCompareInfluencers = () => {
        let params = '';
        let result = ''
        let string = ''
        addToCompareData.map((item) => {
            result += params.concat(params, `&influencers=${item.username}`)
            string = result.substring(1);
        })
        navigate(`/CompareInfluencers/${string}`)
    }

    // const fetchAllData = () => {
    //     const url = `http://13.234.125.76:4000/getrelatedinfluencers?inputField`;
    //     fetch(url)
    //         .then((data) => {
    //             data.json()
    //                 .then((res) => {
    //                     res.map((item) => {
    //                         autoSuggestedArray.push(item.username)
    //                         setAutoSuggestedData(autoSuggestedArray)
    //                     })
    //                 })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    const getDescriptionOfBasket = () => {
        let url = `http://13.234.125.76:4000/showBasketDescription?categoryName=${categoryName}`;
        fetch(url)
            .then((response) => {
                response.json()
                    .then((data) => {
                        setDesc(data[0].description);
                    })
            })
    }

    const handleCostClicked = (e) => {
        setCostUser(e.username)
        let data = costModalOpened ? false : true;
        setCostModalOpened(data)
    }

    useEffect(() => {
        fetchInfluencers();
        getListData();
        fetchBasketsName();
        getDescriptionOfBasket();
    }, [changeBasket]);

    useEffect(() => {
        fetchInfluencers();
        getListData();
        fetchBasketsName();
        // fetchAllData();
        getDescriptionOfBasket();
    }, []);


    return (
        <div className='basket_influencers_container row no-gutters'>
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                <Navbar />
            </div>
            <div className='basket_influencers_container_content col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                <TopBar />
                <div className='row no-gutters'>
                    <div className='middle_pane_lists col-lg-9 col-md-8 col-sm-8 col-xs-8 col-8'>
                        <div className='list_category_header col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12'>
                            Top {categoryName} Influencers
                        </div>
                        <div className='list_desc col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12'>
                            {console.log(desc)}
                            {desc ? desc : 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
                        </div>
                        <div className='list_category_data'>
                            <TableContainer component={Paper} className='table_paper'>
                                <Table stickyHeader className="table_container" >
                                    <TableHead className='table_head'>
                                        <TableRow className='table_row'>
                                            <TableCell className='table_head_value_1'>Name</TableCell>
                                            <TableCell className='table_head_value' align="center">Category</TableCell>
                                            <TableCell className='table_head_value' align="center">Avg Likes</TableCell>
                                            <TableCell className='table_head_value' align="center">Followers</TableCell>
                                            <TableCell className='table_head_value' align="center">Average Reach</TableCell>
                                            <TableCell className='table_head_value' align="center">Average Comment</TableCell>
                                            <TableCell className='table_head_value' align="center">ER</TableCell>
                                            <TableCell className='table_head_value' align="center">City</TableCell>
                                            <TableCell className='table_head_value' align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            influencersData[0] ?
                                                (filterErClicked === true ?
                                                    erBasedInfluencers :
                                                    filterCategoryClicked === true ?
                                                        categoryBasedInfluencers :
                                                        filterFollowerClicked === true ?
                                                            followersRangeBasedInfluencers :
                                                            influencersData)
                                                    .map((data, index) =>
                                                        <>
                                                            <TableRow className='table_body_row'>
                                                                <TableCell component="th" scope="row" key={data.username} onClick={() => redirectProfile(data)} className='table_body_value_1' style={{ cursor: 'pointer' }}>
                                                                    <div className="profile_view">
                                                                        <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Images/${data.username}/${data.username}_profile_image.png`} className='profile_image' />
                                                                        <div style={{ marginLeft: '0.5rem' }}>{data?.full_name}</div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className='table_body_value' align="center">
                                                                    {data.category_enum !== null ? data.category_enum.length > 12 ? (data.category_enum.substring(0, 15) + '...') : data.category_enum : null}
                                                                </TableCell>
                                                                <TableCell className='table_body_value' align="center">
                                                                    {NFormatter(data?.edge_owner_to_timeline_media['edges'][0]?.avg_likes)}
                                                                </TableCell>
                                                                <TableCell className='table_body_value' align="center">
                                                                    {NFormatter(data?.edge_followed_by.count)}
                                                                </TableCell>
                                                                <TableCell className='table_body_value' align="center">
                                                                    {NFormatter(data?.edge_felix_video_timeline['edges'][0]?.averageReelView)}
                                                                </TableCell>
                                                                <TableCell className='table_body_value' align="center">
                                                                    {NFormatter(data?.edge_owner_to_timeline_media['edges'][0]?.avg_comment)}
                                                                </TableCell>
                                                                <TableCell className='table_body_value' align="center">
                                                                    {NFormatter(data?.edge_owner_to_timeline_media['edges'][0]?.er)}
                                                                </TableCell>
                                                                <TableCell className='table_body_value' align="center">{data.city_name}</TableCell>
                                                                <TableCell key={index} className='table_body_value' >
                                                                    <div style={{ display: 'flex', cursor: 'pointer' }}>
                                                                        <img src={CostIcon} style={{ marginLeft: '0.625rem', marginRight: '0.625rem' }} onClick={(e) => { handleCostClicked(data) }} />
                                                                        {
                                                                            costModalOpened === true ?
                                                                                costUser === data.username ?
                                                                                    <div className='overlay'>
                                                                                        <div className='cost_modal'>
                                                                                            <div className='modal_title'>Check Cost </div>
                                                                                            <div className='modal_desc'>The estimated cost for the influencer is as follows,</div>
                                                                                            <div className='cost_box'>
                                                                                                <div>Reel</div>
                                                                                                {
                                                                                                    data?.costFactorReel?.minTotalCost || data?.costFactorReel?.minTotalCost ?
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorReel?.minTotalCost)} - Rs{NFormatter(data?.costFactorReel?.maxTotalCost)}</div>
                                                                                                        :
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorReel?.influencerExactminTotalCost)} - Rs{NFormatter(data?.costFactorReel?.influencerExactmaxTotalCost)}</div>
                                                                                                }
                                                                                            </div>
                                                                                            <div className='cost_box'>
                                                                                                <div>Post</div>
                                                                                                {
                                                                                                    data?.costFactorPosts?.minTotalCost || data?.costFactorPosts?.minTotalCost ?
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorPosts?.minTotalCost)} - Rs{NFormatter(data?.costFactorPosts?.maxTotalCost)}</div>
                                                                                                        :
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorPosts?.influencerExactminTotalCost)} - Rs{NFormatter(data?.costFactorPosts?.influencerExactmaxTotalCost)}</div>
                                                                                                }
                                                                                            </div>
                                                                                            <div className='cost_box'>
                                                                                                <div>Story</div>
                                                                                                {
                                                                                                    data?.costFactorStories?.minTotalCost || data?.costFactorStories?.minTotalCost ?
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorStories?.minTotalCost)} - Rs{NFormatter(data?.costFactorStories?.maxTotalCost)}</div>
                                                                                                        :
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorStories?.influencerExactminTotalCost)} - Rs{NFormatter(data?.costFactorStories?.influencerExactmaxTotalCost)}</div>
                                                                                                }
                                                                                            </div>
                                                                                            <div className='cost_box'>
                                                                                                <div>Igtv</div>
                                                                                                {
                                                                                                    data?.costFactorIgtv?.minTotalCost || data?.costFactorIgtv?.minTotalCost ?
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorIgtv?.minTotalCost)} - Rs{NFormatter(data?.costFactorIgtv?.maxTotalCost)}</div>
                                                                                                        :
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorIgtv?.influencerExactminTotalCost)} - Rs{NFormatter(data?.costFactorIgtv?.influencerExactmaxTotalCost)}</div>
                                                                                                }
                                                                                            </div>
                                                                                            <div className='cost_box'>
                                                                                                <div>Swipeup Stories</div>
                                                                                                {
                                                                                                    data?.costFactorSwipeUp?.minTotalCost || data?.costFactorSwipeUp?.minTotalCost ?
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorSwipeUp?.minTotalCost)} - Rs{NFormatter(data?.costFactorSwipeUp?.maxTotalCost)}</div>
                                                                                                        :
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorSwipeUp?.influencerExactminTotalCost)} - Rs{NFormatter(data?.costFactorSwipeUp?.influencerExactmaxTotalCost)}</div>
                                                                                                }
                                                                                            </div>
                                                                                            <div className='cost_box'>
                                                                                                <div>Videos</div>
                                                                                                {
                                                                                                    data?.costFactorVideo?.minTotalCost || data?.costFactorVideo?.minTotalCost ?
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorVideo?.minTotalCost)} - Rs{NFormatter(data?.costFactorVideo?.maxTotalCost)}</div>
                                                                                                        :
                                                                                                        <div className='cost_value'>: Rs{NFormatter(data?.costFactorVideo?.influencerExactminTotalCost)} - Rs{NFormatter(data?.costFactorVideo?.influencerExactmaxTotalCost)}</div>
                                                                                                }
                                                                                            </div>
                                                                                            <div className='modal_footer'>
                                                                                                To check a more accurate estimate, please contact (+91) 9024236599
                                                                                            </div>
                                                                                            <Button className='close_btn' onClick={handleCostClicked}>Close</Button>
                                                                                        </div>
                                                                                    </div>
                                                                                    : null
                                                                                :
                                                                                null
                                                                        }
                                                                        <img src={ListIcon} id={data.id} onClick={() => { handleAddToListTable(data) }} style={{ marginLeft: '0.625rem', marginRight: '0.625rem' }} />
                                                                        {addToListTableClicked === true ?
                                                                            [data].map((item) =>
                                                                                item.username == rowClickedData ?
                                                                                    <div className='overlay'>
                                                                                        <section className="addList_section" id={data.id}>
                                                                                            <div className="addList_option">
                                                                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={handleAddToListTable}><AiOutlineClose /></div>
                                                                                                <div onClick={() => setNewPlanClicked(true)} className='section_dropdown_header'>Add To List</div>
                                                                                                <div className="section_list_title">
                                                                                                    Select the list to which you want to add the
                                                                                                    influencer.
                                                                                                </div>
                                                                                                <div style={{ overflowY: 'auto', height: '20vh', padding: '0.75rem' }}>
                                                                                                    {listData.map((item) =>
                                                                                                        <div className="list_options" onClick={() => { addInfluencerToList(data, item) }}>
                                                                                                            {item.listName}
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        </section>
                                                                                    </div>
                                                                                    : null
                                                                            )

                                                                            : null}
                                                                        <img src={CompareIcon} style={{ marginLeft: '0.625rem', marginRight: '0.625rem' }} onClick={() => handleAddToCompare(data)} />
                                                                        {
                                                                            addToCompareClicked === true ?

                                                                                [data].map((item) =>
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
                                                                                                                {/* <div className="added_influencer">
                                                                                                                {addToCompareData[0].username} <span><AiOutlineClose onClick={() => { setAddToCompareData([]) }} /></span>
                                                                                                            </div> */}
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
                                                                                                    <Button onClick={handleCompareInfluencers} className='compare_btn'>
                                                                                                        Compare Now
                                                                                                    </Button>
                                                                                                    <Button className="clear_btn">
                                                                                                        Compare Later
                                                                                                    </Button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                                : null
                                                                        }
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                    )
                                                :
                                                <div className='inline_loader'>
                                                    <Loader />
                                                </div>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                    <div className='side_influencers_bundle col-lg-3 col-md-4 col-sm-4 col-xs-4 col-4'>
                        <div className='side_list_css'>
                            <div className='select_pane'>
                                {bundleIconSelected === true ?
                                    <img src={checkbundleselected} onClick={() => {
                                        setBundleIconSelected(false)
                                        setListIconSelected(true)
                                    }} style={{ cursor: 'pointer' }} />
                                    :
                                    <img src={checkbundles} onClick={() => {
                                        setBundleIconSelected(true)
                                        setListIconSelected(false)
                                    }} style={{ cursor: 'pointer' }} />}
                                {listIconSelected === false ?
                                    <img src={checklists} onClick={() => {
                                        setListIconSelected(true)
                                        setBundleIconSelected(false)
                                    }} style={{ cursor: 'pointer' }} />
                                    :
                                    <img src={checklistselected} onClick={() => {
                                        setListIconSelected(false)
                                        setBundleIconSelected(true)
                                    }} style={{ cursor: 'pointer' }} />}
                            </div>
                            {
                                listIconSelected === true ?
                                    <MyLists />
                                    :
                                    <>
                                        <div className='sidebar_header'>
                                            Top Bundles
                                        </div>
                                        {
                                            basketData[0] ?
                                                basketData.map((item) =>
                                                    <div className='bundle_box row no-gutters'>
                                                        <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12 col-12' style={{ overflow: 'hidden' }}>
                                                            <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Basket/${item.categoryName}/image.png`} className="influencers_image" />
                                                        </div>
                                                        <div className='bundle_desc col-lg-7 col-md-7 col-sm-12 col-xs-12 col-12'>
                                                            <div className='bundle_title col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pl-0 pr-0'>Top {item.basketInfluencersCount} {item.categoryName} Influencers</div>
                                                            <div className='bundle_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pl-0 pr-0' onClick={() => { handleRedirectToBasket(item) }}>View</div>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                <div className='inline_loader'>
                                                    <Loader />
                                                </div>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default BasketInfluencers