import { useEffect, useState } from "react";
import { getAllPayments } from "../../redux/actions/payment";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { moneyFormatter } from "../../shared/GlobalFunction";

const PaymentList = () => {
  const dispatch = useDispatch();
  const { payments, isLoading } = useSelector((state: any) => {
    return state.payments;
  });
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
          {currentPayments.map((payment: any, index: number) => {
            let statusText = "";
            let statusClass = "";
            if (payment.status == 0) {
              statusText = "Canceled";
              statusClass = "table-danger";
            } else if (payment.status == 1) {
              statusText = "Deposit";
              statusClass = "table-primary";
            } else if (payment.status == 2) {
              statusText = "Success";
              statusClass = "table-success";
            }

            return (
              <tr className={statusClass}>
                <th scope="row">{payment.transactionId}</th>
                <td>{formatter.format(payment.amount)}</td>
                <td>{statusText}</td>
                <td>{payment.quantity}</td>
                <td>{formatter.format(payment.received)}</td>
                <td>{payment.user.name}</td>
                <td>{payment.tour.name}</td>
                <td className="d-flex gap-3 justify-content-center">
                  <button type="button" className="btn btn-success">
                    Paid
                  </button>
                  <button type="button" className="btn btn-danger">
                    Cancel
                  </button>
                </td>
              </tr>
              
            );
          })}
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
