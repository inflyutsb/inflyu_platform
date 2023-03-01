import React, { useEffect, useState } from 'react';
import './index.scss';
import TopBar from '../../Common/TopBar/index';
import Navbar from "../../Common/Sidebar/sidebar";
import Profile from '../../Assets/Images/profile.png';
import { Input } from 'reactstrap';
import Button from '@mui/material/Button';

function ProfileSettings() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [building, setBuilding] = useState('');
    const [locality, setLocality] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [designation, setDesignation] = useState('');
    const [company, setCompany] = useState('');
    const [website, setWebsite] = useState('');
    const [linkedInProfile, setLinkedInProfile] = useState('');
    const [instagramProfile, setInstagramProfile] = useState('');
    const [facebookProfile, setFacebookProfile] = useState('');
    const [userData, setUserData] = useState([]);
    const [openAvtarModal, setOpenAvtarModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profileUpdated, setProfileUpdated] = useState(false);

    const userId = localStorage.getItem('id')

    const handleChangeAvatar = () => {
        setOpenAvtarModal(!openAvtarModal)
    }

    const fetchUserDetails = () => {
        const url = `http://13.234.125.76:4000/getUserDetails/${userId}`;
        fetch(url)
            .then((data) => {
                data.json()
                    .then((result) => {
                        setUserData([result])
                        setIsLoading(false);
                    })
            })
    }

    const handleUpdateProfile = () => {
        const url = `http://13.234.125.76:4000/editProfile/${userId}`;
        fetch((url), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ name, email, phone, building, locality, landmark, city, state, pin, designation, company, website, linkedInProfile, instagramProfile, facebookProfile })
        })
            .then((res) => {
                setProfileUpdated(true);
            })
    }

    useEffect(() => {
        fetchUserDetails();
    }, [profileUpdated])

    if (!isLoading) {
        return (
            <div className='update_profile_container row no-gutters'>
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                    <Navbar />
                </div>
                <div className='main_pane col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                    <TopBar />
                    <div className='middle_pane row no-gutters'>
                        <div className='pane1_3 col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3'>
                            <img src={Profile} style={{ width: '100%' }} />
                            {/* <div className='avatar_title' onClick={handleChangeAvatar}>Change Avatar</div>
                            {
                                openAvtarModal === true ?
                                    <div className='overlay'>
                                        <div className='avatar_section'>
                                            <div className='avatar_title_modal'>Change Avatar </div>
                                            <div className='btn_pane'>
                                                <Button style={{ marginLeft: '2.5rem' }} className='upload_btn'>Select</Button>
                                                <Button style={{ marginLeft: '2.25rem' }} className="clr_btn " onClick={handleChangeAvatar}>Clear</Button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            } */}
                        </div>
                        {
                            userData[0] ?
                                userData.map((item) =>
                                    <>
                                        <div className='pane2_3 col-lg-4 col-md-4 col-sm-9 col-xs-9 col-9'>
                                            <div className='label_1'>Personal Details</div>
                                            <Input
                                                type='text'
                                                placeholder='Name'
                                                // value={name}
                                                onChange={(e) => { setName(e.target.value) }}
                                                className="update_input_fields"
                                                defaultValue={item.name}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Email'
                                                // value={email}
                                                onChange={(e) => { setEmail(e.target.value) }}
                                                className="update_input_fields"
                                                defaultValue={item.email}
                                            />
                                            <Input
                                                type='tel'
                                                placeholder='Mobile'
                                                // value={mobile}
                                                onChange={(e) => { setPhone(e.target.value) }}
                                                className="update_input_fields"
                                                defaultValue={item.phone}
                                            />
                                            <div className='label_1' style={{ marginTop: '2.5rem' }}>
                                                Adress
                                            </div>
                                            <Input
                                                type='text'
                                                placeholder='Apartment # / Building'
                                                className="update_input_fields"
                                                defaultValue={item.building}
                                                onChange={(e) => { setBuilding(e.target.value) }}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Street name / Locality'
                                                className="update_input_fields"
                                                defaultValue={item.locality}
                                                onChange={(e) => { setLocality(e.target.value) }}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Landmark (optional)'
                                                className="update_input_fields"
                                                defaultValue={item.landmark}
                                                onChange={(e) => { setLandmark(e.target.value) }}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='City / District'
                                                className="update_input_fields"
                                                defaultValue={item.city}
                                                onChange={(e) => { setCity(e.target.value) }}
                                            />
                                            <div className='pane2_1 row no-gutters'>
                                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>
                                                    <Input
                                                        type='text'
                                                        placeholder='State'
                                                        className="update_input_fields"
                                                        defaultValue={item.state}
                                                        onChange={(e) => { setState(e.target.value) }}
                                                    />
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12'>
                                                    <Input
                                                        type='text'
                                                        placeholder='PIN'
                                                        className="update_input_fields"
                                                        defaultValue={item.pin}
                                                        onChange={(e) => { setPin(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='btn_div'>
                                                <Button onClick={handleUpdateProfile} className='save_btn'>Save</Button>
                                                <Button className='cancel_btn'>Cancel</Button>
                                            </div>
                                        </div>
                                        <div className='pane3_3 col-lg-4 col-md-4 col-sm-9 col-xs-9 col-9'>
                                            <div className='label_1'>Company</div>
                                            <Input
                                                type='text'
                                                placeholder='Designation'
                                                className="update_input_fields"
                                                defaultValue={item.designation}
                                                onChange={(e) => { setDesignation(e.target.value) }}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Company'
                                                className="update_input_fields"
                                                defaultValue={item.company}
                                                onChange={(e) => { setCompany(e.target.value) }}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Website'
                                                className="update_input_fields"
                                                defaultValue={item.website}
                                                onChange={(e) => { setWebsite(e.target.value) }}
                                            />

                                            <div className='label_1' style={{ paddingTop: '2.5rem' }}>Social Media</div>
                                            <Input
                                                type='text'
                                                placeholder='Linked-in Profile'
                                                className="update_input_fields"
                                                defaultValue={item.linkedInProfile}
                                                onChange={(e) => { setLinkedInProfile(e.target.value) }}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Instagram'
                                                className="update_input_fields"
                                                defaultValue={item.instagramProfile}
                                                onChange={(e) => { setInstagramProfile(e.target.value) }}
                                            />
                                            <Input
                                                type='text'
                                                placeholder='Facebook Profile'
                                                className="update_input_fields"
                                                defaultValue={item.facebookProfile}
                                                onChange={(e) => { setFacebookProfile(e.target.value) }}
                                            />
                                            <div className='btn_div'>
                                                <Button onClick={handleUpdateProfile} className='save_btn'>Save</Button>
                                                <Button className='cancel_btn'>Cancel</Button>
                                            </div>
                                        </div>
                                    </>
                                )
                                :
                                null
                        }
                    </div>
                    <div className='footer_pane'>
                        ©︎ 2022 The Social Box. All rights reserved.
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfileSettings;