import { CircularProgress, Modal } from "@mui/material";
import "./Loading.scss";

type LoadingProps = {
    isOpen: boolean;
};

function Loading({ isOpen }: LoadingProps) {
    return (
        <Modal className="Loading" open={isOpen}>
            <div className="content">
                <CircularProgress />
            </div>
        </Modal>
    );
}

export default Loading;
