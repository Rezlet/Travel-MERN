import axios from "axios";
import { AnyAction, Dispatch } from "redux";
import { server } from "../../server";

// create product
export const createPayment =
  (dataPayment: Object) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: "createPaymentRequest",
      });

      const config = {
        ...dataPayment,
      };

      console.log(config);

      const { data } = await axios.post(
        `${server}/payment/create-payment-deposit`,
        config
      );
      dispatch({
        type: "createPaymentSuccess",
        payload: data.payment,
      });
    } catch (error: any) {
      dispatch({
        type: "createPaymentFail",
        payload: error.response.data.message,
      });
    }
  };

// create product
export const getAllPayments = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: "getAllPaymentsRequest",
    });

    const { data } = await axios.get(`${server}/payment/get-all-payments`);
    console.log(data);
    dispatch({
      type: "getAllPaymentsSuccess",
      payload: data.payments,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllPaymentsFail",
      payload: error.response.data.message,
    });
  }
};
