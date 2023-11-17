import React, { useEffect, useState } from 'react';
import withAuth from '@/HOC/withAuth';
import { GetServerSideProps, NextPage } from 'next';
import { deleteCookie, getCookie } from 'cookies-next';
import Router from 'next/router';
import useProfileData from '@/customHooks/useProfileData';
import Layout from '@/components/Layout';

const Profile: NextPage = () => {
    const { profileData, loading, error: fetchError } = useProfileData();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (profileData) {
            setFirstName(profileData.first_name || '');
            setLastName(profileData.last_name || '');
        }
    }, [profileData]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch('https://eservice.vemate.com/api/v1/account/public/users/profile/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getCookie('authToken')}`,
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                }),
            });


            const data = await response.json();

            if (response.ok) {
                setMessage('Profile updated successfully.');
                // Optionally update local state or context with new profile data
            } else {
                setError(data.message || 'Failed to update profile.');
            }
        } catch (err) {
            setError('An error occurred while updating the profile.');
        }
    };

    const handleSignOut = () => {
        deleteCookie('authToken');
        Router.push('/signin');
    };

    if (loading) return <div className='flex h-screen justify-center items-center text-slate-600 text-8xl'>Loading...</div>;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Profile Page</h1>
                {message && <p className="bg-green-100 text-green-700 border border-green-400 rounded py-2 px-4 mb-4 text-center">{message}</p>}
                {error && <p className="bg-red-100 text-red-700 border border-red-400 rounded py-2 px-4 mb-4 text-center">{error}</p>}
                {fetchError && <p className="bg-red-100 text-red-700 border border-red-400 rounded py-2 px-4 mb-4 text-center">Error fetching profile: {fetchError}</p>}
                <form onSubmit={handleUpdateProfile} className="flex flex-col items-center justify-center space-y-6">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border text-slate-700 border-gray-300 p-3 rounded shadow w-full max-w-md focus:outline-none focus:border-gray-500"
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border text-slate-700 border-gray-300 p-3 rounded shadow w-full max-w-md focus:outline-none focus:border-gray-500"
                        placeholder="Last Name"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 w-full max-w-md"
                    >
                        Update Profile
                    </button>

                </form>
                <div className='flex my-5'>
                    <button onClick={handleSignOut} className="mt-6 mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 w-36 max-w-md">
                        Sign Out
                    </button>
                </div>

            </div>
        </Layout>
    );
};


export default withAuth(Profile);
