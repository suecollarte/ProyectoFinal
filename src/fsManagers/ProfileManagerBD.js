import profileModel from '../../models/profile.model.js';

export class ProfileManager{
  constructor(path,sesion){
  //this.cuenta=0
  this.path=path 
  }
  
traeTodo = async (req, res)=> {
  let page= parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 10
    
  const filtroOpciones ={}
  if(req.query.rol) filtroOpciones.stock = req.query.rol
  

  const paginacionOpciones= {lean:true,limit:limit,page:page}
  //sort
  if (req.query.sort == "asc") paginacionOpciones.sort ={ mail:1}
  if (req.query.sort == "desc") paginacionOpciones.sort ={ mail: -1}
  try{
   
   //const profiles =await profileModel.find(
 
  const profileos =await profileModel.paginate(filtroOpciones, paginacionOpciones)
 
    return{
      statusCode:200,
      response:{payload:profiles}
    }
  }
  catch (err) {
    return{
      statusCode:500,
      response:{status:err, error:err.message}
    }
    
  }  
     
 
}


addprofile = async(data)=>{
  try{
         // console.log("grabando");
          const profile= new profileModel(data)
          const err= await profile.save().catch(err=>err); 
          return err               
    }
  catch(e){
    console.error(e);
  }

 }


traeprofilesBy = async(_id) =>
 {

      try{
        //await profileModel.paginate
          const profile =  await profileModel.findById(_id).lean().exec();
      
          if(profile === null)
          { 
            return false
          }
          else
          { 
            return {
              statusCode:200,
              response:{
                status:'success',
                payload: profile
              }}
          }
    }
    catch(e){
      console.error(e);;
    }
 }

 Borrarprofile = async(mail) =>{
 
    try{
     const result = await profileModel.findByIdAndDelete(mail)
    
     if(result== null){
      return false
     }
     const profiles = await profileModel.find().lean().exec()
     return profiles
    }
    catch(e){
      console.error(e);;
    } 
    
 }

Modificarprofile = async(id,data) =>{

try{
  const result= await profileModel.findByIdAndUpdate({_id:id},{
    $set:data})
}
catch(e){
  console.error(e);;
}    
      
  
 }
 
}

