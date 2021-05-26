import inquirer from "inquirer";
/**
 * For command input
 * @param question what question we are going to ask
 * @returns 
 */
const inputHelper = (question: string): Promise<string> => {
    const questions = [
        {
            type: 'input',
            name: 'input',
            message: question,
        }
    ]
    return new Promise((resolve) => {
        inquirer.prompt(questions).then((ans) => {
            resolve(ans['input']);
        });
    });
}

export default { inputHelper }