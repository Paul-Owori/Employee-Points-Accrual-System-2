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

  let tier = employee.employee_seniority;
  console.log(tier);

  let pointsSpent = employee.employee_pointsSpent;
  console.log("Spent==>", pointsSpent);

  let joinDate = employee.employee_joinDate;
  console.log("JoinDate==>", joinDate);

  let today = new Date();
  console.log("Today==>", today);

  let tenure = monthDiff(today, joinDate);
  let apprxPointsAccrued = pointsPerMonth(tier) * tenure;
  let actualPointsLeft = apprxPointsAccrued - pointsSpent;
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
