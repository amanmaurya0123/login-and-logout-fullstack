// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utils";

// function Signup() {
//   const [signupInfo, setSignupInfo] = useState({
//     name: "",
//     email: "",
//       password: "",
//     dob: "",
//   });

//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     const copySignupInfo = { ...signupInfo };
//     copySignupInfo[name] = value;
//     setSignupInfo(copySignupInfo);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = signupInfo;
//     if (!name || !email || !password) {
//       return handleError("name, email and password are required");
//     }
//     try {
//       const url = `http://localhost:8080/auth/signup`;
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(signupInfo),
//       });
//       const result = await response.json();
//       const { success, message, error } = result;
//       if (success) {
//         handleSuccess(message);
//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);
//       } else if (error) {
//         const details = error?.details[0].message;
//         handleError(details);
//       } else if (!success) {
//         handleError(message);
//       }
//       console.log(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };
//   return (
//     <div className="container">
//       <h1>Signup</h1>
//       <form onSubmit={handleSignup}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             onChange={handleChange}
//             type="text"
//             name="name"
//             autoFocus
//             placeholder="Enter your name..."
//             value={signupInfo.name}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             onChange={handleChange}
//             type="email"
//             name="email"
//             placeholder="Enter your email..."
//             value={signupInfo.email}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             onChange={handleChange}
//             type="password"
//             name="password"
//             placeholder="Enter your password..."
//             value={signupInfo.password}
//           />
//         </div>
//         <button type="submit">Signup</button>
//         <span>
//           Already have an account ?<Link to="/login">Login</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    time: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, time } = signupInfo;

    if (!name || !email || !password || !time) {
      return handleError("All fields are required, including date of birth.");
    }

    // Convert `time` to UTC format
    const utcTime = new Date(time).toISOString();

    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...signupInfo, time: utcTime }), // Send UTC time
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };


  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupInfo.password}
          />
        </div>
        <div>
          <label htmlFor="time">Date of Birth</label>
          <input
            onChange={handleChange}
            type="date"
            name="time"
            placeholder="Select your date of birth..."
            value={signupInfo.time}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
