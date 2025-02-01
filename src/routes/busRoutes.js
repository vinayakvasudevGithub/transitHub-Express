const express = require("express");
const {
  getAllBuses,
  createBus,
  getBusById,
  updateBus,
  deleteBus,
  searchBus,
} = require("../controllers/busController");
const router = express.Router();

router.route("/").get(getAllBuses);
router.route("/search").get(searchBus);
router.route("/:id").get(getBusById);
router.route("/update/:id").put(updateBus);
router.route("/create").post(createBus);
router.route("/delete/:id").delete(deleteBus);

module.exports = router;
