import connectAuth from '../hocs/Auth';
import RegisterForm from '../components/RegisterForm';

export default connectAuth()(RegisterForm);
