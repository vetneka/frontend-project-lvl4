import React from 'react';
import { useField } from 'formik';
import cn from 'classnames';

const TextInput = React.forwardRef(({ label, ...props}, ref) => {
  const [field, meta] = useField({ ...props});
  const isInvalidField = meta.touched && meta.error;

  const inputClassName = cn('form-control rounded-pill', {
    'is-valid': (meta.touched && !meta.error),
    'is-invalid': isInvalidField,
  });

  return (
    <>
      <label className="form-label ps-3" htmlFor={props.name}>{label}</label>
      <input ref={ref} className={inputClassName} id={props.name} {...field} {...props} />
      {
        (isInvalidField)
          ? <div className="invalid-tooltip small">{meta.error}</div>
          : null
      }
    </>
  );
});

export default TextInput;