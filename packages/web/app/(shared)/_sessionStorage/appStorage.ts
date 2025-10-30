import toast from "react-hot-toast";

export const appStorage = {
  // フィードバックメッセージ
  feedbackMessage: {
    /** メッセージを出力する */
    out: () => {
      const message = sessionStorage.getItem('feedbackMessage');
      if (message) {
        toast(message);
        sessionStorage.removeItem('feedbackMessage');
      }
    },
    /** メッセージをセットする */
    set: (message: string) => {
      sessionStorage.setItem('feedbackMessage', message);
    }
  },
  // 親画面
  parentScreen: {
    /** 親画面のURLを取得する */
    get: () => {
      return sessionStorage.getItem("parentScreen");
    },
    /** 親画面のURLをセットする */
    set: (url: string) => {
      sessionStorage.setItem("parentScreen", url);
    },
    /** 親画面のURLを破棄する */
    remove: () => {
      sessionStorage.removeItem("parentScreen");
    }
  },
}
