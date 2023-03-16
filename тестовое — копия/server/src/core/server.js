const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/user'
const User = require('../DB/models/users')
const validateDate = require('./validateDate')


mongoose
    .connect(db)
    .then((res) => console.log('Connected to Db'))
    .catch((error) => {
        console.log(error)
    })

const Port = 8081

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.get('/api', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.limit) || 1
        const skipVar = (page - 1) * pageSize
        let result = await User.find().skip(skipVar).limit(pageSize)

        result.forEach((item) => {
            if (item.events) {
                item.events.sort((a, b) => {
                    const dateA = new Date(a.startDate).getTime();
                    const dateB = new Date(b.startDate).getTime();
                    return dateA - dateB;
                });
            }
        })
        const total = await User.countDocuments()
        res.status(200).json({
            status: 'sucess',
            count: total,
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: `server error:${error}`
        })
    }
})


app.post('/add-user', (req, res) => {

    console.log(req.body)
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const eventsCount = req.body.eventsCount
    const events = req.body.events

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        eventsCount: eventsCount,
        events: events
    })
    user.save().then(result => res.send(result)).catch((err) => console.log(err))
})

app.get('/user/:id', (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.limit) || 1
        const skip = (page - 1) * pageSize
        User.findById(req.params.id)
            .slice('events', [skip, pageSize])
            .then(user => {
                res.send(user);
            });
    } catch (err) {
        res.writeHead(500).json({
            status: 'error',
            errorMessage: err
        })
    }
})

app.post('/user/:id', async (req, res) => {
    try {
        const contentType = req.get('Content-Type');
        let eventDate;
        if (contentType === 'application/json') {
            const title = req.body.title;
            const description = req.body.description;
            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);

            if (startDate.getTime()>endDate.getTime()){
                throw new Error('startDate can not be more than endDate')
            }

            const events = await User.findById(req.params.id).select('events');
            validateDate(startDate, endDate, events.events)

            eventDate = {
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate
            };
        } else if (contentType === 'application/x-www-form-urlencoded') {
            const title = req.body.title;
            const description = req.body.description;
            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);

            const events = await User.findById(req.params.id).select('events');
            validateDate(startDate, endDate, events.events)

            eventDate = {
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate
            };
        } else if (contentType == undefined) {
            throw new Error(undefined)
        } else {
            throw new Error(`Invalid Content-Type ${contentType}`);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $push: {events: eventDate},
                $inc: {eventsCount: 1}
            },
            {new: true}
        )

        res.json(updatedUser);
    }



    catch (error) {
        res.status(422).json({
            status: 'error',
            errorMessage: error.message
        });
    }

});




app.listen(Port)

