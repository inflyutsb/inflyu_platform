import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../../../Common/Sidebar/sidebar";
import TopBar from "../../../Common/TopBar";
import NFormatter from "../../../Common/NumberFormatter/numFormatter";
import bdayIcon from '../../../Assets/Images/bdayIcon.png';
import categoryIcon from '../../../Assets/Images/categoryIcon.png';
import locationIcon from '../../../Assets/Images/locationIcon.png';
import { Input } from 'reactstrap';
import Button from '@mui/material/Button';
import './index.scss';
import GaugeChart from 'react-gauge-chart';

function CalculateTotal() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [basicCost, setBasicCost] = useState(null);
    const [followersRange, setFollowersRange] = useState('');
    const [estimatedBudget, setEstimatedBudget] = useState(0);
    const [estimatedLikesComment, setEstimatedLikesComment] = useState(0);
    const [estimatedReach, setEstimatedReach] = useState(0);
    const [apiCalled, setApiCalled] = useState(false);
    const [metricsBudget, setMetricsBudget] = useState(0);
    const [metricsDeliverable, setMetricsDeliverable] = useState(0);
    const [metricsDemographyAge, setMetricsDemographyAge] = useState(0);
    const [metricsDemography, setMetricsDemography] = useState(0);
    const [metricsDemographyGender, setMetricsDemographyGender] = useState(0);
    const [metricsDemographyCategory, setMetricsDemographyCategory] = useState(0);
    const [metricsDemographyCities, setMetricsDemographyCities] = useState(0);
    const [metricsDemographyRegions, setMetricsDemographyRegions] = useState(0);
    const [metricsTotal, setMetricsTotal] = useState(0);
    const [calculatedCreatorsCount, setCalculatedCreatorsCount] = useState(0);
    const params = useParams();

    const handleSubmitQuery = () => {
        const url = 'http://13.234.125.76:4000/submitQuery';
        fetch((url), {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ firstName, lastName, email, phone, message, estimatedBudget, estimatedLikesComment, estimatedReach })
        })
            .then((data) => {
                if (data) {
                    console.log("done");
                    setEmail('');
                    setMessage('');
                    setPhone('');
                    setFirstName('');
                    setLastName('')
                }
            })
    }

    const calculateCreatorsCountBasedOnFollowersRange = () => {
        if (params.budget.substring(params.budget.indexOf('=') + 1) <= 10000) {
            setCalculatedCreatorsCount(Math.floor(params.budget.substring(params.budget.indexOf('=') + 1) / 2000))
        }
        else if (params.budget.substring(params.budget.indexOf('=') + 1) > 10000 && params.budget.substring(params.budget.indexOf('=') + 1) <= 50000) {
            setCalculatedCreatorsCount(Math.floor(params.budget.substring(params.budget.indexOf('=') + 1) / 7000))
        }
        else if (params.budget.substring(params.budget.indexOf('=') + 1) > 50000 && params.budget.substring(params.budget.indexOf('=') + 1) <= 100000) {
            setCalculatedCreatorsCount(Math.floor(params.budget.substring(params.budget.indexOf('=') + 1) / 24500))
        }
        else if (params.budget.substring(params.budget.indexOf('=') + 1) > 100000 && params.budget.substring(params.budget.indexOf('=') + 1) <= 1000000) {
            setCalculatedCreatorsCount(Math.floor(params.budget.substring(params.budget.indexOf('=') + 1) / 85750))
        }
        else if (params.budget.substring(params.budget.indexOf('=') + 1) > 1000000) {
            setCalculatedCreatorsCount(Math.floor(params.budget.substring(params.budget.indexOf('=') + 1) / 300125))
        }

    }

    const fetchBasicRates = () => {
        if (params.budget.includes('budget')) {
            let budget = params.budget.substring(params.budget.indexOf('=') + 1)
            let url = `http://13.234.125.76:4000/calculateBudget?followersRange=${followersRange}&budget=${budget}`;
            fetch(url)
                .then((res) => {
                    res.json()
                        .then((data) => {
                            setBasicCost(data)
                            setApiCalled(true)
                        })
                })
        }
        else if (params.budget.includes('creators')) {
            let creators = params.budget.substring(params.budget.indexOf('=') + 1);
            let url = `http://13.234.125.76:4000/calculateBudget?followersRange=${followersRange}&creatorsCount=${creators}`;
            fetch(url)
                .then((res) => {
                    res.json()
                        .then((data) => {
                            setBasicCost(data)
                            setApiCalled(true)
                        })
                })
        }

    }

    const calculateCost = () => {
        let estimatedbud;
        let estimatedlikescmt;
        let estimatedViews;
        if (apiCalled === true) {
            estimatedbud = (
                (params.deliverables.substring(params.deliverables.indexOf('l=') + 2)[0] * basicCost.reelBudget)
                +
                ((params.deliverables.substring(params.deliverables.indexOf('t=') + 2)[0]) * basicCost.postBudget)
                +
                (params.deliverables.substring(params.deliverables.indexOf('os=') + 3)[0] * basicCost.videoBudget)
                +
                (params.deliverables.substring(params.deliverables.indexOf('stories=') + 8)[0] * basicCost.storyBudget)
                +
                (params.deliverables.substring(params.deliverables.indexOf('swipeupStories=') + 15)[0] * basicCost.swipeUpBudget)
                +
                (params.deliverables.substring(params.deliverables.indexOf('v=') + 2)[0] * basicCost.igtvBudget)
            )
            setEstimatedBudget(estimatedbud)

            estimatedlikescmt = (
                (params.deliverables.substring(params.deliverables.indexOf('l=') + 2)[0] * basicCost.LikesCommentOfReel)
                +
                ((params.deliverables.substring(params.deliverables.indexOf('t=') + 2)[0]) * basicCost.LikesCommentOfPost)
                +
                (params.deliverables.substring(params.deliverables.indexOf('os=') + 3)[0] * basicCost.LikesCommentOfVideo)
                +
                (params.deliverables.substring(params.deliverables.indexOf('stories=') + 8)[0] * basicCost.LikesCommentOfStory)
                +
                (params.deliverables.substring(params.deliverables.indexOf('swipeupStories=') + 15)[0] * basicCost.LikesCommentOfSwipeup)
                +
                (params.deliverables.substring(params.deliverables.indexOf('v=') + 2)[0] * basicCost.LikesCommentOfIgtv)
            )
            setEstimatedLikesComment(estimatedlikescmt)

            estimatedViews = (
                (params.deliverables.substring(params.deliverables.indexOf('l=') + 2)[0] * basicCost.reachOfReel)
                +
                ((params.deliverables.substring(params.deliverables.indexOf('t=') + 2)[0]) * basicCost.reachOfPost)
                +
                (params.deliverables.substring(params.deliverables.indexOf('os=') + 3)[0] * basicCost.reachOfVideo)
                +
                (params.deliverables.substring(params.deliverables.indexOf('stories=') + 8)[0] * basicCost.reachOfStory)
                +
                (params.deliverables.substring(params.deliverables.indexOf('swipeupStories=') + 15)[0] * basicCost.reachOfSwipeup)
                +
                (params.deliverables.substring(params.deliverables.indexOf('v=') + 2)[0] * basicCost.reachOfIgtv)
            )
            setEstimatedReach(estimatedViews);
        }
    }

    const calculateMetricsBudget = () => {
        if (params.budget.includes('budget') && params.deliverables && params.demography) {
            setMetricsBudget(15);
        }
        else if (params.budget.includes('creators') && params.deliverables && params.demography) {
            setMetricsBudget(10);
        }
    }

    const calculateMetricsDeliverables = () => {
        let count0 = 0;
        let count = 0;
        const a = params.deliverables.split('&')
        for (let i = 0; i < a.length; i++) {
            if (a[i].substring(a[i].length - 1) === '0') {
                count0++;
            }
            else {
                count++;
            }
        }
        if (count === 6) {
            setMetricsDeliverable(1)
        }
        else if (count === 5) {
            setMetricsDeliverable(2)
        }
        else if (count === 4) {
            setMetricsDeliverable(4)
        }
        else if (count === 3) {
            setMetricsDeliverable(6)
        }
        else if (count === 2) {
            setMetricsDeliverable(8)
        }
        else if (count === 1) {
            setMetricsDeliverable(10)
        }
        else if (count === 0) {
            setMetricsDeliverable(0)
        }
    }

    const calculateMetricsDemographyAgeGender = () => {
        let ageCount = 0;
        if (params.demography.substring(params.demography.indexOf('age')).split('=')[1].split('&')[0] === 'none') {
            setMetricsDemographyAge(0);
            if (params.demography.substring(params.demography.indexOf('gender')).split('=')[1].split('&')[0] === 'undefined') {
                setMetricsDemographyGender(0)
            }
            else {
                setMetricsDemographyGender(10);
            }
        }
        else if (params.demography.substring(params.demography.indexOf('age')).split('=')[1].split('&')[0] !== 'none') {
            let url = params.demography.substring(params.demography.indexOf('=') + 1);
            let ageUrl = url.split('&')
            ageUrl.forEach((item) => {
                if (item.includes('-')) {
                    ageCount++;
                }
            })
            if (ageCount === 1) {
                setMetricsDemographyAge(5)
            }
            else if (ageCount === 2) {
                setMetricsDemographyAge(4)
            }
            else if (ageCount === 3) {
                setMetricsDemographyAge(3)
            }
            else if (ageCount === 4) {
                setMetricsDemographyAge(2)
            }
            else if (ageCount === 5) {
                setMetricsDemographyAge(1)
            }
            if (params.demography.substring(params.demography.indexOf('gender')).split('=')[1].split('&')[0] === 'undefined') {
                setMetricsDemographyGender(0)
            }
            else {
                setMetricsDemographyGender(10);
            }
        }
    }

    const calculateMetricsDemographyCategory = () => {
        if (params.demography.includes('category')) {
            if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&')[0] === 'none') {
                setMetricsDemographyCategory(0);
            }
            else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&')[0] !== 'none') {
                if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 1) {
                    setMetricsDemographyCategory(10);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 2) {
                    setMetricsDemographyCategory(9);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 3) {
                    setMetricsDemographyCategory(8);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 4) {
                    setMetricsDemographyCategory(7);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 5) {
                    setMetricsDemographyCategory(6);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 6) {
                    setMetricsDemographyCategory(5);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 7) {
                    setMetricsDemographyCategory(4);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 8) {
                    setMetricsDemographyCategory(3);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 === 9) {
                    setMetricsDemographyCategory(2);
                }
                else if (params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 >= 10) {
                    setMetricsDemographyCategory(1);
                }
            }
        }
    }

    const calculateMetricsDemographyCities = () => {
        if (params.demography.includes('city')) {
            if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&')[0] === 'none') {
                setMetricsDemographyCities(0);
            }
            else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&')[0] !== 'none') {
                if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 1) {
                    setMetricsDemographyCities(10);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 2) {
                    setMetricsDemographyCities(9);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 3) {
                    setMetricsDemographyCities(8);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 4) {
                    setMetricsDemographyCities(7);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 5) {
                    setMetricsDemographyCities(6);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 6) {
                    setMetricsDemographyCities(5);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 7) {
                    setMetricsDemographyCities(4);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 8) {
                    setMetricsDemographyCities(3);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 === 9) {
                    setMetricsDemographyCities(2);
                }
                else if (params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length - 1 >= 10) {
                    setMetricsDemographyCities(1);
                }
            }
        }
    }

    const calculateMetricsDemographyRegions = () => {
        if (params.demography.includes('region')) {
            if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&')[0] === 'none') {
                setMetricsDemographyRegions(0);
            }
            else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&')[0] !== 'none') {
                if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 0) {
                    setMetricsDemographyRegions(10);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 1) {
                    setMetricsDemographyRegions(9);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 2) {
                    setMetricsDemographyRegions(8);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 3) {
                    setMetricsDemographyRegions(7);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 4) {
                    setMetricsDemographyRegions(6);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 5) {
                    setMetricsDemographyRegions(5);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 6) {
                    setMetricsDemographyRegions(4);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 7) {
                    setMetricsDemographyRegions(3);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 === 8) {
                    setMetricsDemographyRegions(2);
                }
                else if (params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length - 1 >= 9) {
                    setMetricsDemographyRegions(1);
                }
            }
        }
    }

    useEffect(() => {
        let follower = params.followerRange.substring(params.followerRange.indexOf('=') + 1).split('&')[1];
        if (follower > 1000 && follower < 10000) {
            setFollowersRange('Nano')
        }
        else if (follower > 10000 && follower < 50000) {
            setFollowersRange('Micro')
        }
        else if (follower > 50000 && follower < 100000) {
            setFollowersRange('Mid-Tier')
        }
        else if (follower > 100000 && follower < 1000000) {
            setFollowersRange('Macro')
        }
        else if (follower > 1000000) {
            setFollowersRange('Mega')
        }
        if (followersRange) {
            fetchBasicRates();
        }
    }, [followersRange])

    useEffect(() => {
        calculateCost();
        calculateCreatorsCountBasedOnFollowersRange();
    }, [apiCalled])

    useEffect(() => {
        calculateMetricsBudget();
        calculateMetricsDeliverables();
        calculateMetricsDemographyAgeGender();
        calculateMetricsDemographyCategory();
        calculateMetricsDemographyCities();
        calculateMetricsDemographyRegions();
        console.log(metricsDeliverable, metricsBudget, metricsDemographyAge, metricsDemographyGender, metricsDemographyCategory, metricsDemographyCities, metricsDemographyRegions);
        setMetricsTotal(metricsBudget + metricsDeliverable + metricsDemographyAge + metricsDemographyGender + metricsDemographyCategory + metricsDemographyCities + metricsDemographyRegions)
    }, [metricsDeliverable, metricsBudget, metricsDemographyAge, metricsDemographyGender, metricsDemographyCategory, metricsDemographyCities, metricsDemographyRegions])

    return (
        <div className="calculate_4_container row no-gutters">
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                <Navbar />
            </div>
            <div className='middle_pane_calculate col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                <TopBar />
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
                        <div className='steps_pane_part_inactive' style={{ borderLeft: 'solid 0.313rem #D04B4B' }}>
                            <div className='steps_pane_title'>Step 2</div>
                            <div className='deliverables'>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('l=') + 2)[0]}</div>
                                    <div className='deliverables_title'>Reels</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('t=') + 2)[0]}</div>
                                    <div className='deliverables_title'>Static posts</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('os=') + 3)[0]}</div>
                                    <div className='deliverables_title'>Videos</div>
                                </div>
                            </div>
                            <div className='deliverables'>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('stories=') + 8)[0]}</div>
                                    <div className='deliverables_title'>Stories</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('swipeupStories=') + 15)[0]}</div>
                                    <div className='deliverables_title'>Swipeup Stories</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('v=') + 2)[0]}</div>
                                    <div className='deliverables_title'>IGTV</div>
                                </div>
                            </div>
                        </div>
                        <div className='steps_pane_part_inactive' style={{ borderLeft: 'solid 0.313rem #32A737', paddingLeft: '2rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '0.25rem' }}>
                            <div className='steps_pane_title'>Step 3</div>
                            <div className='filter_pane'>
                                <img src={bdayIcon} />
                                <div className='filter_value' style={{ fontSize: '0.75rem' }}>
                                    {
                                        params.demography.includes('age') ?
                                            (
                                                params.demography.substring(params.demography.indexOf('age')).split('=')[1].split('&')[0] === 'none' ?
                                                    '--'
                                                    :
                                                    params.demography.substring(params.demography.indexOf('gender')).split('=')[1].split('&')[0] === 'undefined' ?
                                                        params.demography.substring(params.demography.indexOf('age')).split('=')[1].split('&').length - 1 + 'age group'
                                                        :
                                                        params.demography.substring(params.demography.indexOf('age')).split('=')[1].split('&').length - 1 + 'age group ,' + params.demography.substring(params.demography.indexOf('gender')).split('=')[1].split('&')[0]
                                            )
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <div className='filter_pane'>
                                <img src={categoryIcon} />
                                <div className='filter_value' style={{ fontSize: '0.75rem' }}>
                                    {
                                        params.demography.includes('category') ?
                                            (
                                                params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&')[0] === 'none' ?
                                                    '--'
                                                    :
                                                    params.demography.substring(params.demography.indexOf('category')).split('=')[1].split('&').length - 1 + ' categories'
                                            )
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <div className='filter_pane'>
                                <img src={locationIcon} /><div className='filter_value' style={{ fontSize: '0.75rem' }}>
                                    {
                                        params.demography.includes('region') ?
                                            (
                                                params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&')[0] === 'none' ?
                                                    '--'
                                                    :
                                                    params.demography.substring(params.demography.indexOf('region')).split('=')[1].split('&').length + ' State'
                                            )
                                            :
                                            null
                                    },
                                    {
                                        params.demography.includes('city') ?
                                            (
                                                params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&')[0] === 'none' ?
                                                    '--'
                                                    :
                                                    params.demography.substring(params.demography.indexOf('city')).split('=')[1].split('&').length + ' Cities'
                                            )
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='steps_pane_part' style={{ borderLeft: 'solid 0.313rem #7662DC' }}>
                            <div className='steps_pane_title'>Step 4</div>
                            <div className='cost_title'>Estimated Cost</div>
                            <div className='cost_value'>
                                {

                                    params.budget.includes('budget') ?
                                        '₹' + params.budget.substring(params.budget.indexOf('=') + 1)
                                        :
                                        '₹' + estimatedBudget
                                }
                            </div>
                        </div>
                    </div>
                    <div className="content_pane col-lg-6 col-md-9 col-sm-12 col-xs-12 col-12">
                        <div className='step_count'>STEP 4</div>
                        <div className='step_title'>
                            Estimate
                        </div>
                        <div className="content_title">
                            The estimated cost for influencer marketing as per selected parameters is
                        </div>
                        <div className="estimated_field_pane">
                            <div className="field_pane" style={{ marginLeft: 0 }}>
                                <div className="field_label">Est Cost</div>
                                <div className="field_value">
                                    {
                                        params.budget.includes('budget') ?
                                            '₹' + params.budget.substring(params.budget.indexOf('=') + 1)
                                            :
                                            '₹' + NFormatter(estimatedBudget)
                                    }
                                </div>
                            </div>
                            <div className="field_pane">
                                <div className="field_label">No of Creators</div>
                                <div className="field_value">
                                    {
                                        params.budget.includes('budget') ?
                                            calculatedCreatorsCount
                                            :
                                            params.budget.substring(params.budget.indexOf('=') + 1)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="estimated_field_pane_2">
                            <div className="field_pane_2" style={{ marginLeft: 0 }}>
                                <div className="field_label">Est Likes & Comment</div>
                                <div className="field_value">{NFormatter(estimatedLikesComment)}</div>
                            </div>
                            <div className="field_pane_2">
                                <div className="field_label">Est Views</div>
                                <div className="field_value">{NFormatter(estimatedReach)}</div>
                            </div>
                        </div>
                        <div className="result_pane_2_title">
                            For a tailor-made solution as per your needs,<div> call (+91) 9024236599, or submit your details for a call later.</div>
                        </div>
                        <div className="enquiry_form row no-gutters">
                            <div className="name_pane col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                <Input className="enquiry_field col-lg-5 col-md-5 col-sm-12 col-xs-12 col-12" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <Input className="enquiry_field col-lg-5 col-md-5 col-sm-12 col-xs-12 col-12 last_name" placeholder="Last Name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                            </div>
                            <div className="email_pane col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                <Input className="enquiry_field_2 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="mobile_pane col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                <Input className="enquiry_field_2 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12" placeholder="Phone no" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            </div>
                            <div className="message_pane col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                <Input className="enquiry_field_3 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12" placeholder="Message" value={message} onChange={(e) => { setMessage(e.target.value) }} />
                            </div>
                        </div>
                        <div className="bottom_title">
                            You can change the parameters to update your estimate
                        </div>
                        <div>
                            <Button onClick={handleSubmitQuery} className='submit_btn'>Submit</Button>
                        </div>
                    </div>
                    <div className="right_pane col-lg-3 col-md-0 col-sm-0 col-xs-0 col-0 mx-auto">
                        <div className="image_1"></div>
                        <div className="row no-gutters justify-content-center metrics_score">{metricsTotal}%</div>
                        <div className="image_2">
                            <GaugeChart id="gauge-chart2" className="abc"
                                percent={(metricsTotal / 100)}
                            />
                        </div>
                        <div className="row no-gutters justify-content-center">
                            {
                                metricsTotal > 50 ?
                                    <div className='indicator col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 mx-auto' style={{ marginTop: ' 0.5rem' }} >Your Metrix Score: Specific</div>
                                    :
                                    <div className='indicator col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 mx-auto' style={{ marginTop: ' 0.5rem' }} >Your Metrix Score: Broad</div>
                            }
                        </div>
                        <div className="row no-gutters justify-content-center note_box">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 note_title">
                                Note
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 note_item">
                                {"Metrix score < 50 : Broad"}
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 note_item">
                                {"Metrix score > 50 : Specific"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CalculateTotal;