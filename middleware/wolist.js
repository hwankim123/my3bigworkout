import * as wolistData from '../data/wolist.js';

export async function GetAllWorkout(req, res, next) {
    const data = await wolistData.FindAll();
    req.body = {
        routine: {
            ...req.body,
        },
        back: [],
        chest: [],
        lowerBody: [],
        shoulder: [],
        arm: [],
        fullBody: [],
        walkJogging: [],
    };
    data.forEach((workout) => {
        if(workout.type === "default"){
            switch(workout.agonist){
                case "등":
                    req.body.back.push(workout);
                    break;
                case "가슴":
                    req.body.chest.push(workout);
                    break;
                case "하체":
                    req.body.lowerBody.push(workout);
                    break;
                case "어깨":
                    req.body.shoulder.push(workout);
                    break;
                case "팔":
                    req.body.arm.push(workout);
                    break;
            }
        } else if(workout.type === "맨몸운동"){
            req.body.fullBody.push(workout);
        } else if(workout.type === "유산소"){
            req.body.walkJogging.push(workout);
        }
    });
    console.log(req.body);
    next();
}