const express = require('express')
const app = express()
const axios = require('axios')
const URL = 'https://api-rest-productos.onrender.com/'
const port = 3000

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/productos', (req, res) => {
    axios.get(URL + 'productos')
    .then (response=>{
        mis_productos=[]
        response.data.map(item=>{
        let nuevo = item
        nuevo.provedor="rodrigo medrano"
        nuevo.costo=item.costo*1.8
        mis_productos.push(nuevo)
        })
        res.send(mis_productos)

    })
    .catch((e)=>{
        res.send(e)
    })
  })

app.get('/productos/:id', (req, res) => {
    axios.get(URL + `productos/${req.params.id}`)
    .then ((response)=>{
        const nuevo = response.data 
        nuevo.proveedor="rodrigo medrano"
        nuevo.costo=parseInt(response.data.costo)*1.8
        res.send(nuevo)
    })
    .catch((e)=>{
        res.json(e)
    })
  })

app.post('/productos', (req, res) => {
    axios.post(URL + 'productos/',req.body)
    .then((response)=>{
        res.send(response.data)
    })
    .catch ((e)=>{
        res.send(e)
    })
})

app.get('/productos/categoria/:cat', (req, res) => {
  const categoria = req.params.cat;
  axios.get(`${URL}productos/categoria/${categoria}`)
  .then(response => {
      let productosCategoria = []
      response.data.map(item => {
        const nuevo = item;
        nuevo.proveedor = "rodrigo medrano";
        nuevo.costo = parseFloat(item.costo)* 1.8;
        productosCategoria.push(nuevo);
    });
      res.json(productosCategoria);
  })
  .catch(e => {
      res.status(e.response.status).json(e)
  });
});


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  