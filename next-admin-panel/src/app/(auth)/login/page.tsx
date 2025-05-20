'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { publicRequest } from '@/helpers/axios';
import loginSchema  from '@/validations/loginValidation';
import toast from 'react-hot-toast'
import type { z } from 'zod';
import { useRouter } from 'next/navigation';
type LoginForm = z.infer<typeof loginSchema>;

const AdminLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const router = useRouter()
    const {
        register,
        handleSubmit,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user')
        if (token && user) {
          router.push('/');
        }
      }, [router]);
    

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true);
        setSubmitError(null);
        
        try {
            const res = await publicRequest.post('/auth/admin', data);
            console.log('Login successful:', res.data);
            localStorage.setItem('user',JSON.stringify(res.data.data.admin))
            localStorage.setItem('token',res.data.data.token)
            toast.success('Admin Login Successfull')
            clearErrors();
            reset();
            router.push('/')
        } catch (error) {
            console.error('Login error:', error);
            setSubmitError('Invalid credentials. Please try again.');
            toast.error('Admin Login Failed')
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-indigo-600 py-6 px-8 text-center"
                    >
                        <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
                        <p className="text-indigo-100 mt-1">Secure access to your dashboard</p>
                    </motion.div>

                    {/* Login Form */}
                    <motion.form 
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="p-8 space-y-6"
                    >
                        {submitError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded"
                            >
                                <p>{submitError}</p>
                            </motion.div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="admin@example.com"
                                    disabled={isLoading}
                                />
                            </motion.div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                />
                            </motion.div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : 'Sign in'}
                        </motion.button>
                    </motion.form>

                    {/* Footer */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="bg-gray-50 px-8 py-4 text-center"
                    >
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} Admin Portal. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AdminLogin;