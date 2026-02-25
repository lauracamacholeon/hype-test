import styles from './Footer.module.scss';
import logo from '@/assets/sundevs.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="SunDevs Logo" className={styles.logo} />
      <h2 className={styles.text}>
        © {new Date().getFullYear()} SunDevs · Hype Board
      </h2>
    </footer>
  );
};

export default Footer;