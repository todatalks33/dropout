'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, onAuthStateChanged, } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import auth from '../../../firebase';
import { useRouter } from 'next/navigation';
function Registration() {
    const router = useRouter()
    const check = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/dashboard')
            }
        });
    }
    useEffect(() => {
        check();
    }, [])
    const [formData, setFormData] = useState({
        name: '',
        gender: '', // Change to select
        dob: '',
        contact: '',
        email: '',
        district: '', // Change to select
        block: '',
        school: '',
        schoolCode: '',
        password: '',
        password_1: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    gender: formData.gender,
                    dob: formData.dob,
                    contact: formData.contact,
                    email: formData.email,
                    district: formData.district,
                    block: formData.block,
                    school: formData.school,
                    schoolCode: formData.schoolCode,
                    password: formData.password
                })
            })

            // Set the status based on the response from the API route
            if (response.status === 200) {
                setFormData({
                    name: '',
                    gender: '',
                    dob: '',
                    contact: '',
                    email: '',
                    district: '',
                    block: '',
                    school: '',
                    schoolCode: '',
                    password: '',
                    password_1: ''
                })
            } else {
                toast.error("Something went Wrong")
            }

        } catch (e) {
            console.log(e)
        }
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(() => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        toast("You have successfully registered please verify your email")
                    });
                router.push('/login')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

    const districtOptions = [
        'District A',
        'District B',
        'District C',
        // Add more district options here
    ];

    const genderOptions = ['Male', 'Female', 'Other'];

    const blockOptions = ['Block- 1', 'Block- 2'];

    const schoolOptions = ['School-1', 'School-2'];


    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex items-center justify-center py-40 ">
            <div className="bg-white p-8 rounded shadow-lg w-[90%] ">
                <h2 className="text-3xl font-semibold text-center mb-6">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Gender
                                </option>
                                {genderOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="text"
                                id="dob"
                                name="dob"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                placeholder="Enter your date of birth"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">
                                Contact Number
                            </label>
                            <input
                                type="number"
                                id="contact"
                                name="contact"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                placeholder="Enter your contact number"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                School Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                placeholder="Enter your school email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="district" className="block text-gray-700 font-semibold mb-2">
                                District
                            </label>
                            <select
                                id="district"
                                name="district"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                value={formData.district}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select District
                                </option>
                                {districtOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <p className="text-gray-500 text-sm mt-1">
                                {/* Example districts: District A, District B, District C */}
                            </p>
                        </div>
                        {/* Add more fields similar to the above examples */}
                        <div className="mb-4">
                            <label htmlFor="block" className="block text-gray-700 font-semibold mb-2">
                                Block
                            </label>
                            <select
                                id="block"
                                name="block"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                value={formData.block}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Block
                                </option>
                                {blockOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <p className="text-gray-500 text-sm mt-1">
                                {/* Example districts: District A, District B, District C */}
                            </p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="school" className="block text-gray-700 font-semibold mb-2">
                                School
                            </label>
                            <select
                                id="school"
                                name="school"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                value={formData.district}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select School
                                </option>
                                {schoolOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <p className="text-gray-500 text-sm mt-1">

                            </p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="schoolCode" className="block text-gray-700 font-semibold mb-2">
                                School Code
                            </label>
                            <input
                                type="text"
                                id="schoolCode"
                                name="schoolCode"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                placeholder="Enter your contact number"
                                value={formData.schoolCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                placeholder="Enter your Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="password_1"
                                name="password_1"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                                placeholder="Enter your Password"
                                value={formData.password_1}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-[50%] mt-4 "
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Registration;
