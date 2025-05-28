"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/interfaces/routes/printable.routes.ts
const express_1 = require("express");
const printable_controller_1 = require("../controllers/printable.controller"); // <- Import con llaves
const router = (0, express_1.Router)();
router.get('/', printable_controller_1.getPrintable);
exports.default = router;
