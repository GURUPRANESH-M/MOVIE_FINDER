import { GoogleLogin } from "@react-oauth/google";

function Login() {

  const handleSuccess = async (credentialResponse) => {

    const token = credentialResponse.credential;

    const res = await fetch("http://localhost:8080/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token
      })
    });

    const data = await res.json();

    localStorage.setItem("jwt", data.jwt);

    alert("Login successful");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default Login;