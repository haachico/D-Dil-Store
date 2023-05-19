import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>OOPS! PAGE NOW FOUND!</h1>
      <Link to="/" className="back--button">
        &larr; Back
      </Link>
    </div>
  );
};

export default Error;
