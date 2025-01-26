import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux'; // Combine imports

// Import services and store
import { store } from './redux/store';
import { authService } from './services/authService';
import { loginSuccess, logout } from './redux/slices/authSlice';

// Import pages and components
import { 
  HomePage,
  AuthPage,
  Login,
  Register,
  DashboardPage,
  ProjectsPage,
  VisualizationPage,
  PrivateRoute
} from './ImportPage';

// Create a separate component for authentication initialization
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('user-token');
      
      if (token) {
        try {
          // Verify token and fetch user details
          const userDetails = await authService.getUserDetails(token);
          
          dispatch(loginSuccess({
            user: userDetails.user,
            token: token
          }));
        } catch (error) {
          // Token is invalid or expired
          dispatch(logout());
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication Routes */}
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/projects" 
          element={
            <PrivateRoute>
              <ProjectsPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/visualize" 
          element={
            <PrivateRoute>
              <VisualizationPage />
            </PrivateRoute>
          } 
        />

        {/* Authentication Redirect */}
        <Route 
          path="/login" 
          element={
            <Navigate 
              to={authService.getCurrentUser() ? '/dashboard' : '/auth/login'} 
              replace 
            />
          } 
        />

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <Navigate 
              to={authService.getCurrentUser() ? '/dashboard' : '/'} 
              replace 
            />
          } 
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;