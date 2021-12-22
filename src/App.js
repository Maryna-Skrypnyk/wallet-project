import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from './redux/auth/auth-selectors';
import authOperations from './redux/auth/auth-operations';
import PrivateRoute from './routesHoc/PrivateRoute';
import PublicRoute from './routesHoc/PublicRoute';
// import GoogleAuth from './components/AuthForms/GoogleAuth';
import Spinner from './components/Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import './App.module.scss';

const RegistrationPage = lazy(() =>
  import(
    './pages/RegistrationPage' /* webpackChunkName: "registration-page" */
  ),
);
// const NotFoundPage = lazy(() =>
//   import('./pages/NotFoundPage' /* webpackChunkName: "not-found-page" */),
// );
const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "login-page" */),
);
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage' /* webpackChunkName: "dashboard-page" */),
);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.getLoading);
  // const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  // const isRegistered = useSelector(authSelectors.getIsRegistered);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    !isLoading && (
      <>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute restricted>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute restricted>
                  <RegistrationPage />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute restricted>
                  <LoginPage />
                </PublicRoute>
              }
            />

            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />

            <Route
              path="*"
              element={
                <PrivateRoute>
                  <Navigate to="/dashboard/home" />
                </PrivateRoute>
              }
            />

            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Suspense>
        <ToastContainer autoClose={3000} position="top-center" />
      </>
    )
  );
}

export default App;
