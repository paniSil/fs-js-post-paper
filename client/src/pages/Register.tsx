import axios from "axios";
import { Field, Form, Formik } from "formik";

const Register = () => {
  return (
    <div>
      <h2>Registration</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          age: "",
          avatar:
            "https://images.unsplash.com/photo-1495462911434-be47104d70fa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await axios.post("/auth/register", values);
            alert("Registration successful!");
            resetForm();
          } catch (error) {
            alert(`Registration failed! ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="form">
          <div>
            <label htmlFor="name">Username*:</label>
            <Field id="name" name="name" placeholder="Jane" />
          </div>

          <div>
            {" "}
            <label htmlFor="email">Email*:</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="jane@doe.com"
            />
          </div>

          <div>
            <label htmlFor="password">Password*:</label>
            <Field id="password" name="password" type="password" />
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <Field id="age" name="age" />
          </div>

          <div>
            <label htmlFor="avatar">Avatar Link:</label>
            <Field id="avatar" name="avatar" />
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
