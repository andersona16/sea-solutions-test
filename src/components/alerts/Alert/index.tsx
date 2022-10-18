import { FC } from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";

import { Container } from "./styles";

interface IAlert {
  type: "info" | "danger" | "success";
  children: React.ReactNode;
}

const Alert: FC<IAlert> = ({ type, children }) => {
  return (
    <Container type={type}>
      {type === "danger" && <FiXCircle size={30} />}
      {type === "info" && <FiAlertCircle size={30} />}
      <p>{children}</p>
    </Container>
  );
};

export { Alert };
