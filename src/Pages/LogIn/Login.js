import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/login/login.png";
import { AuthContext } from "../../Context/Authprovider/Authprovider";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  const { logIn, signInGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  useTitle("Login");

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;

        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);

        // get jwt token
        fetch("https://dr-helal-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            localStorage.setItem("token", data.token);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleLogIn = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="hero my-32">
      <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" name="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input name="password" type="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a href="/" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </form>
          <button onClick={handleGoogleLogIn} className="btn btn-outline btn-warning mx-8">
            Log In With Google
          </button>
          <p className="text-center">
            New To Our Website Please{" "}
            <Link className="text-orange-600 font-bold" to="/register">
              Register Now
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
