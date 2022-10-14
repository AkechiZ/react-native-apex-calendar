
import React, { ReactNode } from 'react';

export interface ApexCalendarProps {
    pressCallback:(day)=>void;
    minDate:string
    maxDate:string
    initialDate:string
}
declare const ApexCalendar: React.ForwardRefExoticComponent<ApexCalendarProps & React.RefAttributes<unknown>>;
export default ApexCalendar;
