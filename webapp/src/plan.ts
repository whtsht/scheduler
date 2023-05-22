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
    notif_time: string;
    allDay: string | null;
    start: string | null;
    end: string | null;
}

function toPlan(info: EventClickArg): Plan {
    return {
        plan_id: info.event.id,
        title: info.event.title,
        detail: info.event.extendedProps.detail,
        notif_time: info.event.extendedProps.notif_time,
        allDay: info.event.extendedProps.allDay,
        start: info.event.extendedProps.start,
        end: info.event.extendedProps.end,
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
