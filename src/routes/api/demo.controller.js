const router = require("express").Router();
const apiResponse = require("../../helpers/responseSender.helper");

const DemoService = require('../../services/demo.service');

router.get("/", async (req, res) => {

    const response = await DemoService.getData();
    return apiResponse.sendSuccessResponse(res, response, 'Records Found');
});

module.exports = router;
