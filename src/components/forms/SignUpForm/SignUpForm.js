import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { Form, Icon, Input, Button, Typography } from 'antd';
const { Title, Text } = Typography;
import './signUpForm.css';
import {
  signUpFields,
  signUp
} from '../../../store/actions';
import { selectors } from '../../../store/reducers/selectors';

class SignUpForm extends React.PureComponent {

  handleSubmit = e => {
    const { email, password, firstName, lastName, tryToSignUp } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        tryToSignUp({ email, password, firstName, lastName });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent! ');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { form: { getFieldDecorator }, loading, errorMessage } = this.props;
    // eslint-disable-next-line no-constant-condition
    if (false) {
      return <Redirect to="/" />;
    } else {
      return (
        <Form onSubmit={this.handleSubmit} className="sign-up-form" >
          <Title level={2}>Register</Title>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enter your email"
              />,
            )}
          </Form.Item>
          <Form.Item label="First name">
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please input your first name!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enter your first name"
              />,
            )}
          </Form.Item>
          <Form.Item label="Last name">
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input your last name!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enter your last name "
              />,
            )}
          </Form.Item>
          <Form.Item label="Password" hasFeefbStoreack>
            {getFieldDecorator('password', {
              rules: [
                { min:6, message: 'Enter minimum 6 symbols ' },
                {
                  required: true,
                  message: 'Please input your password! ',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm password" hasFeefbStoreack>
            {getFieldDecorator('confirm', {
              rules: [
                { min:6, message: 'Enter minimum 6 symbols! ' },
                {
                  required: true,
                  message: 'Please confirm your password! ',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
              disabled={loading}
            >
              Register
            </Button>
          </Form.Item>
          {errorMessage && <Text type="danger">{errorMessage}</Text>}
        </Form >
      );
    }
  }
}

const CustomizedForm = Form.create({
  name: 'sign-up',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
    props.resetErrorMessage();
  },
  mapPropsToFields(props) {
    return {
      email: Form.createFormField({
        ...props.email,
        value: props.email.value,
      }),
      firstName: Form.createFormField({
        ...props.firstName,
        value: props.firstName.value,
      }),
      lastName: Form.createFormField({
        ...props.lastName,
        value: props.lastName.value,
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
      confirm: Form.createFormField({
        ...props.confirm,
        value: props.confirm.value,
      }),
    };
  },
  onValuesChange(_, values) {
  }
})(SignUpForm);

const mapStateToProps = (state, ownProps) => {
  const { email, password, confirm, firstName, lastName } = selectors.getSignUpFields(state);
  const loading = selectors.getSignUpLoading(state);
  const errorMessage = selectors.getSignUpErrorMessage(state);
  return {
    email,
    password,
    confirm,
    firstName,
    lastName,
    loading,
    errorMessage
  };
};

const mapDispatchToProps = {
  onChange: signUpFields.update,
  tryToSignUp: signUp.request,
  resetErrorMessage: signUp.errorMessageReset
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CustomizedForm);
