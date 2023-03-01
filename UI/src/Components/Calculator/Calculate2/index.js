import React, { useState } from 'react';
import Navbar from '../../../Common/Sidebar/sidebar';
import Topbar from '../../../Common/TopBar/index';
import './index.scss';
import bdayIcon from '../../../Assets/Images/bdayIcon.png';
import categoryIcon from '../../../Assets/Images/categoryIcon.png';
import locationIcon from '../../../Assets/Images/locationIcon.png';
import { useParams, useNavigate } from 'react-router-dom';
import NFormatter from '../../../Common/NumberFormatter/numFormatter';
import Button from '@mui/material/Button';

function CalculateDeliverables() {

    const [reels, setReels] = useState(0);
    const [posts, setPosts] = useState(0);
    const [videos, setVideos] = useState(0);
    const [stories, setStories] = useState(0);
    const [swipeupStories, setSwipeupStories] = useState(0);
    const [igtv, setIgtv] = useState(0);
    const params = useParams();
    const navigate = useNavigate();

    const handleNextPage = () => {
        navigate(`/calculate/${params.budget}/${params.followerRange}/deliverables=reel=${reels}&post=${posts}&stories=${stories}&swipeupStories=${swipeupStories}&videos=${videos}&igtv=${igtv}`);
    }

    return (
        <div className='calculate_2_container row no-gutters'>
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2'>
                <Navbar />
            </div>
            <div className='middle_pane_calculate col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                <Topbar />
                <div className='middle_pane_content row no-gutters'>
                    <div className='steps_pane col-lg-3 col-md-3 col-sm-0 col-xs-0 col-0'>
                        <div className='steps_pane_part_inactive' style={{ borderLeft: 'solid 0.313rem #357AFF' }}>
                            <div className='steps_pane_title'>Step 1</div>
                            <div className='followers_title'>
                                Followers
                            </div>
                            <div className='followers_count'>
                                {NFormatter(params.followerRange.substring(params.followerRange.indexOf('=') + 1).replace('&', ' - '))}
                            </div>
                            <div className='budget_influencers_title'>Budget / Influencers</div>
                            <div className='budget_influencers_value'>
                                {
                                    params.budget.includes('budget') ?
                                        '₹' + params.budget.substring(params.budget.indexOf('=') + 1)
                                        :
                                        params.budget.substring(params.budget.indexOf('=') + 1) + ' Influencers'
                                }
                            </div>
                        </div>
                        <div className='steps_pane_part' style={{ borderLeft: 'solid 0.313rem #D04B4B' }}>
                            <div className='steps_pane_title'>Step 2</div>
                            <div className='deliverables'>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{reels}</div>
                                    <div className='deliverables_title'>Reels</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{posts}</div>
                                    <div className='deliverables_title'>Static posts</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{videos}</div>
                                    <div className='deliverables_title'>Videos</div>
                                </div>
                            </div>
                            <div className='deliverables'>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{stories}</div>
                                    <div className='deliverables_title'>Stories</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{swipeupStories}</div>
                                    <div className='deliverables_title'>Swipeup Stories</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'> {igtv}</div>
                                    <div className='deliverables_title'>IGTV</div>
                                </div>
                            </div>
                        </div>
                        <div className='steps_pane_part_inactive'>
                            <div className='steps_pane_title'>Step 3</div>
                            <div className='filter_pane'>
                                <img src={bdayIcon} /><div className='filter_value'> -- </div>
                            </div>
                            <div className='filter_pane'>
                                <img src={categoryIcon} /><div className='filter_value'> -- </div>
                            </div>
                            <div className='filter_pane'>
                                <img src={locationIcon} /><div className='filter_value'> -- </div>
                            </div>
                        </div>
                        <div className='steps_pane_part_inactive'>
                            <div className='steps_pane_title'>Step 4</div>
                            <div className='cost_title'>Estimated Cost</div>
                            <div className='cost_value'> ₹ --</div>
                        </div>
                    </div>
                    <div className='content_pane col-lg-6 col-md-9 col-sm-12 col-xs-12 col-12'>
                        <div className='step_count'>
                            STEP 2
                        </div>
                        <div className='step_title'>
                            Deliverables
                        </div>
                        <div className='step_desc'>
                            Set the type and count of deliverables required
                            from each influencer
                        </div>
                        <div className='deliverables_box row no-gutters'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>Reels</div>
                            <div className='deliverables_value col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12'>
                                {
                                    reels === 0 ?
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                        :
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setReels(reels - 1) }}>-</div>
                                }
                                <div style={{ width: '5rem', textAlign: 'center' }}>{reels}</div>
                                <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setReels(reels + 1) }}>+</div>
                            </div>
                        </div>
                        <div className='deliverables_box row no-gutters'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>Static Posts</div>
                            <div className='deliverables_value col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12'>
                                {
                                    posts === 0 ?
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                        :
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setPosts(posts - 1) }}>-</div>

                                }
                                <div style={{ width: '5rem', textAlign: 'center' }}>{posts}</div>
                                <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setPosts(posts + 1) }}>+</div>
                            </div>
                        </div>
                        <div className='deliverables_box row no-gutters'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>Videos</div>
                            <div className='deliverables_value col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12'>
                                {
                                    videos === 0 ?
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                        :
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setVideos(videos - 1)}>-</div>
                                }
                                <div style={{ width: '5rem', textAlign: 'center' }}>{videos}</div>
                                <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setVideos(videos + 1)}>+</div>
                            </div>
                        </div>
                        <div className='deliverables_box row no-gutters'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>Stories</div>
                            <div className='deliverables_value col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12'>
                                {
                                    stories === 0 ?
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                        :
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setStories(stories - 1) }}>-</div>
                                }
                                <div style={{ width: '5rem', textAlign: 'center' }}>{stories}</div>
                                <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => { setStories(stories + 1) }}>+</div>
                            </div>
                        </div>
                        <div className='deliverables_box row no-gutters'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>Swipeup Stories</div>
                            <div className='deliverables_value col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12'>
                                {
                                    swipeupStories === 0 ?
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }}>-</div>
                                        :
                                        <div style={{ borderRight: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setSwipeupStories(swipeupStories - 1)}>-</div>

                                }
                                <div style={{ width: '5rem', textAlign: 'center' }}>{swipeupStories}</div>
                                <div style={{ borderLeft: '0.063rem solid RGB(0, 0, 0, 0.5)', width: '2.625rem', textAlign: 'center' }} onClick={() => setSwipeupStories(swipeupStories + 1)}>+</div>
                            </div>
                        </div>
                        <div className='deliverables_box row no-gutters'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>IGTV</div>
                            <div className='deliverables_value col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12'>
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
                        <div>
                            <Button onClick={handleNextPage} className='next_btn'>Next</Button>
                        </div>
                    </div>
                    <div className='right_pane col-lg-3 col-md-0 col-sm-0 col-xs-0 col-0'>
                        <div className='image1'></div>
                        {/* <div className='image2' style={{ opacity: '0.2' }}>
                        </div> */}
                        {/* <span className='indicator' style={{ marginLeft: '2.5rem' }}>Specific</span>
                        <span className='indicator' style={{ marginLeft: '12rem' }}>Broad</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CalculateDeliverables;