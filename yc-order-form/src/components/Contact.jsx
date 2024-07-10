import { useState } from "react";
import Swal from "sweetalert2";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

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

  return (
    <div className="container">
      <div className="card">
        <div className="form">
          <div className="header">
            <div className="img">
              <img src="./public/ycLogo.jpg" alt="company_logo" />
            </div>
            <div className="heading">
              <h2>YC Order Form</h2>
            </div>
          </div>
          <div className="formbox">
            <div>
              <form onSubmit={onSubmit}>
                <input type="text" name="name" />
                <input type="email" name="email" />
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
