import { FC, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { TextField } from '../components/TextField';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { Button } from '../components/Button';
import { FileUploadInput } from '../components/FileUploadInput';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../api/apiAuth';

interface AuthProps {
  type: 'sign-in' | 'sign-up';
}

interface AuthFormInputs {
  username?: string;
  email: string;
  password: string;
  repeatPassword?: string;
  terms?: boolean;
  file?: FileList;
}

export const Auth: FC<AuthProps> = ({ type }) => {
  const title = type === 'sign-up' ? 'Join Us Here' : 'Welcome Back';
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const fileList = watch('file');

  useEffect(() => {
    reset();
  }, [type, reset]);

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    if (type === 'sign-up') {
      if (data.password !== data.repeatPassword) {
        alert('Passwords do not match');
        return;
      }
      if (!data.terms) {
        alert('You must agree to the terms');
        return;
      }

      const formData = new FormData();
      formData.append('username', data.username!);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (data.file?.[0]) {
        formData.append('image', data.file[0]);
      }

      const response = await signUp(formData);
      if (response.success) navigate('/');
    }

    if (type === 'sign-in') {
      const response = await signIn({
        email: data.email,
        password: data.password,
      });
      if (response.success) navigate('/');
    }
  };

  const handleFileRemove = () => {
    setValue('file', undefined); // сбросить файл
  };

  return (
    <AnimationProvider keyValue={type}>
      <Container>
        <section className="py-[60px] md:py-[100px] xl:py-[120px]">
          <div className="flex flex-col mx-auto max-w-[80%] md:max-w-[450px]">
            <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
              {title}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                {type === 'sign-up' && (
                  <TextField
                    labelText="Username"
                    placeholder="John Doe"
                    {...register('username', { required: 'Username is required' })}
                    error={errors.username?.message}
                  />
                )}

                <TextField
                  labelText="Email"
                  placeholder="john.doe@gmail.com"
                  {...register('email', { required: 'Email is required' })}
                  error={errors.email?.message}
                />

                <TextField
                  labelText="Password"
                  placeholder="********"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  error={errors.password?.message}
                />

                {type === 'sign-up' && (
                  <TextField
                    labelText="Repeat Password"
                    placeholder="********"
                    type="password"
                    {...register('repeatPassword', {
                      required: 'Repeat your password',
                    })}
                    error={errors.repeatPassword?.message}
                  />
                )}

                {type === 'sign-up' && (
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <FileUploadInput
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        removeFunction={handleFileRemove}
                      />
                    )}
                  />
                )}

                {type === 'sign-up' && (
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
                      />
                    )}
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
