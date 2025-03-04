export default class SocketHandler{
    constructor(){
        this.socket = io('http://localhost:3000');
    }

    getSocket(){
        return this.socket;
    }

}