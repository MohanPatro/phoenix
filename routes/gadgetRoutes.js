const express = require("express");

const auth = require("../middlewares/verifyJwtToken");
const gadgetController=require('../controllers/gadgetController')
const router = express.Router();

router.get("/", auth.validateToken, gadgetController.getAllGadgets);



router.post("/", auth.validateToken, gadgetController.addGadget);
router.post("/:id/self-destruct", auth.validateToken, gadgetController.selfDestruct);



router.patch("/:id", auth.validateToken, gadgetController.updateGadget);


router.delete("/:id", auth.validateToken, gadgetController.deleteGadget);




module.exports = router;

