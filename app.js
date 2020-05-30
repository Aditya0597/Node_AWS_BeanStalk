const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require('./db-config');

//Get all jobs
app.get('/', (req, res)=>{
    console.log('Assignment 3 Cloud computing!');
    res.send('<h2 style=\"color:violet\">Assignment 3 Cloud Computing'); 
});

app.get('/jobs467', (req, res)=>{
    console.log('Inside app.get() Getting all jobs...');
    let sql467 = 'SELECT * FROM jobs467;'
    let query467 = db.query(sql467, (err, result)=>{ 
        if (err) throw err;
        console.log('All jobs:');
        console.log(result);
        res.send(result); 
    });
});

app.get('/jobs467', (req, res)=>{
    console.log('Inside app.get() Getting all jobs...');
    let sql467 = 'SELECT * FROM jobs467;'
    let query467 = db.query(sql467, (err, result)=>{ 
        if (err) throw err;
        console.log('All jobs:');
        console.log(result);
        res.send(result); 
    });
});
//Get specific jobs
app.get('/jobs467/:jobName467/:partId467', (req, res)=>{
    console.log('Inside app.get() Getting the specified job...');
    let jName467 = req.params.jobName467;
    let pId467 = parseInt(req.params.partId467);
    let sql467 = `SELECT * FROM jobs467 WHERE jobName467 = '${jName467}' AND partId467= ${pId467};`
    let query467 = db.query(sql467, (err, result)=>{
        if (err) throw err;
        if (result.length===0){
            console.log('Sorry could not find matches for the job specified. Try again!'); 
            res.send('Sorry could not find matches for the job specified. Try again!'); 
        }else{
            console.log('Match found: '+JSON.stringify(result));
            res.send(JSON.stringify(result)); 
        }
    }); 
});

const jsonParser = bodyParser.json()

//Insert Jobs
app.post('/jobs467/addJob',jsonParser,(req,res)=>{
    console.log(('In app.post() with a new job to be inserted!'));
    let where = `jobName467 = '${req.body.jobName467}' AND partId467 =${req.body.partId467}`;
    let jName467 = req.body.jobName467;
    let pId467 = parseInt(req.body.partId467);
    let qnty467 = parseInt(req.body.qnty); 
    let sqlSelect ='SELECT * FROM jobs467 WHERE ' +where; 
    let sql ='INSERT INTO jobs467 SET ?'
    let data = {
        jobName467:jName467, 
        partId467:pId467, 
        qnty:qnty467
    }; 
    let querySelect= db.query(sqlSelect, (err,result)=>{ 
        if (err) throw err;
        if(result==""){
            console.log('New job found: '+JSON.stringify(data));
            console.log('Inserting into DB...');
            let query= db.query(sql,data,(err,result)=>{
                if (err) throw err;
                console.log('Inserted successfully!');
                res.send('Job {'+data.jobName467+', '+data.partId467+', ' + data.qnty +'}inserted in the table');
            });
        }
        else{
            console.log('Could not insert. Job already exists!');
            res.status(404).send('Could not insert. Job already exists!'); 
        }
    });
});

//Update Jobs
app.put('/jobs467/updateJob',jsonParser,(req,res)=>{
    console.log(('In app.put() with a job to be updated.'));
    let where = `jobName467 = '${req.body.jobName467}' AND partId467 =${req.body.partId467} `;
    let jName467 =req.body.jobName467;
    let pId467 = parseInt(req.body.partId467);
    let qnty467 = parseInt(req.body.qnty); 
    console.log(`Updated job=> (jobName467, partId467, qnty): (${jName467}, ${pId467}, ${qnty467})`);
    let sqlSelect ='SELECT qnty FROM jobs467 WHERE ' +where; 
    let sql ='UPDATE jobs467 SET ? WHERE ' +where;
    let data = {
        jobName467:jName467, 
        partId467:pId467, 
        qnty:qnty467
    };
    let querySelect= db.query(sqlSelect, (err,result)=>{
        if (err) throw err; 
        if(result!=""){
            console.log('Job found. Updating...');
            console.log('Value of \'qnty\' before update: '+result[0].qnty) 
            let query= db.query(sql,data,(err,result)=>{
                if (err) throw err;
                if(result.changedRows===0){
                    res.send('Job with same quantity exists. Nothing changed in the DB.');
                }else{
                    console.log('Value of \'qnty\' after update: '+qnty467) 
                    res.send('Job {'+data.jobName467+', '+data.partId467+', ' + data.qnty + '} updated in the table');
                }
            }); 
        }else {
            res.status(404).send('Can\'t update. No such job exists!');
        } 
    });
});
app.delete('/jobs467/deleteJob/:jobName467', (req, res)=>{
    console.log('In app.delete()');
    console.log((`Job with name: ${req.params.jobName467} to be deleted...`));
    let jName467 = req.params.jobName467;
    let where = `jobName467 = '${jName467}';`; 
    let sqlDelete467 = 'DELETE FROM jobs467 WHERE ' +where;
    let queryDelete467 = db.query(sqlDelete467,(err, result)=>{
        if (err) throw err;
        if(result.affectedRows===0) {
            console.log('Job not found. Nothing to delete.')
            res.send('Job not found. Nothing to delete.'); 
        }else{
            console.log('Job found and deleted successfully.')
            res.send('Job found and deleted successfully.'); 
        }
    }); 
});
const port =  process.env.PORT || 3000;
app.listen(port,()=>console.log('Listening on port '+port));