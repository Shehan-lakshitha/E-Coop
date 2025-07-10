import "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log(token, orderId, success);
      const response = await axios.post(
        url + "/api/orders/verifyOrder",
        {
          orderId,
          success,
        },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Payment made successfully!");
        setTimeout(() => {
          navigate("/myorders");
        }, 2000);
      } else {
        toast.error("Payment verification failed.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Something went wrong during verification.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default Verify;
