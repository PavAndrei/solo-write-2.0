import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { TextField } from '../components/TextField';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { Button } from '../components/Button';
import { FileUploadInput } from '../components/FileUploadInput';
import { getInputValue, SKIP } from '../utils/getInputValue';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../api/apiAuth';

interface AuthProps {
  type: 'sign-in' | 'sign-up';
}

interface AuthFormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  file?: File | null;
  terms: boolean;
}

const initialAuthFormDataState = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  file: null,
  terms: false,
};

export const Auth: FC<AuthProps> = ({ type }) => {
  const title = type === 'sign-up' ? 'Join Us Here' : 'Welcome Back';

  const [authData, setAuthData] = useState<AuthFormData>(initialAuthFormDataState);

  useEffect(() => {
    setAuthData(initialAuthFormDataState);
  }, [type]);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    const newValue = getInputValue(e);

    if (newValue === SKIP) return;

    setAuthData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleFileRemove = () => {
    setAuthData((prev) => ({
      ...prev,
      file: null,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data;
    if (type === 'sign-up') {
      const signUpData = new FormData();
      Object.entries(authData).forEach(([key, value]) => {
        if (key === 'username' || key === 'email' || key === 'password') {
          signUpData.append(key, value);
        }
        if (key === 'file') {
          signUpData.append('image', value);
        }
      });
      data = await signUp(signUpData);
    }

    if (type === 'sign-in') {
      const signInData = {
        email: authData.email,
        password: authData.password,
      };
      data = await signIn(signInData);
    }

    if (data?.success) {
      navigate('/');
    }
  };

  return (
    <AnimationProvider keyValue={type}>
      <Container>
        <section className="py-[60px] md:py-[100px] xl:py[120px]">
          <div className="flex flex-col mx-auto max-w-[80%] md:max-w-[450px]">
            <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
              {title}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {type === 'sign-up' && (
                  <TextField
                    name="username"
                    value={authData.username}
                    handleChange={handleChange}
                    labelText="Username"
                    placeholder="John Doe"
                  />
                )}
                <TextField
                  name="email"
                  value={authData.email}
                  handleChange={handleChange}
                  labelText="Email"
                  placeholder="john.doe@gmail.com"
                />
                <TextField
                  name="password"
                  value={authData.password}
                  handleChange={handleChange}
                  labelText="Password"
                  placeholder="********"
                />
                {type === 'sign-up' && (
                  <TextField
                    name="repeatPassword"
                    value={authData.repeatPassword}
                    handleChange={handleChange}
                    labelText="Repeat Password"
                    placeholder="********"
                  />
                )}

                {type === 'sign-up' && (
                  <FileUploadInput
                    name="file"
                    handleChange={handleChange}
                    file={authData.file}
                    handleFileRemove={handleFileRemove}
                  />
                )}
                {type === 'sign-up' && (
                  <CustomCheckbox
                    name="terms"
                    isChecked={authData.terms}
                    handleChange={handleChange}
                    labelText="Do you agree with the terms?"
                  />
                )}

                <Button type="submit" center size="lg" className="capitalize">
                  {type.replace('-', ' ')}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </Container>
    </AnimationProvider>
  );
};
