import React, {useState} from 'react';
import {Avatar, Table} from "antd";
import {getAllCourseByStudent} from './client';
import {errorNotification} from "./Notification";


const Students = ({data})=>{

    const [nestedData, setNestedData] = useState({});
    const [isLoading, setIsLoading] = useState({});

    const handleExpand = (expanded, record) => {
        setIsLoading({[record.studentId]: true });
        getAllCourseByStudent(record.studentId)
            .then(res=>res.json())
            .then(courses=>{
                setNestedData(state=>({...state, [record.studentId]:courses}));
            }).catch(error=>{
            errorNotification(error.error.message, error.error.error);
        }).finally(()=>{
            setIsLoading({[record.studentId]: false });
        });
    };

    const expandedRowRender = record => {

        const columns = [
            {title:"Student Id", dataIndex:"studentId", key:"studentId"},
            {title:"Course Id", dataIndex:"courseId", key:"courseId"},
            {title:"Name", dataIndex:"name", key:"name"},
            {title:"Description", dataIndex:"description", key:"description"},
            {title:"Department", dataIndex:"department", key:"department"},
            {title:"Teachers Name", dataIndex:"teacherName", key:"teacherName"},
            {title:"Start Date", dataIndex:"startDate", key:"startDate"},
            {title:"End Date", dataIndex:"endDate", key:"endDate"},
            {title:"Grade", dataIndex:"grade", key:"grade"}
        ];

        const data = nestedData[record.studentId];
        console.log(data)

        return (<Table
                loading={isLoading[record.studentId] && !data}
                columns={columns}
                dataSource={nestedData[record.studentId]}
                pagination={false}
            />
        );
    }

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
        <Table sticky={true}
               dataSource={data}
               columns={columns}
               expandedRowRender={expandedRowRender}
               onExpand={handleExpand}
               pagination={false}
               rowKey='studentId'/>
    );
}

export default  Students;