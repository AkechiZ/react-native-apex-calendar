import { StyleSheet } from 'react-native';
import * as defaultStyle from '../../../style';
import constants from '../../../commons/constants';
import {textDisabledColor} from "../../../style";
export default function styleConstructor(theme = {}) {
    const appStyle = { ...defaultStyle, ...theme };
    return StyleSheet.create({
        container: {
            alignSelf: 'stretch',
            alignItems: 'center'
        },
        base: {
            width: 40,
            height: 40,
            alignItems: 'center',
            borderRadius:4
        },
        text: {
            marginTop: constants.isAndroid ? 4 : 10,
            fontSize: appStyle.textDayFontSize,
            fontFamily: appStyle.textDayFontFamily,
            fontWeight: appStyle.textDayFontWeight,
            color: appStyle.dayTextColor,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            ...appStyle.textDayStyle
        },
        alignedText: {
            marginTop: constants.isAndroid ? 4 : 6
        },
        selected: {
            backgroundColor: appStyle.selectedDayBackgroundColor,

        },
        disabledTextContainer: {
            backgroundColor: '#F2F2F2',

        },
        today: {
            backgroundColor: appStyle.todayBackgroundColor,
            borderRadius: 16
        },
        todayText: {
            color: appStyle.todayTextColor
        },
        selectedText: {
            color: appStyle.selectedDayTextColor
        },
        disabledText: {
            color: appStyle.textDisabledColor,

        },
        inactiveText: {
            color: appStyle.textInactiveColor
        },
        dot: {
            width: 4,
            height: 4,
            marginTop: 1,
            borderRadius: 2,
            opacity: 0,
            ...appStyle.dotStyle
        },
        visibleDot: {
            opacity: 1,
            backgroundColor: appStyle.dotColor
        },
        selectedDot: {
            backgroundColor: appStyle.selectedDotColor
        },
        disabledDot: {
            backgroundColor: appStyle.disabledDotColor || appStyle.dotColor
        },
        todayDot: {
            backgroundColor: appStyle.todayDotColor || appStyle.dotColor
        },
        // @ts-expect-error
        ...(theme['stylesheet.day.basic'] || {})
    });
}
