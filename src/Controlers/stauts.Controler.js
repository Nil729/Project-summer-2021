
//import Status from '../models/Status'
import Reguistro from '../models/Reguistro'


// Mostra tots User status de la db
export const findAllUser_status = async (req, res) => {
    res.render('FormStautsUsers');
    //const users = await Status.find({})
    //res.render('stautsUsers')
    //res.send(users)
};

export const PostUser_status = async (req, res) =>{
    const {ig} = req.body;//, date, location
    const id = req.cookies['user_id'];

    if (ig.length <= 0){ // fer que et comprovei si el IG existeix buscan a instagram.
        res.json({text: 'The IG field is required'});
    }
    // Aixó de a qui esta bé vvvvvvv
    
    Reguistro.findOneAndUpdate({ _id: id }, { $push: { instagram: {ig: ig} } },// el id s'ha de canviar per el la const = id està malament perque ha sempre agafa el mateix id
        
        function (error, success) {
            if (error) {

                console.log(error);
            } else {

                console.log(success,id);
            }
        }
    );
    
    res.render('List/InstaList');
    
    

    
};
/*
function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
        return true;
    } else {
        return false;
    }
}
*/