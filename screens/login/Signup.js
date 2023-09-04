import AuthContent from "../../components/Auth/AuthContent";

import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { createContext, useState } from "react";
import { createUser } from "../../utils/auth";
import { AuthContext } from "../../store/auth-context";

function Signup() {
  const [isSubmitting, setIsSubmitted] = useState(false);
  const authCtx = createContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsSubmitted(true);
    try {
      const token = await createUser(email, password);
      authCtx.autheticate(token);
    } catch (error) {
      Alert.alert("Could not sign up ", "Please check yout values");
    }
    setIsSubmitted(false);
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default Signup;
