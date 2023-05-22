import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Plan } from "../../plan";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import dayjs from "dayjs";
import CircleIcon from "@mui/icons-material/Circle";

function PlanDialog({
    open,
    handleClose,
    plan,
}: {
    open: boolean;
    handleClose: () => void;
    plan: Plan | null;
}) {
    const TimeContent = ({ title }: { title: string }) => {
        return (
            <DialogContent style={{ margin: 0, padding: "10px 20px" }}>
                <p>{title}</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopTimePicker
                        defaultValue={dayjs("2022-04-17T15:30")}
                        readOnly
                    />
                </LocalizationProvider>
            </DialogContent>
        );
    };
    const time = plan?.allDay ? (
        <DialogContent>
            <h3>終日</h3>
        </DialogContent>
    ) : (
        <>
            <TimeContent title="開始時刻" />
            <TimeContent title="終了時刻" />
        </>
    );
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            style={{
                minHeight: "300px",
                minWidth: "200px",
            }}
        >
            <DialogTitle>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                    }}
                >
                    <CircleIcon style={{ color: "blue" }} />
                    {plan?.title}
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{ color: "black" }}>
                    {plan?.detail}
                </DialogContentText>
            </DialogContent>
            {time}
            <DialogActions>
                <Button onClick={handleClose}>閉じる</Button>
                <Button onClick={handleClose}>編集</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PlanDialog;
