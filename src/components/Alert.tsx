import { Alert } from "antd";

const AlertComponent = () => (
  <Alert
    message="Error!"
    description="An error occurred while accessing the server"
    type="error"
    showIcon
  />
);

export default AlertComponent;
