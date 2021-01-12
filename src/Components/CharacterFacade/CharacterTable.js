import React from "react";

export default function CharactersTable({character}){
    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">House</th>
                        <th scope="col">Birthdate </th>
                        <th scope="col">Actor</th>
                    </tr>
                </thead>
                <tbody>
                {character.map(m => <tr key={m.name}>
                                        <td>{m.name}</td>
                                        <td>{m.house}</td>
                                        <td>{m.dateOfBirth}</td>
                                        <td>{m.actor}</td>
                                    </tr>)}
                </tbody>
            </table>
         </React.Fragment>
    )
}