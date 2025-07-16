import React, { useState } from 'react';
import Nav from '@/components/Nav';
import { MagicCard } from '@/components/magicui/magic-card';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add login logic here
    console.log('Login attempt with:', { email, password });
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match');
      return;
    }
    
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add sign up logic here
    console.log('Sign Up attempt with:', { signupEmail, signupPassword });
    setIsLoading(false);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Nav />
      <div className="h-screen flex pt-16 overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-gray-900 relative overflow-hidden">
          {/* Background Patterns */}
          <DotPattern
            width={25}
            height={25}
            cx={1}
            cy={1}
            cr={1}
            className="opacity-5 dark:opacity-10"
            glow={true}
          />
          
          <motion.div 
            className="w-full max-w-sm relative z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-800 dark:to-blue-900 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-800 dark:to-blue-900 rounded-full blur-lg opacity-20 animate-pulse"></div>
                </motion.div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {mode === 'login' ? 'Welcome back' : 'Join us'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {mode === 'login' 
                  ? 'Sign in to your Computer Club account' 
                  : 'Create your Computer Club account'
                }
              </p>
            </motion.div>

              {/* Toggle Tabs */}
            <motion.div 
              className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6 border border-gray-200 dark:border-gray-700 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
                <button
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  mode === 'login'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
                  onClick={() => { setMode('login'); setError(''); }}
                  type="button"
                >
                {mode === 'login' && (
                  <motion.div
                    className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Sign In</span>
                </button>
                <button
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
                  onClick={() => { setMode('signup'); setError(''); }}
                  type="button"
                >
                {mode === 'signup' && (
                  <motion.div
                    className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Sign Up</span>
                </button>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MagicCard 
                className="p-6 dark:bg-gray-900 dark:border-gray-700"
                gradientSize={400}
                gradientColor="#3b82f6"
                gradientOpacity={0.05}
                gradientFrom="#3b82f6"
                gradientTo="#1d4ed8"
              >
                {error && (
                  <motion.div 
                    className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {error}
                    </p>
                  </motion.div>
                )}

                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mode === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Email address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                        type="email"
                            id="email"
                        value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm bg-white dark:bg-gray-900"
                          />
                          {email && validateEmail(email) && (
                            <motion.div
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                        value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        placeholder="Enter your password"
                            className="w-full pl-10 pr-12 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm bg-white dark:bg-gray-900"
                      />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                          Forgot password?
                        </a>
                      </div>

                      <InteractiveHoverButton
                          type="submit"
                        disabled={isLoading}
                        className="w-full bg-black dark:bg-gray-800 text-white border-2 border-black dark:border-blue-400 hover:bg-gray-800 dark:hover:bg-gray-900 hover:border-blue-600 dark:hover:border-blue-300 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Signing in...
                      </div>
                        ) : (
                          'Sign In'
                        )}
                      </InteractiveHoverButton>
                    </form>
                  ) : (
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="signup-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Email address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                        type="email"
                            id="signup-email"
                        value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm bg-white dark:bg-gray-900"
                          />
                          {signupEmail && validateEmail(signupEmail) && (
                            <motion.div
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="signup-password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type={showSignupPassword ? "text" : "password"}
                            id="signup-password"
                        value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                        placeholder="Create a password"
                            className="w-full pl-10 pr-12 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm bg-white dark:bg-gray-900"
                      />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {signupPassword && (
                          <div className="flex gap-1 mt-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                  signupPassword.length >= (i + 1) * 2
                                    ? signupPassword.length >= 8
                                      ? 'bg-green-500'
                                      : signupPassword.length >= 6
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                    : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="signup-confirm" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Confirm password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type={showSignupConfirm ? "text" : "password"}
                            id="signup-confirm"
                        value={signupConfirm}
                            onChange={(e) => setSignupConfirm(e.target.value)}
                            required
                        placeholder="Confirm your password"
                            className="w-full pl-10 pr-12 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm bg-white dark:bg-gray-900"
                      />
                        <button
                            type="button"
                            onClick={() => setShowSignupConfirm(!showSignupConfirm)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            {showSignupConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        </div>
                        {signupConfirm && signupPassword && (
                          <motion.div
                            className={`text-xs font-medium ${
                              signupPassword === signupConfirm ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {signupPassword === signupConfirm ? '✓ Passwords match' : '✗ Passwords do not match'}
                          </motion.div>
                        )}
                      </div>

                      <InteractiveHoverButton
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black dark:bg-gray-800 text-white border-2 border-black dark:border-blue-400 hover:bg-gray-800 dark:hover:bg-gray-900 hover:border-blue-600 dark:hover:border-blue-300 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Creating account...
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </InteractiveHoverButton>
                    </form>
                  )}
                </motion.div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
             
                </div>
              </MagicCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-blue-900 to-black dark:from-black dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
          {/* Background Elements */}
          <DotPattern
            width={30}
            height={30}
            cx={1}
            cy={1}
            cr={1}
            className="opacity-10 dark:opacity-20"
            glow={true}
          />
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"
              animate={{
                y: [0, 30, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-sm"
            >
              <div className="mb-6">
                <motion.div
                  className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-3">
                  Welcome to Computer Club
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Join our community of tech enthusiasts, innovators, and creators.
                </p>
              </div>
              
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Access exclusive tech events</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Connect with professionals</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Showcase your projects</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Stay updated with trends</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
              </div>
            </div>
    </>
  );
};

export default LoginForm;
