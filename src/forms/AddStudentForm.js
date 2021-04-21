import React , {Component} from 'react';
import {Formik} from 'formik';
import {Input, Button} from "antd";

const inputStyle = {marginBottom:'5px'};

class AddStudentForm extends Component{

    render() {
        return(
            <Formik
                initialValues={{firstName:'', lastName:'', email: '', gender: '' }}
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
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
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
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            style={inputStyle}
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder='First Name'
                        />
                        {errors.firstName && touched.firstName && errors.firstName}

                        <Input
                            style={inputStyle}
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder='Last Name'
                        />
                        {errors.lastName && touched.lastName && errors.lastName}

                        <Input
                            style={inputStyle}
                            name="email"
                            type='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email'
                        />
                        {errors.email && touched.email && errors.email}

                        <Input
                            style={inputStyle}
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            placeholder='Gender. E.g Male or Female'
                        />
                        {errors.gender && touched.gender && errors.gender}
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>

        );
    }
}

export default  AddStudentForm;