/**
 * Created by zhengmingzhi on 2022/6/23
 * 内部的日历组件
 */

// 第三方
import React, {useState, Fragment, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import Calendar from '../calendar';
import {LocaleConfig} from '../index';
import {formatNumbers} from "../dateutils";

LocaleConfig.locales['fr'] = {
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    dayNames: ['一', '二', '三', '四', '五', '六', '日'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

const ApexCalendar = ((props) => {
    const { pressCallback,minDate=undefined,maxDate=undefined,initialDate } = props
    const [hideDayNames, setHideDayNames] = useState(false) //隐藏周一至周日的选项
    const [showType, setShowType] = useState('date')  //date 日期 month月份 year 年份
    const [markedDates, setMarkedDates] = useState({}) //选中的日期
    const ScreenWidth = Dimensions.get('window').width;

    useEffect(()=>{
        setMarkedDates({[initialDate]:{selected: true}})
    },[initialDate])

    const confirmYear=(year)=>{
        console.log("year:",year)
        setShowType('year')
        setHideDayNames(true)
    }

    const confirmMonth=(month)=>{
        setShowType('month')
        setHideDayNames(true)
        // console.log("month:",month)
    }

    const onPress=(day)=>{
        let selected = true
        let max = maxDate?.split("-").join("")
        let min = minDate?.split("-").join("")
        let date = day.dateString.split("-").join("")
        if(max && date>max){
            selected = false
        }
        if(min && date<min){
            selected = false
        }
        setMarkedDates({[day.dateString]:{selected: selected}})
        if(showType === 'year') {
            setShowType('month')
        }else if(showType === 'month'){
            setShowType('date')
            setHideDayNames(false)
        }

        pressCallback && pressCallback(date)
    }

    const header=(date)=>{
        let view= []
        let dateString = date.toString('yyyy-MMM');
        let year = dateString.split("-")[0]
        let month = dateString.split("-")[1]
        view.push(
            <Fragment key="Fragment_header" >
                <TouchableOpacity onPress={()=> confirmYear(year)} key="touch_year">
                    <Text allowFontScaling={false} style={styles.monthText} testID={"HEADER_YEAR_NAME"} key="1_yearTouch">
                        {formatNumbers(year)+"年"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> confirmMonth(month)} key="touch_month">
                    <Text allowFontScaling={false} style={styles.monthText} testID={"HEADER_MONTH_NAME"}  key="1_monthTouch">
                        {formatNumbers(month)}
                    </Text>
                </TouchableOpacity>
            </Fragment>
        )
        return view
    }

    return (
          <Calendar
              // Initially visible month. Default = now
              initialDate={initialDate}
              style={{width:ScreenWidth/2}}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={minDate}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={maxDate}
              // Collection of dates that have to be marked. Default = {}
              markedDates={markedDates}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                  console.log('onDayPress selected day', day);
                  onPress(day)
              }}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={day => {
                  console.log('onDayLongPress selected day', day);
                  onPress(day)
              }}
              // Month format in calendar title. Formatting values: http://arshaw. com/xdate/#Formatting
              monthFormat={'yyyy  MMM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={month => {
                  console.log('month changed', month);
              }}
              // Hide month navigation arrows. Default = false
              hideArrows={false}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              // renderArrow={direction => 'left'}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={false}
              // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={false}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={hideDayNames}
              // Show week numbers to the left. Default = false
              showWeekNumbers={false}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={subtractMonth => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Disable left arrow. Default = false
              disableArrowLeft={false}
              // Disable right arrow. Default = false
              disableArrowRight={false}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              disableAllTouchEventsForDisabledDays={true}
              // Replace default month and year title with custom one. the function receive a date as parameter
              renderHeader={date => {
                  return header(date)
              }}
              // Enable the option to swipe between months. Default = false
              enableSwipeMonths={true}
              showType={showType}
          />
  )
})

export default ApexCalendar
const styles = StyleSheet.create({
    monthText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#333333",
        margin: 10,
    }
});



