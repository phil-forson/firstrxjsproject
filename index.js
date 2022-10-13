const { Observable } = require("rxjs")
const { map } = require("rxjs")

const users = {
    data: [
        {
            status: "active",
            age: 15
        },
        {
            status: "inactive",
            age: 21
        },
        {
            status: "active",
            age: 23
        },
        {
            status: "inactive",
            age: 32
        },
        {
            status: "active",
            age: 22
        },
        {
            status: "inactive",
            age: 11
        },
        {
            status: "inactive",
            age: 14
        }
    ]
}
const observable = new Observable((subscriber) => {
    subscriber.next(users);
}).pipe(
    map((value) => {
        console.log("1) From the observer ", value)
        return value.data
    }),
    map((value) => {
        console.log("2) From the first operator ", value)
        return value.filter((user) => user.status === "active")
    }),
    map((value) => {
        console.log("3) From the second operator ", value)
        return (value.reduce((sum, user) => sum + user.age, 0))/value.length
    })
)

const observer = {
    next : (value) => { console.log("The observer got a value of " + value) }
    ,
    error: (err) => { console.log(`The observer had an error ${err}`) }
    ,
    complete: () => { console.log("Observer got a complete notification")}
}

observable.subscribe(observer)