import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StartCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
    story: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, category, image, story } = formData;

    if (!title || !description || !category || !image || !story) {
      alert('Please fill out all required fields');
      return;
    }

    navigate('/bank-details');
  };

  return (
    <div className="p-12 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Start a Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Campaign Title *</label>
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
          <label className="block font-medium mb-1">Short Description *</label>
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
          <label className="block font-medium mb-1">Category *</label>
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
          <label className="block font-medium mb-1">Upload Campaign Image *</label>
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
          <label className="block font-medium mb-1">Tell your story (max 250 words) *</label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            rows="6"
            required
            className="w-full border rounded px-3 py-2"
          />
          {storyError && <p className="text-red-500 text-sm">{storyError}</p>}
        </div>

        <button
          type="submit"
          className="bg-teal-700 text-white font-semibold px-6 py-2 rounded hover:bg-teal-800 transition"
        >
          Submit Bank Details
        </button>
      </form>
    </div>
  );
};

export default StartCampaign;
