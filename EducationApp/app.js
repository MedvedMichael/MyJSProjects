var money,type;
money = prompt("What's your budget for this month?");
type = prompt("Enter your date of birth YYYY-MM-DD");

var ex1 = prompt("Enter what do you have to buy each day"), ex2=prompt("Hom much will it cost?");


var addData = 
{
   budget:money, timeData:type,expenses:{ex1:ex2},optionalExpenses:0,savings:false
};

alert(money/30);
