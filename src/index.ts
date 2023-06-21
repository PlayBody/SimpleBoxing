import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { DataSource } from 'typeorm';
import { schema } from './schema';
import entities from './entities';

async function main() {
  const AppDataSource = new DataSource({
    type: 'mysql',
    database: 'fight',
    username: 'root',
    password: '',
    logging: true,
    synchronize: false,
    entities
  });

  await AppDataSource.initialize();

  const app = express();

  app.use(cors());
  app.use(express.json());
  
  // app.use(
  //   '/graphql',
  //   graphqlHTTP({
  //     schema: await createSchema(),
  //     graphiql: true,
  //   })
  // );
  

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3001, () => console.log('✨ FIGHT! RUNNING ON PORT 3001 🚀'));
}


main().catch((err) => console.error(`🔥 ${err}`));
