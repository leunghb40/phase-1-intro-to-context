// Define the createEmployeeRecord function
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Define the createEmployeeRecords function
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Define the createTimeInEvent function
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date,
    });
    return employeeRecord;
  }
  
  // Define the createTimeOutEvent function
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date,
    });
    return employeeRecord;
  }
  
  // Define the hoursWorkedOnDate function
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((e) => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((e) => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Define the wagesEarnedOnDate function
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Define the allWagesFor function
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map((e) => e.date);
    const wages = dates.map((date) => wagesEarnedOnDate(employeeRecord, date));
    return wages.reduce((total, wage) => total + wage);
  }
  
  // Define the calculatePayroll function
  function calculatePayroll(employeeRecords) {
    const totalWages = employeeRecords.reduce(
      (total, employeeRecord) => total + allWagesFor(employeeRecord),
      0
    );
    return totalWages;
  }