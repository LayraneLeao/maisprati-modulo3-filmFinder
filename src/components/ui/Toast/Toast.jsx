import React from "react";
import { X } from "lucide-react";
import { cn } from "../../../lib/utils";
import styles from "./Toast.module.css";

// Componentes manuais sem Radix UI
export const ToastViewport = ({ className, children, ...props }) => {
  return (
    <div className={cn(styles.viewport, className)} {...props}>
      {children}
    </div>
  );
};

export const Toast = ({ className, variant = "default", children, ...props }) => {
  return (
    <div className={cn(styles.toast, styles[variant], className)} {...props}>
      {children}
    </div>
  );
};

export const ToastTitle = ({ className, children, ...props }) => {
  return (
    <div className={cn(styles.title, className)} {...props}>
      {children}
    </div>
  );
};

export const ToastDescription = ({ className, children, ...props }) => {
  return (
    <div className={cn(styles.description, className)} {...props}>
      {children}
    </div>
  );
};

export const ToastClose = ({ className, onClick, ...props }) => {
  return (
    <button className={cn(styles.close, className)} onClick={onClick} {...props}>
      <X className={styles.closeIcon} />
    </button>
  );
};

export const ToastAction = ({ className, children, ...props }) => {
  return (
    <button className={cn(styles.action, className)} {...props}>
      {children}
    </button>
  );
};

// Provider simplificado
export const ToastProvider = ({ children }) => {
  return <>{children}</>;
};