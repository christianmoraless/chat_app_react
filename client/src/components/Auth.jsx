import React,{useState}from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import singinImage from '../assets/signup.jpg';

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}
const cookies = new Cookies();

const Auth = () => {

    const [form, setForm]=useState(initialState);
    const [isSignup, setisSignup] = useState(true);
    
    const handleChange=(e)=>{
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    
    const switchMode=()=>{
        setisSignup((prevIsSignup)=>!prevIsSignup)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {fullName,username,password,phoneNumber,avatarURL} = form;
        const URL = 'http://localhost:5000/auth';
        
        const {data:{token,userId,hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'singnup' : 'login'}`,{
            username,password,fullName,phoneNumber,avatarURL,
        });

        cookies.set('userId',userId);
        cookies.set('token',token);
        cookies.set('username',username);
        cookies.set('fullName',fullName);

        if(isSignup){
            cookies.set('phoneNumber',phoneNumber);
            cookies.set('avatarURL',avatarURL);
            cookies.set('hashedPassword',hashedPassword);
        }

        window.location.reload();
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </p>
                    <form onSubmit={handleSubmit}>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='FullName'>Full Name</label>
                                <input
                                    name='fullName'
                                    type='text'
                                    placeholder='Full Name'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='username'>UserName</label>
                                <input
                                    name='username'
                                    type='text'
                                    placeholder='UserName'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <input
                                    name='phoneNumber'
                                    type='text'
                                    placeholder='Phone Number'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='avatarURL'>Avatar URL</label>
                                <input
                                    name='avatarURL'
                                    type='text'
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='confirmPassword'>Confirm the Password</label>
                                <input
                                    name='confirmPassword'
                                    type='password'
                                    placeholder='Confirm the Password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                            
                        <div className='auth__form-container_fields-content_button'>
                            <button>
                                {isSignup ? 'Sign Up' : 'Sign In' }
                            </button>
                        </div>

                    </form>


                    <div className='auth__form-container_fields-account'>
                        <p>{isSignup
                                ? 'Already have a account '
                                : 'Dont have a account? '}

                            <span onClick={switchMode}>
                                {isSignup ? 'Sign in' : 'Sing up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={singinImage} alt='Login'/>
            </div>
        </div>
    )
}
export default Auth;