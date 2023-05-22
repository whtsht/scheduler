import FullCalendar from "@fullcalendar/react";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import dayjs from "dayjs";
import CircleIcon from "@mui/icons-material/Circle";
import { Plan, RawPlan, toPlan } from "../../plan";
import { EventInput } from "@fullcalendar/core";

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

function LoggedIn() {
    const events: RawPlan[] = [
        {
            id: "xxxxx",
            title: "予定名",
            start: "2023-05-10T12:30:00",
            extendedProps: {
                lineID: "yyyyy",
                detail: "詳細 ... ",
                notifTime: "2023-05-10T12:20:00",
                allDay: "2023-05-10T12:20:00",
                end: "2023-05-10T12:20:00",
            },
        },
    ];
    useEffect(() => {
        const setIcon = (name: string, icon: string) => {
            const button = document.querySelector(
                `.fc-${name}-button`
            ) as HTMLElement;
            button.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
        };
        setIcon("user", "person");
        setIcon("month", "calendar_month");
        setIcon("listMonth", "list");
    }, []);

    useEffect(() => {
        (async () => {
            const ret = await fetch("/web/hello");
            const text = await ret.text();
            console.log(text);
        })();
    }, []);

    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState<Plan | null>(null);

    return (
        <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid
                item
                style={{
                    minWidth: "100vw",
                }}
            >
                <PlanDialog
                    open={open}
                    handleClose={() => setOpen(false)}
                    plan={plan}
                />
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                    views={{
                        month: {
                            type: "dayGridMonth",
                            displayEventTime: false,
                            titleFormat: {
                                year: "numeric",
                                month: "2-digit",
                            },
                        },
                    }}
                    headerToolbar={{
                        start: "prev,title,next",
                        center: "",
                        end: "month,listMonth,user",
                    }}
                    customButtons={{
                        user: {
                            text: "",
                            click: () => {},
                        },
                    }}
                    viewDidMount={() => {
                        const headerTitle = document.querySelector(
                            ".fc-toolbar .fc-toolbar-title"
                        ) as HTMLElement;
                        headerTitle.addEventListener("click", function () {
                            // Handle the onClick event here
                            alert("Header title clicked");
                        });
                    }}
                    height="95vh"
                    contentHeight="95vh"
                    eventClick={(info) => {
                        setPlan(toPlan(info));
                        setOpen(true);
                    }}
                    initialView={"month"}
                    initialEvents={events as EventInput[]}
                    locales={allLocales}
                    locale="ja"
                    titleFormat={{
                        month: "short",
                        year: "numeric",
                    }}
                    dayCellContent={(e) => {
                        return e.dayNumberText.replace("日", "");
                    }}
                    buttonText={{
                        list: " ",
                        month: " ",
                    }}
                    dateClick={() => {}}
                />
            </Grid>
        </Grid>
    );
}

export default LoggedIn;
