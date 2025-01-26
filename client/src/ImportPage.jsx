// Authentication Components
export { default as AuthPage } from './pages/AuthPage';
export { default as Login } from './components/auth/Login';
export { default as Register } from './components/auth/Register';

// Protected Routes Components
export { default as HomePage } from './pages/HomePage';
export { default as DashboardPage } from './pages/DashboardPage';
export { default as ProjectsPage } from './pages/ProjectsPage';
export { default as VisualizationPage } from './pages/VisualizationPage'
export { default as PrivateRoute } from './components/PrivateRoute';

// Redux Store and Utilities
export { store } from './redux/store';
export { default as setupAxiosInterceptors } from './utils/axiosInterceptor';
export { authService } from './services/authService';
