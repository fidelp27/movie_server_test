//importar para usar folder
const fs = require('fs');
let uri= "https://api.themoviedb.org/3/movie/popular"
let header = {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjIyNmZjZTRjNmY1MWNiMTI1NTQ2YWYxZmJkNjQ2ZCIsIm5iZiI6MTcyMzMwNzc0OS4yMTA5NzgsInN1YiI6IjYyNjY2MzhhMjAyZTExMjhkY2Y4ZTYwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nHjUh-BfShhkIP-a1y1g9bFiLJmto72eyUk3MKPLklM"
}
let options ={
    "method":"GET",
    "headers": header
}

fetch(uri,options)
.then((resp)=>{
    if(!resp.ok) throw new Error(resp.status);
    return resp.json();
})
.then((data)=>{
    fs.writeFileSync('db.json',JSON.stringify(data));
})
.catch((err)=>{
    console.log(err);
})