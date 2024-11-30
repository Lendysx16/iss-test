import { type createApp } from 'vue';

const toastTimeout = 7000;

export const useToast = () => {
  const toast = {
    error: (message: string) => {
      window.dispatchEvent(
        new CustomEvent('toast', {
          detail: { duration: toastTimeout, message, type: 'error' },
        }),
      );
    },
    success: (message: string) => {
      window.dispatchEvent(
        new CustomEvent('toast', {
          detail: {
            duration: toastTimeout,
            message,
            type: 'success',
          },
        }),
      );
    },
  };

  return { error: toast.error, success: toast.success };
};

export const toastPlugin = {
  install: (app: ReturnType<typeof createApp>) => {
    app.config.globalProperties.$toast = useToast();
  },
};

declare module 'vue' {
  interface ComponentCustomProperties {
    $toast: ReturnType<typeof useToast>;
  }
}
