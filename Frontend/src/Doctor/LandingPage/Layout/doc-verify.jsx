import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Docverify() {
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [selectedExperienceProof, setSelectedExperienceProof] = useState(null);
  const [selectedProfessionProof, setSelectedProfessionProof] = useState(null);
  // const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const handleExperienceProofChange = (e) => {
    const file = e.target.files[0];
    setSelectedExperienceProof(file);
  };

  const handleProfessionProofChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfessionProof(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('profession', profession);
      formData.append('yearOfExperience', yearOfExperience);
      formData.append('experienceProof', selectedExperienceProof);
      formData.append('professionProof', selectedProfessionProof);

      const response = await axios.post('http://localhost:3000/doctor/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message === "successfully") {
        alert("Request has been sent! You may try signing up as a doctor after a few days to check your verification status.");
        navigate('/doctor');
      }else if(response.data.message=="Request updated successfully") {
        alert("Request has been updated! You may try signing up as a doctor after a few days to check your verification status.");
        navigate('/doctor');
      }else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting verification request:", error);
      // Handle errors gracefully (e.g., display a generic error message)
      alert("An error occurred while submitting your request. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
      <div className=" opacity-60 inset-0 "></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl ">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            Get verified
          </h2>
          <p className="mt-2 text-sm text-gray-400">we will verify you then you will be able to do therapy</p>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Email</label>
            <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="email" placeholder="mail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Year of Experience</label>
            <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Years of experience" value={yearOfExperience} onChange={(e) => setYearOfExperience(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label htmlFor="experienceProof" className="text-sm font-bold text-gray-500 tracking-wide">Year of Experience Proof</label>
            <input id="experienceProof" type="file" onChange={handleExperienceProofChange} className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-400 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Profession</label>
            <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Therapist, psychologist" value={profession} onChange={(e) => setProfession(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label htmlFor="professionProof" className="text-sm font-bold text-gray-500 tracking-wide">Profession Proof</label>
            <input id="professionProof" type="file" onChange={handleProfessionProofChange} className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-400 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
          </div>
          <p className="text-sm text-gray-300">
            <span>File type: doc, pdf, types of images</span>
          </p>
          <div>
            <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Docverify;
