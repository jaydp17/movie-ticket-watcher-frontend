import React, { useState } from 'react';
import { toYYYY_MM_DD } from '../../helpers/date-helpers';

interface Props {
  selectDate: (yyyy_mm_dd: string) => void;
}
function DatePicker({ selectDate }: Props) {
  const [date, setDate] = useState(() => toYYYY_MM_DD(new Date()));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const yyyy_mm_dd = e.target.value;
    if (!yyyy_mm_dd) return;
    setDate(yyyy_mm_dd);
    selectDate(yyyy_mm_dd);
  };
  return (
    <fieldset>
      <legend>Date</legend>
      <input type="date" name="bday" value={date} onChange={onChange} />
    </fieldset>
  );
}

export default DatePicker;
