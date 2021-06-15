import React, { useRef, useState } from "react";
import { Button, Card, Grid } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/components/Alert";
export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail, login } = useAuth();
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      const c = async () => {
        const a = await login(currentUser.email, oldPassword);
      };
      c();
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(e => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert title='Error' severity='error' message={error} />}
          <form onSubmit={handleSubmit}>
            <Grid id='email'>
              <p>Email</p>
              <input
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Grid>
            <Grid id='oldPassword'>
              <input
                type='password'
                onChange={e => {
                  setOldPassword(e.target.value);
                }}
                placeholder='Old Password'
              />
            </Grid>
            <Grid id='password' className='pt-4'>
              <p>Password</p>
              <input
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep the same'
              />
            </Grid>
            <Grid id='password-confirm'>
              <p>Password Confirmation</p>
              <input
                type='password'
                ref={passwordConfirmRef}
                placeholder='Leave blank to keep the same'
              />
            </Grid>
            <Button disabled={loading} className='w-100' type='submit'>
              Update
            </Button>
          </form>
        </Card>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  );
}

// const { currentUser, logout } = useAuth()

// <Button variant="link" onClick={handleLogout}>
// Log Out
// </Button>

// import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../contexts/AuthContext"
// import { Link, useHistory } from "react-router-dom"

// export default function Signup() {
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const passwordConfirmRef = useRef()
//   const { signup } = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const history = useHistory()

//   async function handleSubmit(e) {
//     e.preventDefault()

//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Passwords do not match")
//     }

//     try {
//       setError("")
//       setLoading(true)
//       await signup(emailRef.current.value, passwordRef.current.value)
//       history.push("/")
//     } catch {
//       setError("Failed to create an account")
//     }

//     setLoading(false)
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Sign Up</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Grid id="email">
//               <p>Email</p>
//               <input type="email" ref={emailRef} required />
//             </Grid>
//             <Grid id="password">
//               <p>Password</p>
//               <input type="password" ref={passwordRef} required />
//             </Grid>
//             <Grid id="password-confirm">
//               <p>Password Confirmation</p>
//               <input type="password" ref={passwordConfirmRef} required />
//             </Grid>
//             <Button disabled={loading} className="w-100" type="submit">
//               Sign Up
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         Already have an account? <Link to="/login">Log In</Link>
//       </div>
//     </>
//   )
// }
