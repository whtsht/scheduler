import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Plan } from "../plan";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Textarea from "@mui/joy/Textarea";
import dayjs from "dayjs";
import CircleIcon from "@mui/icons-material/Circle";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function PlanDialog({
    open,
    handleClose,
    plan,
}: {
    open: boolean;
    handleClose: () => void;
    plan: Plan | null;
}) {
    const TimeContents = plan?.allDay ? (
        <>
            <TimeContent title="通知時間" time={"2023-11-18"} />
            <TimeContent title="終日" time={"2023-11-18"} />
        </>
    ) : (
        <>
            <TimeContent title="通知時間" time={"2023-11-18"} />
            <TimeContent title="開始時刻" time={"2023-11-18T11:55"} />
            <TimeContent title="終了時刻" time={"2023-11-18T11:55"} />
        </>
    );

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <TitleContent title={plan?.title} />
            <DetailContent detail={plan?.detail} />
            {TimeContents}
            <ActionContent handleClose={handleClose} />
        </Dialog>
    );
}

function TitleContent({ title }: { title: string | undefined }) {
    return (
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
                {title}
            </div>
        </DialogTitle>
    );
}

function DetailContent({ detail }: { detail: string | undefined }) {
    return (
        <div
            style={{
                flexWrap: "wrap",
                gap: "40px",
                padding: "0px 20px",
            }}
        >
            <p>メモ</p>
            <Textarea minRows={3} size="lg" disabled value={detail} />
        </div>
    );
}

function ActionContent({ handleClose }: { handleClose: () => void }) {
    return (
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
                閉じる
            </Button>
            <Button onClick={handleClose} autoFocus>
                編集
            </Button>
            <Button onClick={handleClose} autoFocus>
                削除
            </Button>
        </DialogActions>
    );
}

function TimeContent({ title, time }: { title: string; time: string }) {
    console.log(dayjs(time));
    return (
        <DialogContent>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "20px",
                }}
            >
                <div style={{ width: "70px" }}>
                    <p>{title}</p>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        defaultValue={dayjs(time)}
                        ampm={false}
                        readOnly
                        format="YYYY/MM/DD  HH:mm"
                    />
                </LocalizationProvider>
            </div>
        </DialogContent>
    );
}

export default PlanDialog;
