import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import PlanDialog from "./PlanDialog";
import { Plan, RawPlan } from "../plan";
import Calendar from "./Calendar";
import { EventInput } from "@fullcalendar/core";

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
                <Calendar
                    events={events as EventInput[]}
                    setPlan={(plan) => setPlan(plan)}
                    openHandle={() => setOpen(true)}
                />
            </Grid>
        </Grid>
    );
}

export default LoggedIn;
