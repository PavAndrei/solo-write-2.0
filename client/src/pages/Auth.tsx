import { FC } from 'react';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { TextField } from '../components/TextField';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { Button } from '../components/Button';
import { FileUploadInput } from '../components/FileUploadInput';

interface AuthProps {
  type: 'sign-in' | 'sign-up';
}

export const Auth: FC<AuthProps> = ({ type }) => {
  const title = type === 'sign-up' ? 'Join Us Here' : 'Welcome Back';
  console.log(title);

  return (
    <AnimationProvider keyValue={type}>
      <Container>
        <section className="py-[60px] md:py[100px] xl:py[120px]">
          <div className="flex flex-col mx-auto max-w-[80%] md:max-w-[450px]">
            <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
              {title}
            </h1>
            <form>
              <div className="flex flex-col gap-4">
                {type === 'sign-up' && (
                  <TextField name="username" labelText="Username" placeholder="John Doe" />
                )}
                <TextField name="email" labelText="Email" placeholder="john.doe@gmail.com" />
                <TextField name="password" labelText="Password" placeholder="********" />
                {type === 'sign-up' && (
                  <TextField
                    name="repeatPassword"
                    labelText="Repeat Password"
                    placeholder="********"
                  />
                )}

                {type === 'sign-up' && <FileUploadInput />}
                {type === 'sign-up' && (
                  <CustomCheckbox name="terms" labelText="Do you agree with the terms?" />
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
