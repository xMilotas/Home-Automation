var express = require('express')
var router = express.Router()

const tpClient = require('./models/trainingPeaks')
const api = new tpClient()


router.get('/workouts', async (req, res) => {
    // Parse query params
    console.log(req.query)

    response = await api.loadWorkouts(start_date=req.query.start_date, end_date=req.query.end_date)

    res.send(response)
})


router.post('/updateWorkout', async (req, res) => {
  if (req.body.workout){
      response = await api.updateWorkout(req.body.workout)
      res.send(response)
  }
  else {
    res.status(400);
    res.send({"status": 'Missing workout'})
  }
})

router.get('/peakperf', async (req, res) => {
  const workout_id = req.query.workout_id;

  if(workout_id){
    try {
      response = await api.loadPeakPerformances(workout_id=req.query.workout_id)
    }
    catch (error) {
      res.status(500);
      console.log(`Caught an error, ${error}`)
      response = error
    }
  }
  else {
    res.status(400)
    response = 'Missing required workout_id parameter.'
  }


  res.send(response)
})

module.exports = router