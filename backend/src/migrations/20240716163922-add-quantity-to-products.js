'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.removeColumn('Products', 'created_at');
    await queryInterface.removeColumn('Products', 'updated_at');
    await queryInterface.removeColumn('Invoices', 'created_at');
    await queryInterface.removeColumn('Invoices', 'updated_at');
    await queryInterface.removeColumn('Invoice_has_products', 'created_at');
    await queryInterface.removeColumn('Invoice_has_products', 'updated_at');
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
