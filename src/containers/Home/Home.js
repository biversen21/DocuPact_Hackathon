import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton } from 'components';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>DocuPact</h1>

            <h2>Make your DocuPact in the world</h2>

            <p>
              <a className={styles.github} href="https://github.com/erikras/react-redux-universal-hot-example"
                 target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
            <GithubButton user="erikras"
                          repo="react-redux-universal-hot-example"
                          type="star"
                          width={160}
                          height={30}
                          count large/>
            <GithubButton user="erikras"
                          repo="react-redux-universal-hot-example"
                          type="fork"
                          width={160}
                          height={30}
                          count large/>

            <p className={styles.humility}>
              Created and maintained by <a href="https://twitter.com/erikras" target="_blank">@erikras</a>.
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1"/>
            <CounterButton multireducerKey="counter2"/>
            <CounterButton multireducerKey="counter3"/>
          </div>
        </div>
      </div>
    );
  }
}
