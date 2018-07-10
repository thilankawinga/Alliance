import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Icon,
  Content,
  Container,
  Spinner,
  Picker,
  Item
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Dates from "react-native-dates";
import moment from "moment-timezone";
import { Dimensions } from "react-native";
import { connect } from "react-redux";

import RButton from "../../../components/RButton";
import { actionCreators } from "../../../allianceRedux";
import WetOrDry from "../components/WetOrDry";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

import styles from "../../../styles";
import colours from "../../../colours";

const myStyle = {
  to: {
    width: 20,
    marginTop: 50
  },
  text: {
    textAlign: "center",
    color: colours.white
  },
  pad: {
    marginTop: 0
  },
  cal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 79,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 3,
    width: deviceWidth - 20,
    backgroundColor: "#fff",
    margin: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    borderRadius: 5
  },
  picker: {
    color: colours.blue
  },
  pickerWD: {
    color: colours.blue,
    width: deviceWidth - 100
  },
  small: {
    height: 30,
    padding: 10,
    paddingBottom: 0
  },
  title: {
    color: colours.gold,
    marginBottom: 5
  },
  bottom: {
    height: 90,
    margin: 10
  }
};

/**
 * Rounds time to nearest hour
 * @param {moment or long} time
 * @return {moment}
 */
const ceilHour = time => {
  const currentTime = moment.isMoment(time) ? time : moment(time);
  return currentTime.minute() || currentTime.second() || currentTime.millisecond()
    ? currentTime.add(1, 'hour').startOf('hour')
    : currentTime.startOf('hour');
};

const LEFT = "LEFT";
const RIGHT = "RIGHT";
const DEFAULT_PERIOD = 7;

class ChangeItem extends Component {
  constructor(props) {
    super(props);
    const startDate = moment()
      .second(0)
      .millisecond(0);
    
    this.state = {
      focus: "startDate",
      startDate,
      endDate: startDate
        .clone()
        .add(DEFAULT_PERIOD, 'day')
        .hour(17)
        .minute(0),
      isCalendarOpen: null,
      focusPicker: false,
      editable: true,
      hireType: "Dry"
    };
  }

  componentDidMount() {
    const { startDate, endDate } = this.state;
    // console.log("startDate = ", startDate)
    this.getBillableDays(startDate, endDate);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (__DEV__) {
    //   const { dispatch, goToTab, billableDays } = this.props;
    //   if (billableDays) {
    //     dispatch(actionCreators.getOrder("10:88"));
    //     goToTab(3);
    //   }
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { leadTime: currLeadTime, workHours } = this.props;
    const { leadTime } = nextProps;
    const { startDate, endDate } = this.state;
    if (currLeadTime === null && leadTime) {
      // console.log("componentWillReceiveProps. leadTime = ", leadTime)
      const startDate = moment(leadTime, "YYYYMMDDHHmmss");
      this.setDateRange(startDate);
    }
  }

  /**
   * @param {moment} startDateTime
   * @param {optional moment} endDateTime
   */
  setDateRange = (startDateTime, endDateTime) => {
    const { workHours } = this.props;
    const businessHoursEnd = workHours ? workHours.BusinessHoursEnd : 17;
    const endDate = endDateTime ? endDateTime : startDateTime.clone().add(DEFAULT_PERIOD, 'day').hour(businessHoursEnd).minute(0);
    this.updateDates({ startDate: startDateTime, endDate });
  };

  /**
   * @param {object:{ optional: startDate, optional: endDate }} dates
   */
  updateDates = (dates) => {
    const { startDate, endDate } = dates;
    const { startDate: oldStartDate, endDate: oldEndDate } = this.state;
    const newStartDate = startDate ? startDate : oldStartDate;
    const newEndDate = endDate ? endDate : oldEndDate;
    this.setState({ startDate: newStartDate, endDate: newEndDate });
    this.getBillableDays(newStartDate, newEndDate);
  };

  getBillableDays = (startDate, endDate) => {
    const { dispatch } = this.props;
    if (!!startDate || !!endDate) {
      dispatch(actionCreators.getBillables(startDate, endDate));
    }
  };

  getItems = () => {
    const { dispatch, billableDays: { billableDays }, goToTab } = this.props;
    const { hireType } = this.state;
    dispatch(actionCreators.getItems(billableDays, hireType));
    goToTab(2);
  };

  getWorkHourRange = (start, end) => {
    let array = [];
    let time = moment()
      .minute(0)
      .second(0)
      .millisecond(0);
    for (let i = start; i <= end; i++) {
      array.push({ label: time.hour(i).format("LT"), value: i });
    }
  
    return array;
  };

  calendarButton = side =>
    this.state.isCalendarOpen === side ? { backgroundColor: colours.gold } : {};

  isDateBlocked = date => date.isBefore(moment(this.props.leadTime, "YYYYMMDDHHmmss"), "day");

  onDateChange = ({ date }) => {
   
    const { isCalendarOpen, startDate, endDate } = this.state;
    if (isCalendarOpen === LEFT) {
    
      const leadTime = moment(this.props.leadTime, "YYYYMMDDHHmmss");
      const newDate = startDate.hour() < leadTime.hour()
        ? date.hour(leadTime.hour())
        : date.hour(startDate.hour());
      this.setState({ startDate: newDate });
      alert(newDate.format("DD/MM/YYYY"));
      if (newDate.isSameOrAfter(endDate, "day")) {
        this.setState({ isCalendarOpen: RIGHT });
      } else {
        this.getBillableDays(newDate, endDate);
        this.setState({ isCalendarOpen: null });
      }
    } else if (isCalendarOpen === RIGHT) {
      alert("Right");
      const newDate = date.hour(endDate.hour());
      this.setState({ endDate: newDate });
      // TODO: check if we can book on the same day... change is isSameOrBefore then....
      if (newDate.isBefore(startDate, "day")) {
        this.setState({ isCalendarOpen: LEFT });
      } else {
        this.getBillableDays(startDate, newDate);
        this.setState({ isCalendarOpen: null });
      }
    }
  };

  toggleCalendar = side => {
    const isCalendarOpen = this.state.isCalendarOpen ? null : side;
    this.setState({ isCalendarOpen });
  };

  renderPicker = (currTime, workHours, callback,isStartTime) => {
   
    if (!workHours || !currTime) return null;
    let hours;
    if(isStartTime){
      let letTime=currTime.format("LT");
      let timeArr=letTime.split(' ');
     let startTime=timeArr[0].split(':')[0];
      if(timeArr[1]=="PM"){
        startTime=Number(startTime)+12;
        if(startTime==24)
        {
          startTime=0;
        }
      }
      hours = this.getWorkHourRange(
        startTime,
        workHours.BusinessHoursEnd
      );
    }
    else{
      hours = this.getWorkHourRange(
        7,
        workHours.BusinessHoursEnd
      );
    }
   
    //alert(startTime);
    
    return (
      <Picker
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }}
        mode="dropdown"
        placeholder={currTime.format("LT")}
        selectedValue={currTime.format("LT")}
        onValueChange={hour => callback(hour)}
        textStyle={myStyle.picker}
      >
     
     {hours.map(({ label, value }) => <Item label={label} value={value} key={value} />)}
      </Picker>
    );
  };

  render() {
    const {
      goBack,
      // itemDetails,
      isFetching,
      workHours,
      billableDays,
      hireTypeOptions
    } = this.props;
    if (this.props.leadTime == null) {
      return null;
    }
    const leadTime = moment(this.props.leadTime, "YYYYMMDDHHmmss");
    // console.log("leadTime for calendar: ", leadTime.hours())
    const { isCalendarOpen, startDate, endDate } = this.state;

    // MAY TODO: if new time is same or after end date, should reshow the date to origin one
    const updateStartTime = hour => {
      // console.log("updateStartTime. hour: ", hour)
      // console.log("newTime for startDate. startDate: ", startDate)
      if (hour >= leadTime.hours() || startDate.isAfter(leadTime, "day")) {
        const newTime = startDate
          .clone()
          .hour(hour)
          .minute(0);
        console.log("newTime for startDate: ", newTime)
        if (newTime.isSameOrAfter(endDate)) return;
        this.updateDates({ startDate: newTime });
      }
    };

    const updateEndTime = hour => {
      // TODO: check for it beind greater than possible minimum
      if (hour > leadTime.hours() || endDate.isAfter(leadTime, "day")) {
        const newTime = endDate
          .clone()
          .hour(hour)
          .minute(0);
        if (newTime.isSameOrBefore(startDate)) return;
        this.updateDates({ endDate: newTime });
      }
    };

    const updateHireType = hireType => this.setState({ hireType });

    const renderCalendar = () => {
      if (!isCalendarOpen) return null;
      let date = startDate;
      if (isCalendarOpen === RIGHT) date = endDate;
      // console.log("startDate: ", startDate)
      // console.log("isCalendarOpen: ", isCalendarOpen)
      // console.log("endDate: ", endDate)
      return (
        <View style={myStyle.cal}>
          <Col style={styles.reset}>
            <Dates
              date={date}
              onDatesChange={this.onDateChange}
              isDateBlocked={this.isDateBlocked}
            />
          </Col>
        </View>
      );
    };

    const renderDays = obj =>
      obj.BillableDays
        ? obj.BillableDays > 1
          ? `${obj.BillableDays} Work Days`
          : `${obj.BillableDays} Work Day`
        : null;

    return (
      <Container>
        <Grid style={styles.blue}>
          <Row style={{ height: 165 }}>
            <Col>
              <Content style={styles.content}>
                <Text style={myStyle.title}>Required From</Text>
                <Button
                  style={this.calendarButton(LEFT)}
                  block
                  iconLeft
                  onPress={() => this.toggleCalendar(LEFT)}
                >
                  <Icon name="calendar" />
                  <Text>
                    {this.state.startDate &&
                      this.state.startDate.format("DD/MM/YYYY")}
                  </Text>
                </Button>
                <Text style={{ ...myStyle.title, marginTop: 5 }}>Start time</Text>
                <Button block iconLeft >
                  <Icon name="clock-o" />
                  {this.renderPicker(
                    this.state.startDate,
                    workHours,
                    updateStartTime,
                    true
                  )}
                </Button>
              </Content>
            </Col>
            <Col style={myStyle.to} />
            <Col>
              <Content style={styles.content}>
                <Text style={myStyle.title}>Required Until</Text>
                <Button
                  style={this.calendarButton(RIGHT)}
                  block
                  iconLeft
                  onPress={() => this.toggleCalendar(RIGHT)}
                >
                  <Icon name="calendar" />
                  <Text>
                    {this.state.endDate &&
                      this.state.endDate.format("DD/MM/YYYY")}
                  </Text>
                </Button>
                <Text style={{ ...myStyle.title, marginTop: 5 }}>End time</Text>
               
                <Button block iconLeft>
                  <Icon name="clock-o" />
                  {this.renderPicker(
                    this.state.endDate,
                    workHours,
                    updateEndTime,
                    false
                  )}
                </Button>
              </Content>
            </Col>
          </Row>
          <Row>
            <Col>
              <Content style={styles.content}>
                <Text style={myStyle.title}>Hire Duration</Text>
                <View
                  style={{
                    backgroundColor: colours.white,
                    borderRadius: 5,
                    padding: 10,
                    minHeight: 40
                  }}
                >
                  <Text>
                    {billableDays
                      ? renderDays(billableDays)
                      : "Select the hire period"}
                  </Text>
                </View>
              </Content>
            </Col>
          </Row>
          <Row>
            <Col>
              <Content style={styles.content}>
                <Text style={myStyle.title}>Equipment Hire Type</Text>
                <WetOrDry
                  hireTypeOptions={hireTypeOptions}
                  disabled={false}
                  selectedValue={this.state.hireType}
                  onValueChange={option => updateHireType(option)}
                />
              </Content>
            </Col>
          </Row>
          <Row style={myStyle.bottom}>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <View style={{ position: "absolute", bottom: 0, left: 20 }}>
                <RButton onPress={() => goBack()} />
              </View>
              <RButton
                large
                onPress={() => this.getItems()}
                disabled={!billableDays}
              />
            </Col>
          </Row>
        </Grid>
        {renderCalendar()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  workHours: state.workHours,
  billableDays: state.billableDays,
  leadTime: state.leadTime,
  hireTypeOptions: state.hireTypeOptions,
});

export default connect(mapStateToProps)(ChangeItem);
