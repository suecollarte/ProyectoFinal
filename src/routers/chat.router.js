import {Router} from 'express';
import { ChatManager } from '../dao/fsManagers/ChatManagerDB.js';
import messageModel  from '../dao/models/message.model.js';

const router =Router();

const chatRouter = new ChatManager;

router.get('/', async (req,res) =>{
  try{
    const Chats = await ChatManager.traeTodo(); 
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
 
    const result= await ChatManager.addChat(ChatNew);
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