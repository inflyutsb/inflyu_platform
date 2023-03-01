import React, { useState, useEffect } from "react";
import './index.scss';
import Button from '@mui/material/Button';
import { Input, Label } from 'reactstrap';
import { AiFillCaretDown } from 'react-icons/ai';
import { MdOutlineArrowDropUp, MdDelete } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { RiSubtractFill, RiAddFill } from 'react-icons/ri';
import Loader from '../../Common/Loader/index';

function MyLists() {


    const [listName, setListName] = useState('');
    const [listData, setListData] = useState([]);
    const [openDeliverablesClicked, setOpenDeliverablesClicked] = useState(false);
    const [reel, setReel] = useState(0);
    const [post, setPost] = useState(0);
    const [story, setStory] = useState(0);
    const [igtv, setIgtv] = useState(0);
    const [swipeup, setSwipeup] = useState(0);
    const [video, setVideo] = useState(0);
    const [description, setDescription] = useState('');
    const [listDeleted, setListDeleted] = useState(false);
    const [newPlanClicked, setNewPlanClicked] = useState(false);
    const [listInfluencerDetails, setListInfluencerDetails] = useState([]);

    const userId = localStorage.getItem('id');
    const navigate = useNavigate();

    const handleCreateList = (listName, description, reel, post, story, igtv, swipeup, video) => {
        const url = `http://13.234.125.76:4000/createList/${userId}`
        fetch((url), {
            method: 'POST',
            body: JSON.stringify({ listName, description, reel, post, story, igtv, swipeup, video }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => { res.json() })
            .then((data) => {
                setListInfluencerDetails(data)
                setNewPlanClicked(false);
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
        getListData();
    }, []);

    useEffect(() => {
        getListData();
    }, [newPlanClicked, listDeleted]);

    return (
        <>
            <div className="headers_title row">
                <div className="headers col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                    My Lists
                </div>
                <div className='add_list_btn col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12' onClick={handleAddPlan}> + Add new</div>
                {
                    newPlanClicked ?
                        <div className="overlay">
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
                                    <Button variant="outlined" onClick={() => { handleCreateList(listName, description, reel, post, story, igtv) }} className='add_list_btn'>Add</Button>
                                    <Button onClick={handleAddPlan} className='cancel_btn'>Cancel</Button>
                                </div>
                            </div>
                        </div> :
                        null
                }
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
    )
}
export default MyLists;