import React,{useContext, useState,useEffect} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend } from 'recharts';
// import { BarChart, Bar, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { DashboardContext } from "./";
import { getAllOrder } from '../orders/FetchApi';
import { Select, Space } from 'antd';
import "./style.css"


const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const Chart = () => {
    const { data, dispatch } = useContext(DashboardContext);
    const [orders,setOrders] = useState([])
    const [day,setDay] = useState(7)
    console.log(orders.Orders)
 

    
    // Lấy số đơn hàng cho ngày đó
  
    const handleChange = (value) => {
      // const { value } = event.target;
      // setDay(value);
      setDay(value);
    };
  
    const fetchData  = async ()=>{
      const response = await getAllOrder()
      if(response){
        setOrders(response)
      }
      else{
        console.log("that baih ròi")
      }

    }
    useEffect(()=>{
      fetchData()
    },[])
 
    
    const today = new Date(); // Ngày hiện tại

    const orderData = [];

    for (let i = 0; i < day; i++) {
      const targetDate = new Date();
      targetDate.setDate(today.getDate() - i );

      const ordersForDate = orders.Orders && orders.Orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === targetDate.toDateString();
      });

      const numberOfOrders = ordersForDate?.length;


      orderData.push({ date: targetDate.toISOString().split('T')[0], orders: numberOfOrders });
    }



// tính phần trắm tăng giảm

    const previousDate = new Date();
    previousDate.setDate(today.getDate() - day+1); // Ngày 7 ngày trước
    

    const ordersForToday = orders.Orders?.filter((order) => {
      const orderDate = new Date(order.createdAt.split('T')[0]);
      return orderDate >= previousDate && orderDate <= today;
    });
    
    const ordersForPreviousPeriod = orders.Orders?.filter((order) => {
      const orderDate = new Date(order.createdAt.split('T')[0]);
    
      // Lấy ngày trước đó (1 ngày trước hoặc 7 ngày trước) từ ngày hiện tại
      const previousDate = new Date();
      previousDate.setDate(today.getDate() - (day));
    
      // Lấy ngày kết thúc của khoảng thời gian trước đó
      const previousPeriodEndDate = new Date(previousDate.getTime());
      previousPeriodEndDate.setDate(previousDate.getDate() + 1);
    
      return orderDate >= previousDate && orderDate < previousPeriodEndDate;
    });
  
    
    const numberOfOrdersPreviousPeriod = ordersForPreviousPeriod?.length;
    const numberOfOrdersToday = ordersForToday?.length;
    console.log(numberOfOrdersPreviousPeriod)
    console.log(numberOfOrdersToday)
    let percentageChange;
    if (numberOfOrdersPreviousPeriod === 0) {
      percentageChange = numberOfOrdersToday === 0 ? 0 : 100; // Xử lý trường hợp không có đơn hàng trước đó
    } else {
      percentageChange = ((numberOfOrdersToday - numberOfOrdersPreviousPeriod) / numberOfOrdersPreviousPeriod) * 100;
    }
    
    console.log(percentageChange);







    const dataProvince = {};

    const a =   orders.Orders?.forEach((order) => {
      const address = order.address; // Địa chỉ
      const province = address.split(',')[2]; // Tách và lấy tên tỉnh
    
      if (dataProvince.hasOwnProperty(province)) {
        // Nếu tỉnh đã tồn tại trong đối tượng data
        dataProvince[province] += 1; // Tăng số đơn hàng của tỉnh đó lên 1
      } else {
        // Nếu tỉnh chưa tồn tại trong đối tượng data
        dataProvince[province] = 1; // Khởi tạo số đơn hàng của tỉnh đó là 1
      }
    });
    
    const formattedData = Object.entries(dataProvince).map(([name, value]) => ({
      name,
      value,
    }));
    
    console.log(formattedData);

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };



    return (
    <div className='chart-container'>
      <div>
        <label className='title-chart-oder' htmlFor="timeRange">Thống kê theo thơi gian &#160;</label>
      {/* <select id="timeRange" value={day} onChange={handleChange}>
          <option value="2">ngày trước</option>
          <option value="7">7 ngày </option>
          <option value="30">1 tháng </option>
      </select> */}
      <Select
        defaultValue={day}
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: 2,
            label: '1 ngày trước',
          },
          {
            value: 7,
            label: '7 ngày',
          },
          {
            value: 30,
            label: '1 tháng',
          },
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
      />
      </div>
      <div className='chart-oder-container' >
          <div className='name-chart-oder'>
              <span className='text-center'>Biểu đồ đơn hàng {day} ngày qua</span>
          </div>
            <LineChart width={700} height={400} data={orderData.reverse()}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" />
            </LineChart>
          </div>
         
          <div>
          </div>
          
  
      <div>
        {numberOfOrdersToday<numberOfOrdersPreviousPeriod ? 
        <span className="text-red-500">Giảm {percentageChange}% so với {day} ngày qua</span>
        :
        <span className="text-green-500">Tăng{percentageChange}% so với { day} ngày qua</span>
        }
  </div>
    <div className='province-chart'>
        <div>
            <span>Biểu đồ mua bán theo tinh thành</span>
        </div>
      <div>
          <PieChart width={1000} height={200}>
            <Pie data={formattedData} label={<CustomLabel/>}  dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" >
            {formattedData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
            ))}
            </Pie>
            <Tooltip/>
            <Legend />
          </PieChart>
      </div>
    </div>
    </div>
  )
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {name}: {value}
    </text>
  );
};
export default Chart