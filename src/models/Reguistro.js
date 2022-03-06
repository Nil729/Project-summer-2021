import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
//Collecció registres de la paguina web.

const instaSchema = new Schema ({
    ig: {
        type: String,
        required: true,
        tirm: true
    }
},{
    versionKey: false,
    timestamps: true
});


const reguistroSchema = new Schema ({
    
    fullName: {
        type: String,
        required: true,
        tirm: true
    },
    userName: {
        type: String,
        required: true,
        tirm: true
    },
    email: {
        type: String,
        required: true,
        tirm: true
    },
    password: {
        type: String,
        required: true,
        tirm: true
    },
    
    instagram: [instaSchema]

}, {
    versionKey: false
});

reguistroSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash =  bcrypt.hash(password, salt);
    return hash;
};

reguistroSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

export default model('reguistro', reguistroSchema);


/*
    center{
        A qui es dividira en : high school:, university:, workplace:, freelancer:, emprenedor, empresari.
        i podran dir a quina univesitat o high school o workplace estan i si son una altre cosa que ho espacificin que fan i hon ho fan.
    }


    Abaut_Me{
        Será com una breu descripcio de el usuari de unes 50 paraules.
        No se si fero amb string o tipo objecta pq bull que es pugin posar
        emogis.
    }
    mycontact{
        Será tots links de reds socials 
    }
    */  