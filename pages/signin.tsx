import { NextPage } from 'next';
import { useState, FormEvent } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import withAuth from '@/HOC/withAuth';

interface Props {}

const Signin: NextPage<Props> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const router = useRouter();
    const handleSignin = async (e: FormEvent) => {
        e.preventDefault();
        // Perform the API call to sign in
        const response = await fetch('https://eservice.vemate.com/api/v1/account/public/users/signin/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password: password,
            app: 2,
          }),
        });
      
        const data = await response.json();
        console.log(response.ok)
        if (response.ok) {
            setCookie('authToken', data.token, {
              maxAge: 60 * 60 * 24, // Expires in one day
              sameSite: 'strict',
              path: '/',
            });

            // Redirect to the home page
            router.push('/');
        } else {
            // Handle errors, show messages to the user
            setErrorMessage(data.message || 'Invalid credentials or server error');
        }
      };

      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <form onSubmit={handleSignin} className="w-full max-w-xs">
          {errorMessage && <p className="bg-green-100 text-green-700 border border-green-400 rounded py-2 px-4 mb-4 text-center">{errorMessage}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      );
      
      
};

export default withAuth(Signin);