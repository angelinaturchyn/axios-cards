const axios = require('axios');
const inquirer = require('inquirer')




axios({
    method: 'POST',
    url: 'https://pasv-kanban.herokuapp.com/card',
    data: {
        "name": "New Card  ",
        "status": "todo",
        "priority": 3
    }
})
  .then( res => console.log(res.data))
  .catch(err => console.log('error'))



const run = () => inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Create a new card', 'Look for', 'Delete'],

        },
        {
            name: 'new',
            type: 'input',
            message: 'How would you like to name a new card?',
            when: (answers) => {
                return  answers.action === 'Create a new card'
            }
        }


    ])

    .then(answers => {
        if (answers.action === 'Create a new card') {

            async function postCard() {
                try {
                    const response = await axios.post('https://pasv-kanban.herokuapp.com/card')
                    console.log(response);
                } catch (error) {
                    console.error(error);
                }
            }
            postCard()

            }else if(answers.action === 'Look for') {
            async function lookForCard() {
                try {
                    const response = await axios.get('https://pasv-kanban.herokuapp.com/card')
                    console.log(response);
                } catch (error) {
                    console.error(error);
                }
            }

            lookForCard()

        }else if(answers.action === 'Delete') {
            async function deleteCard() {
                try {
                    const response = await axios.delete('https://pasv-kanban.herokuapp.com/card/')
                    console.log(response);
                } catch (error) {
                    console.error(error);
                }
            }

            deleteCard()
                    .catch((error) => {
                        if (error.isTtyError) {
                            // Prompt couldn't be rendered in the current environment
                        } else {
                            // Something else went wrong
                        }

                    });
        }

    })

run()



