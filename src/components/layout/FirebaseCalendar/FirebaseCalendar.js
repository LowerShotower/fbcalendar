import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Calendar } from 'react-calendar-component';
import { Modal, Slider, InputNumber, Row, Col, Spin, Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/nb';
import { selectors } from 'store/reducers/selectors';
import { fbAuth } from 'config/fbConfig';
import { calendar, date, workTime, visibility } from 'store/actions';
import './FirebaseCalendar.css';
import Cell from './Cell';

class FirebaseCalendar extends Component {

  showModal = () => {
    this.props.updateVisibility(true);
  };

  handleOk = e => {
    this.props.saveHours({
      date: {
        day: this.props.date,
        hours: this.props.workTime
      }
    });
    this.props.updateVisibility(false);
  };

  handleCancel = e => {
    this.props.updateVisibility(false);
  };

  handlePickDate = (date, dateData) => {
    this.props.resetSlider();
    if (dateData) { this.props.updateWorkTime(dateData.hours); }
    this.props.updateDate(date);
    this.showModal();
  }

  handleSliderChange = value => {
    this.props.updateWorkTime(value);
  };

  render() {
    const { workTime, date, visible, updateDate, calendar } = this.props;
    if (!calendar) return <Spin
      indicator={<Icon type="loading" style={{ fontSize: 40, color: 'black' }} spin />}
    />;
    return (
      <Fragment>
        <Calendar
          onChangeMonth={date => updateDate(date)}
          date={date}
          onPickDate={this.handlePickDate}
          renderDay={({ day, classNames, onPickDate }) => {
            const dates = calendar.dates;
            let dateData;
            if (dates) {
              const dateName = Object.keys(dates).find(
                (dateName) => dateName == day.format('YYYY-MM-DD')
              );
              dateData = dateName ? dates[dateName] : null;
            }
            return <Cell
              day={day}
              classNames={classNames}
              onPickDate={onPickDate}
              data={dateData}
            />;
          }

          }
        />
        <Modal
          title={moment(date).format('L')}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={18}>
              <Slider
                min={1}
                max={24}
                onChange={this.handleSliderChange}
                value={workTime}
              />
            </Col>
            <Col span={6}>
              <InputNumber
                min={1}
                max={24}
                style={{ marginLeft: 16 }}
                value={workTime}
                onChange={this.handleSliderChange}
              />
            </Col>
          </Row>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const uid = state.firebase.auth.uid;
  return {
    calendar: selectors.getCalendarFromDb(state, uid),
    date: selectors.getDate(state),
    workTime: selectors.getWorkTime(state),
    visible: selectors.getVisibility(state),
  };
};

const mapDispatchToProps = {
  calendarRequest: calendar.request,
  updateDate: date.update,
  updateWorkTime: workTime.update,
  updateVisibility: visibility.update,
  saveHours: date.saveToDb,
  resetSlider: workTime.reset,
};

export default compose(
  firestoreConnect((props, state) => {
    return [
      {
        collection: 'calendars',
        doc: '' + fbAuth.currentUser.uid
      }
    ];
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FirebaseCalendar);