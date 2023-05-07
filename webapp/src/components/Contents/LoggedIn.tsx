import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";

function LoggedIn() {
    const initialView = "dayGridMonth";
    const INITIAL_EVENTS = [
        {
            id: "id",
            title: "my event",
            start: "2023-05-10",
            color: "#000",
        },
    ];

    return (
        <div
            style={{
                width: "100vw",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "inline-block",
                    width: "90vw",
                    margin: "5vw",
                }}
            >
                <FullCalendar
                    headerToolbar={{
                        start: "title",
                        center: "",
                        end: "today",
                    }}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    height="80vh"
                    initialView={initialView}
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
                />
            </div>
        </div>
    );
}

export default LoggedIn;
