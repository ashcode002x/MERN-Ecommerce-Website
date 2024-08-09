import React, { useState } from "react";
import "./CSS/LoginSignup.css";

function LoginSignup() {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        console.log("Login Function executed", formData);
        let responseData;
        await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                Accept: "application/form-data",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => (responseData = data));

        if (responseData.success) {
            localStorage.setItem("auth_token", responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
        console.log(responseData);
    };

    const signUp = async () => {
        console.log("Sign Up Function Executed", formData);
        console.log(JSON.stringify(formData));
        let responseData;
        await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                Accept: "application/form-data",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => (responseData = data));

        if (responseData.success) {
            localStorage.setItem("auth_token", responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
    };

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>{state}</h1>
                <div className='loginsignup-fields'>
                    {state === "Sign Up" ? (
                        <input
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={changeHandler}
                            placeholder='Your Name'
                        />
                    ) : (
                        <></>
                    )}
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder='Email Address'
                    />
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='Password'
                    />
                </div>
                <button
                    onClick={() => {
                        state === "Login" ? login() : signUp();
                    }}
                >
                    Continue
                </button>
                {state === "Login" ? (
                    <p className='loginsignup-login'>
                        Create an account?{" "}
                        <span
                            onClick={() => {
                                setState("Sign Up");
                            }}
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p className='loginsignup-login'>
                        Already have an account?{" "}
                        <span
                            onClick={() => {
                                setState("Login");
                            }}
                        >
                            Login here
                        </span>
                    </p>
                )}

                <div className='loginsignup-agree'>
                    <input type='checkbox' name='' id='' />
                    <p>
                        By continuing, i agree to the terms of use & privacy
                        policy.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
