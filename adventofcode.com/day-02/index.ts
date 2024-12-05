// // https://adventofcode.com/2024/day/2

export const parseInput = (input: string) => {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      return line
        .trim()
        .split(" ")
        .map((value) => parseInt(value));
    });
};

// Check if the values all increase in value from the next value in the list
export const areValuesIncreasing = (report: number[]): boolean => {
  return report.every((level, i) => {
    // Return true if the last element in the array is reached
    if (i === report.length - 1) {
      return true;
    }

    // Check if the next level is greater than the current level
    return level < report[i + 1];
  });
};

// Check if the values all decrease in value from the next value in the list
export const areValuesDecreasing = (report: number[]): boolean => {
  return report.every((level, i) => {
    // Return true if the last element in the array is reached
    if (i === report.length - 1) {
      return true;
    }

    // Check if the next level is less than the current level
    return level > report[i + 1];
  });
};

// Any two adjacent levels differ by at least one and at most three.
export const areValuesWithinThreshold = (report: number[]): boolean => {
  return report.every((level, i) => {
    // Return true if the last element in the array is reached
    if (i === report.length - 1) {
      return true;
    }

    const difference = Math.abs(level - report[i + 1]);

    return difference >= 1 && difference <= 3;
  });
};

// Check if the report is valid
const testReportValididty = (report: number[]): boolean => {
  return (
    (areValuesDecreasing(report) || areValuesIncreasing(report)) &&
    areValuesWithinThreshold(report)
  );
};

// Get a list of the valid reports
export const getValidReports = (reports: number[][]) => {
  return reports.filter((report: number[]) => testReportValididty(report));
};

export const getDampenedValidReports = (reports: number[][]) => {
  return reports.filter((report, index) => {
    const isValid = testReportValididty(report);

    // Check if the report is valid without any changes
    if (isValid) {
      return true;
    }

    /* 
        If the report is not valid, see if we can get it valid by removing a level.
        If we find a case where removing a level makes the report valid, return true.
    */
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
