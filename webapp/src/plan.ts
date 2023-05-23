import { EventClickArg, EventInput } from "@fullcalendar/core";

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

function toEventInput(plan: Plan): EventInput {
    return {
        id: plan.plan_id,
        title: plan.title,
    };
}

// TODO
function getPlanList(lineID: string): Plan[] | undefined {
    return [];
}

// TODO
function addPlan(lineID: string, plna: Plan): boolean {
    return false;
}

// TODO
function modifyPlan(lineID: string, planID: number, plan: Plan): boolean {
    return false;
}

// TODO
function removePlan(lineID: string, planID: number): boolean {
    return false;
}

export type { RawPlan, Plan };
export { getPlanList, addPlan, modifyPlan, removePlan, toPlan, toEventInput };
