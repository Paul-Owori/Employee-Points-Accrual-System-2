export const pointsLeft = employee => {
  console.log(employee);
  //Function to count the months of tenure of an employee
  const monthDiff = (today, joinDate) => {
    let months;
    months =
      (new Date(today).getFullYear() - new Date(joinDate).getFullYear()) * 12;
    months -= new Date(today).getMonth();
    months += new Date(joinDate).getMonth();
    return months <= 0 ? 0 : months;
  };

  //Return points per month based on tier
  const pointsPerMonth = tier => {
    if (tier === "A") {
      return 5;
    } else if (tier === "B") {
      return 10;
    } else if (tier === "C") {
      return 15;
    } else if (tier === "D") {
      return 20;
    } else if (tier === "E") {
      return 25;
    } else {
      return 0;
    }
  };

  //Points multiplier based on tenure
  const pointsMultiplier = (tenure, apprxPointsAccrued) => {
    if (tenure / 12 <= 2) {
      return apprxPointsAccrued * 1;
    } else if (tenure / 12 > 2 && tenure / 12 <= 4) {
      return apprxPointsAccrued * 1.25;
    } else if (tenure / 12 > 4) {
      return apprxPointsAccrued * 1.5;
    }
  };

  let tier = employee.employee_seniority;

  let pointsSpent = employee.employee_pointsSpent;

  let joinDate = employee.employee_joinDate;

  let today = new Date();

  let tenure = monthDiff(today, joinDate);
  let apprxPointsAccrued = pointsPerMonth(tier) * tenure;
  let multipliedPoints = pointsMultiplier(tenure, apprxPointsAccrued);
  let actualPointsLeft = multipliedPoints - pointsSpent;
  return actualPointsLeft;
};

// let employee3 = {
//   employee_seniority: "A",
//   employee_pointsSpent: 3,
//   employee_joinDate: new Date("10/04/2008")
// };

// let employee2 = {
//   employee_seniority: "C",
//   employee_pointsSpent: 0,
//   employee_joinDate: new Date("11/12/2018")
// };

// pointsLeft(employee3);
// pointsLeft(employee2);
