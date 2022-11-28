import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/login/login.png'
import { AuthContext } from '../../Context/Authprovider/Authprovider';
import useTitle from '../../hooks/useTitle';

const Register = () => {
    const { createUser, signInGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    useTitle('Register')

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            form.reset();
            navigate('/')
           
        }) 
        .catch(error => console.error(error))
        return alert('User Register Successfully')

    }

    const handleGoogleSignIn = () => {
        signInGoogle()
        .then(result => {
            const user = result.user
            console.log(user)
        })
        .catch(error => console.error(error))
        
    }

    return (
        <div className="hero my-32">
        <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row">
            <div className="text-center lg:text-left">
                <img src={login} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                <h1 className="text-5xl font-bold text-center">Register</h1>
                <form onSubmit={handleRegister} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Your Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name='email' placeholder="email" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" name='password' placeholder="password" className="input input-bordered" required/>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </div>
                </form>
                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-warning mx-8">Sign In With Google</button>
                <p className='text-center'>Alredy Have an account Please <Link className='text-orange-600 font-bold' to='/login'>LogIn</Link> </p>
            </div>
        </div>
    </div>
    );
};

export default Register;