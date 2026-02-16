"use client"
import React, { useState } from 'react';
import { UserPlus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', number: '' });
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: '', number: '' });
    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (data.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!data.number.trim()) {
            newErrors.number = 'Phone number is required';
        } else if (!/^\d{10}$/.test(data.number.replace(/\s/g, ''))) {
            newErrors.number = 'Please enter a valid 10-digit phone number';
        }

        return newErrors;
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newUser = {
            id: Date.now(),
            name: formData.name.trim(),
            number: formData.number.trim()
        };

        setUsers([...users, newUser]);
        setFormData({ name: '', number: '' });
        setErrors({});
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEditClick = (user) => {
        setEditingId(user.id);
        setEditData({ name: user.name, number: user.number });
    };

    const handleSaveEdit = (id) => {
        const newErrors = validateForm(editData);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setUsers(users.map(user =>
            user.id === id ? { ...user, ...editData } : user
        ));
        setEditingId(null);
        setEditData({ name: '', number: '' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData({ name: '', number: '' });
    };

    const formatPhoneNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return number;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">User Management</h1>
                    <p className="text-gray-600">Add and manage user contacts</p>
                </div>

                {/* Add User Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <UserPlus className="w-6 h-6 text-indigo-600" />
                        Add New User
                    </h2>

                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value });
                                        if (errors.name) setErrors({ ...errors, name: '' });
                                    }}
                                    placeholder="Enter full name"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.number}
                                    onChange={(e) => {
                                        setFormData({ ...formData, number: e.target.value });
                                        if (errors.number) setErrors({ ...errors, number: '' });
                                    }}
                                    placeholder="Enter 10-digit number"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${errors.number ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.number && (
                                    <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            <UserPlus className="w-5 h-5" />
                            Add User
                        </button>
                    </form>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Users List ({users.length})
                    </h2>

                    {users.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-2">
                                <UserPlus className="w-16 h-16 mx-auto" />
                            </div>
                            <p className="text-gray-500 text-lg">No users added yet</p>
                            <p className="text-gray-400 text-sm">Add your first user using the form above</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                >
                                    {editingId === user.id ? (
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={editData.name}
                                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                            />
                                            <input
                                                type="tel"
                                                value={editData.number}
                                                onChange={(e) => setEditData({ ...editData, number: e.target.value })}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                            />
                                            <button
                                                onClick={() => handleSaveEdit(user.id)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                title="Save"
                                            >
                                                <Check className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                                                title="Cancel"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
                                                <p className="text-gray-600">{formatPhoneNumber(user.number)}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}