const friendsData = require("../data/friends");

findMatch =(userScore)=>{
    const index = 0;
    const lowestDiff = 0;
    for(const i=0; i<friendsData.length; i++){
        const totalDiff = 0;
        for(const j=0; j<userScore.length; j++){
            const scoreDiff = Math.abs(userScore[j] - friendsData[i].scores[j]);
            totalDiff += scoreDiff;
        }
        if(i==0){
            lowestDiff = totalDiff;
        }
        else if(i!=0 && totalDiff < lowestDiff){
            lowestDiff = totalDiff;
            index = i;
        }
    }
    return index;
}

module.exports = (app)=>{
    app.get('/api/friends', (req, res)=>{
        res.json(friendsData);
    });
    
    app.post('/api/friends', (req, res)=>{
        const userData = req.body;
        const index = findMatch(userData.scores);
        friendsData.push(req.body);
        res.json(friendsData[index]);
    });
}
