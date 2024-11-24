var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Workout = require('../model/workout.js');
const workout = require('../model/workout.js');
let bookController = require('../controllers/book.js')
/* Get route for the book list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const WorkoutList = await Workout.find();
    res.render('Workout/list',{
        title:'Workout Log',
        WorkoutList:WorkoutList
    })}
    catch(err){
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Workout/add',{
            title: 'Add Workout'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newWorkout = Workout({
            "Date":req.body.Date,
            "Exercise":req.body.Exercise,
            "Sets":req.body.Sets,
            "Reps":req.body.Reps,
        });
        Workout.create(newWorkout).then(()=>{
            res.redirect('/workoutslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const workoutToEdit= await Workout.findById(id);
        res.render('Workout/edit',
            {
                title:'Edit Workout',
                Workoit:workoutToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedWorkout = Workout({
            "_id":id,
            "Date":req.body.Date,
            "Exercise":req.body.Exercise,
            "Sets":req.body.Sets,
            "Reps":req.body.Reps,
        });
        Workout.findByIdAndUpdate(id,updatedWorkout).then(()=>{
            res.redirect('/workoutslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Workout.deleteOne({_id:id}).then(()=>{
            res.redirect('/workoutslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;