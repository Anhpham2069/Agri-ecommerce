import React,{useContext} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { DashboardContext } from "./";


const datates = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

const Chart = () => {
    const { data, dispatch } = useContext(DashboardContext);
    console.log(data)
  return (
    <div>
        <LineChart width={600} height={300} data={datates}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    </div>
  )
}

export default Chart