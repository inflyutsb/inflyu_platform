import React, { useEffect, useState } from 'react';
import Navbar from '../../Common/Sidebar/sidebar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import './listpage.scss';
import { Input, Label } from 'reactstrap';
import { MdOutlineAddBox } from "react-icons/md";
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { RiSubtractFill, RiAddFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { BsFilterLeft } from 'react-icons/bs';
import TopBar from '../../Common/TopBar';
import Sport from '../../Assets/Images/sport.jpg'
import Slider from '@mui/material/Slider';
import Select from 'react-select';
import Loader from '../../Common/Loader/index'
const options = [
    { value: 'Nano(1K-10K Followers)', label: 'Nano(1K-10K Followers)' },
    { value: 'Micro(10K-50K Followers)', label: 'Micro(10K-50K Followers)' },
    { value: 'Mid-Tier(50K-100K Followers)', label: 'Mid-Tier(50K-100K Followers)' },
    { value: 'Macro(100K-1M Followers)', label: 'Macro(100K-1M Followers)' },
    { value: 'Mega(1M + Followers)', label: 'Mega(1M + Followers)' },
];
const options1 = [
    { value: 'Nano(1K-10K Followers)', label: 'Nano(1K-10K Followers)' },
    { value: 'Micro(10K-50K Followers)', label: 'Micro(10K-50K Followers)' },
    { value: 'Mid-Tier(50K-100K Followers)', label: 'Mid-Tier(50K-100K Followers)' },
    { value: 'Macro(100K-1M Followers)', label: 'Macro(100K-1M Followers)' },
    { value: 'Mega(1M + Followers)', label: 'Mega(1M + Followers)' },
];


function Lists() {

    const [inputField, setInputField] = useState('');
    const [basketData, setBasketData] = useState([]);
    const [listInfluencersData, setListInfluencersData] = useState([]);
    const [listInfluencerDetails, setListInfluencerDetails] = useState([]);
    const [newPlanClicked, setNewPlanClicked] = useState(false);
    const [listName, setListName] = useState('');
    const [listData, setListData] = useState([]);
    const [reel, setReel] = useState(0);
    const [post, setPost] = useState(0);
    const [story, setStory] = useState(0);
    const [igtv, setIgtv] = useState(0);
    const [swipeUpStory, setswipeUpStory] = useState(0);
    const [video, setVideo] = useState(0);
    const [description, setDescription] = useState('');
    const [listDeleted, setListDeleted] = useState(false);
    const [basketName, setBasketName] = useState([]);
    const [sortingBaskets, setSortingBaskets] = useState(false);
    const [sortedBaskets, setSortedBaskets] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState('');

    const [nanoClicked, setNanoClicked] = useState(false);
    const [microClicked, setMicroClicked] = useState(false);
    const [midTierClicked, setMidTierClicked] = useState(false);
    const [macroClicked, setMacroClicked] = useState(false);
    const [megaClicked, setMegaClicked] = useState(false);
    const [nanoMaxClicked, setNanoMaxClicked] = useState(false);
    const [microMaxClicked, setMicroMaxClicked] = useState(false);
    const [midTierMaxClicked, setMidTierMaxClicked] = useState(false);
    const [macroMaxClicked, setMacroMaxClicked] = useState(false);
    const [megaMaxClicked, setMegaMaxClicked] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [minRangeFollowers, setMinRangeFollowers] = useState(1000)
    const [maxRangeFollowers, setMaxRangeFollowers] = useState(10000)
    const [rangeEr, setRangeEr] = useState([0, 20]);
    const [silderRolled, setSliderRolled] = useState(false);
    const [silderErRolled, setSliderErRolled] = useState(false);
    const [sliderRolled1, setSlider1Rolled] = useState(false);
    const [isfilterFollowerClicked, setIsFilterFollowerClicked] = useState(false);
    const [isfilterErClicked, setIsFilterErClicked] = useState(false);
    const [filterErApplied, setFilterErApplied] = useState(false);
    const [filterFollowersApplied, setFilterFollowersApplied] = useState(false);

    let navigate = useNavigate();
    const userId = localStorage.getItem('id');
    const autoSuggestedArray = [];


    const searchInfluencers = () => {
        if (filterErApplied) {
            navigate(`/influencerslist/${value}/eRange=${rangeEr[0]}&${rangeEr[1]}`);
        }
        if (filterFollowersApplied) {
            navigate(`/influencerslist/${value}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`);
        }
        if (filterErApplied && filterFollowersApplied) {
            navigate(`/influencerslist/${value}/eRange=${rangeEr[0]}&${rangeEr[1]}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`);
        }
        if (!filterErApplied && !filterFollowersApplied) {
            navigate(`/influencerslist/${value}`);
        }
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
        navigate(`/basketInfluencers/${item.categoryName}`)
    }

    const handleCreateList = (listName, description, reel, post, story, igtv, swipeUpStory, video) => {
        const url = `http://13.234.125.76:4000/createList/${userId}`
        fetch((url), {
            method: 'POST',
            body: JSON.stringify({ listName, description, reel, post, story, igtv, swipeUpStory, video }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => { res.json() })
            .then((data) => {
                setListInfluencerDetails(data)
                setNewPlanClicked(false);
                localStorage.setItem('newList', listName);
            })
    }

    const handleAddPlan = () => {
        const data = newPlanClicked ? false : true;
        setNewPlanClicked(data);
    }

    const handleRedirectToList = (item) => {
        navigate(`/userLists/${item.listName}`)
    }

    const handleDeleteList = (item) => {
        const url = `http://13.234.125.76:4000/deleteList/${userId}?listName=${item.listName}`;
        fetch((url), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((res) => {
                setListDeleted(true);
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

    useEffect(() => {
        fetchBasketsName();
        getListData();
    }, []);

    useEffect(() => {
        getListData();
    }, [newPlanClicked]);

    useEffect(() => {
        getListData();
    }, [listDeleted]);

    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        if (query.length > 2) {
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
        navigate(`/profile/${e.target.innerText}`);
        setSuggestions([]);
        setValue('');
        setSuggestionsActive(false);
    };

    const Suggestions = () => {
        return (
            <>
                <div className="suggestions row no-gutters">
                    <div className='col-lg-10 col-md-8 col-sm-6 col-xs-6 col-6'>
                        <div style={{
                            margin: '0.313rem', padding: 0, fontFamily: 'Noto Sans',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '1.125rem',
                            lineHeight: '1rem',
                            color: 'rgba(0, 0, 0, 0.7)'
                        }}>Influencers</div>
                        {suggestions.map((suggestion, index) => {
                            return (
                                <div
                                    className={index === suggestionIndex ? "active" : ""}
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
                </div>
            </>
        );
    };

    const handleFollowerFilterClicked = () => {
        setIsFilterFollowerClicked(value => !value)
    };

    const handleErFilterClicked = () => setIsFilterErClicked(value => !value);

    const scale = value => {
        const previousMarkIndex = Math.floor(value / 25);
        const previousMark = (megaMaxClicked ? megaRange : macroMaxClicked ? macroRange : midTierMaxClicked ? midTierRange : microMaxClicked ? microRange : nanoMaxClicked ? nanoRange : followersRange)[previousMarkIndex];
        const remainder = value % 25;
        if (remainder === 0) {
            return previousMark.scaledValue;
        }
        const nextMark = (megaMaxClicked ? megaRange : macroMaxClicked ? macroRange : midTierMaxClicked ? midTierRange : microMaxClicked ? microRange : nanoMaxClicked ? nanoRange : followersRange)[previousMarkIndex + 1];
        const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
        return remainder * increment + previousMark.scaledValue;
    };

    const scale1 = value => {
        const previousMarkIndex1 = Math.floor(value / 25);
        const previousMark1 = (megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : followersRange)[previousMarkIndex1];
        const remainder = value % 25;
        if (remainder === 0) {
            return previousMark1.scaledValue;
        }
        const nextMark = (megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : followersRange)[previousMarkIndex1 + 1];
        const increment = (nextMark.scaledValue - previousMark1.scaledValue) / 25;
        return remainder * increment + previousMark1.scaledValue;
    };

    const nanoRange = [
        {
            value: 0,
            scaledValue: 1000,
            label: "1k"
        },
        {
            value: 25,
            scaledValue: 2500,
            label: "2.5k"
        },
        {
            value: 50,
            scaledValue: 5000,
            label: "5k"
        },
        {
            value: 75,
            scaledValue: 7500,
            label: "7.5k"
        },
        {
            value: 100,
            scaledValue: 10000,
            label: "10k"
        }
    ];

    const midTierRange = [
        {
            value: 0,
            scaledValue: 50000,
            label: "50k"
        },
        {
            value: 25,
            scaledValue: 60000,
            label: "60k"
        },
        {
            value: 50,
            scaledValue: 75000,
            label: "75k"
        },
        {
            value: 75,
            scaledValue: 90000,
            label: "90k"
        },
        {
            value: 100,
            scaledValue: 100000,
            label: "100k"
        }
    ];

    const macroRange = [
        {
            value: 0,
            scaledValue: 100000,
            label: "100k"
        },
        {
            value: 25,
            scaledValue: 250000,
            label: "250k"
        },
        {
            value: 50,
            scaledValue: 500000,
            label: "500k"
        },
        {
            value: 75,
            scaledValue: 750000,
            label: "750k"
        },
        {
            value: 100,
            scaledValue: 1000000,
            label: "1M"
        }
    ];

    const megaRange = [
        {
            value: 0,
            scaledValue: 1000000,
            label: "1M+"
        },
        {
            value: 25,
            scaledValue: 2500000,
            label: "2.5M+"
        },
        {
            value: 50,
            scaledValue: 5000000,
            label: "5M+"
        },
        {
            value: 75,
            scaledValue: 7500000,
            label: "7.5M+"
        },
        {
            value: 100,
            scaledValue: 10000000,
            label: "10M+"
        }
    ]

    const microRange = [
        {
            value: 0,
            scaledValue: 10000,
            label: "10k"
        },
        {
            value: 25,
            scaledValue: 20000,
            label: "20k"
        },
        {
            value: 50,
            scaledValue: 30000,
            label: "30k"
        },
        {
            value: 75,
            scaledValue: 40000,
            label: "40k"
        },
        {
            value: 100,
            scaledValue: 50000,
            label: "50k"
        }
    ];

    const followersRange = [
        {
            value: 0,
            scaledValue: 1000,
            label: "1k"
        },
        {
            value: 25,
            scaledValue: 5000,
            label: "5k"
        },
        {
            value: 50,
            scaledValue: 10000,
            label: "10k"
        },
        {
            value: 75,
            scaledValue: 25000,
            label: "25k"
        },
        {
            value: 100,
            scaledValue: 50000,
            label: "50k"
        },
        {
            value: 125,
            scaledValue: 100000,
            label: "100k"
        },
        {
            value: 150,
            scaledValue: 250000,
            label: "250k"
        },
        {
            value: 175,
            scaledValue: 500000,
            label: "500k"
        },
        {
            value: 200,
            scaledValue: 1000000,
            label: "1M"
        }
    ];

    const ErRange = [
        {
            value: 0,
            scaledValue: 0,
            label: "0"
        },
        {
            value: 5,
            scaledValue: 5,
            label: "5"
        },
        {
            value: 10,
            scaledValue: 10,
            label: "10"
        },
        {
            value: 15,
            scaledValue: 15,
            label: "15"
        },
        {
            value: 20,
            scaledValue: 20,
            label: "20"
        }
    ];

    function numFormatter(num) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
        } else if (num < 900) {
            return num; // if value < 1000, nothing to do
        }
    }

    const filterByFollowersRange = () => {
        setIsFilterFollowerClicked((value) => !value);
        setFilterFollowersApplied(true)
    }

    const filterByErRange = () => {
        setIsFilterErClicked((value) => !value);
        setFilterErApplied(true)
    }

    const filterDataByFollowersRange = () => {
        setIsFilterFollowerClicked(false);
    }

    const filterDataByErRange = () => {
        setIsFilterErClicked(false);
    }

    const handleClearFilters = () => {
        setFilterErApplied(false);
        setFilterFollowersApplied(false);
    }

    const handleChangeBasketValue = (e) => {
        let array = [];
        setBasketName(e.target.value)
        if ((e.target.value).length > 1) {
            setSortingBaskets(true);
            basketData.map((data) => {
                if (data.categoryName.toUpperCase().includes(basketName.toUpperCase())) {
                    array.push(data)
                    setSortedBaskets(array)
                }
            })
        }
        else {
            setSortingBaskets(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchInfluencers();
        }
    }

    useEffect(() => {
        if (selectedOption !== null) {
            if (selectedOption.label.includes('Mega(1M + Followers)')) {
                setMegaClicked(true);
                setMicroClicked(false);
                setMidTierClicked(false);
                setMacroClicked(false);
                setNanoClicked(false);
            }
            else if (selectedOption.label.includes('Macro(100K-1M Followers)')) {
                setMacroClicked(true);
                setMicroClicked(false);
                setMidTierClicked(false);
                setMegaClicked(false);
                setNanoClicked(false);
            }
            else if (selectedOption.label.includes('Mid-Tier(50K-100K Followers)')) {
                setMidTierClicked(true)
                setMicroClicked(false);
                setMacroClicked(false);
                setMegaClicked(false);
                setNanoClicked(false);
            }
            else if (selectedOption.label.includes('Micro(10K-50K Followers)')) {
                setMicroClicked(true)
                setMidTierClicked(false);
                setMacroClicked(false);
                setMegaClicked(false);
                setNanoClicked(false);
            }
            else if (selectedOption.label.includes('Nano(1K-10K Followers)')) {
                setNanoClicked(true)
                setMidTierClicked(false);
                setMacroClicked(false);
                setMegaClicked(false);
                setMicroClicked(false);
            }
        }
        console.log(nanoClicked);
    }, [selectedOption])

    useEffect(() => {
        if (selectedOption1 !== null) {
            if (selectedOption1.label.includes('Mega(1M + Followers)')) {
                setMegaMaxClicked(true);
                setMicroMaxClicked(false);
                setMidTierMaxClicked(false);
                setMacroMaxClicked(false);
                setNanoMaxClicked(false);
            }
            else if (selectedOption1.label.includes('Macro(100K-1M Followers)')) {
                setMacroMaxClicked(true);
                setMicroMaxClicked(false);
                setMidTierMaxClicked(false);
                setMegaMaxClicked(false);
                setNanoMaxClicked(false);
            }
            else if (selectedOption1.label.includes('Mid-Tier(50K-100K Followers)')) {
                setMidTierMaxClicked(true)
                setMicroMaxClicked(false);
                setMacroMaxClicked(false);
                setMegaMaxClicked(false);
                setNanoMaxClicked(false);
            }
            else if (selectedOption1.label.includes('Micro(10K-50K Followers)')) {
                setMicroMaxClicked(true)
                setMidTierMaxClicked(false);
                setMacroMaxClicked(false);
                setMegaMaxClicked(false);
                setNanoMaxClicked(false);
            }
            else if (selectedOption1.label.includes('Nano(1K-10K Followers)')) {
                setNanoMaxClicked(true)
                setMidTierMaxClicked(false);
                setMacroMaxClicked(false);
                setMegaMaxClicked(false);
                setMicroMaxClicked(false);
            }
        }
    }, [selectedOption1])

    return (
        <>
            <div className='list_container row no-gutters'>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                    <Navbar />
                </div>
                <div className='lists_content col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                    <div className='row no-gutters'>
                        <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12 col-12 '>
                            <TopBar />
                        </div>
                    </div>
                    <div className='row no-gutters'>
                        <div className='middle_pane_lists col-lg-9 col-md-8 col-sm-8 col-xs-8 col-8 '>
                            <div className='list_headers row no-gutters'>
                                <div className='search_container col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12'>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={handleChange}
                                        placeholder='Search for influencers, categories...'
                                        className='input_search col-lg-10 col-md-8 col-sm-6 col-xs-6 col-6'
                                        onKeyDown={handleKeyDown}
                                    />
                                    {suggestionsActive && <Suggestions />}
                                    <Button className='button_list' onClick={searchInfluencers}><AiOutlineSearch /></Button>
                                </div>
                                <div className='row filterContainer'>
                                    <Button className='test-bg' onClick={filterByFollowersRange}>Followers count<BsFilterLeft /></Button>
                                    <Button className='test-bg' onClick={filterByErRange}>Engagement Rate % <BsFilterLeft /></Button>
                                    {
                                        isfilterErClicked === true ?
                                            <div className="modal_section">
                                                <div className="modal_option">
                                                    <div>Engagement Rate %</div>
                                                    <Slider
                                                        value={rangeEr}
                                                        onChange={(e, data) => {
                                                            setRangeEr(data)
                                                            setSliderErRolled(true);
                                                        }}
                                                        marks={ErRange}
                                                        min={0}
                                                        max={20}
                                                        step={1}
                                                        className='slider'
                                                    />
                                                    {
                                                        silderErRolled === true ?
                                                            <>
                                                                <div className="followers_count_1">Minimum ER: {rangeEr[0]}</div>
                                                                <div className="followers_count">Maximum ER: {rangeEr[1]}</div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className="followers_count_1">Minimum ER: {rangeEr[0]}</div>
                                                                <div className="followers_count">Maximum ER: {rangeEr[1]}</div>
                                                            </>
                                                    }
                                                    <div style={{
                                                        display: 'flex', justifyContent: 'space-between'
                                                    }}>
                                                        <Button
                                                            color="primary"
                                                            onClick={filterDataByErRange}
                                                            className='filter_btn'
                                                        >
                                                            Filter
                                                        </Button>
                                                        <Button
                                                            color="primary"
                                                            onClick={handleErFilterClicked}
                                                            className='clr_btn'
                                                        >
                                                            Clear
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            isfilterFollowerClicked === true ?
                                                <div className="modal_section">
                                                    <div className="modal_option  row no-gutters">
                                                        <div className="modal_title">Followers Count</div>
                                                        <div>
                                                            <div className="label_slider">Minimum</div>
                                                            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                                                <Select
                                                                    defaultValue={selectedOption}
                                                                    onChange={setSelectedOption}
                                                                    options={options}
                                                                    className='select_option'
                                                                />
                                                            </div>
                                                        </div>
                                                        <Slider
                                                            value={minRangeFollowers}
                                                            onChange={(e, data) => {
                                                                setMinRangeFollowers(data)
                                                                setSliderRolled(true);
                                                            }}
                                                            marks={megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : followersRange}
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                            scale={scale1}
                                                            valueLabelFormat={numFormatter}
                                                            className='slider'
                                                        />
                                                        <div style={{ paddingTop: '2.25rem' }}>
                                                            <div className="label_slider">Maximum</div>
                                                            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                                                <Select
                                                                    defaultValue={selectedOption1}
                                                                    onChange={setSelectedOption1}
                                                                    options={options1}
                                                                />
                                                            </div>
                                                        </div>
                                                        <Slider
                                                            value={maxRangeFollowers}
                                                            onChange={(e, data) => {
                                                                setMaxRangeFollowers(data)
                                                                setSlider1Rolled(true);
                                                            }}
                                                            marks={megaMaxClicked ? megaRange : macroMaxClicked ? macroRange : midTierMaxClicked ? midTierRange : microMaxClicked ? microRange : nanoMaxClicked ? nanoRange : followersRange}
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                            scale={scale}
                                                            valueLabelFormat={numFormatter}
                                                            className='slider'
                                                        />
                                                        {
                                                            silderRolled === true ?
                                                                <div className="followers_count_1">Minimum Followers Count: {scale1(minRangeFollowers)}</div>
                                                                :
                                                                <div className="followers_count_1">Minimum Followers Count: {minRangeFollowers}</div>
                                                        }
                                                        {
                                                            sliderRolled1 === true ?
                                                                <div className="followers_count">Maximum Followers Count: {scale(maxRangeFollowers)}</div>
                                                                :
                                                                <div className="followers_count">Maximum Followers Count: {maxRangeFollowers}</div>
                                                        }
                                                        <div style={{
                                                            display: 'flex', justifyContent: 'space-between'
                                                        }}>
                                                            <Button
                                                                color="primary"
                                                                onClick={filterDataByFollowersRange}
                                                                className='filter_btn'
                                                            >
                                                                Filter
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                onClick={handleFollowerFilterClicked}
                                                                className='clr_btn'
                                                            >
                                                                Clear
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                : null
                                    }
                                    <Button className='test-bg' onClick={handleClearFilters}><AiOutlineClose /><span>Clear all filters</span></Button>

                                </div>
                            </div>
                            <div className='middle_pane_content'>
                                <div className='categorised_inf'>
                                    <div className='basket_top row'>
                                        <div className='categorised_heading col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>Top Trending Influencers Baskets</div>
                                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 pr-4'>
                                            <Input className='basket_search' placeholder='Search bundles, categories...' onChange={handleChangeBasketValue} value={basketName} />
                                        </div>
                                    </div>
                                    <div className='categorised_btn'>
                                        {basketData.map((item) =>
                                            <Button className='button_list' onClick={() => { handleRedirectToBasket(item) }}>{item.categoryName}</Button>
                                        )}
                                    </div>
                                </div>
                                <div className='influencers_basket row'>
                                    {
                                        basketData[0] ?
                                            sortingBaskets === true ?
                                                sortedBaskets.map((item) =>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                                                        <div className='influencers_basket_box row'>
                                                            <div className='col-lg-5 col-md-5 col-sm-5 col-xs-5 col-5 pl-0 pr-0'>
                                                                <div className='influencers_image' >
                                                                    <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Basket/${item.categoryName}/image.png`} className="influencers_image" />
                                                                </div>
                                                            </div>
                                                            <div className='basket_right_pane col-lg-7 col-md-7 col-sm-7 col-xs-7 col-7'>
                                                                <div className='influencers_category_header'>
                                                                    Top {item.basketInfluencersCount} {item.categoryName} Influencers Bundle
                                                                </div>
                                                                <div className='basket_p'>
                                                                    {item.description ? item.description : 'Boost your marketing campaigns with ...'}
                                                                </div>
                                                                <div className='influencers_footer_btn'>
                                                                    <Button onClick={() => handleRedirectToBasket(item)}><span style={{ margin: 0 }}>View</span></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                basketData.map((item) =>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                                                        <div className='influencers_basket_box row'>
                                                            <div className='col-lg-5 col-md-5 col-sm-5 col-xs-5 col-5 pl-0 pr-0'>
                                                                <div className='influencers_image' >
                                                                    <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Basket/${item.categoryName}/image.png`} className="influencers_image" />
                                                                </div>
                                                            </div>
                                                            <div className='basket_right_pane col-lg-7 col-md-7 col-sm-7 col-xs-7 col-7'>
                                                                <div className='influencers_category_header'>
                                                                    Top {item.basketInfluencersCount} {item.categoryName} Influencers Bundle
                                                                </div>
                                                                <div className='basket_p'>
                                                                    {item.description ? item.description : 'Boost your marketing campaigns with ...'}
                                                                </div>
                                                                <div className='influencers_footer_btn'>
                                                                    <Button onClick={() => handleRedirectToBasket(item)}><span style={{ margin: 0 }}>View</span></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :
                                            <div className='inline_loader'>
                                                <Loader />
                                            </div>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="list_bar col-lg-3 col-md-4 col-sm-4 col-xs-4 col-4 ">
                            <>
                                <div className="headers_title">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className='row'>
                                        <div className="headers col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                                            My Lists
                                        </div>
                                        <div className='add_list_btn col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12' onClick={handleAddPlan}> + Add new</div>
                                    </div>
                                    {
                                        newPlanClicked ?
                                            <div className='overlay'>
                                                <div className='addList_section'>
                                                    <Label>Create New List</Label>
                                                    <Input type="text" placeholder="List Name" value={listName} onChange={(e) => { setListName(e.target.value) }} className="input_listname" />
                                                    <Input type='text' placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} className="input_description" />
                                                    <Label style={{ marginTop: '0.75rem' }}>Deliverables</Label>
                                                    <div>
                                                        <div className='deliverables_pane_align'>
                                                            <div className='deliverables_box'>
                                                                <div style={{ width: '2.25rem' }}>Reels</div>
                                                                <div className='deliverables_value'>
                                                                    {
                                                                        reel === 0 ?
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                                                            :
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setReel(reel - 1) }}>-</div>
                                                                    }
                                                                    <div style={{ width: '5rem', textAlign: 'center' }}>{reel}</div>
                                                                    <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setReel(reel + 1) }}>+</div>
                                                                </div>
                                                            </div>
                                                            <div className='deliverables_box'>
                                                                <div style={{ width: '2.25rem' }}>Static Posts</div>
                                                                <div className='deliverables_value'>
                                                                    {
                                                                        post === 0 ?
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                                                            :
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setPost(post - 1) }}>-</div>

                                                                    }
                                                                    <div style={{ width: '5rem', textAlign: 'center' }}>{post}</div>
                                                                    <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setPost(post + 1) }}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='deliverables_pane_align'>
                                                            <div className='deliverables_box'>
                                                                <div style={{ width: '2.25rem' }}>Videos</div>
                                                                <div className='deliverables_value'>
                                                                    {
                                                                        video === 0 ?
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                                                            :
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setVideo(video - 1)}>-</div>
                                                                    }
                                                                    <div style={{ width: '5rem', textAlign: 'center' }}>{video}</div>
                                                                    <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setVideo(video + 1)}>+</div>
                                                                </div>
                                                            </div>
                                                            <div className='deliverables_box'>
                                                                <div style={{ width: '2.25rem' }}>Stories</div>
                                                                <div className='deliverables_value'>
                                                                    {
                                                                        story === 0 ?
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                                                            :
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setStory(story - 1) }}>-</div>
                                                                    }
                                                                    <div style={{ width: '5rem', textAlign: 'center' }}>{story}</div>
                                                                    <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setStory(story + 1) }}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='deliverables_pane_align'>
                                                            <div className='deliverables_box'>
                                                                <div style={{ width: '2.25rem' }}>Swipeup Story</div>
                                                                <div className='deliverables_value'>
                                                                    {
                                                                        swipeUpStory === 0 ?
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                                                            :
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setswipeUpStory(swipeUpStory - 1)}>-</div>

                                                                    }
                                                                    <div style={{ width: '5rem', textAlign: 'center' }}>{swipeUpStory}</div>
                                                                    <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setswipeUpStory(swipeUpStory + 1)}>+</div>
                                                                </div>
                                                            </div>
                                                            <div className='deliverables_box'>
                                                                <div style={{ width: '2.25rem' }}>Igtv</div>
                                                                <div className='deliverables_value'>
                                                                    {
                                                                        igtv === 0 ?
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                                                            :
                                                                            <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setIgtv(igtv - 1) }}>-</div>
                                                                    }
                                                                    <div style={{ width: '5rem', textAlign: 'center' }}>{igtv}</div>
                                                                    <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setIgtv(igtv + 1) }}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                        <Button className='add_list_btn' variant="outlined" onClick={() => { handleCreateList(listName, description, reel, post, story, igtv, swipeUpStory, video) }}>Add</Button>
                                                        <Button className='cancel_btn' onClick={handleAddPlan}>Cancel</Button>
                                                    </div>
                                                </div>
                                            </div> :
                                            null
                                    }
                                    {/* </div> */}
                                </div>
                                <div className="list_content">
                                    {
                                        listData[0] ?
                                            listData.map((item) =>
                                                <div className="list_content_inner">
                                                    <div className="list_head">
                                                        <span className='list_name'>{item.listName}</span>
                                                        {item.influencersCount}
                                                        <MdDelete onClick={() => { handleDeleteList(item) }} />
                                                    </div>
                                                    <div className='list_desc'>
                                                        {item.description}
                                                    </div>
                                                    <div className='list_footer row no-gutters'>
                                                        <div className='list_view col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>
                                                            <Button onClick={() => { handleRedirectToList(item) }} className='view_btn'>View</Button>
                                                        </div>
                                                        <div className='inf_count col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>
                                                            {item.influencersData.length} Influencers
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            <div className='inline_loader'>
                                                <Loader />
                                            </div>
                                    }
                                </div>
                            </>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Lists;