import { FC, useEffect } from 'react';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { TextField } from '../components/TextField';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { Button } from '../components/Button';
import { FileUploadInput } from '../components/FileUploadInput';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, SignUpSchema } from '../utils/authSchemas';
import type { FormData, SignInData, SignUpData } from '../utils/authSchemas';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { FaSpinner } from 'react-icons/fa';
import { loginUser, registerUser } from '../redux/auth/slice';
import { addToast } from '../redux/toast/slice';
import { AnimatePresence } from 'framer-motion';
import { PageTitle } from '../components/PageTitle';

interface AuthProps {
  type: 'sign-in' | 'sign-up';
}

export const Auth: FC<AuthProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const title = type === 'sign-up' ? 'Join Us Now' : 'Welcome Back';
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(type === 'sign-up' ? SignUpSchema : SignInSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: true,
  });

  useEffect(() => {
    reset();
  }, [type, reset]);

  console.log(Object.keys(errors));

  const onSubmit = async (data: FormData) => {
    if (type === 'sign-up') {
      const signUpData = data as SignUpData;
      const formData = new FormData();

      formData.append('username', signUpData.username);
      formData.append('email', signUpData.email);
      formData.append('password', signUpData.password);
      if (signUpData.file?.[0]) {
        formData.append('image', signUpData.file[0]);
      }

      try {
        await dispatch(registerUser(formData)).unwrap();
        navigate('/profile');
      } catch (err) {
        dispatch(addToast({ color: 'error', text: err }));
        console.error('Registration failed:', err);
      }
    } else {
      try {
        await dispatch(
          loginUser({
            email: data.email,
            password: data.password,
          })
        ).unwrap();
        navigate('/profile');
      } catch (err) {
        dispatch(addToast({ color: 'error', text: err }));
        console.error('Login failed:', err);
      }
    }
  };

  const getError = (field: keyof SignUpData | keyof SignInData): string | undefined => {
    if (type === 'sign-up') {
      return (errors as FieldErrors<SignUpData>)[field as keyof SignUpData]?.message as
        | string
        | undefined;
    }
    return (errors as FieldErrors<SignInData>)[field as keyof SignInData]?.message as
      | string
      | undefined;
  };

  return (
    <AnimatePresence>
      <AnimationProvider keyValue={type}>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <div className="flex flex-col mx-auto max-w-[80%] md:max-w-[450px]">
              <PageTitle>{title}</PageTitle>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                {type === 'sign-up' && (
                  <TextField
                    labelText="Username"
                    placeholder="John Doe"
                    {...register('username')}
                    error={getError('username')}
                  />
                )}

                <TextField
                  labelText="Email"
                  placeholder="john.doe@gmail.com"
                  {...register('email')}
                  error={getError('email')}
                />

                <TextField
                  labelText="Password"
                  placeholder="********"
                  type="password"
                  {...register('password')}
                  error={getError('password')}
                />

                {type === 'sign-up' && (
                  <>
                    <TextField
                      labelText="Repeat Password"
                      placeholder="********"
                      type="password"
                      {...register('repeatPassword')}
                      error={getError('repeatPassword')}
                    />

                    <Controller
                      name="file"
                      control={control}
                      render={({ field }) => (
                        <FileUploadInput
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          error={getError('file')}
                          placehold="Avatar"
                          labelText="Choose your photo (optional)"
                        />
                      )}
                    />

                    <Controller
                      name="terms"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <CustomCheckbox
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          labelText="Do you agree with the terms?"
                          error={getError('terms')}
                        />
                      )}
                    />
                  </>
                )}

                <Button
                  disabled={isLoading || Object.keys(errors).length > 0}
                  type="submit"
                  center
                  size="lg"
                  className="capitalize"
                >
                  {isLoading ? <FaSpinner className="animate-spin" /> : type.replace('-', ' ')}
                </Button>

                {type === 'sign-up' ? (
                  <div className="dark:text-gray-300 text-center text-sm italic text-gray-500">
                    <p>Already have an account?</p>
                    <Link className="underline" to="/signin">
                      Sign In Here!
                    </Link>
                  </div>
                ) : (
                  <div className="dark:text-gray-300 text-center text-sm italic text-gray-500">
                    <p>Do not have an account?</p>
                    <Link className="underline" to="/signup">
                      Sign Up Here!
                    </Link>
                  </div>
                )}
              </form>
            </div>
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
