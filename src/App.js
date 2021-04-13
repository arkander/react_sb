import {useState, useEffect} from 'react';
import './App.css';
import {getAllStudents} from './client';

function App() {

    const [students, setStudents] = useState([]);

    const fetchStudents = ()=>{
        getAllStudents()
            .then(res=>res.json())
            .then(students=>{
                console.log(students)
                setStudents(students);
            });
    }

    useEffect(()=>{
        fetchStudents();
    },[]);

    if(students && students.length){
        return students.map((student, id) =>{
                    return (
                        <div key={id}>
                            <h2>{student.id}</h2>
                            <p>{student.firstName} {student.lastName}</p>
                            <p>{student.gender} </p>
                            <p>{student.email} </p>
                        </div>
                    );
        });
    }

  return (
    <h1>No Students found</h1>
  );
}

export default App;


