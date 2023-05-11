export {}

declare global {
    interface Date {
        oneWeekBefore(): Date;
        toStringWithDateOnly(): string;
    }
}

Date.prototype.oneWeekBefore = function (): Date {
    let date = this;
    date.setDate(date.getDate() - 7);
    return date;
};

Date.prototype.toStringWithDateOnly = function (): string {
    return this.toISOString().split('T')[0];
};
