import { sql } from "./db.js";

// sql`drop table if exists videos`.then(() => {
//     console.log('tabel deleted')
// })

sql`
    CREATE TABLE videos (
        id text primary key,
        title  TEXT,
        description TEXT,
        duration    INTEGER
    );
`.then(() => {
    console.log('Tabela criada!')
})
