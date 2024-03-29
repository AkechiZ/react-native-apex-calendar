import { StyleSheet, Platform } from 'react-native';
import * as defaultStyle from '../../style';
import constants from '../../commons/constants';
export default function (theme = {}) {
    const appStyle = { ...defaultStyle, ...theme };
    const flipStyle = constants.isRTL ? { transform: [{ scaleX: -1 }] } : undefined;
    return StyleSheet.create({
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 6,
            alignItems: 'center',
            borderColor:'#DDDDDD',
            borderBottomWidth:1
        },
        headerContainer: {
            flexDirection: 'row'
        },
        monthText: {
            fontSize: appStyle.textMonthFontSize,
            fontFamily: appStyle.textMonthFontFamily,
            fontWeight: appStyle.textMonthFontWeight,
            color: appStyle.monthTextColor,
            margin: 10
        },
        arrowDir:{
            flexDirection: 'row'
        },
        arrow: {
            padding: 10,
            ...appStyle.arrowStyle
        },
        arrowImage: {
            ...flipStyle,
            // tintColor: appStyle.disabledArrowColor,
            marginLeft: 5,
            marginRight: 5,
            width:30,
            height: 30,
            ...Platform.select({
                web: {
                    width: appStyle.arrowWidth,
                    height: appStyle.arrowHeight
                }
            })
        },
        disabledArrowImage: {
            ...flipStyle,
            tintColor: appStyle.disabledArrowColor
        },
        // @ts-expect-error
        week: {
            marginTop: 7,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        dayHeader: {
            marginTop: 2,
            marginBottom: 7,
            width: 32,
            textAlign: 'center',
            fontSize: appStyle.textDayHeaderFontSize,
            fontFamily: appStyle.textDayHeaderFontFamily,
            fontWeight: appStyle.textDayHeaderFontWeight,
            color: appStyle.textSectionTitleColor
        },
        disabledDayHeader: {
            color: appStyle.textSectionTitleDisabledColor
        },
        ...(theme['stylesheet.calendar.header'] || {})
    });
}
