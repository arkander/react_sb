import React  from 'react';
import {Formik} from 'formik';
import {Input, Button, Tag} from "antd";
import {addNewStudent} from "../client";

const inputStyle = {marginBottom:'5px'};

const tagMessage = (errorMessage)=>{
    let tagStyle = {backgroundColor:'#f50', color:'white', ...inputStyle};
    return <Tag style={tagStyle}>{errorMessage}</Tag>
}

const  AddStudentForm  = (props) =>
(
            <Formik
                initialValues={{firstName:'', lastName:'', email: '', gender: '' }}
                isInitialValid={false}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.firstName) {
                        errors.firstName = 'First name is Required';
                    }

                    if (!values.lastName) {
                        errors.lastName = 'Last name is Required';
                    }

                    if (!values.gender) {
                        errors.gender = 'Gender is Required';
                    }else if(!['male','female'].includes(values.gender.toString().toLowerCase())){
                        errors.gender = 'Gender is Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    addNewStudent(values).then(()=>{
                       props.onSuccess();
                    }).catch(err =>{
                            props.onFailure(err);
                        }
                    ).finally(()=>{
                        setSubmitting(false);
                    });
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      submitForm,
                      isValid
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        {errors.firstName && touched.firstName && tagMessage(errors.firstName)}
                        <Input
                            style={inputStyle}
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder='First Name'
                        />

                        {errors.lastName && touched.lastName && tagMessage(errors.lastName)}
                        <Input
                            style={inputStyle}
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder='Last Name'
                        />

                        {errors.email && touched.email && tagMessage(errors.email)}
                        <Input
                            style={inputStyle}
                            name="email"
                            type='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email Required'
                        />

                        {errors.gender && touched.gender && tagMessage(errors.gender)}
                        <Input
                            style={inputStyle}
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            placeholder='Gender. E.g Male or Female'
                        />

                        <Button type="submit"
                                disabled={isSubmitting | (touched && !isValid)}
                                onClick={()=>submitForm()}>
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>

        );


export default  AddStudentForm;