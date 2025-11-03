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
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Personal Settings</h1>

      <form
        className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto space-y-6"
        onSubmit={handleUpdate}
      >
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Bio</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Profile Photo</label>
          <input type="file" onChange={handleAvatarChange} />
          {user?.profile?.avatar && !avatar && (
            <img
              src={user.profile.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full mt-3"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-700 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
