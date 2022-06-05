import {
  FormContent,
  FormWrap,
  Container,
  Form,
  FormInput,
  FormLabel,
  FormButton,
  Icon,
  FormIcon,
  Error,
} from "../SignIn/SigninElements";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    validatePassword(e.target.value.trim());
    setPassword(e.target.value.trim());
  };

  const usernameHandler = (e) => {
    validateUsername(e.target.value.trim());
    setUsername(e.target.value.trim());
  };

  const validateUsername = (username) => {
    const isValidLength = /^.{5,20}$/;
    if (!isValidLength.test(username)) {
      setError("Username must be 5-20 Characters Long");
    } else {
      setError("");
    }
  };

  const validatePassword = (password) => {
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    const isValidLength = /^.{10,16}$/;
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    const isContainsNumber = /^(?=.*[0-9]).*$/;

    if (!isValidLength.test(password)) {
      setErrorPassword("Password must be 10-16 Characters Long");
    } else if (!isContainsUppercase.test(password)) {
      setErrorPassword("Password must contain at least one Uppercase Letter");
    } else if (!isContainsLowercase.test(password)) {
      setErrorPassword("Password must contain at least one Lowercase Letter");
    } else if (!isContainsNumber.test(password)) {
      setErrorPassword("Password must contain at least one Digit");
    } else if (!isContainsSymbol.test(password)) {
      setErrorPassword("Password must contain at least one Special Symbol");
    } else {
      setErrorPassword("");
    }
  };

  const signUp = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/signup/`,
      requestOptions
    );

    const data = await response.json();

    if (response.status === 200) {
      navigate("/signin");
    } else {
      let error = data["error"];
      setError(error);
    }
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Planytime</Icon>
          <FormContent>
            <Form action="#" onSubmit={signUp}>
              <FormIcon></FormIcon>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormInput
                name="username"
                type="text"
                required
                onChange={usernameHandler}
                value={username}
              />
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                name="email"
                type="email"
                required
                onChange={emailHandler}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                name="password"
                type="password"
                required
                onChange={passwordHandler}
                value={password}
              />
              <FormButton type="submit">Sign Up</FormButton>
              <Error>{error}</Error>
              <Error>{errorPassword}</Error>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignUp;
