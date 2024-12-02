import {
  reports,
  areValuesDecreasing,
  areValuesIncreasing,
  areValuesWithinThreshold,
} from "./part-01.mjs";

const testReportValididty = (report) => {
  return (
    (areValuesDecreasing(report) || areValuesIncreasing(report)) &&
    areValuesWithinThreshold(report)
  );
};

const getDampenedValidReports = () => {
  return reports.filter((report, index) => {
    const isValid = testReportValididty(report);

    // Check if the report is valid without any changes
    if (isValid) {
      return true;
    }

    // If the report is not valid, see if we can get it valid by removing a level.
    for (let i = 0; i < report.length; i++) {
      const newReport = report.filter((_, j) => j !== i);
      const newReportIsValid = testReportValididty(newReport);

      if (newReportIsValid) {
        return true;
      }
    }

    // Else, return false
    return false;
  });
};

console.log(getDampenedValidReports().length);
