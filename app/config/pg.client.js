import pg from 'pg';
import 'dotenv/config';

const getClient = () => {
  let client;

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    client = new pg.Pool({
      connectionString: process.env.PGURL_DEV,
    });
  } else if (process.env.NODE_ENV === 'production') {
    client = new pg.Pool({
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.POSTGRESUSER,
      port: process.env.PGPORT,
      password: process.env.PGPASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else {
    client = new pg.Client({
      connectionString: process.env.PGURL_DEV,
    });
  }

  return client;
};

export { getClient };
