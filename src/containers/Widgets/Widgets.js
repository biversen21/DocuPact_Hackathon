import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as widgetActions from 'redux/modules/widgets';
import {isLoaded, load as loadWidgets} from 'redux/modules/widgets';
import {initializeWithKey} from 'redux-form';
import { WidgetForm } from 'components';

@connect(
  state => ({
    widgets: state.widgets.data,
    editing: state.widgets.editing,
    error: state.widgets.error,
    loading: state.widgets.loading
  }),
  dispatch => ({
    ...bindActionCreators({
      ...widgetActions,
      initializeWithKey
    }, dispatch)
  })
)
export default
class Widgets extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadWidgets());
    }
  }

  handleEdit(widget) {
    const {editStart} = this.props; // eslint-disable-line no-shadow
    return () => {
      editStart(String(widget.id));
    };
  }

  render() {
    const {widgets, error, editing, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Widgets.scss');
    return (
      <div className={styles.widgets + ' container'}>
        <h1>
          My Events
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}><i
            className={refreshClassName}/> {' '} Reload Events
          </button>
        </h1>
        <DocumentMeta title="My Activity Feed"/>
        <p>
        	Check out my awesome history of volunteering...Join me next time
        </p>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {widgets && widgets.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Event Status</th>
            <th className={styles.sprocketsCol}>Hours</th>
            <th className={styles.ownerCol}>Company</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            widgets.map((widget) => editing[widget.id] ?
              <WidgetForm formKey={String(widget.id)} key={String(widget.id)} initialValues={widget}/> :
              <tr key={widget.id}>
                <td className={styles.idCol}>{widget.id}</td>
                <td className={styles.colorCol}>{widget.color}</td>
                <td className={styles.sprocketsCol}>{widget.sprocketCount}</td>
                <td className={styles.ownerCol}>{widget.owner}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={::this.handleEdit(widget)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

