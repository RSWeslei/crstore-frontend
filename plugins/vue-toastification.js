import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 8,
  newestOnTop: true,
  position: "bottom-left",
  timeout: 2524,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggablePercent: 0.5,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
});