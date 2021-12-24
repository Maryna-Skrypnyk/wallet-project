import { NavLink } from 'react-router-dom';
import Media from 'react-media';
import { HomeIcon } from '../IconBtn/HomeIcon';
import { StatisticsIcon } from '../IconBtn/StatisticsIcon';
import { CurrencyIcon } from '../IconBtn/CurrencyIcon';

import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink
              to="home"
              className={({ isActive }) => {
                return isActive ? styles.navLinkActive : styles.navLink;
              }}
            >
              <div className={styles.boxNav}>
                <HomeIcon svg={styles.svgNav} />
                <span className={styles.textNav}>Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="statistics"
              className={({ isActive }) => {
                return isActive ? styles.navLinkActive : styles.navLink;
              }}
            >
              <div className={styles.boxNav}>
                <StatisticsIcon svg={styles.svgNav} />
                <span className={styles.textNav}>Statistics</span>
              </div>
            </NavLink>
          </li>
          <Media
            queries={{
              mobileSize: '(max-width: 767px)',
              otherSize: '(min-width: 768px)',
            }}
          >
            {matches =>
              matches.mobileSize && (
                <li>
                  <NavLink
                    to="currency"
                    className={({ isActive }) => {
                      return isActive ? styles.navLinkActive : styles.navLink;
                    }}
                  >
                    <CurrencyIcon svg={styles.svgNav} />
                  </NavLink>
                </li>
              )
            }
          </Media>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
