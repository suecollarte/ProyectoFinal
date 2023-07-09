import {Router} from 'express';
import { ChatManager } from '../dao/fsManagers/ChatManagerBD.js';
import { chatModel } from '../dao/models/Chat.model.js';

const router =Router();

const ChatClass = new ChatManager;

router.get('/', async (req,res) =>{
  try{
    const Chats = await ChatClass.traeTodo(); 
    res.status(201).json({status:"success", Chats:Chats});
  }
    catch (err) {
    
      //console.error(e)
  
      res.status(500).json({status:'error', error: err.message})
    } 
  
})

router.post('/', async (req,res) =>
{

   const ChatNew= req.body
try{
 
    const result= await ChatClass.addChat(ChatNew);
    if (result){
      res.status(201).json({status:'success', payload:result})
       
    }
    else{
      res.status(201).json({status: 'Chat NO CREADO YA EXISTE',data: ChatNew}) 
        }

    
  }catch (err) {
    
    //console.error(e)

    res.status(500).json({status:'error', error: err.message})
  }  

  })  

export default router