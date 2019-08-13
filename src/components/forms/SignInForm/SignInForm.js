import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { Form, Icon, Input, Button, Typography } from 'antd';
const { Title, Text } = Typography;
import './SignInForm.css';
import {
  signInFields,
  signIn
} from '../../../store/actions';
import { selectors } from '../../../store/reducers/selectors';

class SignInForm extends React.Component {

  handleSubmit = e => {
    const { email, password, tryToSignIn } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        tryToSignIn({ email, password });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, loading, errorMessage } = this.props;
    // eslint-disable-next-line no-constant-condition
    if (false) {
      return <Redirect to="/" />;
    } else {
      return (
        <Form onSubmit={this.handleSubmit} className="sign-in-form" >
          <Title level={2}>Login</Title>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail! ',
                },
                {
                  required: true,
                  message: 'Please input your E-mail! ',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="email"
              />,
            )}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator('password', {
              rules: [
                { min:6, message: 'Enter minimum 6 symbols! ' },
                { required: true, message: 'Please input your Password! ' }
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>
          </Form.Item>
          {errorMessage && <Text type="danger">{errorMessage}</Text>}
        </Form>
      );
    }
  }
}

const CustomizedForm = Form.create({
  name: 'sign-in',
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
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
    };
  },
  onValuesChange(_, values) {
  }
})(SignInForm);

const mapStateToProps = (state, ownProps) => {
  const { email, password } = selectors.getSignInFields(state);
  const loading = selectors.getSignInLoading(state);
  const errorMessage = selectors.getSignInErrorMessage(state);
  return {
    email,
    password,
    loading,
    errorMessage,
  };
};

const mapDispatchToProps = {
  onChange: signInFields.update,
  tryToSignIn: signIn.request,
  resetErrorMessage: signIn.errorMessageReset
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CustomizedForm);

