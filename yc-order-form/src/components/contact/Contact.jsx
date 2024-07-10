import { useState } from "react";
import Swal from "sweetalert2";
import "./Contact.css";
import * as XLSX from 'xlsx';

export default function Contact() {
  const [result, setResult] = useState("");
  const State = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const loadingType = ["CKD", "SKD", "Full fitted", "By Driving"];

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // const object = {};
    // formData.forEach(function (value, key) {
    //   object[key] = value;
    // });
    const json = JSON.stringify(object);

    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    const file = XLSX.writeFile(workbook, "DataSheet.xlsx");

    // console.log(formData.target)

    formData.append("access_key", "a051c910-2001-48c9-b242-2adafc927f38");
    formData.append("attachment",file)



    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        position: "top-mid",
        icon: "success",
        title: "Your message has been sent",
        showConfirmButton: false,
        timer: 1500,
      });
      setResult("Form Submitted Successfully");

      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const modelSelect = () => {
    Swal.fire({
      position: "top-mid",
      icon: "success",
      title: "Your message has been sent",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="form">
          <div className="header">
            <div className="img">
              <img src="ycLogo.jpg" alt="company_logo" />
            </div>
            <div className="heading">
              <h2>YC Order Form</h2>
            </div>
          </div>
          <div className="formbox">
            <div>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name here"
                  required
                />
                <select name="State">
                  <option value="">State</option>
                  {State.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <select name="Loading Type">
                  <option value="">Loading Type</option>
                  {loadingType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select name="Model" onCanPlay={modelSelect}>
                  <select name="Model"></select>
                  <select name="Color"></select>
                  <select name="Model"></select>
                </select>
                <textarea name="message"></textarea>

                <button type="submit">Submit Form</button>
              </form>
              <span>{result}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
