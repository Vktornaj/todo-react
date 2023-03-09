export enum Status {
    PENDING = "PENDING",
    STARTED = "STARTED",
    FINISHED = "FINISHED",
    PAUSED = "PAUSED",
    ABORTED = "ABORTED",
}

export type Todo = {
    id: string,
    title: string;
    description: string;
    status: Status;
    createDate: Date;
    doneDate: Date | null;
    deadline: Date | null;
    tags: Array<string>;
};
