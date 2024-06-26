// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {sql} from "drizzle-orm";
import {index, int, sqliteTableCreator, text} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `create-t3-app-tutorial_${name}`);

export const posts = createTable(
	"post",
	{
		id: int('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
		userId: text('user_id', {length: 256}).notNull(),
		content: text('content', {length: 256}),
		createdAt: int('created_at', {mode: 'timestamp'})
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: int('updated_at', {mode: 'timestamp'}),
	},
	(example) => ({
		contentIndex: index("content_idx").on(example.content),
		userIdIndex: index("user_id_idx").on(example.userId),
	})
);
