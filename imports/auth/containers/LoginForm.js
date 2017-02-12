import connectAuth from '../hocs/Auth';
import LoginForm from '../components/LoginForm';

export default connectAuth()(LoginForm);
