import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="success-page">
      <h2>✅ Application Submitted Successfully</h2>
      <p>Your application has been submitted successfully. Please keep checking your email for updates.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
