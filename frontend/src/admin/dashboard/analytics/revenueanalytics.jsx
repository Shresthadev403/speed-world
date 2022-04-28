import { useEffect, useState } from "react";
import moment from 'moment';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getDeliveredOrders } from "../../../controllers/adminController";

function RevenueAnalytics(props) {

  const [data, setData] = useState(null);
  const [xValues, setXValues] = useState([])

 


  const formatDate = (date) => {
    
          return moment(date, "YYYY-MM-DD HH:mm:ss").format("YY-MM-DD");
   

  }
  useEffect(() => {
   
  }, []);

  if (!props.revenueData) {
    return <div>loading graph</div>;
    // console.log(data);
  }
  return (
   
      <ResponsiveContainer width="90%" height="70%" maxHeight={400}>
      <LineChart
        width={500}
        height={300}
       
        data={props.revenueData}
      
        margin={{ top: 20, right: 30, left: 50, bottom: 0, }}>
          
      
        <Line type="monotone" dataKey="totalPrice" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis  dataKey="deliveredAt" axisLine={false} tickLine={false} tickFormatter={date => formatDate(new Date(date))}/>
        <YAxis />
        <Tooltip />
      </LineChart>
      </ResponsiveContainer>
   
  );
}

export default RevenueAnalytics;
