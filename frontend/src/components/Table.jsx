import {useEffect, useState} from 'react';
import './Table.css';
import defaultuserpfp from './img/defaultuserpfp.avif';
import {useHistory} from 'react-router-dom';
import {v4} from 'uuid';
const Table = () => {
    const history = useHistory();

    const[currentData, setCurrentData] = useState(null);

    //pageination
    const[currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

        //assigned after data retrieval
        const[records, setRecords] = useState([]);
        let npage = null;
        let numbers = null;

    const prePage = () => {
        if(currentPage != 1){
            setCurrentPage(currentPage - 1);
        }
    }
    const changeCPage = (n) => {
        setCurrentPage(n);
    }
    const nextPage = () => {
        if(currentPage != npage){
            setCurrentPage(currentPage + 1);
        }
    }
    //pagination

    // new employee fields
    const[name, setName] = useState("");
    const[phone, setPhone] = useState("");
    const[email, setEmail] = useState("");
    const[rating, setRating] = useState("");
    const[status, setStatus] = useState(false);
    const[hero_project, setHeroProject] = useState("");
    const[notes, setNotes] = useState("");
    //new employee fields

    const deleteVolunteer = (id) => {
        setCurrentData(currentData.filter((volunteer) => {
            return volunteer.id != id;
        }))
    }

    const addVolunteer = () => {
        setCurrentData([...currentData,     {
            "name": name,
            "avatar": defaultuserpfp,
            "hero_project": hero_project,
            "notes": notes,
            "email": email,
            "phone": phone,
            "rating": rating,
            "status": status,
            "id": v4(),
         }])
        
        setName("");
        setPhone("");
        setEmail("");
        setRating("");
        setStatus(false);
        setHeroProject("");
    }

    const goToVolunteer = (employeeroute) => {
        history.push(employeeroute);
    }
    useEffect(() => {
        fetch('http://localhost:5000/api/bog/users').then(
            response => response.json()
        ).then(
            data => {
                setCurrentData(data);
                setRecords(data.slice(firstIndex, lastIndex));
                npage = Math.ceil(data.length / recordsPerPage);
                numbers = [...Array(npage + 1).keys()].slice(1);
            }
        )
    }, [records]);



    if(currentData == null || currentData == 'undefined' || records == null){
        return (
            <p>Loading...</p>
        );
    }
    
    return (  
        <div style={{overflowX: "auto"}}>
            <table cellSpacing={0}>
            <thead>
                    <tr>
                    <th>Profile Picture</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Hero Project</th>
                    <th>Add/Delete</th>
                    </tr>
            </thead>
            <tbody>
                {records.map((volunteer) => (
                    <tr>
                        <td className="avatartd" onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}><img src={volunteer.avatar} /></td>
                        <td onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.name}</td>
                        <td onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.phone}</td>
                        <td onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.email}</td>
                        <td onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.rating}</td>
                        <td onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.status ? 'active' : 'inactive'}</td>
                        <td onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.hero_project}</td>
                        <td className="delete" onClick={()=>{deleteVolunteer(volunteer.id)}}><button>Delete</button></td>
                    </tr>
                    
                ))
                }
                <tr className="paginationrow">
                    <td colspan="8">
                        <nav>
                            <ul className="paginationul">
                                <li>
                                    <a href="#" onClick={prePage}>Prev</a>
                                </li>
                                {
                                    numbers.map((n,i) => (
                                        <li key={i} className={currentPage===n ? 'active' : ''}>
                                            <a href="#" onClick={()=> {changeCPage(n)}}>{n}</a>
                                        </li>
                                    ))
                                }
                                <li>
                                    <a href="#" onClick={nextPage}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    </td>
                </tr>
                <tr className="newVolunteerRow">
                    <td className="avatartd">
                        <img src={defaultuserpfp}/>
                    </td>
                    <td>
                        <input 
                        type="text"
                        placeholder="Name"
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                        type="text"
                        placeholder="Phone"
                        value = {phone}
                        onChange = {(e) => setPhone(e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                        type="text"
                        placeholder="Email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                        type="text"
                        placeholder="Rating"
                        value = {rating}
                        onChange = {(e) => setRating(e.target.value)}
                        />
                    </td>

                    <td>
                        <label>Active: </label>
                        <input 
                            type="checkbox"
                            className="checkbox"
                            checked = {status}
                            onChange = {(e) => setStatus(e.target.checked)}
                        />
                    </td>
                    <td>
                        <input 
                        type="text"
                        placeholder="Hero Project"
                        value = {hero_project}
                        onChange = {(e) => setHeroProject(e.target.value)}
                        />
                    </td>
                    <td className="add">
                        <button onClick={addVolunteer}>Add New Volunteer</button>
                    </td>
                </tr>
                <tr className="notessection">
                    <td colspan="8">
                        <textarea
                        placeholder='Enter notes here'
                        rows= "12"
                        cols= "75"
                        value= {notes}
                        onChange = {(e) => setNotes(e.target.value)}
                        />
                    </td>
                </tr>
            </tbody>
            </table>

            
        </div>
    );

}
 
export default Table;