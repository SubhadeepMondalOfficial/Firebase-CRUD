import { useEffect, useState } from "react";
import "./App.css";
import firebaseConfigApp from "./config/firebase-config";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { InfinitySpin } from "react-loader-spinner";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

//Firebase db connection
const db = getFirestore(firebaseConfigApp);

const App = () => {
  const model = {
    employeeName: "",
    salary: "",
    joiningDate: "",
  };
  const [formData, setFormData] = useState(model);
  const [employeesData, setEmployeesData] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [loader, setLoader] = useState(false);

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
      setLoader(true);
      const docRef = await addDoc(collection(db, "employees"), formData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Employee Added Successfully Id ${docRef.id}`,
      });
      readDataFromDB(); //refresh the employee list in UI
      setLoader(false);
      setFormData(model); //after successfully entry clear the form data
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed !!!",
        text: error.message,
      });
      setLoader(false);
    }
  };

  const createEmployeeForm = (event) => {
    event.preventDefault();
    setEditEmployee(null);
    setFormData(model);
  };

  //! Read Data From Firebase
  const readDataFromDB = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const temp = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`)
        const document = doc.data();
        document.uid = doc.id; //also adding id with object for use in edit or delete data
        temp.push(document);
      });
      setEmployeesData(temp);

    } catch (error) {
      console.log("Failed to Fetch Data from DB, Error => ", error.message);
    }
  };

  useEffect(() => {
    readDataFromDB();
  }, []);

  //! Edit Employee in Firebase
  const editEmployeeHandler = (employee) => {
    setEditEmployee(employee);
    setFormData(employee);
  };

  const updateFormHandler = async (event) => {
    try {
      event.preventDefault();
      setLoader(true);
      const ref = doc(db, "employees", formData.uid);
      await updateDoc(ref, formData);
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: `Id: ${formData.uid}`,
      });
      setLoader(false);
      readDataFromDB();
      setFormData(model)
      setEditEmployee(null)

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update !!",
        text: `Error => ${error.message}`,
      });
    } finally {
      loader(false);
    }
  };

  //! Delete Employee from Firebase
  const deleteEmployee = async (uid) => {
    try {
      const ref = doc(db, "employees", uid);
      await deleteDoc(ref);
      readDataFromDB();
    } catch (error) {
      console.log(`Failed to Delete Data from DB, Error => ${error.message}`);
    }
  };

  return (
    <div>
      <h1>
        Firebase <span>CRUD</span>
      </h1>

      <main>
        {/* Form to Create New or Update Employees */}
        <form onSubmit={editEmployee ? updateFormHandler : submitFormHandler}>
          <label htmlFor="employeeName">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            required
            value={formData.employeeName}
            onChange={handleFormData}
          />

          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            required
            value={formData.salary}
            onChange={handleFormData}
          />

          <label htmlFor="joiningDate">Joining Date</label>
          <input
            type="date"
            id="date"
            name="joiningDate"
            required
            value={formData.joiningDate}
            onChange={handleFormData}
          />

          {loader ? (
            <div>
              <InfinitySpin
                visible={true}
                width="100"
                color="blueviolet"
                ariaLabel="infinity-spin-loading"
              />
            </div>
          ) : editEmployee ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Submit</button>
          )}

          {editEmployee ? (
            <p>
              Want to Add Employee?{" "}
              <button type="button" onClick={createEmployeeForm}>
                Create Now
              </button>
            </p>
          ) : (
            <p></p>
          )}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.employeeName}</td>
                  <td>{item.salary}</td>
                  <td>{item.joiningDate}</td>
                  <td>
                    <button
                      id="edit-btn"
                      onClick={() => editEmployeeHandler(item)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      id="delete-btn"
                      onClick={() => deleteEmployee(item.uid)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </main>
    </div>
  );
};

export default App;
