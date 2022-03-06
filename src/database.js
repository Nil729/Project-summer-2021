import mongoose from 'mongoose'
import config from './config'

// Creacion de la vase de datos
(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database is connected to: ', db.connection.name);
    } catch (error){
        console.log(error)
    }
})();
