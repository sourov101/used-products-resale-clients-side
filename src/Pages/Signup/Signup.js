import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import signupImg from '../../assets/images/signup.jpg'
import { AuthContext } from '../../context/AuthProvider';


const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');

    const handleSignUp = (data) => {
        console.log(data);
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {

                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }


    const handelGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                const user = res.user;
                const userInfo = {
                    userType: 'User'
                }
                updateUser(userInfo)
                    .then(() => {

                    })
                console.log(user)

            })
            .catch(error => {
                console.error(error)
            })
    }

    return (

        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">

                    <img src={signupImg} alt="" />
                </div>
                <div className="card flex-shrink-0 w-1/2  shadow-2xl bg-base-100">
                    <h1 className="text-3xl font-bold mt-6">Signup now!</h1>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Name</span></label>
                                <input type="text" {...register("name", {
                                    required: "Name is Required"
                                })} className="input input-bordered w-full " />
                                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Email</span></label>
                                <input type="email" {...register("email", {
                                    required: true
                                })} className="input input-bordered w-full " />
                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Select User Type</span></label>
                                <select {...register("userType", { required: true })} className="select select-bordered w-full ">

                                    <option selected>User</option>
                                    <option>Seller</option>
                                </select>
                                {/* <select {...register("category", { required: true })}>
                                    <option value="">Select...</option>
                                    <option value="A">Option A</option>
                                    <option value="B">Option B</option>
                                </select> */}

                            </div>

                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text">Password</span></label>
                                <input type="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })} className="input input-bordered w-full " />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                            </div>
                            <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                            {signUpError && <p className='text-red-600'>{signUpError}</p>}
                        </form>
                        <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>

                        <button onClick={handelGoogleSignIn} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;