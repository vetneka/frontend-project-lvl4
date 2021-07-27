import * as yup from 'yup';
import i18n from './i18n.js';

export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required(i18n.t('forms.validation.required')),
  password: yup
    .string()
    .required(i18n.t('forms.validation.required')),
});

export const signUpSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required(i18n.t('forms.validation.required'))
    .min(3, i18n.t('forms.username.validation.length'))
    .max(20, i18n.t('forms.username.validation.length')),
  password: yup
    .string()
    .required(i18n.t('forms.validation.required'))
    .min(6, i18n.t('forms.password.validation.length')),
  passwordConfirmation: yup
    .string()
    .required(i18n.t('forms.validation.required'))
    .oneOf([yup.ref('password')], i18n.t('forms.passwordConfirmation.validation.match')),
});

export const blacklistSchemaBuilder = (fieldName, blacklist) => yup.object({
  [fieldName]: yup
    .string()
    .trim()
    .required(i18n.t('forms.validation.required'))
    .notOneOf(blacklist, i18n.t('forms.renameChannel.validation.blacklist')),
});
