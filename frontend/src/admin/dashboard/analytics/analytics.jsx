import "./analytics.css";
import react, { useEffect, useState } from "react";
import RevenueAnalytics from "./revenueanalytics";
import Orderanalytics from "./orderAnalytics";
import Button from "@mui/material/Button";
import {
  getAllUsers,
  getDeliveredOrders,
} from "../../../controllers/adminController";

function Analytics() {
  const [isRevenueAnalytics, setIsRevenueAnalytics] = useState(true);
  const [isOrderAnalytics, SetIsOrderAnalytics] = useState(false);
  const [revenueData, setRevenueData] = useState(null);
  const [noOfUsers, setNoOfUsers] = useState(null);
  const [totalRevenue, setTotlaRevenue] = useState(null);
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(null);

  const revenueClick = () => {
    setIsRevenueAnalytics(true);
    SetIsOrderAnalytics(false);
  };
  const orderClick = () => {
    setIsRevenueAnalytics(false);
    SetIsOrderAnalytics(true);
  };

  const calculateTotalRevenue = (orders) => {
    console.log(orders);
    let total = 0;
    for (let order in orders) {
      total = total + orders[order].totalPrice;
    }
    console.log(total);
    return total;
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data.sucess) {
        // console.log(data);

        setNoOfUsers(data.users.length);
      }
    });

    getDeliveredOrders().then((data) => {
      console.log(data);
      if (data.sucess) {
        setRevenueData(data.orders);
        setTotlaRevenue(calculateTotalRevenue(data.orders));
        setTotalDeliveredOrders(data.orders.length);
      }
    });
  }, []);

  return (
    <div>
      <div className="flex-div">
        <div className="flex-main-component">
          <div className="flex-heading">Your analytics</div>
          <div className="flex-main-box">
            {isRevenueAnalytics && (
              <RevenueAnalytics revenueData={revenueData} />
            )}
            {isOrderAnalytics && <Orderanalytics />}
            <h5>X-axis:Order Delivery Date</h5>
            <h5> Y-axis:Your Revenue</h5>
          </div>
        </div>
        <div className="flex-sidebar">
          <div>
            <Button
              sx={{
                width: "100%",
                height: "100%",
                background: "white",
                color: "black",
                fontSize: "small",
              }}
            >
              Users
              <br />
              {noOfUsers}
            </Button>
          </div>
          <div>
            <Button
              sx={{
                width: "100%",
                height: "100%",
                background: "white",
                color: "black",
                fontSize: "small",
              }}
              onClick={revenueClick}
            >
              Revenue
              <br />
              {totalRevenue}
            </Button>
          </div>
          <div>
            <Button
              sx={{
                width: "100%",
                height: "100%",
                background: "white",
                color: "black",
                fontSize: "small",
              }}
            >
              Orders
              <br />
              {totalDeliveredOrders}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
