import {isThisMonth} from "./dateutils";

const { isToday, isDateNotInTheRange,isYearNotInTheRange, isMonthNotInTheRange,sameMonth,isThisYear } = require('./dateutils');
const { parseDate, toMarkingFormat } = require('./interface');
export function getState(day, current, props) {
    const { minDate, maxDate, disabledByDefault, context } = props;
    const _minDate = parseDate(minDate);
    const _maxDate = parseDate(maxDate);
    let state = '';
    if (context?.date === toMarkingFormat(day)) {
        state = 'selected';
    }
    else if (isToday(day)) {
        state = 'today';
    }
    if (disabledByDefault) {
        state = 'disabled';
    }
    else if (isDateNotInTheRange(_minDate, _maxDate, day)) {
        state = 'disabled';
    }
    else if (!sameMonth(day, current)) {
        state = 'disabled';
    }
    return state;
}

export function getMonthState(day,current,props) {
    const { minDate, maxDate, disabledByDefault, context } = props;
    const _minDate = parseDate(minDate);
    const _maxDate = parseDate(maxDate);
    let state = '';
    if (context?.date === toMarkingFormat(day)) {
        state = 'selected';
    }
    else if (isThisMonth(day)) {
        state = 'today';
    }
    if (disabledByDefault) {
        state = 'disabled';
    }
    else if (isMonthNotInTheRange(_minDate, _maxDate, day)) {
        state = 'disabled';
    }
    return state;
}

export function getyearState(day,current,props) {
    const { minDate, maxDate, disabledByDefault, context } = props;
    const _minDate = parseDate(minDate);
    const _maxDate = parseDate(maxDate);
    let state = '';
    if (context?.date === toMarkingFormat(day)) {
        state = 'selected';
    }
    else if (isThisYear(day)) {
        state = 'today';
    }
    if (disabledByDefault) {
        state = 'disabled';
    }
    else if (isYearNotInTheRange(_minDate, _maxDate, day)) {
        state = 'disabled';
    }
    return state;
}
