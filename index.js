function createEmployeeRecord(record){
    let employee = {
        firstName: record[0],
        familyName: record [1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(employeData){
    return employeData.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(employee, time) {
    const timeInStamp = {
        type: "TimeIn",
        hour: parseInt(time.substr(11, 4)),
        date: time.substr(0, 10)
    };
    employee.timeInEvents.push(timeInStamp);
    return employee;
}

function createTimeOutEvent(employee, time) {
    const timeOutStamp = {
        type: "TimeOut",
        hour: parseInt(time.substr(11, 4)),
        date: time.substr(0, 10)
    };
    employee.timeOutEvents.push(timeOutStamp);
    return employee;
}

function hoursWorkedOnDate(employee, time) {
    const inTime = employee.timeInEvents.find(event => event.date === time);
    const outTime = employee.timeOutEvents.find(event => event.date === time);

    if (inTime && outTime) {
        const hoursWorked = Math.abs((outTime.hour - inTime.hour) / 100);
        return Math.round(hoursWorked);
    } else {
        return 0;
    }
}

function wagesEarnedOnDate(employee, time) {
    let payment = hoursWorkedOnDate(employee, time) * employee.payPerHour;
    return payment;
}

function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(event => event.date);

    let payable = eligibleDates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(employee, date);
    }, 0);

    return payable;
}

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce((memo, employeeRecord) => {
        return memo + allWagesFor(employeeRecord);
    }, 0);
}



