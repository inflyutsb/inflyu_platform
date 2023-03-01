import React, { useState, useEffect } from 'react';
import Navbar from '../../Common/Sidebar/sidebar';
import { useParams, useNavigate } from "react-router-dom";
import './lists.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import NFormatter from '../../Common/NumberFormatter/numFormatter';
import { MdDelete } from 'react-icons/md';
import { Input } from 'reactstrap';
import Topbar from "../../Common/TopBar/index";
import deleteiconfilled from '../../Assets/Images/deleteiconfilled.png';
import deleteicon from '../../Assets/Images/deleteicon.png';
import checkbundles from '../../Assets/Images/checkbundle.png'
import checklists from '../../Assets/Images/checklists.png'
import checklistselected from '../../Assets/Images/checklistselected.png';
import checkbundleselected from '../../Assets/Images/checkbundleselected.png';
import MyLists from '../MyLists';
import { RiSubtractFill, RiAddFill } from 'react-icons/ri';
import { Label } from 'reactstrap';
import Sport from '../../Assets/Images/sport.jpg'
import Loader from '../../Common/Loader/index';


function UserLists() {

    const [listInfluencersData, setListInfluencersData] = useState([]);
    const [deletedData, setDeleteData] = useState([]);
    const [isDataDeleted, setIsDataDeleted] = useState(false);
    const [isDeliverablesEdited, setIsDeliverablesEdited] = useState(false);
    const [editingDeliverables, setEditingDeliverables] = useState(false);
    const [reel, setReel] = useState(0);
    const [post, setPost] = useState(0);
    const [story, setStory] = useState(0);
    const [igtv, setIgtv] = useState(0);
    const [swipeup, setSwipeup] = useState(0);
    const [video, setVideo] = useState(0);
    const [description, setDescription] = useState('');
    const [listName, setListName] = useState('');
    const [deleteIconSelected, setDeleteIconSelected] = useState(true);
    const [listsIconSelected, setListsIconSelected] = useState(false);
    const [bundlesIconSelected, setBundlesIconSelected] = useState(false);
    const [basketData, setBasketData] = useState([]);
    const [changeBasket, setChangeBasket] = useState(false);
    const [userRestored, setUserRestored] = useState(false);
    const [allDeletedInfluencersCleared, setAllDeletedInfluencersCleared] = useState(false);
    const [loader, setLoader] = useState(false);

    let { listname } = useParams();

    const userId = localStorage.getItem('id');
    const navigate = useNavigate();

    const redirectProfile = (data) => {
        navigate(`/profile/${data.username}`)
    }

    const handleRestore = (data) => {
        setLoader(true)
        const url = `http://13.234.125.76:4000/addInfluencersToList/${userId}?list=${listname}&username=${data.username}`
        fetch((url), {
            method: 'POST',
        })
            .then((data) => { data.json() })
            .then((res) => {
                setLoader(true)
                setUserRestored(!userRestored)
            })
    }

    const handleEditDeliverables = () => {
        setEditingDeliverables((prev) => !prev)
    }


    const handleListClick = () => {
        const url = `http://13.234.125.76:4000/showInfluencersList/${userId}?list=${listname}`
        fetch((url))
            .then((data) => data.json())
            .then((response) => {
                setListInfluencersData(response)
            })
    }

    const handleDeleteList = (data) => {
        setLoader(true)
        const url = `http://13.234.125.76:4000/deleteInfluencersFromList/${userId}`
        fetch((url), {
            method: 'PUT',
            body: JSON.stringify({ listname, username: data.username }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        )
            .then((res) => res.json())
            .then((data) => {
                setLoader(false)
                setDeleteData(data)
                setIsDataDeleted((prev) => !prev)
            })
    }

    const handleUpdateDeliverables = (reel, post, story, igtv, swipeup, video) => {
        setLoader(true)
        if (listName !== '') {
            let newListName = listName;
            const url = `http://13.234.125.76:4000/editDeliverables/${userId}?listName=${listname}`
            fetch((url), {
                method: 'POST',
                body: JSON.stringify({ reel, post, story, igtv, swipeup, video, description, newListName }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then((res) => {
                    setLoader(false)
                    setIsDeliverablesEdited(true)
                    handleEditDeliverables();
                    navigate(`/userLists/${newListName}`)
                    setDescription('');
                    setReel(reel);
                    setPost(post);
                    setStory(story);
                    setIgtv(igtv);
                    setSwipeup(swipeup);
                    setVideo(video);
                })
        }
        else if (listName === '') {
            let newListName = listname;
            const url = `http://13.234.125.76:4000/editDeliverables/${userId}?listName=${listname}`
            fetch((url), {
                method: 'POST',
                body: JSON.stringify({ reel, post, story, igtv, swipeup, video, description, newListName }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then((res) => {
                    setLoader(false)
                    setIsDeliverablesEdited(true)
                    handleEditDeliverables();
                    navigate(`/userLists/${newListName}`)
                    setDescription('');
                    setReel(reel);
                    setPost(post);
                    setStory(story);
                    setIgtv(igtv);
                    setSwipeup(swipeup);
                    setVideo(video);
                })
        }
    }

    const handleRedirectToBasket = (item) => {
        setChangeBasket((prev) => !prev);
        navigate(`/basketInfluencers/${item.categoryName}`);
    }
    const fetchBasketsName = () => {
        const url = `http://13.234.125.76:4000/showCategorizedBasket`;
        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                setBasketData(response)
            })
    }

    const handleClearAllDeletedInfluencers = () => {
        const url = `http://13.234.125.76:4000/clearDeletedInfluencersFromList/${userId}?listName=${listname}`;
        fetch((url), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((data) => {
                data.json()
                    .then((result) => {
                        setAllDeletedInfluencersCleared(!allDeletedInfluencersCleared)
                    })
            })
    }

    useEffect(() => {
        handleListClick();
        fetchBasketsName();
    }, []);

    useEffect(() => {
        handleListClick();
        fetchBasketsName();
    }, [listname]);

    useEffect(() => {
        handleListClick();
    }, [isDataDeleted, userRestored, allDeletedInfluencersCleared]);

    useEffect(() => {
        handleListClick();
    }, [isDeliverablesEdited]);

    return (
        <div className='users_list_container row no-gutters'>
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                <Navbar />
            </div>
            <div className='users_list_pane col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                <Topbar />
                <div className='row no-gutters'>
                    {
                        loader === false ?
                            listInfluencersData[0] ?
                                listInfluencersData.map((item) =>
                                    <div className='col-lg-9 col-md-8 col-sm-8 col-xs-8 col-8'>
                                        <div className='user_list_header row'>
                                            <div className='list_count col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12'>
                                                <div className='row no-gutters'>
                                                    <div className='list_name col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>
                                                        {item.item.listName}
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>
                                                        <Button onClick={handleEditDeliverables} className='edit_btn'>Edit</Button>
                                                    </div>
                                                </div>
                                                <div className='list_desc pl-1 pr-1'>
                                                    {item.item.description}
                                                </div>
                                            </div>
                                            <div className='deliverables_count col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12'>
                                                {
                                                    <div className='row'>
                                                        <div className='deliverables_fields_value col-lg-2 col-md-4 col-sm-4 col-xs-4 col-4'>{item.item.deliverables[0].reel}<span>Reels</span></div>
                                                        <div className='deliverables_fields_value col-lg-2 col-md-4 col-sm-4 col-xs-4 col-4'>{item.item.deliverables[1].post}<span>Posts</span></div>
                                                        <div className='deliverables_fields_value col-lg-2 col-md-4 col-sm-4 col-xs-4 col-4'>{item.item.deliverables[2].story}<span>Stories</span></div>
                                                        <div className='deliverables_fields_value col-lg-2 col-md-4 col-sm-4 col-xs-4 col-4'>{item.item.deliverables[3].igtv}<span>Igtv</span></div>
                                                        <div className='deliverables_fields_value col-lg-2 col-md-4 col-sm-4 col-xs-4 col-4'>{item.item.deliverables[4].swipeup}<span>Swipeup Stories</span></div>
                                                        <div className='deliverables_fields_value col-lg-2 col-md-4 col-sm-4 col-xs-4 col-4'>{item.item.deliverables[5].video}<span>Videos</span></div>
                                                    </div>
                                                }
                                                {
                                                    editingDeliverables === true ?
                                                        <div className='overlay'>
                                                            <div className='addList_section'>
                                                                <Label> Edit List</Label>
                                                                <Input type="text" placeholder="List Name" defaultValue={item.item.listName} onChange={(e) => { setListName(e.target.value) }} className="input_listname" />
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
                                                                                    swipeup === 0 ?
                                                                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                                                                        :
                                                                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setSwipeup(swipeup - 1)}>-</div>

                                                                                }
                                                                                <div style={{ width: '5rem', textAlign: 'center' }}>{swipeup}</div>
                                                                                <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setSwipeup(swipeup + 1)}>+</div>
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
                                                                    <Button onClick={() => { handleUpdateDeliverables(reel, post, story, igtv, swipeup, video) }} className="update_btn">Update</Button>
                                                                    <Button onClick={handleEditDeliverables} className='cancel_btn'>Cancel</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                        <div className='table_content'>
                                            <TableContainer component={Paper} className='table_paper'>
                                                <Table className="table_container" >
                                                    <TableHead className='table_head'>
                                                        <TableRow className='table_head_row'>
                                                            <TableCell className='table_head_cell'>Name</TableCell>
                                                            <TableCell className='table_head_cell' align="center">Category</TableCell>
                                                            <TableCell className='table_head_cell' align="center">Followers</TableCell>
                                                            <TableCell className='table_head_cell' align="center">Engagement</TableCell>
                                                            <TableCell className='table_head_cell' align="center">Avg Likes</TableCell>
                                                            <TableCell className='table_head_cell' align="center">Avg Comments</TableCell>
                                                            <TableCell className='table_head_cell' align="center">Avg Reach</TableCell>
                                                            <TableCell className='table_head_cell' align="center">Cost</TableCell>
                                                            <TableCell className='table_head_cell' align="center"></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {item.item.influencersData.map((data, index) =>
                                                            < TableRow key={index} >
                                                                <TableCell component="th" scope="row" key={data.username} onClick={() => redirectProfile(data)} className='table_head_value' >
                                                                <div className="profile_view">
                                                                        <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Images/${data.username}/${data.username}_profile_image.png`} className='profile_image' />
                                                                        <div style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>{data?.full_name}</div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell align="center" className='table_head_value'>{data.category_enum !== null ? data.category_enum.length > 10 ? (data.category_enum.substring(0, 15) + '...') : data.category_enum : null}</TableCell>
                                                                <TableCell align="center" className='table_head_value'>
                                                                    {NFormatter(data?.edge_followed_by.count)}
                                                                </TableCell>
                                                                <TableCell align="center" className='table_head_value'>
                                                                    {NFormatter(data?.edge_owner_to_timeline_media['edges'][0]?.er)}
                                                                </TableCell>
                                                                <TableCell align="center" className='table_head_value'>
                                                                    {NFormatter(data?.edge_owner_to_timeline_media['edges'][0]?.avg_likes)}
                                                                </TableCell>
                                                                <TableCell align="center" className='table_head_value'>
                                                                    {NFormatter(data?.edge_owner_to_timeline_media['edges'][0]?.avg_comment)}
                                                                </TableCell>
                                                                <TableCell align="center" className='table_head_value'>
                                                                    {NFormatter(data?.edge_felix_video_timeline['edges'][0]?.averageReelView)}
                                                                </TableCell>
                                                                <TableCell align="center" className='table_head_value'>
                                                                    {
                                                                        NFormatter(
                                                                            (data?.costFactorReel?.minTotalCost || data?.costFactorReel?.minTotalCost ?
                                                                                (data?.costFactorReel?.minTotalCost * item?.item?.deliverables[0]?.reel)
                                                                                :
                                                                                (data?.costFactorReel?.influencerExactminTotalCost * item?.item?.deliverables[0]?.reel))
                                                                            +
                                                                            (data?.costFactorPosts?.minTotalCost || data?.costFactorPosts?.minTotalCost ?
                                                                                (data?.costFactorPosts?.minTotalCost * item?.item?.deliverables[1]?.post)
                                                                                :
                                                                                (data?.costFactorPosts?.influencerExactminTotalCost * item?.item?.deliverables[1]?.post))
                                                                            +
                                                                            (data?.costFactorStories?.minTotalCost || data?.costFactorStories?.minTotalCost ?
                                                                                (data?.costFactorStories?.minTotalCost * item?.item?.deliverables[2]?.story)
                                                                                :
                                                                                (data?.costFactorStories?.influencerExactminTotalCost * item?.item?.deliverables[2]?.story))
                                                                            +
                                                                            (data?.costFactorIgtv?.minTotalCost || data?.costFactorIgtv?.minTotalCost ?
                                                                                (data?.costFactorIgtv?.minTotalCost * item?.item?.deliverables[3]?.igtv)
                                                                                :
                                                                                (data?.costFactorIgtv?.influencerExactminTotalCost * item?.item?.deliverables[3]?.igtv))
                                                                            +
                                                                            (data?.costFactorSwipeUp?.minTotalCost || data?.costFactorSwipeUp?.minTotalCost ?
                                                                                (data?.costFactorSwipeUp?.minTotalCost * item?.item?.deliverables[4]?.swipeup)
                                                                                :
                                                                                (data?.costFactorSwipeup?.influencerExactminTotalCost * item?.item?.deliverables[4]?.swipeup))
                                                                            +
                                                                            (data?.costFactorVideo?.minTotalCost || data?.costFactorVideo?.minTotalCost ?
                                                                                (data?.costFactorVideo?.minTotalCost * item?.item?.deliverables[5]?.video)
                                                                                :
                                                                                (data?.costFactorVideo?.influencerExactminTotalCost * item?.item?.deliverables[5]?.video))
                                                                        )
                                                                    }
                                                                </TableCell>
                                                                <TableCell className='table_head_value'><MdDelete onClick={() => { handleDeleteList(data) }} /></TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>

                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </div>
                                )
                                :
                                <div className='inline_loader'>
                                    <Loader />
                                </div>
                            :
                            <div className='inline_loader'>
                                <Loader />
                            </div>
                    }
                    <div className='right_pane col-lg-3 col-md-4 col-sm-4 col-xs-4 col-4'>
                        {
                            loader === false ?
                                listInfluencersData[0] ?
                                    <>
                                        <div className='icons_pane'>
                                            {
                                                deleteIconSelected === true
                                                    ?
                                                    <img src={deleteiconfilled} onClick={() => {
                                                        setDeleteIconSelected(false)
                                                    }} />
                                                    :
                                                    <img src={deleteicon} onClick={() => {
                                                        setDeleteIconSelected(true)
                                                        setBundlesIconSelected(false)
                                                        setListsIconSelected(false)
                                                    }} />
                                            }
                                            {
                                                listsIconSelected === false ?
                                                    <img src={checklists} onClick={() => {
                                                        setListsIconSelected(true)
                                                        setBundlesIconSelected(false)
                                                        setDeleteIconSelected(false)
                                                    }} />
                                                    :
                                                    <img src={checklistselected} onClick={() => {
                                                        setListsIconSelected(false)
                                                    }} />
                                            }
                                            {
                                                bundlesIconSelected === false ?
                                                    <img src={checkbundles} onClick={() => {
                                                        setBundlesIconSelected(true)
                                                        setListsIconSelected(false)
                                                        setDeleteIconSelected(false)
                                                    }} />
                                                    :
                                                    <img src={checkbundleselected} onClick={() => {
                                                        setBundlesIconSelected(false)
                                                    }} />
                                            }

                                        </div>
                                        {
                                            deleteIconSelected === true ?
                                                <div className='row justify-content-center' style={{ paddingBottom: '2rem' }}>
                                                    <div className='delete_header col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12'>Recently Deleted</div>
                                                    <div className='delete_content col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12'>
                                                        Deleted influencers will be retained for 30 days in the bin. After 30 days they will be permanently deleted.
                                                    </div>
                                                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 clear_all_btn' style={{ textAlign: 'right' }} onClick={handleClearAllDeletedInfluencers}>
                                                        Clear all
                                                    </div>
                                                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8 col-8'>
                                                        <div className='row  justify-content-center'>
                                                            {listInfluencersData.map((item) =>
                                                                item.item.deletedInfluencers.map((data) =>
                                                                    <div className='deleted_box col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12'>
                                                                        <div className='row'>
                                                                            <div className='box_name col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pl-0 pr-0'>
                                                                                {data.full_name}
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='view_box col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12' onClick={() => redirectProfile(data)}>
                                                                                View
                                                                            </div>
                                                                            <div className='view_box col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12' onClick={() => handleRestore(data)} style={{ marginLeft: '0.1rem' }}>
                                                                                Restore
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                listsIconSelected === true ?
                                                    <MyLists />
                                                    :
                                                    bundlesIconSelected === true ?
                                                        <div style={{ padding: '1rem' }}>
                                                            <div className='sidebar_header'>
                                                                Top Bundles
                                                            </div>
                                                            {basketData.map((item) =>
                                                                <div className='bundle_box row no-gutters'>
                                                                    <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12 col-12' style={{ overflow: 'hidden' }}>
                                                                        <img src={`https://socialbox-bckt.s3.ap-south-1.amazonaws.com/Basket/${item.categoryName}/image.png`} className="influencers_image" />
                                                                    </div>
                                                                    <div className='bundle_desc col-lg-7 col-md-7 col-sm-12 col-xs-12 col-12'>
                                                                        <div className='bundle_title col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pl-0 pr-0'>Top {item.basketInfluencersCount} {item.categoryName} Influencers</div>
                                                                        <div className='bundle_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pl-0 pr-0' onClick={() => { handleRedirectToBasket(item) }}>View</div>
                                                                    </div>
                                                                </div>)}
                                                        </div>
                                                        :
                                                        null
                                        }
                                    </>

                                    :
                                    <div className='inline_loader'>
                                        <Loader />
                                    </div>
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
export default UserLists;