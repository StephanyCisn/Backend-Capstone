const service = require("./theaters.service");

async function list(req, res) {
    const data = await service.list(req.params);
    res.json({ data });
}

module.exports = {
    list,
}