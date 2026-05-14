import express from "express";

const app = express();

// app.use((req, res) => {
//     console.log("new request from port 3000");
//     res.send("moshi mosho donalddesu");
// })

app.get("/cat", (req, res) => {
    res.send("mewo mewo");
})


app.listen(3000, () => {
    console.log("hi from port 3000");
});