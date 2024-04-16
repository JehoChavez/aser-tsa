"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("agentes", ["clave"], {
      indexName: "claveIndex",
    });

    await queryInterface.addIndex("polizas", ["noPoliza"], {
      indexName: "polizaIndex",
    });

    await queryInterface.addIndex("endosos", ["polizaId"], {
      indexName: "endosoPolizaIdIndex",
    });

    await queryInterface.addIndex("recibos", ["polizaId"], {
      indexName: "reciboPolizaIdIndex",
    });

    await queryInterface.addIndex("recibos", ["fechaInicio"], {
      indexName: "reciboInicioIndex",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("agentes", "claveIndex");

    await queryInterface.removeIndex("polizas", "polizaIndex");

    await queryInterface.removeIndex("endosos", "endosoPolizaIdIndex");

    await queryInterface.removeIndex("recibos", "reciboPolizaIdIndex");

    await queryInterface.removeIndex("recibos", "reciboInicioIndex");
  },
};
