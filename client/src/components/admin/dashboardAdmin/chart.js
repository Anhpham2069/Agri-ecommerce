import React,{useContext, useState,useEffect} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend } from 'recharts';
// import { BarChart, Bar, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {ArrowUpOutlined,ArrowDownOutlined} from "@ant-design/icons"
import { DashboardContext } from "./";
import { getAllOrder } from '../orders/FetchApi';
import {getAllUser} from "../users/fetchApi"
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
    const [users,setUsers] = useState([])
    const [day,setDay] = useState(7)
    const [dayuser,setDayUser] = useState(7)
    console.log(users)
 

    const todaya = new Date(); // Ngày hiện tại

    const userData = [];

    for (let i = 0; i < dayuser; i++) {
      const targetDate = new Date();
      targetDate.setDate(todaya.getDate() - i );

      const ordersForDate = users.Users && users.Users.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === targetDate.toDateString();
      });

      const numberOfOrders = ordersForDate?.length;


      userData.push({ date: targetDate.toISOString().split('T')[0], user: numberOfOrders });
    }
    console.log(userData)


    //tinh pham tram tang gaim user
    const previousrgtDate = new Date();
    previousrgtDate.setDate(todaya.getDate() - dayuser + 1); // Ngày 7 ngày trước
    

    const userForToday = users.Users?.filter((order) => {
      const orderDate = new Date(order.createdAt.split('T')[0]);
      console.log(orderDate)
      return orderDate >= previousrgtDate && orderDate <= todaya;
    });
    
    const userForPreviousPeriod = users.Users?.filter((order) => {
      const orderDate = new Date(order.createdAt.split('T')[0]);
    
      // Lấy ngày trước đó (1 ngày trước hoặc 7 ngày trước) từ ngày hiện tại
      const previousrgtDate = new Date();
      previousrgtDate.setDate(todaya.getDate() - (dayuser));
    
      // Lấy ngày kết thúc của khoảng thời gian trước đó
      const previousPeriodEndDate = new Date(previousrgtDate.getTime());
      previousPeriodEndDate.setDate(previousrgtDate.getDate()+1);
    
      return orderDate >= previousrgtDate && orderDate < previousPeriodEndDate;
    });
  
      console.log(userForToday)
    
    const numberOfUsersPreviousPeriod = userForPreviousPeriod?.length;
    const numberOfUsersToday = userForToday?.length;
    console.log(numberOfUsersPreviousPeriod)
    console.log(numberOfUsersToday)
    let percentageChangeUserrgt;
    if (numberOfUsersPreviousPeriod === 0) {
      percentageChangeUserrgt = numberOfUsersToday === 0 ? 0 : 100; // Xử lý trường hợp không có đơn hàng trước đó
    } else {
      percentageChangeUserrgt = ((numberOfUsersPreviousPeriod - numberOfUsersToday) / numberOfUsersPreviousPeriod) * 100;
    }


    
    // Lấy số đơn hàng cho ngày đó
  
    const handleChange = (value) => {
      // const { value } = event.target;
      // setDay(value);
      setDay(value);
    };
    const handleChangeUser = (value) => {
      // const { value } = event.target;
      // setDay(value);
      setDayUser(value);
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
  
    const fetchDataUser  = async ()=>{
      const response = await getAllUser()
      if(response){
        setUsers(response)
      }
      else{
        console.log("that baih ròi")
      }

    }
    useEffect(()=>{
      fetchData()
      fetchDataUser()
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
    previousDate.setDate(today.getDate() - day + 1); // Ngày 7 ngày trước
    

    const ordersForToday = orders.Orders?.filter((order) => {
      const orderDate = new Date(order.createdAt.split('T')[0]);
      console.log(orderDate)
      return orderDate >= previousDate && orderDate <= today;
    });
    
    const ordersForPreviousPeriod = orders.Orders?.filter((order) => {
      const orderDate = new Date(order.createdAt.split('T')[0]);
    
      // Lấy ngày trước đó (1 ngày trước hoặc 7 ngày trước) từ ngày hiện tại
      const previousDate = new Date();
      previousDate.setDate(today.getDate() - (day));
    
      // Lấy ngày kết thúc của khoảng thời gian trước đó
      const previousPeriodEndDate = new Date(previousDate.getTime());
      previousPeriodEndDate.setDate(previousDate.getDate()+1);
    
      return orderDate >= previousDate && orderDate < previousPeriodEndDate;
    });
  
      console.log(ordersForToday)
    
    const numberOfOrdersPreviousPeriod = ordersForPreviousPeriod?.length;
    const numberOfOrdersToday = ordersForToday?.length;
    console.log(numberOfOrdersPreviousPeriod)
    console.log(numberOfOrdersToday)
    let percentageChange;
    if (numberOfOrdersPreviousPeriod === 0) {
      percentageChange = numberOfOrdersToday === 0 ? 0 : 100; // Xử lý trường hợp không có đơn hàng trước đó
    } else {
      percentageChange = ((numberOfOrdersPreviousPeriod - numberOfOrdersToday) / numberOfOrdersPreviousPeriod) * 100;
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

    const totalSum = formattedData.reduce((sum, entry) => sum + entry.value, 0);

    // Tính toán phần trăm cho mỗi phần tử
    const dataWithPercentage = formattedData.map(entry => ({
      ...entry,
      percentage: (entry.value / totalSum) * 100,
    }));
    console.log(dataWithPercentage);

    return (
    <div className='chart-container'>
      <div className='mb-7'>
        <label className='title-chart-oder' htmlFor="timeRange">Thống kê theo thời gian &#160;</label>
      <Select
        defaultValue={dayuser}
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
            value: 4,
            label: '3 ngày trước',
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
            value: 60,
            label: '2 tháng',
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
          <div className='name-chart-oder m-8'>
              <span className='text-center font-bold '>Biểu đồ đơn hàng thông kê theo ngày ({day}) ngày</span>
          </div>
          <div>
            <LineChart width={700} height={400} data={orderData.reverse()}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" />
            </LineChart>
          </div>
            <div className='mb-8'>
              {numberOfOrdersToday<numberOfOrdersPreviousPeriod ? 
              <span className="text-red-500">  <span><ArrowDownOutlined /></span>Giảm {percentageChange.toLocaleString()}% so với {day} ngày qua</span>
              :
              <span className="text-green-500"><span><ArrowUpOutlined /></span>Tăng {Math.abs(percentageChange.toLocaleString())}% so với { day} ngày qua</span>
              }
            </div>
          </div>
          
          
  
    <div className='province-chart pb-8'>
        <div className='m-8'>
            <span className='font-bold'>Biểu đồ mua bán theo địa chỉ</span>
        </div>
        <div>
            <PieChart width={1000} height={300}>
              <Pie data={dataWithPercentage}  label={<CustomLabel/>}  dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" >
              {dataWithPercentage?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
                 {/* <LabelList dataKey="percentage" position="outside" /> */}
              </Pie>
              <Tooltip/>
              <Legend />
            </PieChart>
        </div>
    </div>

    <div className='chart-user'>
    <div className='mb-7'>
        <label className='title-chart-oder' htmlFor="timeRange">Thống kê theo thời gian &#160;</label>
      <Select
        defaultValue={day}
        style={{
          width: 120,
        }}
        onChange={handleChangeUser}
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
            value: 60,
            label: '2 tháng',
          },
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
      />
      </div>
      <div className='chart-user-container' >
          <div className='name-chart-oder m-8'>
              <span className='text-center font-bold'>Biểu đồ khách hàng đăng kí mới {dayuser} ngày qua</span>
          </div>
          <div>

            <LineChart width={700} height={400} data={userData.reverse()}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="user" stroke="#8884d8" />
            </LineChart>
          </div>

          <div className='mb-8'>
            {numberOfUsersToday<numberOfUsersPreviousPeriod ? 
            <span className="text-red-500"><span><ArrowDownOutlined /></span>Giảm {percentageChangeUserrgt.toLocaleString()}% so với {dayuser} ngày qua</span>
            :
            <span className="text-green-500"> <span><ArrowUpOutlined /></span>Tăng {percentageChangeUserrgt.toLocaleString()}% so với { dayuser} ngày qua</span>
            }
          </div>

          </div>
         
          </div>
          
  
    </div>
  )
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name,percentage, }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {name}: {value} : {percentage.toLocaleString()}%
    </text>
  );
};
export default Chart