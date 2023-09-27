export default class TicketDTO {
    constructor (ticket){
        this.id= ticket.id || ticket.id||null
        this.name=ticket.name || ""
        this.descripcion=ticket.descripcion|| ""
        
    }
}