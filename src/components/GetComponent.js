import React from 'react'
import Button from './chartsComponents/Button'
import Input from './chartsComponents/InputField'
import BarChart from './chartsComponents/BarChart'
import LineChart from './chartsComponents/LineChart'
import PieChart from './chartsComponents/PieChart'

function GetComponent({item}) {
  
  const component ={
    button: <Button/>,
    input: <Input/>,
    BarChart: <BarChart/>,
    LineChart: <LineChart/>,
    PieChart: <PieChart/>
  }
  return (
    component[item.component] || <div> error</div>
  )
}

export default GetComponent
