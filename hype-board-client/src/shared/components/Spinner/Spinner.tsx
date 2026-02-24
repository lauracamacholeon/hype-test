import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <p className={styles.text}>Loading videos...</p>
    </div>
  );
};

export default Spinner;