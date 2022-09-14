const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const app = express()
app.use(bodyParser.json())

const appIns = require('applicationinsights')
appIns.setup()
.setSendLiveMetrics(true)
.start()

app.get('/api/exception', async (req, res) => {

    const telemetry = appIns.defaultClient
    telemetry.trackException({
        exception: new Error('Bir önemli exception oluştu')
    })

    res.send('exception tracked')
})

app.get('/api/event', async (req, res) => {

    const telemetry = appIns.defaultClient
    telemetry.trackEvent({
        name: 'Önemli bir olay oluştu!',
        properties: {
            signinCount: 100,
            orderCount: 1000
        }
    })

    res.send('event tracked')
})

app.get('/api/hello', async (req, res) => {

    res.send('Hello World')
})

app.get('/api/env', async (req, res) => {

    const jsonText = JSON.stringify(process.env)
    const connStr = process.env.CUSTOMCONNSTR_connStr || 'connection string'

    res.send(connStr)
})

app.get('/api/merhaba', (req, res) => {

    res.send('Merhaba Dünya')
})

app.post('/api/name', (req, res) => {

    const body = _.pick(req.body, ['firstName','lastName'])
    console.log(body)
    res.send('Hello '+body.firstName+' '+body.lastName)
})

app.listen(8080, () => {
    console.log('app server is running')
})