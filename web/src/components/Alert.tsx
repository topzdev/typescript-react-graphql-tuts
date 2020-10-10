import React from "react";
import {
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Alert as CAlert,
  IAlert,
} from "@chakra-ui/core";

interface AlertProps {
  title: string;
  message: string;
  status: IAlert["status"];
}

const Alert: React.FC<AlertProps> = ({ title, message, status }) => {
  return (
    <CAlert status={status}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </CAlert>
  );
};

export default Alert;
