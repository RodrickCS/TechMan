const express = require("express");
const router = express.Router();

const equipamentos = require("../controllers/equipamentos_controller");

router.get("/equipamentos/read", equipamentos.ler);
router.get("/equipamentos", equipamentos.loadViewEquipamentos);
router.get("/equipamentos/readComments/:id", equipamentos.lerComentarios);
router.post("/equipamentos/create", equipamentos.criar);
router.post("/equipamentos/addComment", equipamentos.addComentario);
router.delete("/equipamentos/excluir/:id", equipamentos.removerEquipamento)

module.exports = router;
