import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'components';

const InnerForm = props => {
  const { errors, touched } = props;

  return (
    <Form>
      <div>
        <div className="form-group">
          <Field
            type="email"
            className="form-control login-input"
            name="email"
            placeholder="Your email..."
          />
          { touched.email && errors.email && <p className="field-invalid">{ errors.email }</p> }
        </div>

        <div className="form-group">
          <Field
            type="password"
            className="form-control password-input"
            name="password"
            placeholder="Your password..."
          />
          { touched.password && errors.password && (
            <p className="field-invalid">{ errors.password }</p>
          ) }
        </div>
      </div>

      <Button text="Log in now" type="submit" />
    </Form>
  );
};

// Wrap our form with the using withFormik HoC
const LoginForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('This is not a valid email'),
  }),
  // Submission handler
  handleSubmit: (values, { props, setStatus }) => {
    console.log('handleSubmit handleSubmit handleSubmit');
    props.onLoginSubmit(values.email, values.password);
  }
})(InnerForm);

export default LoginForm;
