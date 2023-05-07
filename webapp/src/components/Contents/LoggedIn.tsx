import FullCalendar from "@fullcalendar/react";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

function LoggedIn() {
    const INITIAL_EVENTS = [
        {
            id: "id",
            title: "バイト",
            start: "2023-05-07T16:00:00",
            color: "#000",
        },
        {
            id: "id",
            title: "資格試験",
            start: "2023-05-10T12:30:00",
            color: "red",
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
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                    views={{
                        month: {
                            type: "dayGridMonth",
                            displayEventTime: false,
                        },
                    }}
                    headerToolbar={{
                        start: "title",
                        center: "",
                        end: "month,listMonth,user",
                    }}
                    customButtons={{
                        user: {
                            text: "",
                            click: () => {},
                        },
                    }}
                    height="95vh"
                    contentHeight="95vh"
                    eventClick={(_) => {}}
                    displayEventTime={true}
                    initialView={"month"}
                    initialEvents={INITIAL_EVENTS}
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
                />
            </Grid>
        </Grid>
    );
}

export default LoggedIn;
