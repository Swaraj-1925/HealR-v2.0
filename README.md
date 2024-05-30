# HealR

## Project Status: Discontinued

HealR is a website for online therapy. Currently, it features three types of pages: admin, doctor, and patient. It is designed to work on a single domain, so you do not need to buy separate domains for each screen.

### Technologies Used:
- **MongoDB**: For storing user data.
- **Azure Blob Storage**: For storing data related to images and doctor documents used for doctor verification.
- **React and Material UI**: For the frontend.
- **Express**: For the backend.

## Key Features:
- **Authentication & Authorization**: Secure user authentication using JWT to protect user data.
- **Data Encryption**: Ensures all sensitive data is encrypted both at rest and in transit to maintain user privacy.

### Sample Website

[GitHub Link to Sample Website](https://github.com/Swaraj-1925/HealR/assets/121567727/7e47ec3b-b00f-47e6-831f-83bb86001941)

## Before Using This Project:
- Ensure you have an Azure account and a storage account with 2 containers. You can name them whatever you like.
  - Make both containers public, so they are accessible to all.
- MongoDB setup.

## Commands to Run the React App
```sh
npm run dev
```

## Commands to Run the Express App
```sh
npm start
```

## Notes:
- The website is not responsive and is not made for mobile devices. There is a version 2.0, but it is also discontinued.
