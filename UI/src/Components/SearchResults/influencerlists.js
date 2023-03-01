import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NFormatter from "../../Common/NumberFormatter/numFormatter";
import './influencerlists.scss';
import Navbar from "../../Common/Sidebar/sidebar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Input } from "reactstrap";
import { MdAdd } from 'react-icons/md';
import { AiFillCaretDown, AiOutlineDownload, AiOutlineClose } from 'react-icons/ai';
import { MdOutlineArrowDropUp, MdDelete } from 'react-icons/md';
import { BiFirstPage } from 'react-icons/bi';
import { BiLastPage } from 'react-icons/bi';
import moment from "moment";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TopBar from '../../Common/TopBar/index';
import ListIcon from '../../Assets/Images/listicon.png';
import CostIcon from '../../Assets/Images/costicon.png';
import CompareIcon from '../../Assets/Images/compareicon.png';
import Slider from '@mui/material/Slider';
import { AiOutlineSearch } from 'react-icons/ai';
import Select from 'react-select';
import Loader from '../../Common/Loader/index';
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

const InfluencersList = () => {

    const [influencersData, setInfluencersData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showVerifiedInfluencers, setShowVerifiedInfluencers] = useState(false);
    const [verifiedInfluencers, setVerifiedInfluencers] = useState([]);
    const [category, setCategory] = useState('');
    const [categoryBasedInfluencers, setCategoryBasedInfluencers] = useState([]);
    const [erBasedInfluencers, setErBasedInfluencers] = useState([]);
    const [followersRangeBasedInfluencers, setFollowersRangeBasedInfluencers] = useState([]);
    const [isfilterFollowerClicked, setIsFilterFollowerClicked] = useState(false);
    const [isfilterCategoryClicked, setIsFilterCategoryClicked] = useState(false);
    const [isfilterErClicked, setIsFilterErClicked] = useState(false);
    const [filterFollowerClicked, setFilterFollowerClicked] = useState(false);
    const [filterCategoryClicked, setFilterCategoryClicked] = useState(false);
    const [filterErClicked, setFilterErClicked] = useState(false);
    const [newPlanClicked, setNewPlanClicked] = useState(false);
    // const [listName, setListName] = useState('');
    // const [brandName, setBrandName] = useState('');
    const [listData, setListData] = useState([]);
    const [addToListTableClicked, setAddToListTableClicked] = useState(false);
    const [listInfluencerDetails, setListInfluencerDetails] = useState([]);
    const [listClicked, setListClicked] = useState(false);
    const [listInfluencersData, setListInfluencersData] = useState([]);
    const [rowClickedData, setRowClickedData] = useState('');
    const [addToCompareClicked, setAddToCompareClicked] = useState(false);
    const [addToCompareData, setAddToCompareData] = useState([]);
    const [influencer, setInfluencer] = useState([]);
    const [removeInfluencerClicked, setRemoveInfluencerClicked] = useState(false);
    const [autoSuggestedData, setAutoSuggestedData] = useState([]);
    const [csvData, setCsvData] = useState('');

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState('');
    const [minRangeFollowers, setMinRangeFollowers] = useState(1000)
    const [maxRangeFollowers, setMaxRangeFollowers] = useState(10000)
    const [rangeEr, setRangeEr] = useState([0, 20]);
    const [silderRolled, setSliderRolled] = useState(false);
    const [silderErRolled, setSliderErRolled] = useState(false);
    const [sliderRolled1, setSlider1Rolled] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [redirectedResult, setRedirectedResult] = useState(false);
    const [suggestionsForInputActive, setSuggestionsForInputActive] = useState(false);
    const [suggestions1, setSuggestions1] = useState([]);
    const [costModalOpened, setCostModalOpened] = useState(false);
    const [costUser, setCostUser] = useState('');
    const [allFilterCleared, setAllFilterCleared] = useState(false);

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
    const [categoryFilteredData, setCategoryFilteredData] = useState([])
    const [offset, setOffset] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalDataLength, setTotalDataLength] = useState(0);
    const [pageNoValue, setPageNoValue] = useState(null);
    const [pageValueChoosed, setPageValueChoosed] = useState(false)
    const [newPage, setNewPage] = useState(null);
    const [choosedCategoryArray, setChoosedCategoryArray] = useState(null);

    let { inputField, eRange, followerRange } = useParams();
    let navigate = useNavigate();

    const userId = localStorage.getItem('id');
    let autoSuggestedArray = [];

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    const categoryOptions = [
        { value: 'Art', label: 'Art' },
        { value: 'Beauty', label: 'Beauty' },
        { value: 'Bollywood', label: 'Bollywood' },
        { value: 'Cinema', label: 'Cinema' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Community Page', label: 'Community Page' },
        { value: 'Dancer', label: 'Dancer' },
        { value: 'Education', label: 'Education' },
        { value: 'Fashion', label: 'Fashion' },
        { value: 'Fitness', label: 'Fitness' },
        { value: 'Food', label: 'Food' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Makeup', label: 'Makeup' },
        { value: 'Media', label: 'Media' },
        { value: 'Model', label: 'Model' },
        { value: 'Mom', label: 'Mom' },
        { value: 'Music', label: 'Music' },
        { value: 'Parenting', label: 'Parenting' },
        { value: 'Personal Care', label: 'Personal Care' },
        { value: 'Other', label: 'Other' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Tech', label: 'Tech' },
        { value: 'Travel', label: 'Travel' },
    ]

    const showVerified = () => {
        const data = showVerifiedInfluencers ? false : true;
        setShowVerifiedInfluencers(data);
        let arr = [];
        influencersData.forEach((data) => {
            console.log(data);
            if (data.is_verified === true) {
                arr.push(data)
                setVerifiedInfluencers(arr)
            }
        })
    }

    const redirectProfile = (data) => {
        window.open(`/profile/${data.username}`)
        // navigate(`/profile/${data.username}`)
    }

    const handleFollowerFilterClicked = () => {
        setIsFilterFollowerClicked(value => !value)
    };

    const handleCategoryFilterClicked = () => setIsFilterCategoryClicked(value => !value);

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

    const filterCategory = () => {
        let array = [];
        setIsFilterCategoryClicked(false);
        influencersData.forEach((data) => {
            if (data.category_enum !== null) {
                if (data.category_enum.includes(category.toUpperCase())) {
                    array.push(data)
                    setCategoryFilteredData(array)
                    setFilterCategoryClicked(true)
                }

                // else if(data.category_enum.includes(choosedCategoryArray.map((item)=>item))){
                //     console.log(data.category_enum);
                // }
            }
        })
    }

    const filterByFollowersRange = () => {
        let splitFoll;
        let splitFollArr;
        setIsFilterFollowerClicked(false);
        if (!inputField) {
            if (eRange && !followerRange) {
                if (eRange.includes('eRange')) {
                    splitFoll = eRange.split('=');
                    splitFollArr = splitFoll[1].split('&');
                    navigate(`/influencerslist//eRange=${splitFollArr[0]}&${splitFollArr[1]}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`)
                }
                else if (eRange.includes('followerRange')) {
                    navigate(`/influencerslist//followerRange=${scale1(minRangeFollowers)}&${[scale(maxRangeFollowers)]}`)
                }
            }
            if (eRange && followerRange) {
                splitFoll = eRange.split('=')
                splitFollArr = splitFoll[1].split('&')
                navigate(`/influencerslist//eRange=${splitFollArr[0]}&${splitFollArr[1]}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`);
            }
            else if (!eRange && !followerRange) {
                navigate(`/influencerslist//followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`)
            }
        }
        else if (inputField) {
            if (eRange && !followerRange) {
                if (eRange.includes('eRange')) {
                    splitFoll = eRange.split('=');
                    splitFollArr = splitFoll[1].split('&');
                    navigate(`/influencerslist/${inputField}/eRange=${splitFollArr[0]}&${splitFollArr[1]}/followerRange=${scale1(minRangeFollowers)}&${[scale(maxRangeFollowers)]}`)
                }
                else if (eRange.includes('followerRange')) {
                    navigate(`/influencerslist/${inputField}/followerRange=${scale1(minRangeFollowers)}&${[scale(maxRangeFollowers)]}`)
                }
            }
            if (eRange && followerRange) {
                splitFoll = eRange.split('=')
                splitFollArr = splitFoll[1].split('&')
                navigate(`/influencerslist/${inputField}/eRange=${splitFollArr[0]}&${splitFollArr[1]}/followerRange=${scale1(minRangeFollowers)}&${[scale(maxRangeFollowers)]}`);
            }
            else if (!eRange && !followerRange) {
                navigate(`/influencerslist/${inputField}/followerRange=${scale1(minRangeFollowers)}&${[scale(maxRangeFollowers)]}`)
            }
        }
    }

    const filterByErRange = () => {
        let splitFoll;
        let splitFollArr;
        setIsFilterErClicked(false);
        if (!inputField) {
            if (eRange && !followerRange) {
                if (eRange.includes('eRange')) {
                    navigate(`/influencerslist//eRange=${rangeEr[0]}&${rangeEr[1]}`)
                }
                else if (eRange.includes('followerRange')) {
                    splitFoll = eRange.split('=');
                    splitFollArr = splitFoll[1].split('&');
                    navigate(`/influencerslist//eRange=${rangeEr[0]}&${rangeEr[1]}/followerRange=${splitFollArr[0]}&${splitFollArr[1]}`)
                }
            }
            if (eRange && followerRange) {
                splitFoll = followerRange.split('=')
                splitFollArr = splitFoll[1].split('&')
                navigate(`/influencerslist//eRange=${rangeEr[0]}&${rangeEr[1]}/followerRange=${splitFollArr[0]}&${splitFollArr[1]}`);
            }
            else if (!eRange && !followerRange) {
                console.log(rangeEr[0], rangeEr[1]);
                navigate(`/influencerslist//eRange=${rangeEr[0]}&${rangeEr[1]}`)
            }
        }
        else if (inputField) {
            if (eRange && !followerRange) {
                if (eRange.includes('eRange')) {
                    navigate(`/influencerslist/${inputField}/eRange=${rangeEr[0]}&${rangeEr[1]}`)
                }
                else if (eRange.includes('followerRange')) {
                    splitFoll = eRange.split('=');
                    splitFollArr = splitFoll[1].split('&');
                    navigate(`/influencerslist/${inputField}/eRange=${rangeEr[0]}&${rangeEr[1]}/followerRange=${splitFollArr[0]}&${splitFollArr[1]}`)
                }
            }
            if (eRange && followerRange) {
                splitFoll = followerRange.split('=')
                splitFollArr = splitFoll[1].split('&')
                navigate(`/influencerslist/${inputField}/eRange=${rangeEr[0]}&${rangeEr[1]}/followerRange=${splitFollArr[0]}&${splitFollArr[1]}`);
            }
            else if (!eRange && !followerRange) {
                navigate(`/influencerslist/${inputField}/eRange=${rangeEr[0]}&${rangeEr[1]}`)
            }
        }
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

    const handleDownloadData = () => {
        const url = `http://13.234.125.76:4000/downloadcsv?inputField=${inputField}`;
        fetch((url), {
            headers: {
                'Content-type': 'text/csv; charset=UTF-8',
            }
        })
            .then((res) => {
                res.text()
                    .then((data) => {
                        setCsvData(data)
                    })
            })
    }

    const handleCostClicked = (e) => {
        setCostUser(e.username)
        let data = costModalOpened ? false : true;
        setCostModalOpened(data)
    }

    const handleClearAllFilters = () => {
        setFilterCategoryClicked(false);
        setFilterErClicked(false);
        setFilterFollowerClicked(false);
        setAllFilterCleared(!allFilterCleared)
        setShowVerifiedInfluencers(false)
        navigate(`/influencerslist/${inputField}`)
    }

    // useEffect(() => {
    //     fetchProfiles();
    //     getListData();
    // }, []);    

    const fetchProfiles = () => {
        let str = '';
        let follString = '';
        let splitArray;
        let splitFollArray;
        if (inputField === undefined) {
            inputField = '';
            if (eRange && !followerRange) {
                if (eRange.includes('eRange')) {
                    str = eRange.split('=');
                    splitArray = str[1].split('&');
                    const url = `http://13.234.125.76:4000/getFilteredResults?inputField=${inputField}&limit=${rowsPerPage}&skip=${offset}&minEr=${splitArray[0]}&maxEr=${splitArray[1]}`;
                    fetch(url)
                        .then((data) => {
                            data.json()
                                .then((res) => {
                                    setInfluencersData(res.result)
                                    setTotalPages(res.totalPages)
                                    setTotalDataLength(res.totalDataLength)
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                if (eRange.includes('followerRange')) {
                    follString = eRange.split('=')
                    splitFollArray = follString[1].split('&')
                    const url = `http://13.234.125.76:4000/getFilteredResults?inputField=${inputField}&limit=${rowsPerPage}&skip=${offset}&minFollowers=${splitFollArray[0]}&maxFollowers=${splitFollArray[1]}`;
                    fetch(url)
                        .then((data) => {
                            data.json()
                                .then((res) => {
                                    setInfluencersData(res.result)
                                    setTotalPages(res.totalPages)
                                    setTotalDataLength(res.totalDataLength)
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            }
            if (eRange && followerRange) {
                str = eRange.split('=');
                splitArray = str[1].split('&');
                follString = followerRange.split('=')
                splitFollArray = follString[1].split('&')
                const url = `http://13.234.125.76:4000/getFilteredResults?inputField=${inputField}&limit=${rowsPerPage}&skip=${offset}&minFollowers=${splitFollArray[0]}&maxFollowers=${splitFollArray[1]}&minEr=${splitArray[0]}&maxEr=${splitArray[1]}`;
                fetch(url)
                    .then((data) => {
                        data.json()
                            .then((res) => {
                                setInfluencersData(res.result)
                                setTotalPages(res.totalPages)
                                setTotalDataLength(res.totalDataLength)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            if (!eRange && !followerRange) {
                const url = `http://13.234.125.76:4000/getFilteredResults?inputField=${inputField}&limit=${rowsPerPage}&skip=${offset}`;
                fetch(url)
                    .then((data) => {
                        data.json()
                            .then((res) => {
                                setInfluencersData(res.result)
                                setTotalPages(res.totalPages)
                                setTotalDataLength(res.totalDataLength)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
        if (eRange && !followerRange) {
            if (eRange.includes('eRange')) {
                str = eRange.split('=');
                splitArray = str[1].split('&');
                const url = `http://13.234.125.76:4000/getFilteredResults?inputField=${inputField}&limit=${rowsPerPage}&skip=${offset}&minEr=${splitArray[0]}&maxEr=${splitArray[1]}`;
                fetch(url)
                    .then((data) => {
                        data.json()
                            .then((res) => {
                                setInfluencersData(res.result)
                                setTotalPages(res.totalPages)
                                setTotalDataLength(res.totalDataLength)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            if (eRange.includes('followerRange')) {
                follString = eRange.split('=')
                splitFollArray = follString[1].split('&')
                const url = `http://13.234.125.76:4000/getFilteredResults?inputField=${inputField}&limit=${rowsPerPage}&skip=${offset}&minFollowers=${splitFollArray[0]}&maxFollowers=${splitFollArray[1]}`;
                fetch(url)
                    .then((data) => {
                        data.json()
                            .then((res) => {
                                setInfluencersData(res.result)
                                setTotalPages(res.totalPages)
                                setTotalDataLength(res.totalDataLength)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
        if (eRange && followerRange) {
            str = eRange.split('=');
            splitArray = str[1].split('&');
            follString = followerRange.split('=')
            splitFollArray = follString[1].split('&')
            const url = `http://13.234.125.76:4000/getFilteredResults?inputField=${inputField}&limit=${rowsPerPage}&skip=${offset}&minFollowers=${splitFollArray[0]}&maxFollowers=${splitFollArray[1]}&minEr=${splitArray[0]}&maxEr=${splitArray[1]}`;
            fetch(url)
                .then((data) => {
                    data.json()
                        .then((res) => {
                            setInfluencersData(res.result)
                            setTotalPages(res.totalPages)
                            setTotalDataLength(res.totalDataLength)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        if (!eRange && !followerRange) {
            const url = `http://13.234.125.76:4000/getFilteredResults?inputField=${inputField}&limit=${rowsPerPage}&skip=${offset}`;
            fetch(url)
                .then((data) => {
                    data.json()
                        .then((res) => {
                            setInfluencersData(res.result)
                            setTotalPages(res.totalPages)
                            setTotalDataLength(res.totalDataLength)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        fetchProfiles();
        getListData();
        handleDownloadData();
    }, [redirectedResult, offset]);

    useEffect(() => {
        getListData();
    }, [newPlanClicked]);

    useEffect(() => {
        fetchProfiles();
    }, [allFilterCleared]);

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

    useEffect(() => {
        fetchProfiles();
    }, [isfilterErClicked])

    useEffect(() => {
        fetchProfiles();
    }, [isfilterFollowerClicked])


    const handleAddPlan = () => {
        const data = newPlanClicked ? false : true;
        setNewPlanClicked(data);
    }


    const handleCreateList = (listName) => {
        const url = `http://13.234.125.76:4000/createList/${userId}`
        fetch((url), {
            method: 'POST',
            body: JSON.stringify({ listName }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => { res.json() })
            .then((data) => {
                setListInfluencerDetails(data)
            })
        setNewPlanClicked(false);
    }

    const handleAddToListTable = (e) => {
        setRowClickedData(e.username)
        const toggle = addToListTableClicked ? false : true;
        setAddToListTableClicked(toggle);
    }

    const handleListClick = (item) => {
        setListClicked(true);
        const url = `http://13.234.125.76:4000/showInfluencersList/${userId}?list=${item.listName}`
        fetch((url))
            .then((data) => data.json())
            .then((response) => {
                setListInfluencersData([response])
            })
    }

    const addInfluencerToList = (data, item) => {
        const url = `http://13.234.125.76:4000/addInfluencersToList/${userId}?list=${item.listName}&username=${data.username}`
        fetch((url), {
            method: 'POST',
        })
            .then((data) => { data.json() })
            .then((res) => {
                console.log(res)
            })
        setAddToListTableClicked(false)
    }

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
                                <div style={{ marginLeft: '0.5rem' }}>{suggestion.username}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    function TablePaginationActions(count) {
        const handleFirstPageButtonClick = (event) => {
            setOffset(0);
            setPage(0);
            setInfluencersData([]);
        };

        const handleBackButtonClick = (event) => {
            setOffset((prev) => prev - 10);
            setPage(page - 1);
            setInfluencersData([]);
        };

        const handleNextButtonClick = (event) => {
            setOffset((prev) => prev + 10);
            setPage(page + 1)
            setInfluencersData([]);
        };

        const handleLastPageButtonClick = (event) => {
            setOffset(totalDataLength - 10)
            setPage(Math.max(0, Math.ceil(count.count / rowsPerPage) - 1));
            setInfluencersData([]);
        };

        return (
            <div style={{ display: 'flex' }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    aria-label="next page"
                    disabled={page >= Math.ceil(count.count / rowsPerPage) - 1}
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count.count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    <LastPageIcon />
                </IconButton>
            </div>
        );
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
        // const url = `http://13.234.125.76:4000/compareInfluencers?${string}`;
        // fetch(url)
        //     .then((res) => {
        //         res.json()
        //             .then((data) => {
        //                 console.log(data)
        //             })
        //     })
    }

    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setInputValue(query);
        if (query.length > 1) {
            let url = `http://13.234.125.76:4000/filterUsers?username=${query}`
            fetch(url)
                .then((data) => {
                    data.json()
                        .then((res) => {
                            setSuggestions1(res)
                        })
                })
            setSuggestionsForInputActive(true);
        } else {
            setSuggestionsForInputActive(false);
        }
    }

    const handleInfluencerClick = (e) => {
        navigate(`/profile/${e.target.innerText}`);
        setSuggestions1([]);
        setInputValue('');
        setSuggestionsForInputActive(false);
    };

    const handleRedirectToResults = () => {
        setAutoSuggestedData([])
        setRedirectedResult(!redirectedResult);
        navigate(`/influencerslist/${inputValue}`);
        setInputValue('');
        setSuggestions1([]);
        setSuggestionsForInputActive(false);
    }

    const SuggestionsInfluencer = () => {
        return (
            <>
                <div className="suggestions_influencer row no-gutters">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-10">
                        <div style={{
                            margin: '0.313rem', padding: 0, fontFamily: 'Noto Sans',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '1.125rem',
                            lineHeight: '1rem',
                            color: 'rgba(0, 0, 0, 0.7)'
                        }}>Influencers</div>
                        {suggestions1.map((suggestion, index) => {
                            return (
                                <div
                                    className={index === setSuggestionsForInputActive ? "active_influencer" : ""}
                                    key={index}
                                    onClick={handleInfluencerClick}
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

    const handleChangeInputPage = (e) => {
        setNewPage(e.target.value * 10);
        if (e.target.value === '') {
            setPageValueChoosed(false)
        }
    }

    const handleChangePageValue = () => {
        setOffset(newPage)
        setPage(newPage / 10)
        setPageValueChoosed(true);
        setInfluencersData([])
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleRedirectToResults();
        }
    }

    return (
        <div className="search_container row no-gutters">
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                <Navbar />
            </div>
            <div className="search_content_list_panel col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10">
                <TopBar />
                <div className="middle_pane row no-gutters">
                    <div className="input_box_influencer col-lg-10 col-md-10 col-sm-10 col-xs-10 col-10">
                        <Input
                            type="text"
                            placeholder='Search for influencers, categories...'
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        {suggestionsForInputActive && <SuggestionsInfluencer />}
                        <AiOutlineSearch onClick={handleRedirectToResults} />
                    </div>
                    <div className="filter_bar row no-gutters">
                        <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 col-4 button_filter">
                            <Button variant="outlined" onClick={handleFollowerFilterClicked} className='filter_btn'>Followers {isfilterFollowerClicked === true ? <MdOutlineArrowDropUp /> : <AiFillCaretDown />}</Button>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 col-4 button_filter">
                            <Button variant="outlined" onClick={handleCategoryFilterClicked} className='filter_btn'>Category {isfilterCategoryClicked === true ? <MdOutlineArrowDropUp /> : <AiFillCaretDown />}</Button>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-4 col-4 button_filter">
                            <Button variant="outlined" onClick={handleErFilterClicked} className='filter_btn'>Engagement Rate {isfilterErClicked === true ? <MdOutlineArrowDropUp /> : <AiFillCaretDown />}</Button>
                        </div>
                        {/* <div className="col-lg-2 col-md-3 col-sm-4 col-xs-4 col-4 button_filter">
                            <Button variant="outlined" onClick={showVerified} className='filter_btn'>{showVerifiedInfluencers === true ? 'Back' : 'Registered influencers'}</Button>
                        </div> */}
                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-4 col-4 button_filter">
                            <Button variant="outlined" onClick={handleClearAllFilters} className='filter_btn'><AiOutlineClose /><span>Clear all filters</span></Button>
                        </div>
                        {
                            isfilterErClicked === true ?
                                <section className="modal_section">
                                    <div className="modal_option">
                                        <div>Engagement %</div>
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
                                                onClick={filterByErRange}
                                                className='filter_button'
                                            >
                                                Filter
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={handleErFilterClicked}
                                                style={{
                                                    background: '#D7D7D7', borderRadius: '0.188rem', fontFamily: 'Noto Sans', fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                    lineHeight: '1rem',
                                                    textAlign: 'center',
                                                    color: '#595959',
                                                    width: '7.75rem',
                                                    height: '2.25rem',
                                                    marginTop: '2rem'
                                                }}
                                            >
                                                Clear
                                            </Button>
                                        </div>
                                    </div>
                                </section>
                                :
                                isfilterCategoryClicked === true ?
                                    <section className="modal_section">
                                        <div className="modal_option">
                                            <div>Add Category</div>
                                            <Input
                                                placeholder="Category"
                                                className="w-50 modal_input"
                                                type="text"
                                                value={category}
                                                onChange={(e) => { setCategory(e.target.value) }}
                                            />
                                            <div>
                                                {
                                                    categoryOptions.map((item) =>
                                                        <Button className="category_btn" onClick={()=>{setChoosedCategoryArray(item.value)}}>{item.value}</Button>
                                                    )
                                                }
                                            </div>
                                            <div style={{
                                                display: 'flex', justifyContent: 'space-between'
                                            }}>
                                                <Button
                                                    color="primary"
                                                    onClick={filterCategory}
                                                    className='filter_button'
                                                >
                                                    Filter
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    onClick={handleCategoryFilterClicked}
                                                    style={{
                                                        background: '#D7D7D7', borderRadius: '0.188rem', fontFamily: 'Noto Sans', fontStyle: 'normal',
                                                        fontWeight: 600,
                                                        fontSize: '0.75rem',
                                                        lineHeight: '1rem',
                                                        textAlign: 'center',
                                                        color: '#595959',
                                                        width: '7.75rem',
                                                        height: '2.25rem',
                                                        marginTop: '1.5rem'
                                                    }}
                                                >
                                                    Clear
                                                </Button>
                                            </div>
                                        </div>
                                    </section>
                                    :
                                    isfilterFollowerClicked === true ?
                                        <section className="modal_section">
                                            <div className="modal_option">
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
                                                            className='select_option'
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
                                                        onClick={filterByFollowersRange}
                                                        className='filter_button'
                                                    >
                                                        Filter
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        onClick={handleFollowerFilterClicked}
                                                        style={{
                                                            background: '#D7D7D7', borderRadius: '0.188rem', fontFamily: 'Noto Sans', fontStyle: 'normal',
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                            lineHeight: '1rem',
                                                            textAlign: 'center',
                                                            color: '#595959',
                                                            width: '7.75rem',
                                                            height: '2.25rem',
                                                            marginTop: '2rem'
                                                        }}
                                                    >
                                                        Clear
                                                    </Button>
                                                </div>
                                            </div>
                                        </section>
                                        : null
                        }
                        <div className="download_icon col-lg-1 col-md-2 col-sm-2 col-xs-2 col-2">
                            <a
                                href={`data:text/csv;charset=utf-8,${(csvData)}`}
                                download="filename.csv"
                                onClick={handleDownloadData}
                            >
                                <AiOutlineDownload size={30} />
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-4 col-4 input_page">
                            <Input placeholder="Enter Page No" className="input_page_value" value={pageNoValue} onChange={(e) => handleChangeInputPage(e)} />
                            <Button onClick={handleChangePageValue} className='find_btn'>Find</Button>
                        </div>
                    </div>
                    <div className="table_content">
                        {influencersData[0] || categoryFilteredData[0] || verifiedInfluencers[0] ?
                            <TableContainer component={Paper} className='table_paper'>
                                <Table stickyHeader className="table_container" >
                                    <TableHead className="table_head">
                                        <TableRow className="table_row">
                                            <TableCell className="table_head_value">Instagram Profiles</TableCell>
                                            <TableCell className="table_head_value" align="center">Followers</TableCell>
                                            <TableCell className="table_head_value" align="center">Engagement</TableCell>
                                            <TableCell className="table_head_value" align="center">Avg Like</TableCell>
                                            <TableCell className="table_head_value" align="center">Avg Comment</TableCell>
                                            <TableCell className="table_head_value" align="center">Avg Reach</TableCell>
                                            <TableCell className="table_head_value" align="center">City</TableCell>
                                            <TableCell className="table_head_value" align="center">Category</TableCell>
                                            <TableCell className="table_head_value" align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <>
                                        <TableBody className="table_body">
                                            {
                                                (rowsPerPage > 0
                                                    ?
                                                    filterCategoryClicked === true ?
                                                        categoryFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        :
                                                        showVerifiedInfluencers === true ?
                                                            verifiedInfluencers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            :
                                                            influencersData
                                                    : influencersData
                                                )
                                                    .map((data, index) => (
                                                        <>
                                                            < TableRow key={index} className='table_row_body' >
                                                                <TableCell component="th" scope="row" key={data.username} onClick={() => redirectProfile(data)} className="table_body_value_1" >
                                                                    <div className="profile_view">
                                                                        <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Images/${data.username}/${data.username}_profile_image.png`} className='profile_image' />
                                                                        <div style={{ marginLeft: '0.5rem' }}>{data.full_name}</div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="table_body_value" align="center">
                                                                    {NFormatter(data.edge_followed_by.count)}
                                                                </TableCell>
                                                                <TableCell className="table_body_value" align="center">
                                                                    {NFormatter(data.edge_owner_to_timeline_media['edges'][0]?.er)}
                                                                </TableCell>
                                                                <TableCell className="table_body_value" align="center">
                                                                    {NFormatter(data.edge_owner_to_timeline_media['edges'][0]?.avg_likes)}
                                                                </TableCell>
                                                                <TableCell className="table_body_value" align="center">
                                                                    {NFormatter(data.edge_owner_to_timeline_media['edges'][0]?.avg_comment)}
                                                                </TableCell>
                                                                <TableCell className="table_body_value" align="center">
                                                                    {NFormatter(data.edge_felix_video_timeline['edges'][0]?.averageReelView)}
                                                                </TableCell>
                                                                <TableCell className="table_body_value" align="center">{data.city_name ? data?.city_name : data?.final_city}</TableCell>
                                                                <TableCell className="table_body_value" align="center">{data.category_enum !== null ? data.category_enum.split('_') : data?.final_category}</TableCell>
                                                                <TableCell className="table_body_value" key={index}>
                                                                    <div className="btn_display">
                                                                        <img id={data.id} src={CostIcon} onClick={(e) => { handleCostClicked(data) }} />
                                                                        {
                                                                            costModalOpened === true ?
                                                                                costUser === data.username ?
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
                                                                                                data.costFactorStories?.minTotalCost || data?.costFactorStories?.minTotalCost ?
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
                                                                                                data.costFactorVideo?.minTotalCost || data?.costFactorVideo?.minTotalCost ?
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
                                                                                    : null
                                                                                :
                                                                                null
                                                                        }
                                                                        <img id={data.id} onClick={() => { handleAddToListTable(data) }} src={ListIcon} />
                                                                        {addToListTableClicked === true ?
                                                                            [data].map((item) =>
                                                                                item.username == rowClickedData ?
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
                                                                                    : null
                                                                            )

                                                                            : null}
                                                                        <img id={data.id} onClick={() => handleAddToCompare(data)} src={CompareIcon} />
                                                                        {
                                                                            addToCompareClicked === true ?

                                                                                [data].map((item) =>
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
                                                                                )
                                                                                : null
                                                                        }
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>

                                                        </>
                                                    ))
                                            }
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow className="table_foot_row">
                                                <TablePagination
                                                    rowsPerPageOptions={[7]}
                                                    colSpan={3}
                                                    count={showVerifiedInfluencers === true ? verifiedInfluencers.length : filterCategoryClicked === true ? categoryFilteredData.length : totalDataLength}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    SelectProps={{
                                                        inputProps: {
                                                            'aria-label': 'Results per page',
                                                        },
                                                        native: true,
                                                    }}
                                                    // onPageChange={handleChangePage}
                                                    // onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                    className='table_footer_values'
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </>
                                </Table>
                            </TableContainer>
                            :
                            <div className='inline_loader'>
                                <Loader />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InfluencersList