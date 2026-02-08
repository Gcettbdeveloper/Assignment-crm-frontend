'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '@/components/loader';
import { LOGIN, REGISTER } from '@/config/api';
import useRoleRedirect from '../hooks/useRoleRedirect';

interface User {
    _id: string;
    name: string;
    phone: string;
    role: 'admin' | 'telecaller' | 'salesperson' | 'supervisor';
}

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [roleInput, setRoleInput] = useState<User['role']>('admin');

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<User['role'] | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');

            if (user) {
                const parsed = JSON.parse(user);
                setRole(parsed.role);
            }

            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);

    useRoleRedirect({ role, token });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!phone.trim() || !password.trim() || (isRegister && !name.trim())) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const url = isRegister ? REGISTER : LOGIN;

            const payload = isRegister
                ? { name, phone, password, role: roleInput }
                : { phone, password };

            const res = await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (!isRegister && res.status === 200) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                }

                setRole(res.data.user.role);
                setToken(res.data.token);
            }

            if (isRegister) {
                setIsRegister(false);
                setName('');
                setPassword('');
                setRoleInput('admin');
                setError('Registered successfully. Please login.');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Request failed');
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-400 via-gray-800  to-black">
            
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-2xl text-white animate-fade-in"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isRegister ? 'Create Account 🚀' : 'Please Login  👋'}
                </h2>

                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
                )}

                {isRegister && (
                    <div className="mb-4">
                        <label className="block text-xs mb-1 text-gray-300">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                            placeholder="Enter name"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-xs mb-1 text-gray-300">Phone</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                        placeholder="Enter phone"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-xs mb-1 text-gray-300">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                            placeholder="Enter password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-xs text-gray-400 hover:text-white"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                {isRegister && (
                    <div className="mb-6">
                        <label className="block text-xs mb-1 text-gray-300">Role</label>
                        <select
                            value={roleInput}
                            onChange={(e) => setRoleInput(e.target.value as User['role'])}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:ring-2 focus:ring-white/40 outline-none"
                        >
                            <option value="admin">Admin</option>
                            <option value="telecaller">Telecaller</option>
                            <option value="salesperson">Salesperson</option>
                            <option value="supervisor">Supervisor</option>
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center bg-white text-black py-3 rounded-xl mt-2 font-semibold hover:bg-gray-200 transition disabled:opacity-60"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader color="black" />
                            <span>Processing...</span>
                        </div>
                    ) : isRegister ? (
                        'Register'
                    ) : (
                        'Login'
                    )}
                </button>

                <p
                    className="text-sm text-center mt-6 cursor-pointer text-gray-300 hover:text-white transition"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? 'Already have an account? Login' : 'New user? Register'}
                </p>
            </form>
        </div>
    );

}
