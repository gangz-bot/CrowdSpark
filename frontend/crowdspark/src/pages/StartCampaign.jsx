// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './loginSignup.css';

// const StartCampaign = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     image: null,
//     story: '',
//     fundingGoal: '',
//     duration: '',
//   });

//   const [storyError, setStoryError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === 'image') {
//       setFormData({ ...formData, image: files[0] });
//     } else if (name === 'story') {
//       const wordCount = value.trim().split(/\s+/).length;
//       if (wordCount <= 250) {
//         setFormData({ ...formData, story: value });
//         setStoryError('');
//       } else {
//         setStoryError('Story cannot exceed 250 words.');
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     if (!token) return alert('Please log in first');

//     const data = new FormData();
//     for (let key in formData) {
//       if (key !== 'image') {
//         data.append(key, formData[key]);
//       }
//     }
//     data.append('media', formData.image);

//     try {
//       await axios.post('http://localhost:5000/api/campaigns/create', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert('Campaign submitted! Please provide your bank details.');
//       navigate('/bank-details');
//     } catch (err) {
//       console.error(err);
//       alert('Error submitting campaign. Please check all fields and try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#004e64] to-[#00a6a6] py-10 px-4">
//       <div className="container bg-white rounded-[50px] px-8 py-10 w-full max-w-2xl">
//         <div className="header">
//           <div className="text">Start a Campaign</div>
//           <div className="underline"></div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6 mt-10">

//           {/* Title */}
//           <div>
//             <label className="block text-center font-medium mb-2">Campaign Title *</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-center font-medium mb-2">Short Description *</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-center font-medium mb-2">Category *</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2"
//             >
//               <option value="">Select Category</option>
//               <option value="Education">Education</option>
//               <option value="Health">Health</option>
//               <option value="Environment">Environment</option>
//               <option value="Innovation">Innovation</option>
//             </select>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-center font-medium mb-2">Upload Campaign Image *</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//           </div>

//           {/* Story */}
//           <div>
//             <label className="block text-center font-medium mb-2">
//               Tell your story (max 250 words)
//             </label>
//             <textarea
//               name="story"
//               value={formData.story}
//               onChange={handleChange}
//               required
//               rows="5"
//               className="w-full border rounded px-3 py-2"
//             />
//             {storyError && <p className="text-red-500 text-sm text-center">{storyError}</p>}
//           </div>

//           {/* Funding Goal */}
//           <div>
//             <label className="block text-center font-medium mb-2">Funding Goal (in ₹)*</label>
//             <input
//               type="number"
//               name="fundingGoal"
//               value={formData.fundingGoal}
//               onChange={handleChange}
//               required
//               min="1"
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           {/* Duration */}
//           <div>
//             <label className="block text-center font-medium mb-2">Duration (in days)*</label>
//             <input
//               type="number"
//               name="duration"
//               value={formData.duration}
//               onChange={handleChange}
//               required
//               min="1"
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           <div className="submit-container">
//             <button type="submit" className="submit">
//               Submit & Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StartCampaign;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginSignup.css';

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
  const [generating, setGenerating] = useState(false);
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

  const handleGenerateStory = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill in the Title, Description, and Category first.');
      return;
    }

    setGenerating(true);
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first');
      setGenerating(false);
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/campaigns/generate-story',
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({ ...formData, story: res.data.story });
      setStoryError('');
    } catch (err) {
      console.error(err);
      alert('Error generating story. Please try again.');
    } finally {
      setGenerating(false);
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
      await axios.post('http://localhost:5000/api/campaigns/create', data, {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#004e64] to-[#00a6a6] py-10 px-4">
      <div className="container bg-white rounded-[50px] px-8 py-10 w-full max-w-2xl">
        <div className="header">
          <div className="text">Start a Campaign</div>
          <div className="underline"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-10">

          {/* Title */}
          <div>
            <label className="block text-center font-medium mb-2">Campaign Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-center font-medium mb-2">Short Description *</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-center font-medium mb-2">Category *</label>
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

          {/* Image Upload */}
          <div>
            <label className="block text-center font-medium mb-2">Upload Campaign Image *</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          {/* Story */}
          <div>
            <label className="block text-center font-medium mb-2">
              Tell your story (max 250 words)
            </label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border rounded px-3 py-2"
            />
            {storyError && <p className="text-red-500 text-sm text-center">{storyError}</p>}
            <div className="text-center mt-2">
              <button
                type="button"
                onClick={handleGenerateStory}
                disabled={generating}
                className="text-sm bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
          </div>

          {/* Funding Goal */}
          <div>
            <label className="block text-center font-medium mb-2">Funding Goal (in ₹)*</label>
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

          {/* Duration */}
          <div>
            <label className="block text-center font-medium mb-2">Duration (in days)*</label>
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

          <div className="submit-container">
            <button type="submit" className="submit">
              Submit & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartCampaign;
