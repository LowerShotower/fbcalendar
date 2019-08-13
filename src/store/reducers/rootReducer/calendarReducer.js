import { DATE, DATES, VISIBILITY, WORK_TIME } from '../../actions/types';
import moment from 'moment';
import 'moment/locale/nb';

const INITIAL_STATE = {
  date: moment(),
  dates: [],
  workTime: 1,
  visibility: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

  case DATE.UPDATE:
    return { ...state, date: payload };

  case DATE.RESET:
    return { ...state, date: INITIAL_STATE.date };

  case VISIBILITY.UPDATE:
    return { ...state, visibility: payload };

  case VISIBILITY.RESET:
    return { ...state, visibility: INITIAL_STATE.date };

  case WORK_TIME.UPDATE:
    return { ...state, workTime: payload };

  case WORK_TIME.RESET:
    return { ...state, workTime: INITIAL_STATE.workTime };

  case DATES.UPDATE:
    return { ...state, dates: [...payload] };

  case DATES.RESET:
    return { ...state, dates: INITIAL_STATE.dates };

  case DATES.ADD_ITEM:
    return { ...state, dates: [...state.dates, payload], };

  default:
    return state;
  }
};
