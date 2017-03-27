import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';

import { addBookingAction } from '../actions/bookingActions';

let mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
    	dispatch(addBookingAction(data));
    }
  }
}

class BookingContainer extends React.Component {

  handleSubmit(data) {
    const { dispatch } = this.props;
    dispatch(addBookingAction(data));

    this.props.onClose();
  }

  renderDefaultBooking() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit((data) => this.handleSubmit(data))}>
        <div>
          <label>Start Date:</label>
          <div>
            <Field disabled="true"
              name="startDate"
              component="input"
              type="text"
              placeholder="Start Date"
              format={value => value.format("DD/MM/YYYY HH:mm A")} />
          </div>
        </div>

        <div>
          <label>End Date:</label>
          <div>
            <Field disabled="true"
              name="endDate"
              component="input"
              type="text"
              placeholder="End Date"
              format={value => value.format("DD/MM/YYYY HH:mm A")} />
          </div>
        </div>

        <div>
          <input type="submit" value="Ok" />
          <input type="button" value="Cancel" onClick={this.props.onClose} />
        </div>
      </form>
    )
  }

  renderBooking() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit((data) => this.handleSubmit(data))}>
        { this.props.body }
        <div>
          <input type="submit" value="Ok" />
          <input type="button" value="Cancel" onClick={this.props.onClose} />
        </div>
      </form>
    );
  }

  render() {
    if (this.props.body) {
      return this.renderBooking();
    } else {
      return this.renderDefaultBooking();
    }
  }
}

BookingContainer = connect(null, mapDispatchToProps)(BookingContainer)
BookingContainer = reduxForm({
  form: 'booking',
  fields: ['startDate', 'endDate']
})(BookingContainer)

export default BookingContainer
