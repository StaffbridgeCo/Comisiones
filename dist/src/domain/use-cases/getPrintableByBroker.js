"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrintableByBroker = void 0;
const getPrintableByBroker = async (broker, repo) => {
    return await repo.findByBroker(broker);
};
exports.getPrintableByBroker = getPrintableByBroker;
