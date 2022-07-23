import { useEffect, useState } from "react";
//date fns
import { format } from 'date-fns'
//chart js 2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const TrackingProductPrice = ({prices}) => {
  console.log(prices)
  //useState for the chart data
  const [dateArray, setDateArray] = useState();
  const [priceArray, setPriceArray] = useState();

  useEffect(() => {
    setDateArray(prices.map((price) => format(new Date (price.createdAt), "HH:mm 'on' dd-MM-yy")));
    setPriceArray(prices.map((price) => price.price_per_unit));
  }, []);

  const data = {
    labels: dateArray,
    datasets: [
      {
        label: '€',
        data: priceArray, 
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1.0)'
      },
    ],
  };
  return (
    <div> <Line options={options} data={data} /> </div>
  )
}

export default TrackingProductPrice