import { EventClickArg } from "@fullcalendar/core";

interface RawPlan {
    id: string;
    title: string;
    start: string | null;
    extendedProps: ExtendedProps;
}

interface ExtendedProps {
    lineID: string;
    detail: string;
    notifTime: string;
    allDay: string | null;
    end: string | null;
}

interface Plan {
    plan_id: string;
    title: string;
    detail: string;
    notif_time: Date;
    allDay: Date | null;
    start: Date | null;
    end: Date | null;
}

function toPlan(info: EventClickArg): Plan {
    const toDate = (date: null | string) => {
        if (date !== null) {
            return new Date(date);
        } else {
            return null;
        }
    };
    return {
        plan_id: info.event.id,
        title: info.event.title,
        detail: info.event.extendedProps.ditail,
        notif_time: new Date(info.event.extendedProps.notif_time),
        allDay: toDate(info.event.extendedProps.allDay),
        start: toDate(info.event.extendedProps.start),
        end: toDate(info.event.extendedProps.end),
    };
}

// TODO
function getPlanList(lineID: string): RawPlan[] {
    return [];
}

// TODO
function addPlan(lineID: string, plna: Plan) {}

// TODO
function modifyPlan(lineID: string, planID: number, plan: Plan) {}

// TODO
function removePlan(planID: number) {}

export type { RawPlan, Plan };
export { getPlanList, addPlan, modifyPlan, removePlan, toPlan };
