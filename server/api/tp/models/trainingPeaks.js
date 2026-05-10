

const http = require('wretch')
const config = require('../../config.js')
 

// TODO: Potential abstraction sample - depends if further API requests are on the same url
/** 
const api =
  wretch("https://jsonplaceholder.typicode.com", { mode: "cors" })
    .auth(`Bearer ${token}`)
    .errorType("json")
    .resolve(r => r.json())

const users = await api.get("/users")
        this.api = http("https://tpapi.trainingpeaks.com/")
        .auth(`Bearer ${this.token}`)
        .errorType("json")
        .resolve(r => r.json())
*/


class APIClient {
    constructor() {
        this.tp_auth_cookie = config.tp_cookie
        this.token = null;
    }

    async generateToken() {
        const json = await http("https://tpapi.trainingpeaks.com/users/v3/token")
            .headers({ "cookie": this.tp_auth_cookie })
            .get()
            .json();

        if (json.success === true) {
            this.token = json.token.access_token;
        } else {
            console.log(json);
            throw new Error('Failed to generate access token.');
        }
    }

    async loadWorkouts(start_date = '2024-03-25', end_date = '2025-01-05') {
        if (!this.token) {
            await this.generateToken();
        }

        console.log(`Request ${start_date}, ${end_date}`);

        const url = `https://tpapi.trainingpeaks.com/fitness/v6/athletes/4286132/workouts/${start_date}/${end_date}`;
        let json = await http(url)
            .auth(`Bearer ${this.token}`)
            .get()
            .unauthorized(async (error) => { 
                console.log('Token expired. Generating new one')
                await this.generateToken() 
                return await this.loadWorkouts(start_date, end_date);
            })
            .badRequest((e) => { 
                console.log(e)
                throw new Error('APIResponse') })
            .json();
        
        return json;
    }

    async loadPeakPerformances(workout_id) {
        if (!this.token) {
            await this.generateToken();
        }
        if (workout_id){
            const url = `https://tpapi.trainingpeaks.com/personalrecord/v2/athletes/4286132/workouts/${workout_id}?displayPeaksForBasic=true`;
            const json = await http(url)
                .auth(`Bearer ${this.token}`)
                .get()
                .unauthorized(async (error) => { 
                    console.log('Token expired. Generating new one')
                    await this.generateToken() 
                    return await this.loadPeakPerformances(workout_id);
                })
                .badRequest(() => { throw new Error('APIResponse') })
                .json();
            
            return json;
        }
        else return 'Missing workout_id'
    }

    async updateWorkout(workout) {
        if (!this.token) {
            await this.generateToken();
        }
        let workout_id = workout.workoutId
        if (workout_id){
            console.log(`Updating workout date for: ${workout_id}, ${workout.title}, ${workout.workoutDay}`)
            const url = `https://tpapi.trainingpeaks.com/fitness/v6/athletes/4286132/workouts/${workout_id}`;
            let json = await http(url)
                .auth(`Bearer ${this.token}`)
                .put(workout)
                .unauthorized(async (error) => { 
                    console.log('Token expired. Generating new one')
                    await this.generateToken() 
                    return await this.updateWorkout(workout);
                })
                .badRequest((e) => { 
                    console.log(e)
                    throw new Error('APIResponse') })
                .json();
                return {
                    "status": "Sucess",
                    "res": json
                }
        }
        else return {"status": 'Missing workout_id'}
    }
}

module.exports = APIClient;


