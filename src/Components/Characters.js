import URL from "../settings";
import React, {useState, useEffect} from "react";
import '../App.css';
import CharacterTable from "./CharacterFacade/CharacterTable";

export default function Characters() {

    // Fetch all, search by character name
    const url = URL + '/api/potter/characters'

    const [characters, setCharacters] = useState([]);
    const [defaultData, setDefaultData] = useState([]);
    const [name,setName] = useState('');
    const [character, setCharacter] = useState([]);

    function fetchCharacters(){
        fetch(url)
            .then((res) => res.json())
            .then((data) => setCharacters(data.characterDTOList))
            .catch((err) => console.log("An error have occured."));
    }

    function fetchAllData(){
        fetch(url)
            .then((res) => res.json())
            .then((data) => setDefaultData(data))
            .catch((err) => console.log("An error have occured."));
    }

    useEffect(() => {
        fetchCharacters();
        fetchAllData();
    }, [])

// ----------------- All characters button ------------------------
    function handleGetAllSubmit(event) {
        event.preventDefault();
        setCharacters(defaultData.characterDTOList);
    }

// ----------------- Form ------------------------
    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        setName(value);
    }

    function createList() {
        const found = characters.find(element => element.name === name);
        if (found !== undefined){
            console.log(found);
            var hogwartsStudent = "";
            var hogwartsStaff = "";
            var alive = "";
    
            if (found.hogwartsStudent){
                hogwartsStudent = "is a Hogwarts student";
            } else {
                hogwartsStudent = "is NOT a Hogwarts student";
            }
    
            if (found.hogwartsStaff){
                hogwartsStaff = "is a part of the Hogwarts staff";
            } else {
                hogwartsStaff = "is NOT a part of the Hogwarts staff";
            }
    
            if (found.alive){
                alive = "is alive";
            } else {
                alive = "is dead";
            }
            return (
                <React.Fragment>
                    <p className="mt-3"><b>{found.name}...</b></p>
                    <ul>
                        <li>{hogwartsStudent}</li>
                        <li>{hogwartsStaff}</li>
                        <li>is a {found.house} student</li>
                        
                        <li>Birthdate: {found.dateOfBirth}</li>
                        <li>is {found.ancestry}</li>
    
                        <li>has {found.eyeColour} eyes</li>
                        <li>has {found.hairColour} hair</li>
                        <li>patronus is: {found.patronus}</li>
                        <li>is played by {found.actor}</li>
                        <li>{alive}</li>
                    </ul>
                    <img src={found.image} alt={found.name}></img>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <p className="mt-3"><b>The character does not exist.</b></p>
                </React.Fragment>
            )
        }
        }
        
    
    function handleFormSubmit(event) {
        event.preventDefault();
        setCharacter(createList);
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-8">
                    <h2>Characters</h2>
                </div>
            </div>


            <div className="row">
                <div className="col-8">
                    <p className="time">{defaultData.time}</p>
                    <CharacterTable character={characters}/>
                </div>  
                
                <div className="col-4">
                    <button onClick={handleGetAllSubmit} type="button" className="btn btn-info mt-2 ml-2">
                        Get all characters
                    </button>

                    <form onSubmit={handleFormSubmit} className="mt-4">
                        <label htmlFor="exampleInputCharacterName">Character Name:</label>
                        <input className="form-control" id="exampleInputCharacterName" 
                            aria-describedby="characterNameHelp" placeholder="Enter character name" 
                            onChange={handleChange}/>  
                        <button type="submit" className="btn btn-success mt-2">Find character</button>
                    </form>
                    {character}
                </div>
            </div>
        </div>
    );

}