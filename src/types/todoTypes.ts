export enum Status {
    PENDING = "PENDING",
    STARTED = "STARTED",
    DONE = "DONE",
    PAUSED = "PAUSED",
    ABORTED = "ABORTED",
}

export type Todo = {
    id: string | null,
    title: string;
    description: string;
    status: Status;
    createDate: Date | null;
    doneDate: Date | null;
    deadline: Date | null;
    tags: Array<string>;
};
