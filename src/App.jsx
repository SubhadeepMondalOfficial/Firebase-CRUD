import { useState } from "react";
import "./App.css";
import firebaseConfigApp from "./config/firebase-config";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";

//Firebase db connection
const db = getFirestore(firebaseConfigApp);

const App = () => {
  const model = {
    employeeName: "",
    salary: "",
    joiningDate: "",
  };
  const [formData, setFormData] = useState(model);

  function handleFormData(event) {
    // console.log(event.target)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "employees"), formData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Employee Added Successfully Id ${docRef.id}`,
      });
      //after successfully entry clear the form data
      setFormData(model);
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed !!!",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <h1>
        Firebase <span>CRUD</span>
      </h1>

      <main>
        {/* Form to Create New or Update Employees */}
        <form onSubmit={submitFormHandler}>
          <label htmlFor="employeeName">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleFormData}
          />

          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleFormData}
          />

          <label htmlFor="joiningDate">Joining Date</label>
          <input
            type="date"
            id="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleFormData}
          />

          <input type="submit" value="Submit" />
        </form>

        {/* Employees Details in Table */}
        <aside>
          <h3>Employees Details</h3>
          <table>
            <thead>
              <tr>
                <th>S/No</th>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Joining Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Er Subhadeep</td>
                <td>8000</td>
                <td>24-08-2024</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Er Arijit</td>
                <td>15000</td>
                <td>02-08-2014</td>
              </tr>
            </tbody>
          </table>
        </aside>
      </main>
    </div>
  );
};

export default App;
