import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import 'moment/locale/nb';

const Cell = (props) => {
  const { classNames, day, onPickDate, data } = props;
  
  return (
    <div
      key={day.format()}
      className={cx({
        'calendar-grid-item': true,
        'calendar-grid-item__current': day.isSame(moment(), 'day'),
        'calendar-grid-item__bad': data && data.hours > 8,
        'calendar-grid-item__normal': data && data.hours <= 8 && data.hours >= 4,
        'calendar-grid-item__good': data && data.hours < 4
      })}
      onClick={e => onPickDate(day, data)}
    >
      {day.format('D')}
      <div className='workHours'>
        {data && data.hours}
      </div >
    </div >
  );
};

export default Cell;
