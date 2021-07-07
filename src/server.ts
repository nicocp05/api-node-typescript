import express, { Application } from 'express';
import cors from 'cors';
import router from './routes/index.routes';
import { dbConnection } from './database/database';

export default class Server {

    private app: Application;
    private port: String;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Database
        this.connectDB();

        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }

    public middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    public async connectDB() {
        await dbConnection();
    }

    public routes() {
        this.app.use('/api', router);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }

}