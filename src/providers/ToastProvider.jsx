import React from "react";
import { useToast } from "../hooks/use-toast";
import { ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "../components/ui/Toast/Toast";
import styles from "./ToastProvider.module.css";

export function ToastProvider({ children }) {
  const { toasts } = useToast();

  // Verificação de segurança
  if (!toasts || !Array.isArray(toasts)) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <ToastViewport className={styles.viewport}>
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            variant={toast.variant} 
            className={styles.toast}
          >
            <div className={styles.content}>
              {toast.title && <ToastTitle className={styles.title}>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription className={styles.description}>
                  {toast.description}
                </ToastDescription>
              )}
            </div>
            <ToastClose 
              className={styles.close}
              onClick={() => toast.dismiss?.()}
            />
          </Toast>
        ))}
      </ToastViewport>
    </>
  );
}

export default ToastProvider;