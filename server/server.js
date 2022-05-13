import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 8080; // Choosing PORT

// Constants for inference API
const textSummarizer_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
// This particular classifier can handle people and places to an excellent degree
const tokenClassifier_API_URL = "https://api-inference.huggingface.co/models/dslim/bert-base-NER";
const INFERENCE_API_TOKEN = "";
const inference_headers = {"Authorization": `Bearer ${INFERENCE_API_TOKEN}`};
const inference_options = {
    headers: inference_headers
  };

// Constants for news API
const NEWS_API_KEY = "";
const news_headers = {"Authorization": `Bearer ${NEWS_API_KEY}`};
const news_options = {
  headers: news_headers
};

const WEBHOSE_API_KEY = "";

// Config use JSON parser
app.use(express.json());
//app.use(express.urlencoded({ extended: true })); //Might need if using URL encoded forms in frontend

// GET Request - Requires URL parameters (SPACE replaced with underscore)
// Returns information summarized by inference API
app.get('/summarize', function(req, resp) {

  // Retrieve params from URL
  const endpoint = req.query.endpoint || "everything";
  var q = req.query.q;
  // Reformatting  for NewsAPI
  var news_q = q.replaceAll('_', '+');
  // Reformatting for token classifier
  var classifier_q = q.replaceAll('_', ' ');
  const sortBy = req.query.sortBy || "relevancy";
  const language = req.query.language || "en";  


  console.log("GET request recieved")
/*
  axios
    .post(tokenClassifier_API_URL, classifier_q, inference_options)
    .then(res => {
    resp.send(res.data);
    })
    .catch(error => {
    console.error(error)
    })


  /*

  Add support for these fields

  qInTitle
  sources
  domains
  excludeDomains
  from
  to
  sortBy
  pageSize
  page
  */

  // Query relational processing

  /* KEEP QUIET UNTIL API FIGURED OUT
  var entityType = "person";

  if(entityType == "person"){

    var name = "Joe Biden";
    var birthplace = "Scranton, Pennsylvania";
    var events = "President Joe Biden and Vice President Kamala Harris released their 2020 tax returns on Monday, rekindling the yearly presidential tradition. ";
    var role = "46th U.S. President";

    const template = `name: ${name} birthplace: ${birthplace}\nmajor events:${events}\ncurrent role: ${role}`

    resp.send(template);

  }
  */

  var news_url = `https://newsapi.org/v2/${endpoint}?q=${news_q}&sortBy=${sortBy}&language=${language}`;
 
  var wiki_url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${q}`

  // This is for using the newsURL 
  axios
    .get(news_url, news_options)
    .then(res => {

    //   console.log(news_q)
      
    //   console.log(res.data);
    })
    .catch(error => {
    console.error(error)
    })

    axios
    .get(wiki_url)
    .then(res => {

      // Find the returned pageid
      let pageid = Object.keys(res.data.query.pages)[0];

      
      // Send POST to huggingface inference API
      axios
      .post(textSummarizer_API_URL, res.data.query.pages[pageid].extract, inference_options)
      .then(res => {
      resp.send(res.data[0]);
      })
      .catch(error => {
      console.error(error)
      })
    
    })
    .catch(error => {
    console.error(error)
    })  
});

// Start server at selected PORT  
app.listen(port);
console.log('Server started at http://localhost:' + port);




//NYT Article Search: https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=oDihwEgMdQDP6u6BJm7h0y8OULVV3aqW