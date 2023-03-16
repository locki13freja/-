module.exports=checkDateValidation = (startDate, endDate, events) => {
    for (let i=0; i<events.length; i++) {
        if (
            (startDate >= events[i].startDate && startDate < events[i].endDate) ||
            (endDate > events[i].startDate && endDate <= events[i].endDate) ||
            (startDate < events[i].startDate && endDate > events[i].endDate)
        ) {
            throw new Error("You cannot create an event at this time");
        }
    }
};
