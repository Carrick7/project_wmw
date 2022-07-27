import { useState, useEffect } from "react";
//date fns
import { format } from "date-fns";

function DateConverting ({date}){
  const [formattedDate, setFormattedDate] = useState([]);
  useEffect(() => {
    const newDate = format(new Date (date), "dd-MM-yy");
    setFormattedDate(newDate);
    console.log(formattedDate);
  }, [date]);
  return (
    <>{formattedDate}</>
  );
}
export default DateConverting;
