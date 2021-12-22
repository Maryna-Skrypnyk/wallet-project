import React from 'react';
import PropTypes from 'prop-types';

import Container from '../Container';

import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.Layout}>
      <Container>{children}</Container>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
