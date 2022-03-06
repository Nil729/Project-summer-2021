import Reguistro from '../models/Reguistro'

export const authIG= async (req,res,next) => {
    const id = req.cookies['user_id'];

    // EN A QUEST MIDLE WARE NOMÉS COMPROVEM SI ESTA CREAT EL IG si está creat renderitza una vista ho una altre. Ja esta bé
    var instaUser = await Reguistro.findById({_id: id},  {instagram: {ig: 1}});
    var colIG = instaUser.instagram;
    if (instaUser.instagram >= [0]){
        let obj = colIG[0]
        var valueIg = obj.ig
        return res.render('List/InstaList', {valueIg}) // no tocar
    }else{
        return res.render('FormStautsUsers')
    }
}