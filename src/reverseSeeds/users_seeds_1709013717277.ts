import { Kysely, SqliteDialect } from "kysely";
import { db } from "../database/database";

async function seed(db: Kysely<any>) {
  // Chunk 1
  for (const item of [
    {
      id: 1,
      name: "Dev Sathwara",
      email: "devsath.enacton@gmail.com",
      password: null,
      googleId: "106069969206191208586",
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-05T01:55:37.000Z",
      updated_at: "2024-02-05T01:55:37.000Z",
    },
    {
      id: 4,
      name: "Pdhirapara Enacton",
      email: "pdhirapara.enacton@gmail.com",
      password: null,
      googleId: "114573090926805066762",
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-05T02:51:24.000Z",
      updated_at: "2024-02-05T02:51:24.000Z",
    },
    {
      id: 5,
      name: "Dev",
      email: "devsathwara@yahoo.com",
      password: "$2b$10$NP7rRaT5OvlU8qG47pOgCettdHrfff43eexKS0hehfxuaCAA1MK6W",
      googleId: null,
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-05T03:06:35.000Z",
      updated_at: "2024-02-05T03:06:35.000Z",
    },
    {
      id: 6,
      name: "Prince",
      email: "blue",
      password: "$2b$10$nMuEqeOCjL9SgU7qd.6pN..lf3AmmJYtlFChRR1Dj7jPmiFniy2Va",
      googleId: null,
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-05T04:10:23.000Z",
      updated_at: "2024-02-05T04:10:23.000Z",
    },
    {
      id: 7,
      name: "Dev",
      email: "devsathwara123@yahoo.com",
      password: "$2b$10$NOyHyV1L8/q.sUuFEDbqlOks2KyLoDk6ZVp2vvaCDtLglV7Q2TtOa",
      googleId: null,
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-05T05:18:48.000Z",
      updated_at: "2024-02-05T05:18:48.000Z",
    },
    {
      id: 8,
      name: "Dev",
      email: "devsathwara12333434@yahoo.com",
      password: "$2b$10$k9djdn/RcE8nmoEit77JgenHoh4xsD8Wt7GWZ18pJ579DuM9XdP1i",
      googleId: null,
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-05T05:44:42.000Z",
      updated_at: "2024-02-05T05:44:42.000Z",
    },
    {
      id: 9,
      name: "string",
      email: "user@example.com",
      password: "$2b$10$TK1pBtKHX2qYzXigeRlw0.qbjdPazuNj97VyruZ4BOfhPyc0J3Ce2",
      googleId: null,
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-05T22:30:22.000Z",
      updated_at: "2024-02-05T22:30:22.000Z",
    },
    {
      id: 10,
      name: "string232",
      email: "user123@example.com",
      password: "$2b$10$jiRPxdjeJ4vfEh.Zaj/Ipemak4ZTh3P/9yU0he2tQtlZaVfJoMlqK",
      googleId: null,
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-06T23:59:03.000Z",
      updated_at: "2024-02-06T23:59:03.000Z",
    },
    {
      id: 11,
      name: "Dev Sathwara",
      email: "devsathwara008@gmail.com",
      password: null,
      googleId: "108074187481880984160",
      facebookId: null,
      is_verified: 1,
      created_at: "2024-02-21T04:13:52.000Z",
      updated_at: "2024-02-21T04:13:52.000Z",
    },
    {
      id: 20,
      name: "Devsathwara08",
      email: "devsathwara1233@yahoo.com",
      password: "$2b$10$eiTkPS04MkyeKroHY.EFpOLxtO1oVArp4R6LG9M1oitky2WzSfbR2",
      googleId: null,
      facebookId: null,
      is_verified: null,
      created_at: "2024-02-21T06:31:53.000Z",
      updated_at: "2024-02-21T06:31:53.000Z",
    },
  ]) {
    await db.insertInto("users").values(item).execute();
  }
}

seed(db).then(() => {
  console.log("Done!");
});
