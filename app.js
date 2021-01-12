const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamPlayers=[]
function buildPage() {
    fs.writeFileSync(outputPath, render(teamPlayers),"utf-8")
}

function buildTeam(){

    inquirer.prompt([
        {
            type: "list",
            message: "What type of team member would you like to add?",
            name: "playerChoice",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "None"
            ]
        }
    ]).then(userChoice =>{
        switch(userChoice.playerChoice) {
            case "Engineer":
                addEngineer();
                break;
                case "Intern":
                    addIntern();
                    break;
                    case "Manager":
                        addManager();
                        break;
                        default:
                            buildPage();
        }
    });

}

function addEngineer(){
inquirer.prompt([
    {
        type: "input",
        message: "What is the name of your Engineer?",
        name: "engineerName",

    },
    {
        type: "input",
        message: "What is your Engineer's ID?",
        name: "engineerID",

    },
    {
        type: "input",
        message: "What is the email adress of your Engineer?",
        name: "engineerEmail",

    },
{
    type: "input",
        message: "What is your Engineers Github username?",
        name: "engineerGithub",
}
]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
    teamPlayers.push(engineer);

    buildTeam();
});
}
function addManager(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your Manager?",
            name: "managerName",

        },
        {
            type: "input",
            message: "What is your manager's ID?",
            name: "managerID",

        },
        {
            type: "input",
            message: "What is your manager's email adress?",
            name: "managerEmail",

        }
    ]).then(answers =>{
        const manager = new Manager(answers.managerName, answers.managerID, answers.manageremail);
        teamPlayers.push(manager);

        buildTeam();
    });
}

        function addIntern(){
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the name of your intern?",
                    name: "internName",

                },
                {
                    type: "input",
                    message: "What is the ID of your intern?",
                    name: "internID",

                },
                {
                    type: "input",
                    message: "What is the email adress of your intern?",
                    name:"internEmail",

                },
                {
                    type: "input",
                    message: "Where does your intern go to school?",
                    name: "internSchool",

                }
            ]).then(answers =>{
                const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
                teamPlayers.push(intern);

                buildTeam();
            });
        }

        buildTeam()
        