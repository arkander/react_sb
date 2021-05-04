import React , {useState, useEffect} from 'react';
import './App.css';
import {getAllStudents} from './client';
import {Table, Avatar, Spin, Modal, Empty} from 'antd';
import Container from './Container';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentForm';
import {errorNotification} from './Notification';
import Students from "./Students";

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
            }).catch(error=>{
                errorNotification(error.error.message, error.error.error);
            }).finally(()=>{
                setIsFetching(false);
            });
    }

    const openAddStudentModal = ()=>{
        setIsAddingStudentModalVisible(true);
    }

    const closeAddStudentModal = ()=>{
        setIsAddingStudentModalVisible(false);
    }

    const commonElements = () =>(
        <div>
            <Modal
                title='Add New Student'
                visible={isAddingStudentModalVisible}
                onOk={closeAddStudentModal}
                onCancel={closeAddStudentModal}
                width={1000}>
                <AddStudentForm onSuccess={()=>{
                    closeAddStudentModal();
                    fetchStudents();
                }}
                onFailure = {(err)=>{
                    errorNotification(err.error.message, err.error.httpStatus);
                }}/>
            </Modal>
            <Footer  numberOfStudents={students.length}
                     handleStudentAddClickEvent={openAddStudentModal}/>
        </div>
    );

    useEffect(()=>{
        fetchStudents();
    },[]);

    if(isFetching){
        return (<Container>
                    <Spin spinning={isFetching} size="large"  />
                </Container>);
    }

    if(students && students.length ){
        return (
            <Container >
                <Students data={students}/>
                {commonElements()}
            </Container> )

        /*const columns = [
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
            <Container >
                    <Table sticky={true}
                           dataSource={students}
                           columns={columns}
                           pagination={false}
                           rowKey='studentId'/>

                {commonElements()}
            </Container> );*/
    }

  return (
      <Container>
          <Empty description={
              <h1>No Students Found</h1>
          }/>
          {commonElements()}
      </Container>
  );
}

export default App;


