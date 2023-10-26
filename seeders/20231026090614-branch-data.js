"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Branch",
      [
        {
          BranchId: "687ddada-76ca-4497-b02d-b589abddbb1e",
          BranchName: "Toy",
          BranchLocation: "Jon Treutel",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "3a76fea4-352e-4dc8-9a37-56a491d8ff06",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Branch", null, {});
  },
};
