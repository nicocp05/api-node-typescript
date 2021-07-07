import mongoose from 'mongoose';

export const dbConnection = async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_CNN}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Database is connected');

    } catch (error) {
        console.error(error);
        throw new Error('Error in connection to database');
    }
}