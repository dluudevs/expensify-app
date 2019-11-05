const path = require('path')
const express = require('express');
const app = express();
// __dirname is name of current directory, go up one level (..) and go to publc folder
const publicPath = path.join(__dirname, '..', 'public')
//variable with the port that is set by Heroku
// cannot use 3000 port with heroku, heroku will use a dynamic port
const port = process.env.PORT || 3000 //if variable exist, app running from heroku, otherwise use the default port 3000

app.use(express.static(publicPath)) //takes return value from express.static and passes it to app.

//get method, sets up a function to run when someone makes a get request
// asterick (*) is for all unmatched routes
// req obj - info about request
//  resp obj - lets you manipulate response server makes
app.get('*', (req, resp) => {
    //redirect to index.html when there is unmatched route. similar to webpack.config historyAPIfallback
    resp.sendFile(path.join(publicPath, 'index.html'))
}) 

app.listen(port, () => {
    console.log(__dirname)
    console.log(publicPath)
})
