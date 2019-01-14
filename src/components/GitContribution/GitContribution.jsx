import React, { Component } from 'react';
import moment from 'moment';
import { NAVBAR } from '../Navbar';
import { GitWallContext } from '../AppContext/GitWallContext';
// CSS
import './css/GitContribution.css';

class GitContributionComponentWallBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: 0,
      onHover: false,
      tooltipY: 0,
      tooltipX: 0,
    };
  }

  componentDidMount() {
    const width = this.divElement.clientWidth;
    // console.log(`Component size h: ${height}, w: ${width}`);
    this.setState({
      contentHeight: width,
    });
  }

  render() {
    let tooltipStyle = {};
    if (this.state.onHover) {
      let leftOffset = 60;
      if (window.innerWidth - this.state.tooltipX <= 180) {
        leftOffset = 200;
      }
      if (this.state.tooltipX < 55) {
        leftOffset = 30;
      }
      tooltipStyle = {
        left: `${this.state.tooltipX - leftOffset}px`,
        top: `${this.state.tooltipY - 45}px`,
        zIndex: 1,
      };
    }

    return (
      <div className="column column-custom-padding">
        <div
          className={this.props.wallObject.getClassName()}
          ref={divElement => (this.divElement = divElement)}
          style={{ height: this.state.contentHeight }}
          onMouseEnter={(e) => {
            if (this.props.wallObject.date > moment()) {
              return null;
            }
            if (this.props.selectedNav == NAVBAR.DRAW && this.props.hasMouseDown) {
              this.props.wallObject.setValue(this.props.drawValue);
            }
            if (this.props.selectedNav != NAVBAR.DRAW) {
              this.setState({
                onHover: true,
                tooltipY: e.clientY,
                tooltipX: e.clientX,
              });
            }

            // console.log(this.props.wallObject);
            // console.log(`x: ${e.screenX}, y: ${e.screenY}`);
          }}
          onMouseMove={(e) => {
            if (this.props.wallObject.date > moment() || this.props.selectedNav == NAVBAR.DRAW) {
              return null;
            }
            this.setState({
              tooltipY: e.clientY,
              tooltipX: e.clientX,
            });
          }}
          onMouseDown={() => {
            if (this.props.selectedNav == NAVBAR.DRAW) {
              this.props.wallObject.setValue(this.props.drawValue);
            }
          }}
          onMouseLeave={() => {
            if (this.props.wallObject.date > moment()) {
              return null;
            }
            this.setState({
              onHover: false,
            });
          }}
        >
          <div className="tooltip" hidden={!this.state.onHover} style={tooltipStyle}>
            Contributions on
            {' '}
            {this.props.wallObject.date.format('MMM D, YYYY')}
          </div>
        </div>
      </div>
    );
  }
}

class GitContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMouseDown: false,
    };
  }

  _hasMouseClick() {}

  render() {
    return (
      <section className="section">
        <div
          className="box"
          onMouseDown={() => {
            this.setState({ hasMouseDown: true });
          }}
          onMouseUp={() => this.setState({ hasMouseDown: false })}
          onMouseLeave={() => {
            if (this.state.hasMouseDown) {
              this.setState({ hasMouseDown: false });
            }
          }}
        >
          <GitWallContext.Consumer>
            {consumerProps => consumerProps.gitWallObject.walls.map(wallRow => (
              <div key={`${wallRow[0].date.format()}-rowHeader`} className="columns">
                {wallRow.map(wallCol => (
                  <GitContributionComponentWallBox
                    key={`${wallCol.date.format()}-col`}
                    wallObject={wallCol}
                    selectedNav={consumerProps.selectedNav}
                    drawValue={consumerProps.drawValue}
                    hasMouseDown={this.state.hasMouseDown}
                  />
                ))}
              </div>
            ))
            }
          </GitWallContext.Consumer>
        </div>
      </section>
    );
  }
}

export default GitContribution;
