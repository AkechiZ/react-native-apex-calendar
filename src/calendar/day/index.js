import PropTypes from 'prop-types';
import XDate from 'xdate';
import React, { useMemo } from 'react';
import { formatNumbers, isToday } from '../../dateutils';
import { getDefaultLocale } from '../../services';
import { xdateToData } from '../../interface';
// @ts-expect-error
import { SELECT_DATE_SLOT } from '../../testIDs';
import BasicDay from './basic';
import PeriodDay from './period';
const Day = React.memo((props) => {
    const { date, marking, dayComponent, markingType,showType } = props;
    const _date = date ? new XDate(date) : undefined;
    const _isToday = isToday(_date);
    const markingAccessibilityLabel = useMemo(() => {
        let label = '';
        if (marking) {
            if (marking.accessibilityLabel) {
                return marking.accessibilityLabel;
            }
            if (marking.selected) {
                label += 'selected ';
                if (!marking.marked) {
                    label += 'You have no entries for this day ';
                }
            }
            if (marking.marked) {
                label += 'You have entries for this day ';
            }
            if (marking.startingDay) {
                label += 'period start ';
            }
            if (marking.endingDay) {
                label += 'period end ';
            }
            if (marking.disabled || marking.disableTouchEvent) {
                label += 'disabled ';
            }
        }
        return label;
    }, [marking]);
    const getAccessibilityLabel = useMemo(() => {
        const today = getDefaultLocale().today || 'today';
        const formatAccessibilityLabel = getDefaultLocale().formatAccessibilityLabel || 'dddd d MMMM yyyy';
        return `${_isToday ? today : ''} ${_date?.toString(formatAccessibilityLabel)} ${markingAccessibilityLabel}`;
    }, [_date, marking, _isToday]);
    const Component = dayComponent || (markingType === 'period' ? PeriodDay : BasicDay);
    const dayComponentProps = dayComponent ? { date: xdateToData(date ? new XDate(date) : new XDate()) } : undefined;

    let num
    if(showType === 'date'){
        num = formatNumbers(_date?.getDate())
    }else if(showType === 'month'){
        num = (formatNumbers(_date?.getMonth()) + 1) + '月'
    }else if(showType === 'year'){
        num = formatNumbers(_date?.getFullYear())
    }

    return (
    //@ts-expect-error
    <Component {...props} accessibilityLabel={getAccessibilityLabel} testID={`${SELECT_DATE_SLOT}-${date}`} {...dayComponentProps}>
      {num}
    </Component>);
});
export default Day;
Day.displayName = 'Day';
Day.propTypes = {
    ...BasicDay.propTypes,
    dayComponent: PropTypes.any
};
