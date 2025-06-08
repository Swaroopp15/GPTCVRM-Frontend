import React, { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { Context } from "../../../../../Context/Context";

function AddPlacements() {
  const { departmentNames } = useContext(Context);
  const currentYear = new Date().getFullYear();
  const [mode, setMode] = useState("manual");
  const [bulkData, setBulkData] = useState([]);
  const [bulkError, setBulkError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const addPlacement = async (event) => {
    try {
      event.preventDefault();
      const data = {
        pin: event.target.pin.value,
        name: event.target.name.value,
        company: event.target.company.value,
        role: event.target.role.value,
        package: event.target.package.value,
        depo_code: event.target.depo_code.value,
        year: event.target.year.value
      };

      const response = await fetch(import.meta.env.VITE_BACKEND + "placements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Placement added successfully");
        event.target.reset();
      } else {
        alert("Failed to add placement");
      }
    } catch (error) {
      console.error("Error at adding new placement:", error);
      alert("An error occurred while adding placement");
    }
  };

  const requiredColumns = ["pin", "name", "company", "role", "package", "year", "depo_code"];

  const handleExcelUpload = (e) => {
    setBulkError("");
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          setBulkError("The Excel file is empty.");
          return;
        }

        // Case-insensitive column matching
        const normalizedData = jsonData.map(row => {
          const normalizedRow = {};
          Object.keys(row).forEach(key => {
            const lowerKey = key.toLowerCase();
            normalizedRow[lowerKey] = row[key];
          });
          return normalizedRow;
        });

        const actualColumns = Object.keys(normalizedData[0]);
        const missingColumns = requiredColumns.filter(col => !actualColumns.includes(col));

        if (missingColumns.length > 0) {
          setBulkError(`Missing column(s): ${missingColumns.join(", ")}`);
          return;
        }

        const invalidRows = normalizedData
          .map((row, i) => ({ row, index: i + 2 }))
          .filter(({ row }) => 
            requiredColumns.some(col => row[col] === undefined || row[col] === "") ||
            isNaN(row.package) ||
            (row.year && isNaN(row.year))
          );

        if (invalidRows.length > 0) {
          setBulkError(`Invalid data in row(s): ${invalidRows.map(r => r.index).join(", ")}`);
          return;
        }

        // Ensure proper data types
        const validatedData = normalizedData.map(row => ({
          ...row,
          package: parseFloat(row.package),
          year: row.year ? parseInt(row.year) : currentYear
        }));

        setBulkData(validatedData);
      } catch (error) {
        console.error("Excel processing error:", error);
        setBulkError("Error processing Excel file. Please check the format.");
      }
    };
    reader.onerror = () => setBulkError("Error reading file");
    reader.readAsArrayBuffer(file);
  };

  const handleBulkSubmit = async () => {
    setIsUploading(true);
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND + "placements/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bulkData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Successfully uploaded ${result.insertedCount} placements!`);
        setBulkData([]);
      } else {
        setBulkError("Failed to upload bulk placements.");
      }
    } catch (err) {
      console.error("Bulk Upload Error:", err);
      setBulkError("Unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add Placement Record</h3>
        <p className="text-sm text-gray-500 mt-1">Choose method to add placements</p>
      </div>

      <div className="flex mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === "manual" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMode("manual")}
        >
          Manual Entry
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === "bulk" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMode("bulk")}
        >
          Bulk Upload (Excel)
        </button>
      </div>

      {mode === "manual" && (
        <form onSubmit={addPlacement} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                name="depo_code"
                id="depo_code"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
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
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                id="year"
                min="2017"
                max={currentYear}
                defaultValue={currentYear}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Student Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                PIN
              </label>
              <input
                type="text"
                name="pin"
                id="pin"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-2">
                Package (LPA)
              </label>
              <input
                type="number"
                name="package"
                id="package"
                min="0"
                step="0.01"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="reset"
              className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5"
            >
              Add Placement Record
            </button>
          </div>
        </form>
      )}

      {mode === "bulk" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Excel File
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleExcelUpload}
              disabled={isUploading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              <a
                href="/templates/placements-template.xlsx"
                download="placements-template.xlsx"
                className="text-blue-600 hover:text-blue-800"
              >
                Download Excel Template
              </a>
            </p>
          </div>

          {bulkError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              {bulkError}
            </div>
          )}

          {bulkData.length > 0 && (
            <>
              <div className="overflow-x-auto mt-4 border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {requiredColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bulkData.slice(0, 5).map((row, i) => (
                      <tr key={i}>
                        {requiredColumns.map((col) => (
                          <td key={col} className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {bulkData.length > 5 && (
                      <tr>
                        <td colSpan={requiredColumns.length} className="px-4 py-2 text-sm text-gray-500 text-center">
                          + {bulkData.length - 5} more records...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setBulkData([]);
                    setBulkError("");
                  }}
                  disabled={isUploading}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkSubmit}
                  disabled={isUploading}
                  className={`px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${
                    isUploading
                      ? "bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload Placements"}
                </button>
              </div>
            </>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Excel File Requirements:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>File should be in .xlsx, .xls, or .csv format</li>
              <li>Required columns: pin, name, company, role, package, depo_code, year</li>
              <li>First row should contain column headers</li>
              <li>Department should use department codes (matching dropdown values)</li>
              <li>Package should be in LPA (e.g., 3.5 for 3.5 LPA)</li>
              <li>Year should be in YYYY format (optional, defaults to current year)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPlacements;