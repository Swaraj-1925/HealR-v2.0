import { useState } from 'react';
import axios from 'axios';

function Docverify() {
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Show file name
    const fileName = file ? file.name : '';
    setFileName(fileName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('profession', profession);
      formData.append('file', selectedFile); // Assuming selectedFile is the file selected by the user

      const response = await axios.post('http://localhost:3000/doctor/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        if(response.data.message==="Successfully"){
          alert("Request has been sent!! try to signup after few days to check if your verified ")
          window.location.reload();
        }
      console.log('Response from server:', response.data);
      // Handle success response from server

    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };


  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
        <div className=" opacity-60 inset-0 "></div>
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl ">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900 " >
              Get verified
            </h2>
            <p className="mt-2 text-sm text-gray-400">we will verify you then you will be able to do therapy</p>
          </div>
          <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Email</label>
              <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="email" placeholder="mail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Profession</label>
              <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Therapist, psychologist" value={profession} onChange={(e) => setProfession(e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      
                    </div>
                    <p className="pointer-none text-gray-500">
                      {fileName ? `Selected file: ${fileName}` : 'No file selected'}
                    </p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange}  required />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: doc,pdf,types of images</span>
            </p>
            <div>
              <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

export default Docverify;
