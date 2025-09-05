import { useToast } from "../../hooks/use-toast";
import styles from './Toaster.module.css';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className={styles.toastProvider}>
      {toasts.map(({ id, title, description, ...props }) => (
        <div key={id} className={`${styles.toast} ${props.variant ? styles[props.variant] : ''}`}>
          <div className={styles.toastContent}>
            {title && <div className={styles.toastTitle}>{title}</div>}
            {description && <div className={styles.toastDescription}>{description}</div>}
          </div>
          <button className={styles.toastClose}>×</button>
        </div>
      ))}
      <div className={styles.toastViewport} />
    </div>
  );
}