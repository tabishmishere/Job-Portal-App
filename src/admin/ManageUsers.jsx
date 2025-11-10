import React, { useEffect, useState } from "react";
import { fetchAdminUsers, updateUserRole, deleteUser } from "../api/adminApi.js";
import { getAuthConfig } from "../api/authConfig.js";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [processing, setProcessing] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminUsers();
      setUsers(res.users || []);
    } catch (err) {
      console.error("loadUsers:", err);
      alert(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleRoleToggle = async (user) => {
    if (!confirm(`Change role of ${user.name} (${user.email})?`)) return;
    try {
      setProcessing(true);
      const nextRole = user.role === "recruiter" ? "user" : "recruiter";
      const res = await updateUserRole(user._id, { role: nextRole });
      setUsers((prev) => prev.map(u => u._id === user._id ? res.user : u));
    } catch (err) {
      console.error("handleRoleToggle:", err);
      alert(err.response?.data?.message || "Failed to update role");
    } finally {
      setProcessing(false);
    }
  };

  const handleVerifyToggle = async (user) => {
    if (!confirm(`${user.isVerified ? "Unverify" : "Verify"} ${user.name}?`)) return;
    try {
      setProcessing(true);
      const res = await updateUserRole(user._id, { isVerified: !user.isVerified });
      setUsers((prev) => prev.map(u => u._id === user._id ? res.user : u));
    } catch (err) {
      console.error("handleVerifyToggle:", err);
      alert(err.response?.data?.message || "Failed to update verification");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (user) => {
    if (!confirm(`Delete user ${user.name}? This action cannot be undone.`)) return;
    try {
      setProcessing(true);
      await deleteUser(user._id);
      setUsers((prev) => prev.filter(u => u._id !== user._id));
    } catch (err) {
      console.error("handleDelete:", err);
      alert(err.response?.data?.message || "Failed to delete user");
    } finally {
      setProcessing(false);
    }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(q.toLowerCase()) ||
    u.email?.toLowerCase().includes(q.toLowerCase()) ||
    u.role?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-900">Manage Users</h1>
        <div className="w-80">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, email, role..."
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center p-8">Loading users...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-gray-500">No users found.</td></tr>
              )}

              {filtered.map((u) => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3">{u.isVerified ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        disabled={processing}
                        onClick={() => handleRoleToggle(u)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        {u.role === "recruiter" ? "Demote" : "Promote"}
                      </button>

                      <button
                        disabled={processing}
                        onClick={() => handleVerifyToggle(u)}
                        className={`px-3 py-1 rounded ${u.isVerified ? "bg-yellow-500 text-white" : "bg-blue-600 text-white"}`}
                      >
                        {u.isVerified ? "Unverify" : "Verify"}
                      </button>

                      <button
                        disabled={processing}
                        onClick={() => handleDelete(u)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
