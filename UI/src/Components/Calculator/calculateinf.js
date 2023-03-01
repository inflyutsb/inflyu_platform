import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Navbar from '../../Common/Sidebar/sidebar';
import Topbar from '../../Common/TopBar/index';
import './calculateinf.scss';
import { Input } from 'reactstrap';
import bdayIcon from '../../Assets/Images/bdayIcon.png';
import categoryIcon from '../../Assets/Images/categoryIcon.png';
import locationIcon from '../../Assets/Images/locationIcon.png';
import errorIcon from '../../Assets/Images/errorIcon.png';
import Slider from '@mui/material/Slider';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const options = [
    { value: 'Nano(1K-10K Followers)', label: 'Nano(1K-10K Followers)' },
    { value: 'Micro(10K-50K Followers)', label: 'Micro(10K-50K Followers)' },
    { value: 'Mid-Tier(50K-100K Followers)', label: 'Mid-Tier(50K-100K Followers)' },
    { value: 'Macro(100K-1M Followers)', label: 'Macro(100K-1M Followers)' },
    { value: 'Mega(1M + Followers)', label: 'Mega(1M + Followers)' },
];

function CalculateCost() {
    const [budget, setBudget] = useState(0);
    const [creatorsCount, setCreatorsCount] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [isInfluencerChecked, setIsInfluencerChecked] = useState(false);
    const [error, setError] = useState(false)

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
    const [silderRolled, setSliderRolled] = useState(false);
    const [sliderRolled1, setSlider1Rolled] = useState(false);
    const [isfilterFollowerClicked, setIsFilterFollowerClicked] = useState(false);
    const [filterFollowersApplied, setFilterFollowersApplied] = useState(false);

    const navigate = useNavigate();

    const handleNextPage = () => {
        if (isChecked === true) {
            if ((silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) > 1000 && (silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) < 10000) {
                if (budget < 2000) {
                    setError(true)
                }
                else {
                    navigate(`/calculate/budget=${budget}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`)
                }
            }
            else if ((silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) > 10000 && (silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) < 50000) {
                if (budget < 7000) {
                    setError(true)
                }
                else {
                    navigate(`/calculate/budget=${budget}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`)
                }
            }
            else if ((silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) > 50000 && (silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) < 100000) {
                if (budget < 24500) {
                    setError(true)
                }
                else {
                    navigate(`/calculate/budget=${budget}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`)
                }
            }
            else if ((silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) > 100000 && (silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) < 1000000) {
                if (budget < 85750) {
                    setError(true)
                }
                else {
                    navigate(`/calculate/budget=${budget}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`)
                }
            }
            else if ((silderRolled ? scale1(minRangeFollowers) : minRangeFollowers) > 1000000) {
                if (budget < 300125) {
                    setError(true)
                }
                else {
                    navigate(`/calculate/budget=${budget}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`)
                }
            }
        }
        else if (isInfluencerChecked === true) {
            navigate(`/calculate/creators=${creatorsCount}/followerRange=${scale1(minRangeFollowers)}&${scale(maxRangeFollowers)}`)
        }
    }

    const scale = value => {
        const previousMarkIndex = Math.floor(value / 25);
        const previousMark = (megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : nanoRange)[previousMarkIndex];
        const remainder = value % 25;
        if (remainder === 0) {
            return previousMark.scaledValue;
        }
        const nextMark = (megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : nanoRange)[previousMarkIndex + 1];
        const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
        return remainder * increment + previousMark.scaledValue;
    };

    const scale1 = value => {
        const previousMarkIndex1 = Math.floor(value / 25);
        const previousMark1 = (megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : nanoRange)[previousMarkIndex1];
        const remainder = value % 25;
        if (remainder === 0) {
            return previousMark1.scaledValue;
        }
        const nextMark = (megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : nanoRange)[previousMarkIndex1 + 1];
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

    function numFormatter(num) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
        } else if (num < 900) {
            return num; // if value < 1000, nothing to do
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

    return (
        <div className='calculate_container row no-gutters'>
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                <Navbar />
            </div>
            <div className='middle_pane_calculate col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                <Topbar />
                <div className='middle_pane_content row no-gutters'>
                    <div className='steps_pane col-lg-3 col-md-3 col-sm-0 col-xs-0 col-0'>
                        <div className='steps_pane_part'>
                            <div className='steps_pane_title'>Step 1</div>
                            <div className='followers_title'>
                                Followers
                            </div>
                            <div className='followers_count'>
                                Any
                            </div>
                            <div className='budget_influencers_title'>Budget / Influencers</div>
                            <div className='budget_influencers_value'> -- </div>
                        </div>
                        <div className='steps_pane_part_inactive'>
                            <div className='steps_pane_title'>Step 2</div>
                            <div className='deliverables'>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'> ---</div>
                                    <div className='deliverables_title'>Reels</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'> ---</div>
                                    <div className='deliverables_title'>Static posts</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'> ---</div>
                                    <div className='deliverables_title'>Videos</div>
                                </div>
                            </div>
                            <div className='deliverables'>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'> ---</div>
                                    <div className='deliverables_title'>Stories</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'> ---</div>
                                    <div className='deliverables_title'>Swipeup Stories</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'> ---</div>
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
                        <div className='steps_title'>STEP 1</div>
                        <div className='pane_title'>Influencer Stats</div>
                        <div className='filter_content'>
                            Adjust sliders for the followers count needed for
                            your Influencer groups
                        </div>
                        <div>
                            <section className="modal_section">
                                <div className="modal_option row no-gutters">
                                    <div className="modal_title">Followers Count</div>
                                    <div className="label_slider">Minimum</div>
                                    <div className=' row no-gutters justify-content-between'>
                                        {
                                            silderRolled === true ?
                                                <div className="followers_count_1 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">{scale1(minRangeFollowers)}</div>
                                                :
                                                <div className="followers_count_1 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">{minRangeFollowers}</div>
                                        }
                                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                                options={options}
                                                className='select_bar'
                                            />
                                        </div>
                                    </div>
                                    <Slider
                                        value={minRangeFollowers}
                                        onChange={(e, data) => {
                                            setMinRangeFollowers(data)
                                            setSliderRolled(true);
                                        }}
                                        marks={megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : nanoRange}
                                        min={0}
                                        max={100}
                                        step={1}
                                        scale={scale1}
                                        valueLabelFormat={numFormatter}
                                        className='follower_silder'
                                    />
                                    <div style={{ paddingTop: '1.125rem' }}>
                                        <div className="label_slider">Maximum</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {
                                                sliderRolled1 === true ?
                                                    <div className="followers_count">{scale(maxRangeFollowers)}</div>
                                                    :
                                                    <div className="followers_count">{maxRangeFollowers}</div>
                                            }
                                            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                            </div>
                                        </div>
                                    </div>
                                    <Slider
                                        value={maxRangeFollowers}
                                        onChange={(e, data) => {
                                            setMaxRangeFollowers(data)
                                            setSlider1Rolled(true);
                                        }}
                                        marks={megaClicked ? megaRange : macroClicked ? macroRange : midTierClicked ? midTierRange : microClicked ? microRange : nanoClicked ? nanoRange : nanoRange}
                                        min={0}
                                        max={100}
                                        step={1}
                                        scale={scale}
                                        valueLabelFormat={numFormatter}
                                        className='follower_silder'
                                    />
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between'
                                    }}>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className='content_bottom_pane'>
                            <div className='select_title_field'>
                                Select the budget or the number of influencers
                                required for marketing
                            </div>
                            <div style={{ paddingTop: '0.75rem' }}>
                                <Input type='checkbox' value={isChecked} onChange={() => setIsChecked(!isChecked)} style={{ cursor: 'pointer' }} disabled={isInfluencerChecked ? true : false} />
                                <label>Budget (INR)</label>
                                <span style={{ marginLeft: '2.2rem' }}> ₹ <Input className='input_box' type='number' value={budget} onChange={(e) => setBudget(e.target.value)} disabled={isInfluencerChecked === true ? true : false} /></span>
                            </div>
                            <div style={{ paddingTop: '0.75rem' }}>
                                <Input type='checkbox' value={isInfluencerChecked} onChange={() => setIsInfluencerChecked(!isInfluencerChecked)} style={{ cursor: 'pointer' }} disabled={isChecked ? true : false} />
                                <label>No of influencers</label>
                                <span><Input className='input_box' type='number' value={creatorsCount} onChange={(e) => { setCreatorsCount(e.target.value) }} disabled={isChecked === true ? true : false} /></span>
                            </div>
                        </div>
                        {
                            error ?
                                <div className='error_pane'>
                                    <img src={errorIcon} height='0.75rem' /> The followers count does not correspond to the budget.
                                    Please change the budget or followers count to a reasonable range and try again.
                                </div>
                                : null
                        }
                        <div>
                            <Button onClick={handleNextPage} className='next_btn'>Next</Button>
                        </div>
                    </div>
                    <div className='right_pane col-lg-3 col-md-0 col-sm-0 col-xs-0 col-0'>
                        <div className='image1'></div>
                        {/* <div className='image2' style={{ opacity: '0.2' }}>
                        </div> */}
                        {/* <span className='indicator'>Specific</span>
                        <span className='indicator'>Broad</span> */}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default CalculateCost;