export default class GameHandler{
    constructor(){
        this.games = [];
    }

    addGame(game){
        this.games.push(game);
    }

    removeGame(game){
        this.games = this.games.filter(g => g.id !== game.id);
    }

    getGames(){
        return this.games;
    }

    getGameById(id){
        return this.games.find(g => g.id === id);
    }
}