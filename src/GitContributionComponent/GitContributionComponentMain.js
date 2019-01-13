import React, { Component } from "react";
import {GitWallContext} from '../AppContext/GitWallContext';

//CSS
import './css/GitContribution.css';

class GitContributionComponentMain extends Component {

  componentDidMount(){
    console.log(this.context);
  }

  render() {

    return (
      <section className="section">
          <div className="box">

            {this.context.gitWall.walls.map(
              (wallRow)=>{
                return(
                  <div key={wallRow[0].date.format()+"-rowHeader" }className="columns">
                    {
                      wallRow.map(
                        (wallCol)=>{
                          return(
                            <GitContributionComponentWallBox 
                              key={wallCol.date.format()+"-col"}
                              wallObject={wallCol}
                            />
                          )
                        }
                      )
                    }
                
                  </div>
                );
              }
            )}
          </div>
      </section>
    );
  }
}

class GitContributionComponentWallBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      contentHeight:0,
      hover:false
    };
  }
  componentDidMount(){
    const height = this.divElement.clientHeight;
    const width = this.divElement.clientWidth;
    //console.log(`Component size h: ${height}, w: ${width}`);
    this.setState({
      contentHeight:width,
      onHover:true,
    });
  }
  render() {
    return (
      <div className="column column-custom-padding">
        <div 
          className ="has-background-grey-lighter wall"   
          ref={ (divElement) => this.divElement = divElement}
          style={{height:this.state.contentHeight}}
          onMouseEnter = {(e)=>{
            console.log(this.props.wallObject)
            this.setState({
              onHover:false
            })
          }}
          onMouseLeave = {
            ()=>{
              this.setState({
                onHover:true
              });
            }
          }
        >
        </div>
        
      </div>
    );
  }
}

GitContributionComponentMain.contextType = GitWallContext;

export default GitContributionComponentMain;
