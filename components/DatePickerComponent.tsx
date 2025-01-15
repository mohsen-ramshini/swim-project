// import React, { useState } from 'react';
// import MultiDatePicker from 'react-multi-date-picker';
// import { DateObject } from 'react-multi-date-picker'; // Import DateObject type if needed

// const DatePickerComponent = () => {
//   const [dates, setDates] = useState<DateObject | DateObject[] | null>(null); // You can store multiple dates or a single date

//   const handleDateChange = (selectedDates: DateObject | DateObject[] | null) => {
//     setDates(selectedDates);
//   };

//   return (
//     <div>
//       <h3>Select Dates:</h3>
//       {/* MultiDatePicker component */}
//       <MultiDatePicker
//         value={dates}
//         onChange={handleDateChange} // This function will be triggered when dates are selected
//         inputClass="form-control"
//         calendarPosition="bottom-right" // Position of the calendar
//       />
//       <div>
//         {/* Display selected date(s) */}
//         {dates && (
//           <div>
//             <h4>Selected Date(s):</h4>
//             {Array.isArray(dates) ? (
//               <ul>
//                 {dates.map((date, index) => (
//                   <li key={index}>{date.format()}</li> // Show formatted date
//                 ))}
//               </ul>
//             ) : (
//               <p>{dates.format()}</p> // Show a single selected date
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DatePickerComponent;
