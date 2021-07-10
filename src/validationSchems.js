import * as yup from 'yup';

const username = yup
  .string()
  .trim()
  .required('This is required field');

const password = yup
  .string()
  .required('This is required field')
  .min(5, 'Must be at least 5 characters');

const passwordConfirmation = yup
  .string()
  .test('passwords-match', 'Passwords must match', function(value){
    return this.parent.password === value;
  })

export const loginSchema = yup.object({
  username,
  password: yup
    .string()
    .required('This is required field')
});

export const signUpSchema = yup.object({
  username,
  password,
  passwordConfirmation,
});
