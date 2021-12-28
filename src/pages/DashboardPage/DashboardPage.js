import React, { useState, Suspense, useEffect } from 'react';
import Media from 'react-media';
import {
  // useNavigate,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import transactionOperations from '../../redux/transactions/transaction-operations';
import authSelectors from '../../redux/auth/auth-selectors';
import transactionsSelectors from '../../redux/transactions/transaction-selectors';
import categorySelectors from '../../redux/categories/categories-selectors';
import categoriesOperations from '../../redux/categories/categories-operations';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import HomeTab from '../../components/HomeTab';
import Modal from '../../components/Modal';
import TransactionForm from '../../components/TransactionForm';
import ButtonIcon from '../../components/ButtonIcon';
import Currency from '../../components/Currency';
import Navigation from '../../components/Navigation';
import Balance from '../../components/Balance';
import DiagramTab from '../../components/DiagramTab';
import { AddPlus } from '../../components/IconBtn/AddPlus';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import { HiX } from 'react-icons/hi';
import useSizeScreen from '../../hooks/useSizeScreen';

import styles from './DashboardPage.module.scss';

export default function DashboardPage() {
  const sizeScreen = useSizeScreen();
  // const token = useSelector(authSelectors.getToken);
  const dispatch = useDispatch();
  // const location = useLocation();
  // const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showModal, setShowModal] = useState(false);
  // const goToHomePage = () => navigate('dashboard', { replace: true });
  // const goBack = () => navigate(-1);

  useEffect(() => {
    dispatch(categoriesOperations.getCategories());
    // dispatch(transactionOperations.getTransactions({ token }));
  }, [dispatch]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onOpenModal = e => {
    setShowModal(true);
  };

  const authLoading = useSelector(authSelectors.getLoading);
  const transactionsLoading = useSelector(transactionsSelectors.getLoading);
  const categoriesLoading = useSelector(categorySelectors.loading);
  const isLoading = authLoading || transactionsLoading || categoriesLoading;

  return (
    <>
      <Header />
      <Layout>
        <div className={styles.dashboard}>
          <div className={styles.wrapper}>
            <Suspense fallback={null}>
              <Media
                queries={{
                  mobileSize: '(max-width: 767px)',
                  otherSize: '(min-width: 768px)',
                }}
              >
                {matches =>
                  matches.otherSize ? (
                    <>
                      <Sidebar />
                      <div className={styles.containerPages}>
                        <Routes>
                          <Route index element={<HomeTab />} />
                          <Route path="home" element={<HomeTab />} />
                          <Route path="statistics" element={<DiagramTab />} />
                          <Route
                            path="currency"
                            element={<Navigate to="/dashboard/home" />}
                          />
                          <Route
                            path="*"
                            element={<Navigate to="/dashboard/home" />}
                          />
                        </Routes>
                      </div>
                      <aside className={styles.dashboardAside}></aside>
                    </>
                  ) : (
                    <>
                      <Navigation />

                      <Routes>
                        <Route
                          index
                          element={
                            <>
                              <Balance />
                              <HomeTab />
                            </>
                          }
                        />
                        <Route
                          path="home"
                          element={
                            <>
                              <Balance />
                              <HomeTab />
                            </>
                          }
                        />
                        <Route path="statistics" element={<DiagramTab />} />
                        <Route path="currency" element={<Currency />} />
                        <Route
                          path="*"
                          element={<Navigate to="/dashboard/home" />}
                        />
                      </Routes>
                    </>
                  )
                }
              </Media>
            </Suspense>

            {isLoading && (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}

            {(pathname === '/dashboard/home' || pathname === '/dashboard') && (
              <ButtonIcon
                onClick={onOpenModal}
                aria-label="Open modal"
                btnClass="ButtonIconAdd"
              >
                <AddPlus svg={styles.svgAddPlus} />
              </ButtonIcon>
            )}

            {showModal && (
              <Modal onClose={toggleModal}>
                <TransactionForm onClose={toggleModal} />

                {sizeScreen > 767 && (
                  <ButtonIcon
                    btnClass="ButtonIconClose"
                    onClick={toggleModal}
                    aria-label="Close modal"
                  >
                    <HiX />
                  </ButtonIcon>
                )}
              </Modal>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
