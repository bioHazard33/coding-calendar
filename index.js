const arg = process.argv.splice(2);
const axios = require("axios");
const request = require("request");

getContests = async (arg) => {
    //AXIOS
    // let contests=await axios.get('https://clist.by/get/events/')
    // contests=contests.data.filter((contest)=>Date.parse(contest.end)>Date.now())

    //REQUEST
    request("https://clist.by/get/events/", (err, res, body) => {
        if (err) {
            console.log("Some Error Occurred.");
            return;
        }
        
        let contests = JSON.parse(body);
        let curr_time = Date.now();
        let flag=0

        switch (arg) {
            case "past":
                contests = contests.filter(
                    (ele) => Date.parse(ele.end) < curr_time
                );
                console.log(`##### ${contests.length} Past Contests #####`);
                break;
            case "upcoming":
                contests = contests.filter(
                    (ele) => Date.parse(ele.start) > curr_time
                );
                console.log(`##### ${contests.length} Upcoming Contests #####`);
                break;
            case "running":
                contests = contests.filter(
                    (ele) =>
                        Date.parse(ele.start) < curr_time &&
                        Date.parse(ele.end) > curr_time
                );
                console.log(`##### ${contests.length} Running Contests #####`);
                break;
            default:
                console.log(
                    'Not a command , either use "past","upcoming" or "running"'
                );
                flag = 1;
        }

        if (flag) return;
        console.log(contests);
        return;
    });
};

getContests(arg[0]);