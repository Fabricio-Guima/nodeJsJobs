'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('companies', [
      {
        name: 'Impulso',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        website: 'https://google.com.br',
        email: 'impulso@gmail.com.br',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ubistart',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        website: 'https://google.com.br',
        email: 'ubistart@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Google',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        website: 'https://google.com.br',
        email: 'google@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companies', null, {})
  },
}
