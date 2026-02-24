import styles from './ErrorMessage.module.scss';
import type { ErrorMessageProps } from '@/shared/types';


const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>⚠️</span>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ErrorMessage;