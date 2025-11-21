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
  let area = +(Math.PI*radius*radius).toFixed(2);//putting a plus prefix converts the string result from toFixed back to a number
  let circumference = +(2*Math.PI*radius).toFixed(2);
  res.json({area: area, circumference: circumference })
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
    let root = Math.sqrt(base);
    res.json({result: result, root: root})
  }else{
    res.json({result: result})
  }
});

//Quotes: Extend app.js with these objects:
let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    'quote': 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'author': 'Winston S. Churchill'
  },
  {
    'quote': 'The way to get started is to quit talking and begin doing.',
    'author': 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    'quote': 'It’s not that I’m so smart, it’s just that I stay with problems longer.',
    'author': 'Albert Einstein'
  },
  {
    'quote': 'Perseverance is failing 19 times and succeeding the 20th.',
    'author': 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    'quote': 'Happiness is not something ready made. It comes from your own actions.',
    'author': 'Dalai Lama'
  },
  {
    'quote': 'For every minute you are angry you lose sixty seconds of happiness.',
    'author': 'Ralph Waldo Emerson'
  }
];
const categoryMap = {// categories holds an array of strings, categoryMap holds the array of category arrays
      successQuotes,
      perseveranceQuotes,
      happinessQuotes
    };

//Quotes 1.1: Create a GET endpoint at /quotebook/categories
app.get('/quotebook/categories/', (req, res) => {
  let category = "";
  categories.forEach(element => {
    category += "A possible category is " + element + "\n";
  });
  //res.json(category)
  //to return plaintext, use res.send()
  res.send(category);
});
//Quotes 1.2: Create a GET endpoint at /quotebook/quote/:category 
app.get('/quotebook/quote/:category', (req, res) => {
  let category = req.params['category'];
  if(categories.includes(category)){
    const list = categoryMap[category];//holds the list of quotes from the selected category
    const randomQuote = list[Math.floor(Math.random() * list.length)];//picks a random quote from that list

    return res.json(randomQuote);//return statement used so that the res.json doesnt later get overwritten

    //return res.json({msg: "category exists: " + category})//temp
  }else{
    return res.type('text').status(400).send({error: 'no category listed for ' + category});
  }
  /*
  let matchFound = false;
  let error ='no category listed for ' + category;
  categories.forEach(element => {
    if(category==element){
      matchFound=true;
      res.json({msg: "category exists: ", category: category})
    }
  });
  if(matchFound==false){
    res.json(error);
    res.type('text').status(400).send('Error, Bad Request!');
  }
    */
});
//Quotes 1.3: Create a POST endpoint at /quotebook/quote/new
app.post('/quotebook/quote/new', (req, res) => {
  const {category, quote, author} = req.body;
  if (!category || !quote || !author || !categories.includes(category)) {//requires 3 parameters
    return res.status(400).json({
      error: "invalid or insufficient user input"
    });
  }
  // Add the new quote object
  categoryMap[category].push({quote: quote, author: author});
  return res.type("text").send("Success!");
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