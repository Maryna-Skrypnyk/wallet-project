import Media from 'react-media';
import HomeTabDesktop from './HomeTabDesktop';
import HomeTabMobile from './HomeTabMobile';

export default function HomeTab() {
  return (
    <Media
      queries={{
        mobileSize: '(max-width: 767px)',
        otherSize: '(min-width: 768px)',
      }}
    >
      {matches => (matches.mobileSize ? <HomeTabMobile /> : <HomeTabDesktop />)}
    </Media>
  );
}
