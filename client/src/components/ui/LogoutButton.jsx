import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    console.log('Logging out...');
    dispatch(logout()); // Clear Redux state

    // Navigate after clearing state
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  return (
    <Button className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
