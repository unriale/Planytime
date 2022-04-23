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

import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const SignIn = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Planytime</Icon>
          <FormContent>
            <Form action="#" onSubmit={loginUser}>
              <FormIcon></FormIcon>
              <FormH1>Sign in your account</FormH1>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormInput name="username" type="username" required />
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput name="password" type="password" required />
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
