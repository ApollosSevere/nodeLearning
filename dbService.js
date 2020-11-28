const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config()

let instance = null;
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('DB: ' + connection.state)
});

// REDO THIS FOR UNDERSTANDING!! // REDO THIS FOR UNDERSTANDING!!
class DbService {

    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((res, rej) => {
                const query = "Select * from names"
    
                connection.query(query, (err, results) => {
                    if (err) {
                        rej(new Error(err.message))
                    }
                    res(results);
                })
            })
            
            return response

        } catch (error) {
            console.log(error)
        }
    }


    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((res, rej) => {
                const query = "insert into names (name, date_added) values (?,?);";

                // The variable Name comes from the parameter and the DateAdded comes from the const you set with new Date() method!!
                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) {
                        rej(new Error(err.message))
                    };
                    res(result.insertId)                   
                })
            })
           //console.log("Insert ID: " + response['Id'])   
           
           return {
            Id: insertId,
            Name: name,
            Date_Added: dateAdded                        
            }

        } catch (error) {
            console.log(error)
        }   
    }

    async deleteRow(nameID) {
        try {
            const response = await new Promise((res, rej) => {
                const query = "Select That and Delete Boiii!! (?);";

                connection.query(query, [nameID], (err, result) => {
                    if (err) {
                        rej(new Error(err.message))
                    } else {
                        response(result)
                    }                    
                })
                // I guess from this point you can return the fields of the row that was deleted then run a function that checks for that fied in the rows that are there already then detlete it !
            }) 
        } catch (error) {
            
        }
    }
}




// async function upload() {
//     photoLoad = new Promise((reject, resolve) => {
//         setTimeout(() => {
//             reject('It Work!');
//         }, 1000)

//     })
    
//     let result = await photoLoad;
//     console.log(result)
// }

// upload();

module.exports = DbService;






// async insertNewName(name) {
//     try {
//         const dateAdded = new Date();
//         const response = await new Promise((res, rej) => {
//             const query = "insert into names (name, date_added) values (?,?);";

//             // The variable Name comes from the parameter and the DateAdded comes from the const you set with new Date() method!!
//             connection.query(query, [name, dateAdded], (err, result) => {
//                 if (err) {
//                     rej(new Error(err.message))
//                 };
//                 res([{
//                     Id: result.insertId,
//                     Name: name,
//                     Date_Added: dateAdded                        
//                     }
//                 ])                   
//             })
//         })
//        console.log("Insert ID: " + response['Id'])   
       
//        return response

//     } catch (error) {
//         console.log(error)
//     }   
// }