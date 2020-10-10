import { __prod__ } from "./constants";
import { MikroORM } from "mikro-orm";
import { Post } from "./entities/Post";
import path from "path";
import { User } from "./entities/User";
export default {
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.ts$/,
  },
  dbName: "lireddit",
  user: "postgres",
  password: "dev123",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
