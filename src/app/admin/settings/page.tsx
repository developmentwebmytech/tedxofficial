/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Load profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/admin/profile', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  // Logout function
  const logout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
  };

  // Update name & email
  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage('');
    setSuccess(false);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');

      setMessage('Profile updated successfully. Please login again.');
      setSuccess(true);

      // Force logout after email change
      setTimeout(logout, 1500);
    } catch (err: any) {
      setMessage(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    setLoading(true);
    setMessage('');
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage('All password fields are required');
      setLoading(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setMessage('New password and confirm password do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to change password');

      setMessage('Password updated successfully. Please login again.');
      setSuccess(true);

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

      // Force logout after password change
      setTimeout(logout, 1500);
    } catch (err: any) {
      setMessage(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-6 p-6 bg-white my-7 shadow-md rounded-lg ">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {message && (
        <p className={`mb-4 text-sm text-center ${success ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        onClick={handleSaveChanges}
        disabled={loading}
        className="w-fit mb-6 bg-red-500 hover:bg-black text-white p-3 rounded-md disabled:opacity-50"
      >
        Save Changes
      </button>

      {/* Password change */}
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Current Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">New Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">Confirm New Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleChangePassword}
        disabled={loading}
        className="w-fit bg-red-500 hover:bg-black text-white p-3 rounded-md disabled:opacity-50"
      >
        Update Password
      </button>
    </div>
  );
}
