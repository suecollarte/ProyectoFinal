import FileManager from './FileManagerFS.js'

export default class User {
    constructor(){
        this.filemanager = new FileManager('../users.json')
    }
  get = async() => await this.filemanager.get()
  create = async(data) => await this.filemanager.add(data)
  getById = async(id) => await this.filemanager.getOneByParam('id',id)
  update =async(id, data) => await this.filemanager.updatea(id,data)
  
}