import Reguistro from '../models/Reguistro'


/*export const presentation = (req, res)=>{
    res.render('presentation');
};*/

export const login = (req, res) =>{
    res.render('users/login', {layout: false});
};

export const singup = (req,res)=>{
    res.render('users/singup', {layout: false});
};

export const findAllUsers = async (req, res) =>{
    const reguistro = await Reguistro.find({})
    res.json(reguistro);
};


// Avans de fer el Post user em de crear el token aixó vasicament nomes envia les dades a la db 
// s'ha de treure a questa fució cuan estigui acavada la de src\Controlers\reguister.Controler.js perqeu fa el mateix
export const PostUser = async (req, res) =>{  
    const newUser  = new Reguistro({name: req.body.name, ig: req.body.ig, foto: req.body.foto});
    cuserSaved = await newUser.save();
    res.json(userSaved);
};


export const findaUser = async (req, res) => {
    const user = await Reguistro.findById(req.params.id);
    res.json(user);
};

export const deleteUser = async (req, res) =>{
    const deluser = await Reguistro.findByIdAndDelete(req.params.id);
    res.json({
        message: `${deluser.name} User were deleted successfully`,
    });
};

