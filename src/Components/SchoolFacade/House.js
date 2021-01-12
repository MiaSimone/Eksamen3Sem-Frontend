import React, {useState, useEffect} from "react";

export default function Staff({URL, house}) {

    const url = URL + '/api/potter/students/house/' + house;
    const [students, setStudents] = useState([]);

    function fetchStudents(){
        fetch(url)
            .then((res) => res.json())
            .then((data) => setStudents(data.characterDTOList))
            .catch((err) => console.log("An error have occured."));
    }
    console.log(url);
    useEffect(() => {
        fetchStudents();
    }, [house])

    console.log(students);
    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">House</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Ancestry</th>
                        <th scope="col">Eye Colour</th>
                        <th scope="col">Hair Colour</th>
                        <th scope="col">Patronus</th>
                    </tr>
                </thead>
                <tbody>
                {students.map(m => <tr key={m.name}>
                                        <td>{m.name}</td>
                                        <td>{m.house}</td>
                                        <td>{m.dateOfBirth}</td>
                                        <td>{m.ancestry}</td>
                                        <td>{m.eyeColour}</td>
                                        <td>{m.hairColour}</td>
                                        <td>{m.patronus}</td>
                                    </tr>)}
                </tbody>
            </table>
         </React.Fragment>
    )
    
}