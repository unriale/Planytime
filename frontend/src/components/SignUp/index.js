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
} from "../SignIn/SigninElements";

import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
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
      `http://127.0.0.1:8000/signup/`,
      requestOptions
    );

    const data = await response.json();

    if(response.status === 200){

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
              <FormInput name="username" type="text" required onChange={usernameHandler} />
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput name="email" type="email" required onChange={emailHandler} />
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput name="password" type="password" required onChange={passwordHandler} />
              <FormButton type="submit">Sign Up</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignUp;
