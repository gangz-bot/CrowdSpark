import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StartCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
    story: '',
    fundingGoal: '',
    duration: '',
  });

  const [storyError, setStoryError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else if (name === 'story') {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount <= 250) {
        setFormData({ ...formData, story: value });
        setStoryError('');
      } else {
        setStoryError('Story cannot exceed 250 words.');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in first');

    const data = new FormData();
    for (let key in formData) {
      if (key !== 'image') {
        data.append(key, formData[key]);
      }
    }
    data.append('media', formData.image);

    try {
      await axios.post('https://crowdspark-backend.onrender.com/api/campaigns/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Campaign submitted! Please provide your bank details.');
      navigate('/bank-details');
    } catch (err) {
      console.error(err);
      alert('Error submitting campaign. Please check all fields and try again.');
    }
  };

  return (
    <div className="p-12 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Start a Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Campaign Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Short Description *</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Environment">Environment</option>
            <option value="Innovation">Innovation</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Upload Campaign Image *</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Tell your story (max 250 words)</label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            required
            rows="6"
            className="w-full border rounded px-3 py-2"
          />
          {storyError && <p className="text-red-500 text-sm">{storyError}</p>}
        </div>

        <div>
          <label className="block font-medium">Funding Goal (in ₹)*</label>
          <input
            type="number"
            name="fundingGoal"
            value={formData.fundingGoal}
            onChange={handleChange}
            required
            min="1"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Duration (in days)*</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-teal-700 text-white font-semibold px-6 py-2 rounded hover:bg-teal-800 transition"
        >
          Submit & Continue
        </button>
      </form>
    </div>
  );
};

export default StartCampaign;
