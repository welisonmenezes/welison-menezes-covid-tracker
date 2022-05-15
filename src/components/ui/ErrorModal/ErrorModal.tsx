import { Alert, Modal } from "@mui/material";
import "./ErrorModal.scss";

type ErrorModalProps = {
    message: string;
};

function ErrorModal({ message }: ErrorModalProps) {
    return (
        <Modal className="ErrorModal" open={true}>
            <div className="content">
                <Alert severity="error">{message}</Alert>
            </div>
        </Modal>
    );
}

export default ErrorModal;
