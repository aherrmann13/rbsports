import { buildRbSportsService } from './rbsports';
import { start } from './service';

const rbSports = buildRbSportsService();
start(rbSports);
