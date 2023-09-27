import fs from "fs"

class fileManager{
    constructor(path){
    this.path=path
    }
    getNextID= list =>{
        const count =list.length
        return (count > 0 ) ? list[count-1].id + 1 : 1
    }
    read = () =>{
        if (fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, 'utf-8')
            .then(r => JSON.parse(r))
        }
        return []
    }

    write = list =>  fs.promises.writeFile(this.path, JSON.stringify(list))

    get = async() => await this.read()

    getOneByParam = async(param, value) =>{
        const data = await this.read()
        const obj = data.find(d => d[param] == value)
        return obj
    }
    
    add = async(obj) =>{
        const list = await this.read()
        const nextID = this.getNextID(list)
        obj.id=nextID
        list.push(obj)
        await this.write(list)
        return obj
    }
    update = async(id,obj) =>{
        obj.id= id
        const list = await this.read()
        for (let index=0;index < list.length; index++){
           if(list[index].id=id){
             list[index]=obj
            break

           }

        }
        await this.write(obj)
        return obj
    }

}