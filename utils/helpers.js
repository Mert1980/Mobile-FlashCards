export const result = (score) => {
  console.log(score);
  if (score < 50) {
    return "Poor ;(";
  } else if (50 <= score && score < 70) {
    return "Satisfactory!";
  } else if (70 <= score && score < 90) {
    return "Congratulations!";
  } else if (score >= 90) {
    return "Well done!";
  }
};
