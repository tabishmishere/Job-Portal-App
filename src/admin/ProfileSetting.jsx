import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      navigate("/login");
    } else {
      setUser(loggedUser);
      setName(loggedUser.name);
      setEmail(loggedUser.email);
      setBio(loggedUser.profile?.bio || "");
      setSkills(loggedUser.profile?.skills?.join(", ") || "");
      setAvatar(loggedUser.profile?.avatar || null);
    }
  }, [navigate]);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("skills", skills);
      if (avatar) formData.append("avatar", avatar);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/user/${user._id || user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Personal Settings
      </h1>

      <form
        className="bg-white/70 backdrop-blur-xl border border-gray-200 p-8 rounded-3xl shadow-xl max-w-2xl mx-auto space-y-6 hover:shadow-2xl transition-all duration-300"
        onSubmit={handleUpdate}
      >
        {success && (
          <p className="text-green-600 bg-green-50 border border-green-200 rounded-lg py-2 px-4 text-center font-medium">
            {success}
          </p>
        )}
        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 px-4 text-center font-medium">
            {error}
          </p>
        )}

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Bio</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Skills (comma separated)
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Profile Photo
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleAvatarChange}
              className="text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 transition"
            />
            {user?.profile?.avatar && !avatar && (
              <img
                src={user.profile.avatar}
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-green-500 shadow-md object-cover"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 active:bg-green-800 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
