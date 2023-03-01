import React, { useState } from "react";
import './signup.scss';
import logo from '../../Assets/Images/inflyu1.png'
import logo1 from '../../Assets/Images/inflyu1.png'
import { Input } from "reactstrap";
import Button from '@mui/material/Button';
import google from '../../Assets/Images/google_logo.png'
import { Link, useNavigate } from 'react-router-dom';

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [company, setCompany] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = () => {
        const url = `http://13.234.125.76:4000/signup`;
        fetch((url), {
            method: 'POST',
            body: JSON.stringify({ name, email, password, company, mobile }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const { errors } = data;
                if (errors) {
                    console.log(errors)
                }
                else {
                    navigate(`/`);
                }
            })
    }

    const handleLogin = () => {
        navigate(`/`);
    }

    return (
        <div className="signup_container row">
            <div className="left_pane col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6">
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-5 col-sm-7 col-xs-7 col-7" style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={logo1} className='social_logo' />
                    </div>
                </div>
                <div className="signup_form row">
                    <div className="signup_header col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">Sign up</div>
                    <div className="signup_title col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">Let's Get Started with your free trial</div>

                </div>
                <div className="input_boxes row no-gutters">
                    <Input className="registeration_fields col-lg-6 col-md-10 col-sm-6 col-xs-6" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <Input className="registeration_fields col-lg-6 col-md-10 col-sm-6 col-xs-6" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <Input className="registeration_fields col-lg-6 col-md-10 col-sm-6 col-xs-6" placeholder="Mobile (optional)" value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                    <Input className="registeration_fields col-lg-6 col-md-10 col-sm-6 col-xs-6" placeholder="Company (optional)" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                    <Input className="registeration_fields col-lg-6 col-md-10 col-sm-6 col-xs-6" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    {/* <Input className="registeration_fields col-lg-6 col-md-10 col-sm-6 col-xs-6" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} /> */}
                    <Button onClick={handleSignup} className='signup_btn'>Sign up</Button>
                </div>
                <div className="login_link col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                    Already have an Account? <span onClick={handleLogin} style={{ cursor: 'pointer' }}>Log in</span>
                </div>
                <div className="social_login_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                    <img src={google} height="0.875rem" /><span style={{ marginLeft: '0.75rem' }}>Log in with Google</span>
                </div>
                <div className="signup_footer col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                    ©︎ 2022 Inflyu. All rights reserved  |  Privacy policy
                </div>
            </div>
            <div className="right_pane col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6">
                <div className="right_pane_text">
                    Get a brand ambassador
                    <span style={{ display: 'block' }}>to endorse your product.</span>
                    <span style={{ display: 'block' }}>Drive sales through</span>
                    <span style={{ display: 'block' }}>content creators.</span>
                </div>
            </div>
        </div>
    )
}
export default Signup;