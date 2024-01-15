import React, { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { postVerifyEmail } from "../../helpers/axiosHelper";

const VerifyEmail = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [response, setResponse] = useState({});
  const [searchParams] = useSearchParams();
  const associate = searchParams.get("e");
  const token = searchParams.get("c");

  useEffect(() => {
    // call axios helper to call api
    userEmailVerification();
  }, []);

  const userEmailVerification = async () => {
    const resp = await postVerifyEmail({ associate, token });
    setShowSpinner(false);
    setResponse(resp);
  };

  return (
    <Container fluid>
      <p className="rounded shadow-lg p-3 text-center fw-bold">
        Welcome to Tech Gear Admin CMS!
      </p>

      <div className="text-center mt-5">
        {showSpinner && <Spinner variant="primary" animation="border" />}
      </div>

      {response.message && (
        <Alert
          className="w-50"
          variant={response.status === "success" ? "success" : "danger"}
        >
          {response.message}
        </Alert>
      )}
    </Container>
  );
};

export default VerifyEmail;
