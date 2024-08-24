import { toast, type ToastOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning'

export const useNotify = (
  type: ToastType = 'default',
  message: string,
  otherOptions?: ToastOptions
) => {
  toast(message, {
    type,
    theme: 'auto',
    autoClose: 2000,
    transition: 'slide',
    dangerouslyHTMLString: true,
    ...otherOptions
  })
}
