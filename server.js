const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var dotenv = require('dotenv' );
dotenv.config({ silent: true });

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB;

MongoClient.connect(uri, (err, client) => {
    if (validar(err)==false)
        return console.log(err);

    db = client.db('crud-mongodb-urls')
})

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.route('/edit/:id').get((req,res)=>{
    var id = req.params.id;

    var ObjectID = require('mongodb').ObjectID;
    var o_id = new ObjectID(id);

    db.collection('data').find({"_id": o_id}).toArray((err, result) =>{
        if (validar(err)==false)
            return res.send(err);
        console.log('\n\n');
        console.log('-----------------');
        console.log(id);
        console.log('-----------------');
        console.log(result);
        console.log('-----------------');
        res.render('edit.ejs',{ data: result});
    });
}).post((req, res) => {
    var id = req.params.id;
    var dados = req.body.urls;
    console.log('\n\n');
    console.log('-----------------');
    console.log(id);
    console.log('-----------------');
    console.log(dados);
    console.log('-----------------');
    var dadosURL = JSON.parse(dados).url;
    var dadosTAG = JSON.parse(dados).tags;
    var dadosUSR = JSON.parse(dados).usuario;
    dados = {'url':dadosURL,'tags':dadosTAG,'usuario':dadosUSR};

    var ObjectID = require('mongodb').ObjectID;
    var o_id = new ObjectID(id);
    db.collection('data').updateOne({"_id": o_id},{
        $set:{
            url: dadosURL,
            tags: dadosTAG,
            usuario: dadosUSR
        }
    }, (err, result) => {
        if (validar(err)==false)
            return res.send(err); 
        
        console.log('Registro Atualizado!');
        
        db.collection('data').find().toArray((err,results)=>{
            if (validar(err)==false)
                return res.send(err);
            res.render('post.ejs', { data: results });
        });
    });
});

app.route('/del/:id').get((req,res)=>{
    var id = req.params.id;
    var ObjectID = require('mongodb').ObjectID;
    var o_id = new ObjectID(id);

    db.collection('data').deleteOne({"_id": o_id}, (err, result) =>{
        if (validar(err)==false)
            res.send(err);
       
        console.log('Registro Apagado!');
       
        db.collection('data').find().toArray((err,results)=>{
            if (validar(err)==false)
                return res.send(err);
        
            res.render('post.ejs', { data: results });
        });
    });
});

app.post('/post', (req,res) => {
    var dados = req.body.urls;
    var dadosURL = JSON.parse(dados).url;
    var dadosTAG = JSON.parse(dados).tags;
    var dadosUSR = JSON.parse(dados).usuario;
    
    dados = {'url':dadosURL,'tags':dadosTAG,'usuario':dadosUSR};

    db.collection('data').insertOne(dados,(err, result)=>{
        if (validar(err)==false)
            res.send(err);
    });

    console.log(req.body);

    db.collection('data').find().toArray((err,results)=>{
        if (validar(err)==false)
            return res.send(err);
        res.render('post.ejs', { data: results });
    });
});

app.set('view engine', 'ejs');

app.listen(3000, function(){
    console.log('A aplicação está rodando na porta 3000!');
});

function validar(err){
    if (err){
        console.log(err);
        return false;
    }
    return true;
}
