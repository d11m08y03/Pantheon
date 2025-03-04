import React, { useState } from 'react';
import Nav from '@/components/Nav';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Login attempt with:', { email, password });
  };

  return (
    <>
      <Nav />

      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Login background"
              src="https://c1.wallpaperflare.com/preview/633/719/637/software-code-program-screen.jpg"
              className="absolute inset-0 h-full w-full object-cover hidden lg:block xl:block"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <a className="block text-blue-600" href="#">
                <span className="sr-only">Home</span>
              </a>
                <div className='flex justify-center'>
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome 👾
              </h1>
                </div>


              <p className="mt-4 leading-relaxed text-gray-500">
                Please enter your email and password to access your account.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Example: torma@gmail.com"
                    className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 
                               shadow-md transition-all duration-300 
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                               hover:border-blue-400 
                               px-3 py-2"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 
                               shadow-md transition-all duration-300 
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                               hover:border-blue-400 
                               px-3 py-2"
                  />
                </div>

                <div className="col-span-6">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>

               
                <div className="col-span-6 flex content-center items-center sm:gap-4 flex-wrap justify-center">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
