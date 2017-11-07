const express = require('express'), bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(express.static('public'))

idCounter = 3;

var items = [
	{
		id: 1,
		name: "Default Item 1",
		quantity: 1
	},
	{
		id: 2,
		name: "Default Item 2",
		quantity: 2
	}
]

// Only necessary if serving a static file at the root route.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')))

app.route('/items')
  .get(function (req, res) {
    res.json(items)
  })
  .post(function (req, res) {
  	var newItem = {};
  	newItem.id = idCounter;
  	newItem.name = req.body.name;
  	newItem.quantity = req.body.quantity;

  	items.push(newItem);
  	idCounter++;
    res.json(newItem)
  })

app.route('/items/:itemId')
  .get(function (req, res) {
  	function matchesId(item) {
	    return item.id == req.params.itemId;
	}
  	var foundItem = items.find(matchesId)
  	if(foundItem !== undefined) {
    	res.json(foundItem);
  	} else {
  		res.status(404).send("Item not found");
  	}
  })
  .delete(function (req, res) {
  	var newItems = items.filter(function(item) {
  		console.log(item.id + " == " + req.params.itemId)
  		console.log(item.id == req.params.itemId)
	    return item.id != req.params.itemId;
	})
	items = newItems;
    res.status(204).send('No content')
  })

app.listen(3000, () => console.log('Example app listening on port 3000!'))