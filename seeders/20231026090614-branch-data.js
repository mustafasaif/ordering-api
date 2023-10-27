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
          BranchId: "687ddada-76ca-4497-b02d-b589abddbb1e",
          BranchName: "Toy",
          BranchLocation: "Jon Treutel",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "3a79fea4-352e-4dc8-9a37-56a491d8ff06",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "3a78fea4-352e-4dc8-9a37-56a491d8ff06",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "3a75fea4-352e-4dc8-9a37-56a491d8ff06",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "4a76fea4-352e-4dc8-9a37-56a491d8ff06",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "f71a1048-25c6-41b9-937e-c6e2a4616d4c",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "94b0d552-6031-4358-91b1-a86bc1849a3c",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "1f0d3dc1-5fdd-4474-98f6-772a9233d2e7",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "3c108136-c923-4ff4-934d-c8ae1e3c370f",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "c0119b1d-9b7a-4052-b8a2-b9364cae9841",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "f316fbf7-6fe6-44f1-8318-9c66145cf08d",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "7234a344-719e-4e68-8dfa-29a9fc4a7b6b",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "5364f3bb-21e0-4d4d-8a0f-92937309c1b4",
          BranchName: "sana",
          BranchLocation: "Legacy",
          createdAt: "2023-10-25 16:04:43",
          updatedAt: "2023-10-25 16:04:43",
        },
        {
          BranchId: "11dcc42f-5083-4a8b-bbcb-0823b6f6ba28",
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

    await queryInterface.bulkDelete("Branches", null, {});
  },
};
