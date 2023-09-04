import axios from "axios";
const API_KEY = "AIzaSyBmHlQs7tK9LM5eYXFv9G85M4ZAFoaWU18";
const SignIn_MODE = "signInWithPassword";
const SignUp_MODE = "signUp";

export async function getWelcomeMsg(token) {
  const response = await axios.get(
    "https://reactcourse-2b772-default-rtdb.firebaseio.com/message.json?auth=" +
      token
  );

  return response;
}

export async function autheticate(mode, email, password) {
  console.log("email auth :" + email);
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  const token = response.data.idToken;
  //console.log("token ::" + token);
  return token;
}

export function createUser(email, password) {
  return autheticate(SignUp_MODE, email, password);
}

export function login(email, password) {
  return autheticate(SignIn_MODE, email, password);
}
