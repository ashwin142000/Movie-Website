import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {user,logIn}=UserAuth();
    const [error,setError]=useState();
    const [image,setImage]=useState();
    
    const navigate=useNavigate();

    useEffect(()=>{
        const images = ['iron_man.jpg','Thor.jpg','Avengers.jpg','Avengers1.jpg','cap_america.jpg'];
        setImage(images[Math.floor(Math.random()*images.length)]);
    },[])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');
        try{
            await logIn(email,password);
            navigate('/');
        }
        catch (error){
            setError(error.message);
            console.log(error);
        }
    }
  return (
    <>
    <div className='w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-full object-cover' src='iron_man.jpg' alt="/" />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
            <div className='mx-auto max-w-[450px] h-[520px] bg-black/70 text-white'>
                <div className='mx-auto max-w-[320px] py-16'>
                    <h1 className='text-3xl font-bold'>Sign In</h1>
                    {error ? <p className='bg-red-400 p-3 my-2'>{error}</p>:null}
                    <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                        <input onChange={(e)=>setEmail(e.target.value)} 
                         className='p-3 my-2 bg-gray-600 rounded' type="email" placeholder='Email' autoComplete='email' />
                        <input onChange={(e)=>setPassword(e.target.value)} 
                         className='p-3 my-2 bg-gray-600 rounded' type="password" placeholder='Password' autoComplete='current-password' />
                        <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
                        <p className='text-gray-500'>
                            <input className='mr-2' type="checkbox" />
                            Remember me
                        </p>
                        <p className='py-8'>
                            <span className='text-gray-500'>
                            New to CineVerse?
                            </span>{' '}
                            <Link to='/signup'>Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
