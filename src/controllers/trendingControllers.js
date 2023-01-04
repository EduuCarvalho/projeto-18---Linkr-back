import { trendingRepository } from "../repositories/trendingRepository.js";

export async function findTop10(req, res) {
    try {
        const { rows } = await trendingRepository.findTop10();

        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
