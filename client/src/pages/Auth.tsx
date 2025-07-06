import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { TextField } from '../components/TextField';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { Button } from '../components/Button';
import { FileUploadInput } from '../components/FileUploadInput';
import { getInputValue } from '../utils/getInputValue';

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

export const Auth: FC<AuthProps> = ({ type }) => {
  const title = type === 'sign-up' ? 'Join Us Here' : 'Welcome Back';

  const [authData, setAuthData] = useState<AuthFormData>({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    file: null,
    terms: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    const newValue = getInputValue(e);

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

    const formData = new FormData();

    Object.entries(authData).forEach((field) => {
      if (field[0] === 'username' || field[0] === 'email' || field[0] === 'password') {
        formData.append(field[0], field[1]);
      }

      if (field[0] === 'file') {
        formData.append('image', field[1]);
      }
    });

    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <AnimationProvider keyValue={type}>
      <Container>
        <section className="py-[60px] md:py[100px] xl:py[120px]">
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

                <Button center size="lg" className="capitalize">
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
