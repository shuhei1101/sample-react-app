import toast from "react-hot-toast"

const key = 'flashMessage'

export const feedbackMessage = {
  out: () => {
    const message = sessionStorage.getItem(key);
    if (message) {
      toast(message);
      sessionStorage.removeItem(key);
    }
  },
  set: (message: string) => {
    sessionStorage.setItem(key, message);
  }
}
