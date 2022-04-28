import { useEffect, useState } from "react";
import { getStockInfo } from "../../../controllers/adminController";
import PieChart from "../piechart/piechart";




function Stock() {
      const[pieData,setPieData]=useState(null);


    useEffect(()=>{
      getStockInfo().then(data=>{
          console.log(data);
          console.log("kkkkk");
          let myVals = [];
          for (let key in data.stock) {
              console.log("do");
             const { name,stock} = data.stock[key];
             myVals.push([name,stock]);
          }
          setPieData(myVals);
         });
     

    },[])
    return ( <div style={{display:"flex",textAlign:"center",justifyContent:"center",width:"100%"}}>
<PieChart  pieData={pieData}/>
    </div> );
}

export default Stock;