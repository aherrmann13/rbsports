import { bracket } from './controllers/bracket';
import express from 'express';

const app: express.Application = express();

app.route('/bracket/:id').get(bracket.get).put(bracket.put).post(bracket.post).delete(bracket.del);
app.route('/bracket').get(bracket.getMany);
app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
