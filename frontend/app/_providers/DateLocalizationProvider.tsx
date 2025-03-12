"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import 'dayjs/locale/en-us';

interface Props {
  children: React.ReactNode;
}

const DateLocalizationProvider: React.FC<Props> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  )
}

export default DateLocalizationProvider;