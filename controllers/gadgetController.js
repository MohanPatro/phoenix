const Gadget = require("../models/Gadget");
const { v4: uuidv4 } = require("uuid");

const base_response = require("../utils/baseResponse").response;
const handleError=require('../utils/baseResponse').handleError;


exports.getAllGadgets = async (req, res) => {

  try {

    const gadgets = await Gadget.findAll();

    const gadgetsWithProbability = gadgets.map((g) => ({

      ...g.toJSON(),
      probability: `${Math.floor(Math.random() * 100)}% success probability`,
    }));

    

    res.json(base_response(true, gadgetsWithProbability, "Gadgets fetched successfully"));

  } catch (error) {
    handleError(res, error);
  }
};

exports.addGadget = async (req, res) => {
  try {
    const { name } = req.body;
    const gadget = await Gadget.create({ name });
    res.status(201).json(base_response(true, gadget, "Gadget added successfully"));
  } catch (error) {
    handleError(res, error);
  }
};

exports.updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    await Gadget.update({ name, status }, { where: { id } });
    res.json(base_response(true, {}, "Gadget updated successfully"));
  } catch (error) {
    handleError(res, error);
  }
};

exports.deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;
    await Gadget.update(
      { status: "Decommissioned", decommissionedAt: new Date() },
      { where: { id } }
    );
    res.json(base_response(true, {}, "Gadget decommissioned successfully"));
  } catch (error) {
    handleError(res, error);
  }
};

exports.selfDestruct = async (req, res) => {
  try {
    const { id } = req.params;
    const confirmationCode = Math.floor(1000 + Math.random() * 9000);

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json(base_response(false, {}, "Gadget not found"));
    }

    await Gadget.update({ status: "Destroyed" }, { where: { id } });

    res.json(
      base_response(true, { confirmationCode, gadgetId: id, status: "Destroyed" }, "Self-Destruct Sequence Activated")
    );
  } catch (error) {
    handleError(res, error);
  }
};
