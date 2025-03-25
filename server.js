const { json } = require("stream/consumers")
const XLSX = require("xlsx")
const { request } = require("http")
const express = require("express")
const { name } = require("ejs")
const path = require("path")
const fs = require("fs")
const { send } = require("process")
const app = express()

app.set('views','./views')
app.set("view engine",'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'styles')))

app.get("/",(req,res) => {
    const workbook = XLSX.readFile("Databases/DataSheet.xlsx")
    const sheetName = workbook.SheetNames[0]
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

    const format = data.map(row => ({
        product: row['المنتج'],
        prand: row['اسم الشركة'],
        price: row['سعر المنتج'],
        specs: row['مواصفات']
        .split(",")
        .reduce((acc,spec) => {
            const [key,val] = spec.split(":").map(e => e.trim())
            acc[key] = val
            return acc
        },{})
    }))
    res.render("home.ejs",{data:format})
})

app.listen(3001,() => {
    console.log("Hello New Project")
})