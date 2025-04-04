import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { showError, showSuccess } from '../utils/toast';
import { login } from '../service/authService';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const [data, setData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await login(data);
      showSuccess(response.data.message || 'Login successful');
      setData({ email: '', password: '' });
      sessionStorage.setItem('token', response.data.data.token);
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showError(error.response?.data?.errors || 'Registration failed');
    }
    setData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={data.email}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    label="Password"
                    value={data.password}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {' '}
                      Remember me{' '}
                    </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="link-danger">
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
