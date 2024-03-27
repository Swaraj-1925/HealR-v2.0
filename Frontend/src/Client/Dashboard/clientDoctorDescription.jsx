import patient from './style/images/patient.png';
import experience from './style/images/experience.png';
import review from './style/images/review.png';
import temp from './style/images/image.png';
import './style/clientDoctorDescription.css';


function DoctorDescription() {

    return (
        <>
            <div className="clientDoctorDescription-wrapper">

                <div className="doctordescription-gridContainer">
                    <div className='doctordescription-gridContaineritem-main1'>
                        <div className="doctorDescription-gridItem doctorDescription-gridContainer2">

                            <div className="doctorDescription-gridContainer2-item doctorDescription-img">
                                <img src={temp} alt="" />
                            </div>
                            <div className="doctorDescription-gridContainer2-item doctorDescription-name-Proffecsion-flex">
                                <div className="doctorDescription-name-Proffecsion-flexcontainer">
                                    <h2>dr.acjnac ajcnjanc</h2>
                                    <h3>svsdvdvdmvdkvmvkdmdkdkd</h3>
                                </div>
                                <div className="doctorDescription-name-Proffecsion">
                                    <button type="button">Book</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='doctordescription-gridContaineritem-main2'>

                        <div className="doctorDescription-gridItem doctorDescription-gridContainer3">

                            <div className="doctorDescription-numberOfPatients doctorDescription-flexcontainer">
                                <img src={patient} alt="number of patient attended" />
                                Patients
                            </div>

                            <div className="doctorDescription-yearOfExperience doctorDescription-flexcontainer">
                                <img src={experience} alt="" />
                                Years expert
                            </div>
                            <div className="doctorDescription-rating doctorDescription-flexcontainer">
                                <svg
                                    width="100"
                                    height="100"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.9628 6.20682L11.4997 5.55819L9.5046 1.51346C9.45011 1.40272 9.36046 1.31307 9.24972 1.25858C8.97198 1.12147 8.63448 1.23572 8.49562 1.51346L6.5005 5.55819L2.03741 6.20682C1.91437 6.2244 1.80187 6.2824 1.71573 6.37029C1.6116 6.47732 1.55422 6.62131 1.5562 6.77062C1.55818 6.91993 1.61935 7.06235 1.72628 7.16658L4.95538 10.3148L4.19249 14.7603C4.1746 14.8637 4.18605 14.9701 4.22552 15.0673C4.265 15.1646 4.33094 15.2488 4.41585 15.3105C4.50077 15.3722 4.60127 15.4088 4.70595 15.4163C4.81063 15.4237 4.91531 15.4017 5.00812 15.3527L9.00011 13.2539L12.9921 15.3527C13.1011 15.4107 13.2276 15.4301 13.3489 15.409C13.6548 15.3562 13.8605 15.0662 13.8077 14.7603L13.0448 10.3148L16.2739 7.16658C16.3618 7.08045 16.4198 6.96795 16.4374 6.8449C16.4849 6.53729 16.2704 6.25252 15.9628 6.20682Z"
                                        fill="#FFD33C"
                                    />
                                </svg>
                                Rating
                            </div>
                            <div className="doctorDescription-Reviews doctorDescription-flexcontainer">
                                <img src={review} alt="number of reviews got" />
                                Reviews
                            </div>

                        </div>

                        <div className="doctorDescription-gridItem doctorDescription-About-flex">
                            <h2>About</h2>
                            <p>vsnjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssddssssssssssssssss jjjjjjjjjjjjjjjjjjjjjjjjjjjfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn jjjjjjjjjjjjjjjjjjjjjjjjjjjfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnx</p>
                        </div>

                        <div className="doctorDescription-gridItem doctorDescription-RatingsAndReviews">
                            <h2>Ratings & Reviews</h2>
                            
                            <div className='doctorDescription-RatingsAndReviews-gridWrapper'>
                                <div className="doctorDescription-RatingsAndReviews-gridContainer">
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-star">
                                        <svg
                                            width="100"
                                            height="100"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.9628 6.20682L11.4997 5.55819L9.5046 1.51346C9.45011 1.40272 9.36046 1.31307 9.24972 1.25858C8.97198 1.12147 8.63448 1.23572 8.49562 1.51346L6.5005 5.55819L2.03741 6.20682C1.91437 6.2244 1.80187 6.2824 1.71573 6.37029C1.6116 6.47732 1.55422 6.62131 1.5562 6.77062C1.55818 6.91993 1.61935 7.06235 1.72628 7.16658L4.95538 10.3148L4.19249 14.7603C4.1746 14.8637 4.18605 14.9701 4.22552 15.0673C4.265 15.1646 4.33094 15.2488 4.41585 15.3105C4.50077 15.3722 4.60127 15.4088 4.70595 15.4163C4.81063 15.4237 4.91531 15.4017 5.00812 15.3527L9.00011 13.2539L12.9921 15.3527C13.1011 15.4107 13.2276 15.4301 13.3489 15.409C13.6548 15.3562 13.8605 15.0662 13.8077 14.7603L13.0448 10.3148L16.2739 7.16658C16.3618 7.08045 16.4198 6.96795 16.4374 6.8449C16.4849 6.53729 16.2704 6.25252 15.9628 6.20682Z"
                                                fill="#FFD33C"
                                            />
                                        </svg>
                                        4
                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">
                                        aacc
                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">

                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-description">
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                    </div>
                                </div>
                                <div className="doctorDescription-RatingsAndReviews-gridContainer">
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-star">
                                        <svg
                                            width="100"
                                            height="100"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.9628 6.20682L11.4997 5.55819L9.5046 1.51346C9.45011 1.40272 9.36046 1.31307 9.24972 1.25858C8.97198 1.12147 8.63448 1.23572 8.49562 1.51346L6.5005 5.55819L2.03741 6.20682C1.91437 6.2244 1.80187 6.2824 1.71573 6.37029C1.6116 6.47732 1.55422 6.62131 1.5562 6.77062C1.55818 6.91993 1.61935 7.06235 1.72628 7.16658L4.95538 10.3148L4.19249 14.7603C4.1746 14.8637 4.18605 14.9701 4.22552 15.0673C4.265 15.1646 4.33094 15.2488 4.41585 15.3105C4.50077 15.3722 4.60127 15.4088 4.70595 15.4163C4.81063 15.4237 4.91531 15.4017 5.00812 15.3527L9.00011 13.2539L12.9921 15.3527C13.1011 15.4107 13.2276 15.4301 13.3489 15.409C13.6548 15.3562 13.8605 15.0662 13.8077 14.7603L13.0448 10.3148L16.2739 7.16658C16.3618 7.08045 16.4198 6.96795 16.4374 6.8449C16.4849 6.53729 16.2704 6.25252 15.9628 6.20682Z"
                                                fill="#FFD33C"
                                            />
                                        </svg>
                                        4
                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">
                                        aacc
                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">

                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-description">
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                    </div>
                                </div>
                                <div className="doctorDescription-RatingsAndReviews-gridContainer">
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-star">
                                        <svg
                                            width="100"
                                            height="100"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.9628 6.20682L11.4997 5.55819L9.5046 1.51346C9.45011 1.40272 9.36046 1.31307 9.24972 1.25858C8.97198 1.12147 8.63448 1.23572 8.49562 1.51346L6.5005 5.55819L2.03741 6.20682C1.91437 6.2244 1.80187 6.2824 1.71573 6.37029C1.6116 6.47732 1.55422 6.62131 1.5562 6.77062C1.55818 6.91993 1.61935 7.06235 1.72628 7.16658L4.95538 10.3148L4.19249 14.7603C4.1746 14.8637 4.18605 14.9701 4.22552 15.0673C4.265 15.1646 4.33094 15.2488 4.41585 15.3105C4.50077 15.3722 4.60127 15.4088 4.70595 15.4163C4.81063 15.4237 4.91531 15.4017 5.00812 15.3527L9.00011 13.2539L12.9921 15.3527C13.1011 15.4107 13.2276 15.4301 13.3489 15.409C13.6548 15.3562 13.8605 15.0662 13.8077 14.7603L13.0448 10.3148L16.2739 7.16658C16.3618 7.08045 16.4198 6.96795 16.4374 6.8449C16.4849 6.53729 16.2704 6.25252 15.9628 6.20682Z"
                                                fill="#FFD33C"
                                            />
                                        </svg>
                                        4
                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">
                                        aacc
                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">

                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-description">
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                    </div>
                                </div>
                                <div className="doctorDescription-RatingsAndReviews-gridContainer">
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-star">
                                        <svg
                                            width="100"
                                            height="100"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.9628 6.20682L11.4997 5.55819L9.5046 1.51346C9.45011 1.40272 9.36046 1.31307 9.24972 1.25858C8.97198 1.12147 8.63448 1.23572 8.49562 1.51346L6.5005 5.55819L2.03741 6.20682C1.91437 6.2244 1.80187 6.2824 1.71573 6.37029C1.6116 6.47732 1.55422 6.62131 1.5562 6.77062C1.55818 6.91993 1.61935 7.06235 1.72628 7.16658L4.95538 10.3148L4.19249 14.7603C4.1746 14.8637 4.18605 14.9701 4.22552 15.0673C4.265 15.1646 4.33094 15.2488 4.41585 15.3105C4.50077 15.3722 4.60127 15.4088 4.70595 15.4163C4.81063 15.4237 4.91531 15.4017 5.00812 15.3527L9.00011 13.2539L12.9921 15.3527C13.1011 15.4107 13.2276 15.4301 13.3489 15.409C13.6548 15.3562 13.8605 15.0662 13.8077 14.7603L13.0448 10.3148L16.2739 7.16658C16.3618 7.08045 16.4198 6.96795 16.4374 6.8449C16.4849 6.53729 16.2704 6.25252 15.9628 6.20682Z"
                                                fill="#FFD33C"
                                            />
                                        </svg>
                                        4
                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">
                                        aacc
                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">

                                    </div>
                                    <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-description">
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                       adcd
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorDescription;