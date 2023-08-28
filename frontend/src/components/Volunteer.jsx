import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import './Volunteer.css';
const Volunteer = () => {
    const {id} = useParams();
    const[name, setName] = useState("");
    const[notes,setNotes] = useState("");
    useEffect(() => {
        fetch('http://localhost:5000/api/bog/users/' + id).then(
            response => response.json()
        ).then(
            data => {
                setNotes(data.notes);
                setName(data.name);
            }
        )
    }, []);
    return (
        <div>
            <h1>{name}'s Notes:</h1>
            <p>{notes}</p>
        </div>
      );
}
 
export default Volunteer;