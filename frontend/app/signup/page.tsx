'use client'
import React, { useState } from "react";


export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    if (profilePicture) {
      form.append("profile_picture", profilePicture);
    }

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        body: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-fadeIn"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="profile_picture" className="block text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white p-2 rounded-md transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {success && (
          <p className="mt-4 text-green-500 text-center">Signup successful!</p>
        )}
      </form>
    </div>
  );
}
