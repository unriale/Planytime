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

const SignIn = () => {
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Planytime</Icon>
          <FormContent>
            <Form action="#">
             <FormIcon></FormIcon>
              <FormH1>Sign in your account</FormH1>
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput type="email" required />
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput type="password" required />
              <FormButton type="submit">Continue</FormButton>
              <Text>Forgot password</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
