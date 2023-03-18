const questions = [
  {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a roll',
      'Add a employee',
      'Update a employee role',
      'Exit'
    ],
  }
]
module.exports = questions;