import React, { Component } from "react";
import {GitWallContext} from '../AppContext/GitWallContext';
import '../GitContributionComponent/css/GitContribution.css';
class DrawComponentMain extends Component {

    render(){

        return(
            <section className="section">
                <GitWallContext.Consumer>
                    {
                        (consumerProps)=>(
                            
                            <div className="box">
                                <div className="control has-text-centered">
                                    <label className="radio">
                                        <input type="radio" name="answer" onClick={()=>consumerProps.setDrawValue(0)} checked={consumerProps.drawValue==0} readOnly/>
                                        <div className="wall-grey wall-special"></div>
                                    </label>
                                    
                                    <label className="radio">
                                        <input type="radio" name="answer" onClick={()=>consumerProps.setDrawValue(1)} checked={consumerProps.drawValue==1} readOnly/>
                                        <div className="wall-lighter-green wall-special"></div>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" onClick={()=>consumerProps.setDrawValue(2)} checked={consumerProps.drawValue==2} readOnly/>
                                        <div className="wall-light-green wall-special"></div>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" onClick={()=>consumerProps.setDrawValue(3)} checked={consumerProps.drawValue==3} readOnly/>
                                        <div className="wall-dark-green wall-special"></div>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" onClick={()=>consumerProps.setDrawValue(4)} checked={consumerProps.drawValue==4} readOnly/>
                                        <div className="wall-darker-green wall-special"></div>
                                    </label>
                                </div>
                            </div>
                        )
                    }
                </GitWallContext.Consumer>
            </section>

        )
    }
}


export default DrawComponentMain;