import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .required('This is required field'),
  password: yup
    .string()
    .required('This is required field'),
});

export const signUpSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('This is required field')
    .min(3, 'Must be from 3 to 20')
    .max(20, 'Must be from 3 to 20'),
  password: yup
    .string()
    .required('This is required field')
    .min(6, 'Must be at least 6 characters'),
  passwordConfirmation: yup
    .string()
    .required('This is required field')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const blacklistSchemaBuilder = (fieldName, blacklist) => yup.object({
  [fieldName]: yup
    .string()
    .required('This is required field')
    .notOneOf(blacklist, 'Channel name must be uniq'),
});
