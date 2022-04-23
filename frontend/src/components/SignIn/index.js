import {
  FormContent,
  FormWrap,
  Container,
  Form,
  FormH1,
  FormInput,
  FormLabel,
  Text,
  FormButton,
  Icon,
  FormIcon,
} from "./SigninElements";

import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    console.log(requestOptions);

    const api_url = await fetch(`http://127.0.0.1:8000/login`, requestOptions);
    const data = await api_url.json();
    console.log(data);
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Planytime</Icon>
          <FormContent>
            <Form action="#" onSubmit={signIn}>
              <FormIcon></FormIcon>
              <FormH1>Sign in your account</FormH1>
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput type="email" required onChange={emailHandler} />
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput type="password" required onChange={passwordHandler} />
              <FormButton type="submit">Continue</FormButton>
              <Text>Forgot password?</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
