const service = require("./reviews.service");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `/cannot be found/${reviewId}` });
}

async function update(req, res, next) {
    const updateReview = req.body.data;
    const { review_id } = res.locals.review;
    await service.update(review_id, updateReview);
    const data = await service.readUpdatedReview(review_id)
    res.json({ data });
}

async function destory(req, res) {
    const { reviewId } = req.params;
    await service.destory(reviewId);
    res.sendStatus(204);
}

module.exports = {
    update: [reviewExists, update],
    delete: [reviewExists, destory,]
}