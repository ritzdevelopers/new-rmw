import { getDBPool } from "@/lib/db";
// import redisClient from "@/lib/redis_server";
import { RowDataPacket } from "mysql2";
export async function getServiceThirdData(slug: string) {
    try {
        // const CACHE_TTL = 60 * 60 * 24;

        let id: number = 0;

        // const cached_id = await redisClient.get(`cached_service2_id_${slug}`);

        // if (cached_id) {
        //     id = Number(cached_id);

        //     // const cached_data = await redisClient.get(`cached_service_third_data_${id}`);
        //     if (cached_data) {
        //         return JSON.parse(cached_data);
        //     }
        // }

        const db = getDBPool();

        if (!id) {
            const [service2Rows] = await db.query<RowDataPacket[]>(
                "SELECT id FROM service_second WHERE link = ?",
                [slug]
            );

            if (service2Rows.length === 0) return [];

            id = service2Rows[0].id;

            // await redisClient.set(`cached_service2_id_${slug}`, id, { EX: CACHE_TTL });
        }

        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM service_third WHERE service2_id = ?",
            [id]
        );

        if (rows.length === 0) return [];

        // await redisClient.set(
        //     `cached_service_third_data_${id}`,
        //     JSON.stringify(rows),
        //     { EX: CACHE_TTL }
        // );

        return rows;

    } catch (error) {
        console.error("Error in getServiceThirdData:", error);
        return [];
    }
}