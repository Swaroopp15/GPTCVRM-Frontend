import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Context } from "../../../../../Context/Context";
import { getStudentYears } from "../../../../functions/students";

function AddResults() {
  const { departmentNames } = useContext(Context);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear - 3);
  const [years, setYears] = useState();
  const [mode, setMode] = useState("manual");
  const [bulkData, setBulkData] = useState([]);
  const [bulkError, setBulkError] = useState("");
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState("");
  const fetchStudents = async (event) => {
    event.preventDefault();
    try {
      console.log("year:", year);
      
      const response = await fetch(
        import.meta.env.VITE_BACKEND + `students/for-results?admission_year=${year}&depo_code=${department}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        console.log(data);
        
      }
      else {
        alert("Failed to fetch students. Please check the department and year.");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("An error occurred while fetching students. Please try again.");
    }
  };

  const addResult = async (event) => {
    try {
      event.preventDefault();
      const data = {
        pin: event.target.pin.value,
        application_id: event.target.application.value,
        percentage: event.target.percentage.value,
        year: event.target.passed_year.value,
      };

      const response = await fetch(import.meta.env.VITE_BACKEND + "results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Result added successfully");
        event.target.reset();
      } else {
        alert("Failed to add result");
      }
    } catch (error) {
      console.error("Error at adding new Result:", error);
    }
  };

  const requiredColumns = [
    "pin",
    "application_id",
    "percentage",
    "year"
  ];

  const handleExcelUpload = (e) => {
    setBulkError("");
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) {
        setBulkError("The Excel file is empty.");
        return;
      }

      const actualColumns = Object.keys(jsonData[0]);
      const missingColumns = requiredColumns.filter(
        (col) => !actualColumns.includes(col)
      );

      if (missingColumns.length > 0) {
        setBulkError(`Missing column(s): ${missingColumns.join(", ")}`);
        return;
      }

      const invalidRows = jsonData
        .map((row, i) => ({ row, index: i + 2 }))
        .filter(({ row }) =>
          requiredColumns.some(
            (col) => row[col] === undefined || row[col] === ""
          )
        );

      if (invalidRows.length > 0) {
        setBulkError(
          `Invalid data in row(s): ${invalidRows
            .map((r) => r.index)
            .join(", ")}`
        );
        return;
      }

      setBulkData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleBulkSubmit = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND + "results/bulk",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bulkData),
        }
      );

      if (response.ok) {
        alert("Bulk results uploaded successfully!");
        setBulkData([]);
        console.log("Failed results : ", response.response);
        
      } else {
        setBulkError("Failed to upload bulk results.");
      }
    } catch (err) {
      console.error("Excel Upload Error:", err);
      setBulkError("Unexpected error occurred during upload.");
    }
  };
  const fetchYears = async () => {
    try {
      const data = await getStudentYears(department);
      if (data && data.length > 0) {
        
        setYears(data);
      } else {
        console.error("Failed to fetch years for the selected department.");
        setYears([]);
      }
    } catch (error) {
      console.error("Error fetching years:", error);
      setYears([]);
    }
  };

  useEffect(() => {
    fetchYears();
  }, [department]);
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add Result Record</h3>
        <p className="text-sm text-gray-500 mt-1">
          Choose method to add results
        </p>
      </div>

      <div className="flex mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === "manual"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMode("manual")}
        >
          Manual Entry
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === "bulk"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMode("bulk")}
        >
          Bulk Upload (Excel)
        </button>
      </div>

      {mode === "manual" && (
        <form onSubmit={addResult} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200 pb-4 mb-4 items-center">
            <div>
              <label
                htmlFor="depo_code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department
              </label>
              <select
                name="depo_code"
                id="depo_code"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                onChange={(e) => {setDepartment(e.target.value); fetchYears()}}
              >
                <option value="">Select Department</option>
                {departmentNames.map((item) => (
                  <option key={item.depo_code} value={item.depo_code}>
                    {item.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
               Admission Year
              </label>
            
              <select name="year" id="year" onChange={(e) => setYear(e.target.value)}>
                <option value="" disabled selected>Select Admission Year</option>
                {years && years.map((yearValue, index) => (
                  <option key={index} value={yearValue}>
                    {yearValue}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="flex"> */}
              <button onClick={fetchStudents}
               className=" w-[50%] h-[50%] mt-6 rounded-lg text-red-600 border border-red-600 hover:bg-red-700 hover:text-white transition-colors duration-200 flex items-center justify-center">
                Fetch Students
              </button>
            {/* </div> */}
</div>
<div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">


            <div className="">
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                PIN
              </label>
              
              <select name="pin" id="pin" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="" disabled selected>Select Student PIN</option>
                {students.map((student, index) =>  (
                   <option key={index} value={student.pin}>
                    {student.pin}
                  </option>
                ))}
              </select>
            </div>

<div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
               Issued Year (Or Passed Year)
              </label>
              <input
                type="number"
                name="passed_year"
                id="passed_year"
                defaultValue={currentYear}
                min="2017"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
<div>
              <label
                htmlFor="application"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Application ID
              </label>
              <input
                type="text"
                name="application"
                id="application"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
            </div>
            <div>
              <label
                htmlFor="percentage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Percentage
              </label>
              <input
                type="number"
                name="percentage"
                id="percentage"
                min="0"
                max="100"
                step="0.01"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            
                </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="reset"
              className="px-5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700"
            >
              Add Result Record
            </button>
          </div>
        </form>
      )}

      {mode === "bulk" && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Excel File
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleExcelUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          {bulkError && (
            <div className="text-red-600 font-medium">{bulkError}</div>
          )}

          {bulkData.length > 0 && (
            <>
              <div className="overflow-x-auto mt-4 border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      {requiredColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-2 text-left font-medium text-gray-600 uppercase tracking-wider"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bulkData.map((row, i) => (
                      <tr key={i}>
                        {requiredColumns.map((col) => (
                          <td key={col} className="px-4 py-2 whitespace-nowrap">
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setBulkData([])}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkSubmit}
                  className="px-5 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700"
                >
                  Upload Results
                </button>
              </div>
            </>
          )}

          <p className="text-sm text-gray-500">
            <b>
              Excel must contain columns(In Order): <code>pin</code>,{" "}
              <code>name</code>, <code>application_id</code>,{" "}
              <code>percentage</code>, <code>year</code>, <code>depo_code</code>
            </b>
          </p>
        </div>
      )}
    </div>
  );
}

export default AddResults;
