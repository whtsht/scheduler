import FullCalendar from "@fullcalendar/react";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import Container from "@mui/material/Container";

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

    return (
        <Container>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                views={{
                    dayGridMonthNoTime: {
                        type: "dayGridMonth",
                        displayEventTime: false,
                    },
                }}
                headerToolbar={{
                    start: "prev,title,next",
                    center: "",
                    end: "dayGridMonthNoTime,listMonth",
                }}
                height="85vh"
                eventClick={(_) => {}}
                moreLinkClick={() => alert("clicked")}
                displayEventTime={true}
                initialView={"dayGridMonthNoTime"}
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
                    list: "リスト",
                }}
            />
        </Container>
    );
}

export default LoggedIn;
