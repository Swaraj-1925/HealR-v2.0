import { useState } from 'react';
import './../style/doc-signup.css';
import axios from 'axios';

function DocSignUp() {
    const [answersVisibility, setAnswersVisibility] = useState([false, false, false, false]);
    const toggleAnswer = (index) => {
        setAnswersVisibility(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const [yearOfExperience, setyearOfExperience] = useState("");
    const [proofExperience, setproofExperience] = useState("");
    const [profession, setprofession] = useState("");
    const [professionimg, setprofessionimg] = useState("");
    const [clinic, setclinic] = useState("");
    const [about, setabout] = useState("");

    const [selectedTimes, setSelectedTimes] = useState([]);
    const [imageSmall, setImageSmall] = useState(null);
    const [imageBig, setImageBig] = useState(null);

    const handleTimeChange = (event) => {
        const { checked, value } = event.target;

        // Update the selectedTimes array based on checkbox state
        setSelectedTimes(prevTimes => {
            const newTimes = [...prevTimes]; // Copy the previous state

            if (checked) {
                newTimes.push(value); // Add the checked value
            } else {
                const index = newTimes.indexOf(value); // Find the index of the unchecked value
                if (index > -1) {
                    newTimes.splice(index, 1); // Remove the unchecked value
                }
            }

            return newTimes;
        });
    };



    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleSubmit = async (event) => {
        if (password != cpassword) {
            alert("Password dont match")
            return
        }
        event.preventDefault();
        try {
            // Prepare data to send
            const postData = {
                name: name,
                email: email,
                age: age,
                gender: gender,
                password: password,

                yearOfExperience: yearOfExperience,
                proofExperience: proofExperience,
                profession: profession,
                proofProfession: professionimg,
                clinic: clinic,
                about: about,

                selectedTimes: selectedTimes,
                imageSmall: imageSmall,
                imageBig: imageBig,
            };

            // Send POST request using Axios
            const response = await axios.post('http://localhost:3000/doctor/signup', postData);

            // Handle response
            console.log('Response:', response.data);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <section className="py-8 bg-gray-50 sm:py-14 lg:py-22" id='docsignUp'>
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl" >
                                Sign Up in HealR
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
                                    <button type="button" onClick={() => toggleAnswer(index - 1)} className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                                        <span className="flex text-lg font-semibold text-black">
                                            {index === 1 && "Basic Information"}
                                            {index === 2 && "Professional Information"}
                                            {index === 3 && "Fees Information"}
                                            {index === 4 && "Working Times and images"}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`w-6 h-6 text-gray-400 ${answersVisibility[index - 1] ? 'transform rotate-0' : 'transform rotate-180'}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div style={{ display: answersVisibility[index - 1] ? 'block' : 'none' }} className="px-4 pb-5 sm:px-6 sm:pb-6">
                                        {index === 1 && (
                                            <div className='doc-signupInput-conatiner doc-signupInput-widhtreduce'>

                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className='doc-signupInput'
                                                    type="email"
                                                    id="username"
                                                    placeholder='Email'
                                                    required /><br />
                                                <input
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className='doc-signupInput'
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder='Name'
                                                    required />
                                                <br />
                                                <input
                                                    className='doc-signupInput'
                                                    type="number"
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                    placeholder="age"
                                                />
                                                <br />
                                                <div className=''>
                                                    <label>
                                                        <div>Gender</div>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="male"
                                                            checked={gender === 'male'}
                                                            onChange={handleGenderChange}
                                                        />
                                                        Male
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="female"
                                                            checked={gender === 'female'}
                                                            onChange={handleGenderChange}
                                                        />
                                                        Female
                                                    </label>
                                                </div>
                                                <br />
                                                <input
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className='doc-signupInput'
                                                    type="password"
                                                    id="password"
                                                    placeholder='Password'
                                                    required />
                                                <br />
                                                <input
                                                    value={cpassword}
                                                    onChange={(e) => setCpassword(e.target.value)}
                                                    className='doc-signupInput'
                                                    type="password"
                                                    id="cpassword"
                                                    placeholder='Confirm Password'
                                                    required />
                                                <br />
                                            </div>
                                        )}
                                        {index === 2 && (
                                            <div className='doc-signupInput-conatiner doc-signupInput-widhtreduce'>

                                                <input
                                                    value={yearOfExperience}
                                                    onChange={(e) => setyearOfExperience(e.target.value)}
                                                    className='doc-signupInput'
                                                    type="number"
                                                    id="experience"
                                                    name="yearOfExperience"
                                                    placeholder='Years of Experience'
                                                    required />
                                                <br />
                                                <label htmlFor="imgB">Proof of experience:</label>
                                                <input
                                                    value={proofExperience}
                                                    onChange={(e) => setproofExperience(e.target.value)}
                                                    type="file"
                                                    id="imge"
                                                    name="experience"
                                                    required />
                                                <br />
                                                <input
                                                    value={profession}
                                                    onChange={(e) => setprofession(e.target.value)}
                                                    className='doc-signupInput'
                                                    type="text" id="profession"
                                                    name="profession"
                                                    placeholder='Profession'
                                                    required />
                                                <br />
                                                <label htmlFor="imgB">Proof of profession:</label>
                                                <input
                                                    value={professionimg}
                                                    onChange={(e) => setprofessionimg(e.target.value)}
                                                    type="file"
                                                    id="imgp"
                                                    name="profession"
                                                    required />
                                                <br />
                                                <input
                                                    className='doc-signupInput'
                                                    value={clinic}
                                                    onChange={(e) => setclinic(e.target.value)}
                                                    type="text"
                                                    id="Clinic"
                                                    name="Clinic"
                                                    placeholder='Clinic Location'
                                                    required />
                                                <br />
                                                <label htmlFor="about">About You:</label>
                                                <textarea
                                                    value={about}
                                                    onChange={(e) => setabout(e.target.value)}
                                                    className='doc-signupInput'
                                                    id="about"
                                                    name="about"
                                                    required>
                                                </textarea>
                                                <br />

                                            </div>
                                        )}
                                        {index === 3 && (
                                            <div className='doc-signupInput-conatiner doc-signupInput-widhtreduce'>

                                                <input
                                                    className='doc-signupInput'
                                                    type="number"
                                                    id="callFee"
                                                    name="feesCall"
                                                    placeholder='Call'
                                                    required />
                                                <br />

                                                <input
                                                    className='doc-signupInput'
                                                    type="number"
                                                    id="videoCallFee"
                                                    name="feesVideoCall"
                                                    placeholder=' Video Call'
                                                    required />
                                                <br />

                                                <input
                                                    className='doc-signupInput'
                                                    type="number"
                                                    id="messageFee"
                                                    name="feesMessage"
                                                    placeholder='Message'
                                                    required />
                                                <br />

                                                <input
                                                    className='doc-signupInput'
                                                    type="number"
                                                    id="inRealLifeFee"
                                                    name="feesInRealLife"
                                                    placeholder='irl'
                                                    required />
                                                <br />
                                            </div>
                                        )}
                                        {index === 4 && (
                                            <div className='doc-signupInput-container'>
                                                <label htmlFor="availableTimes">Available Times:</label><br />
                                                <div className="grid-workingTime-CONTAINER ">
                                                    <div className="grid-workingTime ">
                                                        {[...Array(16)].map((_, index) => {
                                                            const time = index + 7;
                                                            const timeString = time < 12 ? `${time}AM` : time === 12 ? '12PM' : `${time - 12}PM`;
                                                            const value = `${time}am`;  // Consistent value format

                                                            return (
                                                                <div key={time}>
                                                                    <input
                                                                        className='doc-signupInput'
                                                                        type="checkbox"
                                                                        name="acceptedTime" // Optional name for form handling
                                                                        value={value}
                                                                        checked={selectedTimes.includes(value)} // Check if value exists in selectedTimes
                                                                        onChange={handleTimeChange}
                                                                    />
                                                                    <label htmlFor={value}>{timeString}</label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                <br />
                                                <label htmlFor="imgS">Image Small:</label>
                                                <input
                                                    type="file"
                                                    id="imgS"
                                                    name="imagesS"
                                                    value={imageSmall}
                                                    onChange={(e) => setImageSmall(e.target.value)}
                                                    required

                                                /><br />
                                                <label htmlFor="imgB">Image Big:</label>
                                                <input
                                                    type="file"
                                                    id="imgB"
                                                    name="imagesB"
                                                    value={imageBig}
                                                    onChange={(e) => setImageBig(e.target.value)}
                                                    required

                                                />
                                                <br />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
                <div className='docsignup-submitbutton-coantiner'>

                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default DocSignUp;
