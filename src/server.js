import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const members = [
  {name: 'Bill Gates', id: 'bill-gates', company: 'Microsoft'},
  {name: 'Steve Jobs', id: 'steve-jobs', company: 'Apple'},
  {name: 'Steve Wozniak', id: 'steve-wozniak', company: 'Apple'}
]

polka() // You can also use Express
  .get('/team.json', (req, res) => {
    res.writeHead(200, { 'content-type': 'application/json'})
    res.end(JSON.stringify(members))
  })
  .get('/team/:id.json', (req, res) => {
    const headers = { 'content-type': 'application/json'}
    const member = members.find(member => member.id == req.params.id)

    if (member) {
      res.writeHead(200, headers)
      res.end(JSON.stringify(member))
    } else {
      res.writeHead(404, headers)
      res.end("wa wa wa")
    }
  })
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
