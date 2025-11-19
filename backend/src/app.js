import express from "express";

const app = express();
//const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//From previous lab
app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container! Ariana was here!" });
});

app.get('/hello/name/:first/:last', (req, res) => {
  let firstName = req.params['first'];
  let lastName = req.params['last'];
  res.json({ok:true, msg: "Hello "+firstName + " " + lastName})
});

//From current lab
//Exercise 1: Splendid Circles
app.get('/math/circle/:r', (req, res) => {
  let radius = req.params['r'];
  let area = (Math.PI*radius*radius).toFixed(2);
  let circumference = (2*Math.PI*radius).toFixed(2);
  res.json({area: area, circumference:circumference })
  //res.json({ok:true, msg: "Area: "+ area.toFixed(2) + ", circumference: " + circumference.toFixed(2) })
});
//Exercise 2: Radical Rectangles
app.get('/math/rectangle/:width/:height', (req, res) => {
  let width = req.params['width'];
  let height = req.params['height'];
  let area = width*height;
  let perimeter = 2*width+2*height;
  res.json({area: area, perimeter: perimeter })
});
//Exercise 3: Exquisite Exponents
app.get('/math/power/:base/:exponent', (req, res) => {
  let base = req.params['base'];
  let exponent = req.params['exponent'];
  let result = Math.pow(base,exponent);
  if(req.query['root']){
    let root = Math.sqrt(result);
    res.json({result: result, root: root})
  }else{
    res.json({result: result})
  }
});




//Legacy:
/*
app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container! Ariana was here!" });
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.get("/ariana", (req, res) => {
  res.status(200).send("Hello Ariana!");
});

/*
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
*/