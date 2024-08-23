import "./App.css";

const App = () => {
  return (
    <div>
      <h1>
        Firebase <span>CRUD</span>
      </h1>

      <main>
        {/* Form to Create New or Update Employees */}
        <form>
          <label htmlFor="employeeName">Employee Name</label>
          <input type="text" id="employeeName" />

          <label htmlFor="salary">Salary</label>
          <input type="number" id="salary" />

          <label htmlFor="joiningDate">Joining Date</label>
          <input type="date" id="date" />

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
