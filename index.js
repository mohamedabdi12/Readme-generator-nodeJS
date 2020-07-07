// Define const to be used for application
const fs = require("fs");
const inquirer = require("inquirer");

// Enter Map keys and values to be used for list selections and choices 
const licenseMD = new Map([
["MIT", "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"],
["Apache 2.0", "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"],
["Boost", "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"],
["BSD 3", "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"],
["BSD 2", "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)"],
["Mozilla", "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"]
]);

// Array of questions for user
inquirer
  .prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email"
      },
      {
        type: "input",
        message: "What is the project title?",
        name: "title"
      },
      {
        type: "input",
        message: "Write a brief description of the project.",
        name: "description"
      },
      {
        type: "list",
        message: "Which license do you require?",
        name: "license",
        choices: [...licenseMD.keys()]
      },
      {
        type: "input",
        message: "What command(s) should be run to install dependencies?",
        name: "installation",
        default: "npm i"
      },
      {
        type: "input",
        message: "What command(s) should be run for testing?",
        name: "tests",
        default: "npm test"
      },
      {
        type: "input",
        message: "What should the user know about using the repo?",
        name: "usage",
        default: "There is nothing special or unique about this repo."
      },
      {
        type: "input",
        message: "What technologies are featured in this project?",
        name: "tech",
        default: "HTML5, CSS3, Javascript, jQuery"
      },
      {
        type: "input",
        message: "What should the user know about contributing the repo?",
        name: "contributing",
        default: "There are no special requirements for using this repo."
      }, 
      {
        type: "input",
        message: "What is the deployed application URL?",
        name: "link"
      },
      {
        type: "input",
        message: "Image path to the deployed application? (Example: assets/images/project1.jpg",
        name: "image"
      },   
  ])

  // function to write README file contents
  .then(function (response) {
    const newFile = 
    `# ${response.title}
    
## Description: 
${licenseMD.get(response.license)}
${response.description}
    
## Table of Contents: 
* [License](#license)
* [Installation](#installation)
* [Tests](#tests)
* [Usage](#usage)
* [Technology Used](#technology-used)
* [Contributing](#contributing)
* [Questions](#questions)
* [Link](#link)
* [Image](#image)
    
## Installation: 
To install the needed dependencies, please run the following command: ${response.installation}
    
## Usage: 
    
Special instructions for usage: ${response.usage}
## Technology Used: 
    
Special instructions for usage: ${response.tech}
    
## License: 
    
This project is licensed under the ${response.license} license.
    
## Contributing: 
${response.contributing}
    
## Tests: 
Be sure to run the following test(s): ${response.tests}
    
## Questions: 
    
If you have any questions, please reach out to [${response.username}](https://github.com/${response.username}) @ ${response.email}.
## Link: 
${response.link}
## Image:
![](${response.image})`

    fs.writeFile("README.md", newFile, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });