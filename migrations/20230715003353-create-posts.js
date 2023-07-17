'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: Sequelize.INTEGER
      },      
      title: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
      roomname:{
        allowNull:true,
        type: Sequelize.STRING,
      }, 
      location:{
        allowNull:true,
        type: Sequelize.STRING,
      },
       price:{
        allowNull:true,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING
      },
       star:{
        allowNull:false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};