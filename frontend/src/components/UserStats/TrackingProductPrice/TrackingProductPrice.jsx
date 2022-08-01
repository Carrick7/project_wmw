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

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: 'Price History',
    },
    maintainAspectRatio: false,
  },
};

export const options2 = {
  responsive: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: 'Price History',
    },
    maintainAspectRatio: false,
  },
};

const TrackingProductPrice = ({prices}) => {
  
  //useState for the chart data
  const [dateArray, setDateArray] = useState();
  const [priceArray, setPriceArray] = useState();

  useEffect(() => {
    setDateArray(prices.map((price) => format(new Date (price.createdAt), "HH:mm '-' dd-M-yy")));
    setPriceArray(prices.map((price) => price.price_per_unit));
    //eslint-disable-next-line
  }, []);

  const data = {
    labels: dateArray,
    datasets: [
      {
        label: '€',
        data: priceArray, 
        borderColor: '#3145f5'
      },
    ],
  };
  return (
    <> <Line options={options1} data={data} /> </>
  )
}

export default TrackingProductPrice