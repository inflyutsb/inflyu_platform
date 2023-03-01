import React, { useState } from "react";
import './login.scss';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import show from '../../../src/Assets/Images/show.png';


function ResetPassword() {

    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    let params = useParams();

    const navigate = useNavigate();

    const showPassword = () => {
        const data = passwordVisible ? false : true;
        setPasswordVisible(data)
    }

    const handleResetPassword = () => {
        const url = `http://13.234.125.76:4000/resetPassword/${params.id}/${params.token}`;
        fetch((url), {
            method: 'POST',
            body: JSON.stringify({ password }),
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
                    localStorage.setItem('id', data._id)
                    localStorage.setItem('name', data.name)
                    const userId = localStorage.getItem('id');
                    navigate(`/home/${userId}`);
                    console.log(localStorage.getItem('id'))
                }
            })
    }


    return (
        <div>
            <label>Enter New Password</label>
            <input
                type={passwordVisible === true ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className="registeration_fields"

            />
            <img src={show} alt='' height='16px' width='28px' className='show_image' onClick={showPassword} />
            <Button onClick={handleResetPassword}>Submit</Button>
        </div>
    )
}
export default ResetPassword;