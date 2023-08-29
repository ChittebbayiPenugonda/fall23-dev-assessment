import {useEffect, useState} from 'react';
import './Table.css';
import defaultuserpfp from './img/defaultuserpfp.avif';
import {useHistory} from 'react-router-dom';
import {v4} from 'uuid';
const Table = () => {
    const history = useHistory();

    const[currentData, setCurrentData] = useState(null);

    //pageination
    let currentPage = 1;
    const[currentPageDisplay, setCurrentPageDisplay] = useState(1); 
    const recordsPerPage = 10;
    let lastIndex = currentPage * recordsPerPage;
    let firstIndex = lastIndex - recordsPerPage;

        //assigned after data retrieval
        const[records, setRecords] = useState(null);
        let npage = currentData != null ? Math.ceil(currentData.length / recordsPerPage) : null;
        const[numbers, setNumbers] = useState(null);


    const updatePageDisplay = (n) => {
        console.log("u" + n);
        currentPage = n;
        setCurrentPageDisplay(n);
        npage = Math.ceil(currentData.length / recordsPerPage);
        lastIndex = currentPage * recordsPerPage;
        firstIndex = lastIndex - recordsPerPage;
        setRecords(currentData.slice(firstIndex, lastIndex));
    }
    const prePage = () => {
        if(currentPageDisplay != 1){
            updatePageDisplay(currentPageDisplay - 1);
        }
    }
    const changeCPage = (n) => {
        console.log("c" + n);
        updatePageDisplay(n)
    }
    const nextPage = () => {
        console.log(currentPageDisplay + " " + currentPage + " " + npage)
        if(currentPageDisplay != npage){
            updatePageDisplay(currentPageDisplay + 1);
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

        let prevLength = currentData.length;
        let newData = currentData.filter((volunteer) => {
            return volunteer.id != id;
        });
        setCurrentData(newData);
        setRecords(newData.slice(firstIndex, lastIndex))
        npage = Math.ceil((prevLength-1) / recordsPerPage);
        setNumbers([...Array(npage + 1).keys()].slice(1));
    }

    const addVolunteer = () => {
        let prevLength = currentData.length;
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

        npage = Math.ceil((prevLength+1) / recordsPerPage);
        console.warn("a" + npage)
        setNumbers([...Array(npage + 1).keys()].slice(1));
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
                setNumbers([...Array(npage + 1).keys()].slice(1));

            }
        )
    }, []);



    if(currentData == null || currentData == 'undefined' || records == null ){
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
                {records?.map((volunteer) => (
                    <tr>
                        <td className="avatartd infotd" onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}><img src={volunteer.avatar} /></td>
                        <td className="infotd" onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.name}</td>
                        <td className="infotd" onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.phone}</td>
                        <td className="infotd" onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.email}</td>
                        <td className="infotd" onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.rating}</td>
                        <td className="infotd" onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.status ? 'active' : 'inactive'}</td>
                        <td className="infotd" onClick= {() => {goToVolunteer('/volunteer/' + volunteer.id)}}>{volunteer.hero_project}</td>
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
                                        <li key={i} className={currentPageDisplay===n ? 'active' : ''}>
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