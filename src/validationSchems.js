import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('forms.validation.required'),
  password: yup
    .string()
    .required('forms.validation.required'),
});

export const signUpSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('forms.validation.required')
    .min(3, 'forms.username.validation.length')
    .max(20, 'forms.username.validation.length'),
  password: yup
    .string()
    .required('forms.validation.required')
    .min(6, 'forms.password.validation.length'),
  passwordConfirmation: yup
    .string()
    .required('forms.validation.required')
    .oneOf([yup.ref('password')], 'forms.passwordConfirmation.validation.match'),
});

export const blacklistSchemaBuilder = (fieldName, blacklist) => yup.object({
  [fieldName]: yup
    .string()
    .trim()
    .required('forms.validation.required')
    .notOneOf(blacklist, 'forms.channel.validation.blacklist'),
});
