import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Eeror(a?: any) {
  return toast.error(a ? a : "خطا", {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export default Eeror;
