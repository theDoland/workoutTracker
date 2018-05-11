import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
/* 4 main columns 
 * Weight is the only one that can expand into more columns (we have one for now) 
 * Add functionality to add a new row */

// tabs for the days of the week (should start with one)
class DaysOfWeek extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col"> <button> Monday </button></div>
                <div className="col"> <button> Tuesday </button></div>
                <div className="col"> <button> Wednesday </button></div>
                <div className="col"> <button> Thursday </button></div>
                <div className="col"> <button> Friday </button></div>
                <div className="col"> <button> Saturday </button></div>
                <div className="col"> <button> Sunday </button></div>
            </div>
        );
    }
}
// the row has the main affects, but can have a dynamic number of weight columns (one for now)
// on double enter, add a new row
class WorkoutRows extends React.Component {
    render() {
        var grid = [];
        for(let i = 0; i < this.props.numRows; i++){
            grid.push(                
                <div key={i} className="row">
                    <div className="col-lg-2 table"><input type="text" name="exercise"/> </div>
                    <div className="col-lg-2 table"><input className="setAndRep" type="text" name="sets"/>x
                    <input className="setAndRep" type="text" name="reps"/></div>
                    <div className="col-lg-2 table"><input type="text" name="weight"/> </div>
                    <div className="col-lg-2 table"><input type="text" name="totalweight"/> </div>
                    <div className="col-lg-2 table"><input type="button" value="Yes"/><input type="button" value="No"/></div> 
                    <div className="col-lg-2 table"><input type="button" onClick={() => this.props.removeRow(i)} value="X" /></div>
                </div>
            );
        }

        return  (
            <div>
                <div className="row">
                    <div className="col-lg-2 table"> Exercise </div>
                    <div className="col-lg-2 table"> Sets / Reps </div>
                    <div className="col-lg-2 table"> Weight </div>
                    <div className="col-lg-2 table"> Total Weight </div>
                    <div className="col-lg-2 table"> Accomplished </div>
                    <div className="col-lg-2 table"> Delete Row </div>

                </div>
                {grid}
                <div className="row">
                    <input className="col-lg-1" type="button" onClick={this.props.addNewRow} value="+"/>
                </div>
            </div>
        );
    }
}

class WorkoutBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            exerciseRows: [{
                exercise: "",
                sets: 0,
                reps: 0,
                weight: 0,

            }], // key is the name of the exercise, value is the object rowElements
            numDays: 0,              // integer to keep track of the number of day tabs to render
            numRows: 0,
        };
        this.addNewRow = this.addNewRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
    }
    addNewRow(currRows){
        // capping the number of rows to 10
        var exerciseRows = this.state.exerciseRows;
        if(currRows === 10){
            return;
        }
        else{
            this.setState({ 
                exerciseRows: exerciseRows.concat([{
                    exercise: "",
                    sets: 0,
                    reps: 0,
                    weight: 0,
                }]),
                numRows: currRows+1, 
            });
        }
    }
    removeRow(index){
        console.log(index);
        var exerciseRows1 = this.state.exerciseRows.slice(0,index);
        var exerciseRows2 = this.state.exerciseRows.slice(index+1);
        var newexRow = exerciseRows1.push(exerciseRows2);
        var newRows = this.state.numRows;
        this.setState({ 
            exerciseRows: newexRow,
            numRows: newRows-1, 
        });
    }
    render(){
        // <workoutRows />

        return (
        <div className="container">
            <DaysOfWeek />
            <WorkoutRows numRows={this.state.numRows} removeRow={this.removeRow} addNewRow={() => this.addNewRow(this.state.numRows)}/>
        </div>

        )}
}

ReactDOM.render(<WorkoutBox />, document.getElementById("root"));