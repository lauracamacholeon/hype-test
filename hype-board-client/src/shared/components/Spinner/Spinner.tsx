import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <h1 className={styles.text}>Cargando videos...</h1>
    </div>
  );
};

export default Spinner;