import { EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { toPlan, Plan } from "../../plan";
import { useEffect } from "react";

function Calendar({
    events,
    setPlan,
    openHandle,
}: {
    events: EventInput[];
    setPlan: (plan: Plan) => void;
    openHandle: () => void;
}) {
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
                openHandle();
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
    );
}

export default Calendar;
