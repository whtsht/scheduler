import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import PlanShowDialog from "./PlanShowDialog";
import { Plan } from "../plan";
import Calendar from "./Calendar";

function LoggedIn() {
    const planList: Plan[] = [];

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
                <PlanShowDialog
                    open={open}
                    closeHandle={() => setOpen(false)}
                    plan={plan}
                />
                <Calendar
                    planList={planList}
                    setPlan={(plan) => setPlan(plan)}
                    openHandle={() => setOpen(true)}
                />
            </Grid>
        </Grid>
    );
}

export default LoggedIn;
