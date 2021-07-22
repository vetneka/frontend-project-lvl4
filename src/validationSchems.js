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
  .oneOf([yup.ref('password')], 'Passwords must match');

export const loginSchema = yup.object({
  username,
  password: yup
    .string()
    .required('This is required field'),
});

export const signUpSchema = yup.object({
  username,
  password,
  passwordConfirmation,
});

export const blacklistSchemaBuilder = (fieldName, blacklist) => {
  console.log(blacklist);
  return yup.object({
    [fieldName]: yup.string().required('This is required field').notOneOf(blacklist, 'Channel name must be uniq'),
  });
};
