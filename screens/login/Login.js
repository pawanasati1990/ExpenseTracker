import { useContext, useState } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { login } from "../../utils/auth";
import { Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";

function Login({ navigation }) {
  const [isSubmitting, setIsSubmitted] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsSubmitted(true);
    try {
      const token = await login(email, password);
      // console.log("autheticate ::" + token);
      authCtx.autheticate(token);
    } catch (error) {
      console.log(error);
      setIsSubmitted(false);
      Alert.alert(
        "Authetication failed",
        "Could not log you in. Please check your credentiaals"
      );
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay message="Loading..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default Login;
