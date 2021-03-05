import express from 'express';
import { createHttpTerminator } from 'http-terminator';
import { bracket } from './controllers/bracket';
import { Service, Shutdown } from './service';

export const buildRbSportsService = (): Service => {
  const app: express.Application = express();
  app.use(express.json());

  app.route('/bracket/:id').get(bracket.get).put(bracket.put).delete(bracket.del);
  app.route('/bracket').post(bracket.post).get(bracket.getMany);

  return {
    startup: (): Shutdown => {
      const server = app.listen(3000, function () {
        console.log('App is listening on port 3000!');
      });
      const httpTerminator = createHttpTerminator({ server });

      return async (): Promise<void> => {
        httpTerminator.terminate();
      };
    },
  };
};
