import connectionDB from "../database/database.js";

async function findTop10() {
	return connectionDB.query(
        `SELECT LOWER(h.name) AS name
        FROM post_hashtags ph
        JOIN hashtags h ON ph.hashtag_id = h.id
        GROUP BY LOWER(h.name)
        ORDER BY COUNT(h.name) DESC
        LIMIT 10;`
    );
}

export const trendingRepository = { findTop10 };
