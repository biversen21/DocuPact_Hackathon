import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {initialize} from 'redux-form';
import {SurveyForm} from 'components';

@connect(
  () => ({}),
  dispatch => bindActionCreators({initialize}, dispatch)
)
export default class Survey extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit(data) {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  handleInitialize() {
    this.props.initialize('survey', {
      name: 'Little Bobby Tables',
      email: 'bobby@gmail.com',
      company: 'Redux Wizard',
      date: '10/08/2015',
    });
  }

  render() {
    return (
      <div className="container">
        <h1>New Event</h1>
        <DocumentMeta title="Create a New Event"/>

        <p>
        	Here you can create a new event for volunteering!
        </p>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={::this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <SurveyForm onSubmit={::this.handleSubmit}/>
      </div>
    );
  }
}
