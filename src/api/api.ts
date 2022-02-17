// //Import modules
import { 
    Request, 
    Response 
} from 'express';

import { 
    PrismaClient, 
    Prisma, 
    BorrowDetails, 
    Library, 
    Students 
} from '@prisma/client';

import {
    ConvertBigIntObjects, 
    ConvertBigIntObject
} from '../bigIntConvert';
import cors from 'cors';
import bCrypt from 'bcryptjs';
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const nodePort = 2398;

let bodyparsee = bodyParser.urlencoded({ extended: false});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
app.use(cors({
    accept:'*',
    method:'POST, GET'
}));

async function FetchPass(userName,ggpassword) {
    const query = await prisma.login.findUnique({
        where:{
            UserName: userName,
        },
        select:{
            PassWord: true
        }
    }).then((response) => {
        const tester:any =(response.PassWord)
        if (!tester==ggpassword) {
            return true
            console.log("Password is incorrect")
        }
        console.log("Password is correct")
        return false; 
    })
} 

//Types
// type NumberLibrary = {
//     ISBN: Number;
//     BookName: String;
//     Author: String;
//     IsAvailable: Boolean;
//     Quantity: Number;
// }

//Handlers

//Listen 
app.listen(nodePort, () => {
    console.log("Listening on: " + nodePort);
});

app.post('/login',bodyparsee, async (req, res) => {
    res.json(req.body)
   
    let password = await FetchPass(req.body.id,req.body.pass)
    
    .then((response => {
  
       // console.log(response);
       
    }))


    // let userName = (req.body.id);
    // let passWord = (req.body.pass);
  });
// type bookinf={
//     ISBN:number|undefined;
//     BookName:string|undefined;
//     Author:string|undefined;
//     IsAvailable:boolean|undefined;
//     Quantity:number|undefined;
// }
// app.get('/book', async (req: Request, res: Response) => {
//     console.log("hej");
//     let numIsbn = Number(req.body.isbn);
//     let bigIntIsbn = BigInt(numIsbn);
   
//     const books = await prisma.library.findUnique({
//         where: {
//             ISBN: bigIntIsbn
//         }
//     })
//     .then((book) => {
//         console.log(book);
//         //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
//         let convertedBooks = ConvertBigIntObject(book);

//         res.status(200).json(convertedBooks);
//     })
//     .catch((e) => {
//         res.status(500).send(e.message);
//     });
// });

// app.get('/books', async (req: Request, res: Response) => {
//     console.log("hej");
//     let datum: Date = new Date();
//     let month = new Date().getMonth() + 1;
//     console.log(datum.getFullYear() + "/" + month + "/" +  datum.getDate());
   
//     const books = await prisma.library.findMany()

//     .then((böcker) => {
//         console.log(böcker);
//         //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
//         let convertedBooks = ConvertBigIntObjects(böcker);

//         res.status(200).json(convertedBooks);
//     })
//     .catch((e) => {
//         res.status(500).send(e.message);
//     });
// });

// app.get('/students', async (req, res) => {
//     const members = await prisma.students.findMany()
//     .then((members) => {
//         res.status(200).send(members);
//     })
//     .catch((e) => {
//         res.status(500).send(e.message);
//     });

// });

// app.post('/updateStudent',(req, res) => {
    
//     //pass in data
//     const updateUser = prisma.students.update({
//         where: {
//             Email: req.body.email
//         },
//         data: {
//             FirstName: req.body.firstName,
//             LastName: req.body.lastName,
//             Email: req.body.email,
//             PhoneNumber: req.body.phone,
//         },
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });

// });

// app.post('/updateBook',(req, res) => {
//     let ISBN = BigInt(parseInt((req.body.isbn).toString()));
//     let ISBN2 = BigInt(parseInt((req.body.isbn2).toString()));
//     let Quantity = parseInt((req.body.amount).toString());
//     let isAvailable = false;

//     if(Quantity){
//         isAvailable = true; 
//     }
//     else {
//         isAvailable = false;
//     }
//     //pass in data
//     const updateUser = prisma.library.update({
//         where: {
//             ISBN: ISBN
//         },
//         data: {
//             ISBN: ISBN2,
//             BookName: req.body.bookName,
//             Author: req.body.author,
//             Quantity: Quantity,
//             IsAvailable: isAvailable,
//         },
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });

// });

// app.post('/borrow',(req, res) => {
//     let ntiId = req.body.ntiId;
//     let staffId = req.body.staff;
//     let studentId = req.body.borrower;
//     let datum: Date = new Date();

//     let borrowBook = {
//         ntiID: ntiId,
//         staffID: staffId,
//         studentID: studentId,
//         borrowedDate: datum,
//     }

//     const borrow = prisma.borrowDetails.create({
//         data: {borrowBook}
//     })

//     res.redirect('/');
// });

// app.post('/registerBook', async(req, res) => {
//     let ISBN = BigInt(parseInt((req.body.isbn).toString()));
//     let Quantity = parseInt((req.body.amount).toString());
//     let isAvailable = false;

//     if(Quantity){
//         isAvailable = true; 
//     }
//     else {
//         isAvailable = false;
//     }

//     let book = {
//         ISBN: ISBN,
//         BookName: req.body.title,
//         Author: req.body.author,
//         IsAvailable: isAvailable,
//         Quantity: Quantity,

//     }
//     console.log(book);

//     const Book = await prisma.library.create({
//         data: book,
//       }) 

//     res.redirect('/');
// });

// app.post('/registerStudent', async(req:Request, res:Response) => {

//     let student = {
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         Email: req.body.Email,
//         PhoneNumber: req.body.PhoneNumber,
//     }
    
//     console.log(student);

//     const Student = await prisma.students.create({
//         data: student,
//       }) 

//     res.redirect('/');
//     });

// app.post('/deleteStudent', async (req, res) => {
//     console.log(req.body.email);

//     const deleteStudent = await prisma.students.delete({
//         where: {
//             Email: req.body.email,
//         },
//     });

//     res.redirect('/');
// });

// app.post('/deleteBook', async (req, res) => {
//     let ISBN = BigInt(parseInt((req.body.isbn).toString()));

//     const deleteBook = await prisma.library.delete({
//         where: {
//             ISBN: ISBN,
//         },
//     });

//     res.redirect('/');
// });

