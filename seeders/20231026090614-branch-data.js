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
      "Branches",
      [
        {
          branchId: "687ddada-76ca-4497-b02d-b589abddb1e",
          branchName: "Toy",
          branchLocation: "Jon Treutel",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "3a79fea4-352e-4dc8-9a37-56a491d8ff06",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "3a78fea4-352e-4dc8-9a37-56a491d8ff06",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "3a75fea4-352e-4dc8-9a37-56a491d8ff06",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "4a76fea4-352e-4dc8-9a37-56a491d8ff06",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "f71a1048-25c6-41b9-937e-c6e2a4616d4c",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "94b0d552-6031-4358-91b1-a86bc1849a3c",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "1f0d3dc1-5fdd-4474-98f6-772a9233d2e7",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "3c108136-c923-4ff4-934d-c8ae1e3c370f",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "c0119b1d-9b7a-4052-b8a2-b9364cae9841",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "f316fbf7-6fe6-44f1-8318-9c66145cf08d",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "7234a344-719e-4e68-8dfa-29a9fc4a7b6b",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "5364f3b-21e0-4d4d-8a0f-92937309c1b4",
          branchName: "sana",
          branchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          branchId: "11dcc42f-5083-4a8b-bcb-0823b6f6ba28",
          branchName: "sana",
          branchLocation: "Legacy",
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

    await queryInterface.bulkDelete("Branches", null, {});
  },
};
