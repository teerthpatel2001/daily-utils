import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithCustomToken, signInWithEmailAndPassword, signInWithEmailLink, updateProfile } from "firebase/auth";
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import database, { Auth } from "./database";
const encryptPassword = require("client-pass-protect");

interface User {
  userName?: string;
  userEmail: string;
  userPassword: string;
}

interface ServerUser {
    Name: string;
    Email: string;
    Password: string;
}

export const userSignup = async ({
  userName,
  userEmail,
  userPassword,
}: User) => {
  const result = await createUserWithEmailAndPassword(Auth, userEmail, userPassword).then(res => {
    Auth.currentUser && updateProfile(Auth.currentUser, {displayName: userName})
    Auth.currentUser && sendEmailVerification(Auth.currentUser).then(() => {
      alert("Verification Email Has Been Sent! Please Verify To Activate Your Account.")
    })
    return true;
  }).catch(err => {
    console.error(err);
    return false;
  })

  return result;
};

export const userLogin = async ({
  userEmail,
  userPassword,
}: User) => {
  const result = signInWithEmailAndPassword(Auth, userEmail, userPassword).then(res => {
    if(Auth.currentUser?.emailVerified)
    {
      localStorage.setItem("userId", res.user.uid)
      return true;
    }else{
      const resend = confirm("Please Verify Your Email To Continue, Haven't Received Verification Email? Press OK to Resend.");
      if(resend)
      {
        Auth.currentUser && sendEmailVerification(Auth.currentUser)
      }
      return false;
    }
  }).catch(err => {
    console.log(err);
    alert("Invalid Email/Password!")
    return false;
  })
  return result;
};

export const resetPassword = async(email: string) => {
  await sendPasswordResetEmail(Auth, email).then(() => {
    alert("Password Reset EMail will be sent if it matches in out Database!");
  }).catch(() => {
    alert("Password Reset EMail will be sent if it matches in out Database!");
  })
}
