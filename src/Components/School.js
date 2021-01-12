import URL from "../settings";
import React, {useState, useEffect} from "react";
import '../App.css';
import Students from "./SchoolFacade/Students";
import Staff from "./SchoolFacade/Staff";
import House from "./SchoolFacade/House";

export default function School() {

    const [content, setContent] = useState([]);
    const [house,setHouse] = useState('');

    // ----------------- Studentlist ------------------------
    function handleGetStudentlist(event) {
        event.preventDefault();
        setContent(<Students URL={URL}/>);
    }

    // ----------------- Stafflist ------------------------
    function handleGetStafflist(event) {
        event.preventDefault();
        setContent(<Staff URL={URL}/>);
    }

    // ----------------- Hogwarts House ------------------------
    function handleFormSubmit(event) {
        event.preventDefault();
        setContent(<House URL={URL} house={house}/>);
    }
    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        setHouse(value);
    }


    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-6">
                    <h2>School</h2>
                    <p>Student, staff, house</p>
                    <p>Sorting after attributes</p>
                </div>    
            </div>

            <div className="row">
                <div className="col-6">
                    <button onClick={handleGetStudentlist} type="button" className="btn btn-success mt-2">
                        Get student list
                    </button>
                    <button onClick={handleGetStafflist} type="button" className="btn btn-success mt-2 ml-3">
                        Get staff list
                    </button>
                    <form className="mt-4" onSubmit={handleFormSubmit}>
                        <input className="form-control" id="inputHouse" 
                            aria-describedby="houseHelp" placeholder="Enter Hogwarts House" onChange={handleChange}/>  
                        <small id="houseHelp" className="form-text text-muted">
                            Gryffindor, Hufflepuff, Ravenclaw, Slytherin.
                        </small>
                        <button type="submit" className="btn btn-success mt-2">Find characters</button>
                    </form>
                </div>
            </div> 

            <div className="row">
                <div className="col-12 mt-3">
                    {content}
                </div>    
            </div>   
        </div>
    )
    
}