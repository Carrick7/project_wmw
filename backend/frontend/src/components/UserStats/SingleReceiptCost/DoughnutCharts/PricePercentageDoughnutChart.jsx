import { useState, useEffect} from 'react';
//react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
//helpers 
import {backgroundColourArray, borderColourArray} from '../../../../helpers/helpers';
//redux/slice
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const PricePercentageDoughnutChart = ({roundedPercentage, finalCost, costNumberArray, productNameArray }) => {

  //get the state for the counter ***Redux was used to solve the infinite loop to dynamically show the addition/deletion of items for the list**
  const count = useSelector((state) => state.counter.value);

  //useState for the chart data
  const [nameArray, setNameArray] = useState();
  const [percentageArray, setPercentageArray] = useState();

  //update the chart data
  useEffect(() => {
    setNameArray(productNameArray);
    setPercentageArray(roundedPercentage);   
  }, [ finalCost, count, roundedPercentage, costNumberArray, productNameArray]);

  const data = {
  labels: nameArray,
  datasets: [
    {
      label: '% of Total Cost',
      data: percentageArray,
      backgroundColor: [...backgroundColourArray],
      borderColor: [...borderColourArray],
      borderWidth: 1,
    },
  ],
};
  return (
    <>
      <Doughnut data={data} />
    </>
  )
}

export default PricePercentageDoughnutChart
