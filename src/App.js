import {useState, useEffect} from 'react';
import './App.css';
import {getAllStudents} from './client';
import {Table, Avatar, Spin, Modal} from 'antd';
import Container from './Container';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentForm';




function App() {

    const [students, setStudents] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isAddingStudentModalVisible, setIsAddingStudentModalVisible] = useState(false);

    const fetchStudents = ()=>{
        setIsFetching(true);
        getAllStudents()
            .then(res=>res.json())
            .then(students=>{
               setIsFetching(false);
                setStudents(students);
            });
    }

    const openAddStudentModal = ()=>{
        setIsAddingStudentModalVisible(true);
    }

    const closeAddStudentModal = ()=>{
        setIsAddingStudentModalVisible(false);
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
                <Modal
                    title='Add New Student'
                    visible={isAddingStudentModalVisible}
                    onOk={closeAddStudentModal}
                    onCancel={closeAddStudentModal}
                    width={1000}
                >
                    <AddStudentForm/>
                </Modal>
                <Footer numberOfStudents={students.length}
                        handleStudentAddClickEvent={openAddStudentModal}/>
            </Container> );



    }

  return (
    <h1>No Students found</h1>
  );
}

export default App;


