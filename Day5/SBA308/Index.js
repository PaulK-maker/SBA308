const CourseInfo = { // this is an object
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {  // this is an object
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [ // this is an object
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  
  //use get learner function to process the learner information as given
  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions){
const result= {};
//use for loop to iterate over each leaner submission to get every learner id from submission


try{ //try to catch error and see in learner submissions

for( let i=0; i<LearnerSubmissions.length; i++){

const submission= LearnerSubmissions[i]; // current submission i
const learnerId=submission.learner_id; // get the learner ID 
const assignmentId=submission.assignment_id; // get assignement id
let assignment;
// use check validity of all submisson using a this function
function checkValidSubm(submission, assignment){
  const score = submission.submission.score;
  const pointsPossible=assignment.points_possible;
  
  return(
    typeof score==='number'&& !isNaN(score) && // also checck if score a type and  number value and not zero
    pointsPossible !==0
  )
}
//find each assignment in assignment group

for (let j=0; j<AssignmentGroup.assignments.length; j++){

    if (AssignmentGroup.assignments[j].id===assignmentId){
        assignment=AssignmentGroup.assignments[j];
        break;
    }
}//use nested if statement to initialize learners data in the resulting object 
  if (assignment){
    if (!result[learnerId]) {
        result[learnerId]={
            id:learnerId, // store learner id
            totalScores:0, // initialize to 0, then count total score
            totalPossible:0, // initialize to 0, then count total possible points 
            assignments:{} // create new object to store individual assignments 

    };
  }
  
  const score=submission.submission.score; // calculate total score for the learner 
  const pointsPossible=assignment.points_possible; // calculate and update total possible points 

  // count total score and points possible
  result[learnerId].totalScores += score;
  result[learnerId].totalPossible+=pointsPossible
  //get and store percentage for this current assignment                            
  result[learnerId].assignments[assignmentId]=score/pointsPossible;
}else{
// throw error for assignment not found in the assignment group
    throw new Error 
   ("Assigrnmernt"+ assignmentId + " not found in the assignment group");
}
} // this function will calculate average sccore; did not work though
function  calcAverageScore(Score){
  const validScores=scores.filter(score=>typeof score==='number');
  const total =validScores.reduce((sum,score)=>sum +score,0);
  return validScores.length ? total/validScores.length:0;
}

// function calcAveglearner(learner){
//   try{
//     if(learner.totalPossible===o){
//       throw " Error to divide by zero";
//   }
// return learner.totalScores/learner.totalPossible;
// }catch(error){
//   console.error( ' Error Calculation Avg for learner',
//   {learner,id},error)
//   return NaN;
// }
// }
//use for -in loop to iterate through result object property and calculate average
const finalResult=[];
for (let learnerId in result) {
    const learner= result[learnerId];
    const AvgScore=(learner.totalScores/learner.totalPossible)*100;
    
    // copy new object to final result array for each learner
    finalResult.push({ 
        id:learner.id,// learner Id
        avg:AvgScore,// avg score
        ...learner.assignments // avg assignments
    });
} // output final array ; getlearnerData function
return finalResult;

// end of try catch error and output the getlearnerData results
  } catch (error){
    console.error("An error occured:" , error.message); // log error to console
    throw new Error("Something went wrong in the process:" +error.message);
  
}
  }
  // try catch outside the function
try{
const output = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(output);
}catch (error){
console.error(" Error found:", error.message);
}
