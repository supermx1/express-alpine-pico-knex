const express = require('express');
const app = express();
// const dotenv = require('dotenv')
require('dotenv').config({
    path: `${__dirname}/.env`
});
app.use(express.json());
// Set default extension as ejs
app.set('view engine', 'ejs');

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.DBHOST,
      port : process.env.DBPORT,
      user : process.env.DBUSER,
      password : process.env.DBPASSWORD,
      database : process.env.DB
    }
});
console.log(process.env)


app.get("/api/get/:table", async (req, res) => {
    console.log(process.env)
    try {
        const data = await knex(req.params.table)
            .offset(Number(req.query.offset) || 0)
            .limit(Number(req.query.limit) || 100)
        res.json(data);
    } catch (error) {
        res.json({ error })
    }
});

app.get("/api/getID/:table", async (req, res) => {
    try {
        const data = await knex(req.params.table)
        .where('id', Number(req.query.id))
        res.json(data);
    } catch (error) {
        res.json({ error })
    }
});

app.post("/api/post/:table", async (req, res) => {
    try {
        const r = await knex(req.params.table).insert(req.body);
        res.json(r);
    } catch (error) { 
        res.json({ error })
    }
})



// render an ejs fiew from the default view folder
app.get('/', (req, res) => {
    res.render('index');
})
  
//start up app and listten on specified port
app.listen(3000, () => console.log('listening on', 3000));


function abcd(e,f)
{

}

abcd(8, 7);
// for serverless stuff
module.exports = app;