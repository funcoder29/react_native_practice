import React from 'react';
import ExpensePieChart from './ExpensePieChart';

export default function MonthlyExpensePieChart({monthlyData}) {
 
  console.log("hii",JSON.stringify(monthlyData));
 
  return (
    <ExpensePieChart data={monthlyData} />
  );
}




