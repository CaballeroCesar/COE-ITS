// Require necessary modules
const { App } = require("@slack/bolt");
const { WebClient } = require("@slack/web-api"); 
const express = require("express"); 
const http = require("http");
const path = require("path");  
const { fetchWeatherData, getWeatherInfo } = require("./weather"); // Import weather functions
   
    
// Initialize Bolt app    
const app = new App({     
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});      
  
// Initialize WebClient 
const web = new WebClient(process.env.SLACK_BOT_TOKEN); 
 
// Initialize Express app      
const expressApp = express();    
 
// Serve static files (e.g., index.ejs)
expressApp.use(express.static(path.join(__dirname, "public")));

// Create a HTTP server 
const server = http.createServer(expressApp);   

// Set the views directory and the view engine for Express
expressApp.set("views", __dirname); // Assuming index.ejs is in the root directory
expressApp.set("view engine", "ejs");
 
// Get eslack emoji depending on the status   
function getEmoji(slackEmoji) {  
  let emoji = "";
  if (slackEmoji === "In a meeting") {
    emoji = 'https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f5d3-fe0f@2x.png';  
  }
  else if (slackEmoji === "Out of office") { 
    emoji = 'https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/26d4@2x.png';   
  } 
  else if (slackEmoji === "Out sick") {
    emoji = 'https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f912@2x.png';  
  }
  else if (slackEmoji === "Vacationing") {
    emoji = 'https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f334@2x.png';  
  }
  else if (slackEmoji === "Working remotely") {
    emoji = 'https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f3e1@2x.png';  
  }
  else if (slackEmoji === "In a huddle") {
    emoji = 'https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-small/1f3a7@2x.png';  
  }
  else if (slackEmoji === "In a meeting • Outlook Calendar") {
    emoji = 'https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f5d3-fe0f@2x.png';  
  }
  else if (slackEmoji === "No Status") { 
    emoji = null;           
  }
  else emoji = 'https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f4ac@2x.png';
  return emoji;  
}      
 
// Check if the persons birthday is today! 
var today = new Date(); // Get today's date
var day = today.getDate(); // Get the day of the month 
var month = today.getMonth() + 1; // Get the month
var todaysDate = `${month}/${day}`;
const birthdays = new Map([
  ['Aaron Cosentino', '9/14'],
  ['Sushma Mandava', '3/30'], 
  ['Carmen Rojas', '5/18'],
  ['Joe Bush', '9/1'],
  ['Tanuja', '6/19'],
  ['Li Li', '11/8'],
  ['Chris Nawrot', '5/15'], 
  ['Fabi Fernandez', '1/9'], 
  ['Crystal Ali', '4/17'], 
  ['Sonia', '4/5'], 
  ['Cesar Caballero', '1/31'], 
]);
function isBirthday(name) {
  if (birthdays.get(name) === todaysDate) {
      return true;
  } 
  else return false;
}
 
// Define a route to handle requests for the status page
expressApp.get('/', async (req, res) => {
    try {
        // Fetch user statuses
        const userList = await web.users.list();
        const users = userList.members.filter(member => !member.is_bot); // Filter out bots
        
        // Define an array of full names for the users you want to fetch statuses for
        const leftColfullNamesToFetchStatusFor = ['Aaron Cosentino', 'Sushma Mandava', 'Tanuja', 'Li Li', 'Carmen Rojas', 'Joe Bush'];
        const rightColfullNamesToFetchStatusFor = ['Crystal Ali', 'Fabi Fernandez', 'Sonia', 'Chris Nawrot', 'Cesar Caballero']; 
        
        // Filter the users array based on the full names specified for the left and right columns
        const leftColUsersToFetch = users.filter(user => leftColfullNamesToFetchStatusFor.includes(user.profile.real_name));
        const rightColUsersToFetch = users.filter(user => rightColfullNamesToFetchStatusFor.includes(user.profile.real_name));

        // Fetch user statuses, presence, and profile pictures for the filtered users in the left column
        const leftColStatusPromises = leftColUsersToFetch.map(async user => {
            const [profileResult, presenceResult] = await Promise.all([
                web.users.profile.get({ user: user.id }),
                web.users.getPresence({ user: user.id })  
            ]);

            const statusText = profileResult.profile.status_text || "No Status";  
            const statusEmoji = profileResult.profile.status_emoji || "";
            const presenceStatus = presenceResult.presence;
            const profilePictureUrl = profileResult.profile.image_512; 
            const huddleState = profileResult.profile.huddle_state === 'in_a_huddle' ? 'In a huddle' : 'Not in a huddle';
          
            return {  
                name: user.profile.real_name, 
                status: statusText, 
                emoji: getEmoji(statusText), 
                presence: presenceStatus,  
                profilePictureUrl: profilePictureUrl,
                huddle: huddleState,
                huddleEmoji: getEmoji(huddleState)
            }; 
        });    

        // Fetch user statuses, presence, and profile pictures for the filtered users in the right column
        const rightColStatusPromises = rightColUsersToFetch.map(async user => {
            const [profileResult, presenceResult] = await Promise.all([
                web.users.profile.get({ user: user.id }), 
                web.users.getPresence({ user: user.id })
            ]);

            const statusText = profileResult.profile.status_text || "No Status";  
            const statusEmoji = profileResult.profile.status_emoji || "";
            const presenceStatus = presenceResult.presence;
            const profilePictureUrl = profileResult.profile.image_512; 
            const huddleState = profileResult.profile.huddle_state === 'in_a_huddle' ? 'In a huddle' : 'Not in a huddle';
 
            return {  
                name: user.profile.real_name, 
                status: statusText, 
                emoji: getEmoji(statusText),
                presence: presenceStatus, 
                profilePictureUrl: profilePictureUrl,
                huddle: huddleState,
                huddleEmoji: getEmoji(huddleState)
            };
        });

        const leftColStatuses = await Promise.all(leftColStatusPromises);
        const rightColStatuses = await Promise.all(rightColStatusPromises);
        
        // Fetch weather data
    const currentWeather = await fetchWeatherData();

    // Get weather info
    const weatherInfo = getWeatherInfo(currentWeather.weather_code);

    // Render the index.ejs file with the fetched statuses and weather data
    res.render("index", {
      leftColStatuses,
      rightColStatuses, 
      isBirthday, 
      currentWeather,
      weatherInfo, 
    });
 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');   
    }
});
       
// Start the Express server
server.listen(process.env.PORT || 3000, () => {
  console.log("⚡️ Bolt app is running!");
});

// Start the Bolt app  
(async () => {
  await app.start();
})();
  