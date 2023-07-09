import { chatModel } from '../models/message.model.js';


export class ChatManager{
  constructor(path,Chat){
  //this.cuenta=0
  this.path=path
 
  
  }
  static Chat=[];
  

traeTodoChat = async () => {
 
     
    try{
      const message =  await chatModel.findById(id).lean().exec();
     
      if(message === null)
      { 
        return false
      }
      else
      { 
      return message;
      }
  }
  catch (error){
    console.error(error);
  }

}

addChat = async(message)=>{
        
  try{
    const message= new chatModel(product)
    const result= await message.save(); 
    
    return result 
          
  }
  catch(error){
    console.error(error);
  }

 }


traeChatBy = async(id) =>
 {

 
  const result =  await chatModel.findById(id).lean().exec();
         
  if(result === null)
  { 
    return false
  }
  else
  { 
  return result;
  }              
          

   
 }

 

}

