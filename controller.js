let movies = require('./db.json');
movies = movies.results;
const {getBody} = require('./utils');
const getMovies = async (req, res) => {
    if(movies.length === 0){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: "Movies not found"}));
    }
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(movies));
    
}
const getMovieById = async (req, res) => {
    let id = req.url.split("/")[4]
    let movie = movies.find((elem)=> elem.id === parseInt(id))
    if(!movie){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: "Movie not found"}));
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(movie));
    return;
}

const createMovie = async (req, res) =>{
    let body = await getBody(req);
    if(!body){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: "Body is required"}));
        return;
    }
    movies.push(JSON.parse(body));
    res.writeHead(201, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(JSON.parse(body)));
    return;
}

const updateMovie = async (req, res) =>{
    let id = req.url.split("/")[4]
    let movie = movies.find((elem)=> elem.id === parseInt(id))
    if(!movie){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(Json.stringify({message: "Movie not found"}));
        return
    }
    let body = await getBody(req);
    if(!body){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: "Body is required"}));
        return;
    }
    let indexMovie = movies.indexOf(movie);
    movies[indexMovie] = JSON.parse(body);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(JSON.parse(body)));
    return;
}

const deleteMovie = async (req, res) =>{
    let id= req.url.split("/")[4]
    let movie = movies.find((elem)=> elem.id === parseInt(id))
    if(!movie){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: "Movie not found"}));
        return;
    }
    let indexMovie = movies.indexOf(movie);
    movies.splice(indexMovie, 1);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: `Movie with id ${id} deleted`}));
    return;

}
module.exports = {getMovies, getMovieById, createMovie, updateMovie, deleteMovie};