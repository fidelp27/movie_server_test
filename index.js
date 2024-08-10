// importar http
const http = require('http');
// importar funciones
const {getMovies,createMovie, getMovieById,updateMovie, deleteMovie} = require('./controller');
// definir puerto
const PORT = process.env.PORT || 3000;
// crear servidor
const server = http.createServer(async(req, res)=>{
    if(req.url == '/api/v1/movies' && req.method == 'GET'){
        await getMovies(req, res);
    }
    if(req.url == '/api/v1/movies' && req.method == 'POST'){
        await createMovie(req, res);
    }
    if(req.url.match(/\/api\/v1\/movies\/[0-9]+/) && req.method == 'GET'){
        await getMovieById(req, res);
    }
    if(req.url.match(/\/api\/v1\/movies\/[0-9]+/) && req.method == 'PUT'){
        await updateMovie(req, res);
    }
    if(req.url.match(/\/api\/v1\/movies\/[0-9]+/) && req.method == 'DELETE'){
        await deleteMovie(req, res);
    }
})

server.listen(PORT,()=>{
    console.log(`Servidor en el puerto ${PORT}`);
})