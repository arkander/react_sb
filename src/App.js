import {useState, useEffect} from 'react';
import './App.css';
import {getAllStudents} from './client';
import {Table, Avatar, Spin} from 'antd';
import Container from './Container';

//const getIndicatorIcon = ()=><Icon type="Loading" style={{fontSize:24}}/>;


function App() {

    const [students, setStudents] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchStudents = ()=>{
        setIsFetching(true);
        getAllStudents()
            .then(res=>res.json())
            .then(students=>{
               setIsFetching(false);
                setStudents(students);
            });
    }

    useEffect(()=>{
        fetchStudents();
    },[]);

    if(isFetching){
        return (<Container>
                    <Spin spinning={isFetching} size="large"  />

                </Container>);
    }


    if(students && students.length){
        const columns = [
            {title:'', key:'studentId', render:(text, student)=>(
                <Avatar size='large'>
                    {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}` }
                </Avatar>
                )},
            {title:'Student Id', dataIndex:'studentId', key:'studentId'},
            {title:'First Name', dataIndex:'firstName', key:'firstName'},
            {title:'Last Name', dataIndex:'lastName', key:'lastName'},
            {title:'Gender', dataIndex:'gender', key:'gender'},
            {title:'Email', dataIndex:'email', key:'email'}
        ];

        return (
            <Container>
                <Table dataSource={students}
                       columns={columns}
                       pagination={false}
                       rowKey='studentId'/>
            </Container> );



    }

  return (
    <h1>No Students found</h1>
  );
}

export default App;


