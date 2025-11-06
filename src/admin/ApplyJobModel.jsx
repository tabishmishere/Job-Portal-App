import { useState } from "react";
import axios from "axios";

const ApplyJobForm = ({ jobId, onClose }) => {
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cv) return alert("Please upload your CV");

    const formData = new FormData();
    formData.append("education", education);
    formData.append("experience", experience);
    formData.append("skills", skills);
    formData.append("message", message);
    formData.append("cv", cv);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(`http://localhost:5000/api/applications/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to apply");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-xl font-bold">Apply for Job</h2>
      <input type="text" placeholder="Education" value={education} onChange={e => setEducation(e.target.value)} required className="w-full border p-2 rounded"/>
      <input type="text" placeholder="Experience" value={experience} onChange={e => setExperience(e.target.value)} required className="w-full border p-2 rounded"/>
      <input type="text" placeholder="Skills (comma separated)" value={skills} onChange={e => setSkills(e.target.value)} className="w-full border p-2 rounded"/>
      <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} className="w-full border p-2 rounded"/>
      <input type="file" accept=".pdf,.doc,.docx" onChange={e => setCv(e.target.files[0])} required/>
      <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded">{loading ? "Applying..." : "Apply"}</button>
      <button type="button" onClick={onClose} className="ml-2 px-4 py-2 rounded border">Cancel</button>
    </form>
  );
};

export default ApplyJobForm;
