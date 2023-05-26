import { useEffect, useState } from "react";
import {
  cancelPayment,
  getAllPayments,
  paidPayment,
} from "../../redux/actions/payment";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { moneyFormatter } from "../../shared/GlobalFunction";
import PaymentItem from "./PaymentItem";

const PaymentList = () => {
  const dispatch = useDispatch();
  const { payments, isLoading } = useSelector((state: any) => state.payments);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentPerPage] = useState(8);
  const lastPostIndex = currentPage * paymentsPerPage;
  const firstPostIndex = lastPostIndex - paymentsPerPage;

  const currentPayments = payments.slice(firstPostIndex, lastPostIndex);
  const formatter = moneyFormatter();
  let pages = [];

  const totalPage = Math.ceil(payments.length / paymentsPerPage);

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  useEffect(() => {
    dispatch(getAllPayments() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Transaction ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Quantity</th>
            <th scope="col">Received</th>
            <th scope="col">Buyer</th>
            <th scope="col">Tour</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {currentPayments.map((payment: any, index: number) => (
            <PaymentItem payment={payment}></PaymentItem>
          ))}
        </tbody>
      </table>
      <div>
        <ul className="pagination d-flex justify-content-center">
          <li className="page-item">
            <div
              className="cursor-pointer page-link"
              onClick={() => {
                if (currentPage != 1) {
                  return setCurrentPage(currentPage - 1);
                }
              }}
            >
              Previous
            </div>
          </li>
          {pages.map((page, index) => {
            return (
              <li className="page-item">
                <div
                  className="cursor-pointer page-link"
                  key={index}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </div>
              </li>
            );
          })}
          <li className="page-item">
            <div
              className="cursor-pointer page-link"
              onClick={() => {
                if (currentPage != totalPage) {
                  return setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentList;
