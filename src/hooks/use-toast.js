import { useState, useCallback } from "react";

const toastState = {
  toasts: [],
};

const listeners = [];

function dispatch(action) {
  switch (action.type) {
    case "ADD_TOAST":
      if (action.toast) {
        toastState.toasts = [...toastState.toasts, action.toast];
      }
      break;
    case "REMOVE_TOAST":
      if (action.id) {
        toastState.toasts = toastState.toasts.filter((t) => t.id !== action.id);
      }
      break;
    case "DISMISS_TOAST":
      if (action.id) {
        toastState.toasts = toastState.toasts.map((t) => 
          t.id === action.id ? { ...t, open: false } : t
        );
      }
      break;
    default:
      break;
  }

  listeners.forEach((listener) => listener(toastState));
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

export function toast(props) {
  const id = genId();

  const dismiss = () => dispatch({ type: "REMOVE_TOAST", id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
    },
  });

  // Auto dismiss after duration
  setTimeout(dismiss, props.duration || 3000);

  return {
    id,
    dismiss,
  };
}

export function useToast() {
  const [state, setState] = useState(toastState);

  const subscribe = useCallback((listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  // Subscribe to state changes
  useState(() => {
    const unsubscribe = subscribe(setState);
    return unsubscribe;
  });

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "REMOVE_TOAST", id: toastId }),
  };
}