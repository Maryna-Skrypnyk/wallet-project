import PropTypes from 'prop-types';

import styles from './BgPageContainer.module.scss';

const BgPageContainer = ({ children }) => {
  return (
    <section className={styles.AuthPage}>
      <div className={styles.container}>{children}</div>
    </section>
  );
};

BgPageContainer.propTypes = {
  children: PropTypes.node,
};

export default BgPageContainer;
