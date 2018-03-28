const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.resolve(__dirname,'..','public');
const publicPath1 = path.resolve(__dirname,'..','public/dist');
const port = process.env.PORT|| 3000;

app.use(express.static(publicPath));
app.get('*',(req, res) => {
  res.sendFile(path.join(publicPath, 'dist/index.html'));
});
app.listen(port, () => {
  console.log('server is up!');
});
