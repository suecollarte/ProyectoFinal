export default class UserDTO {
    constructor (user){
        this.id= user.id || user.id||null
        this.name=user.name
        this.email=user.email
        this.ticket=user.tickets||[]
        this.documents= user.documents||[]
    }
}