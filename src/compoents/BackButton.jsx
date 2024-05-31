import Button from "./Button";

import { useNavigate } from "react-router-dom";
function BackButton() {
  const navigation = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigation(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
