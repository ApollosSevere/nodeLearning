document.addEventListener('DOMContentLoaded', function() {
    // Now, as if I were doing it on a browser, I am going to 
    // connect to the API by doing a HTTP search, the only 
    // difference is that i am doing it within the Code itself!!
    // This is definiatyl Cool !!!
            fetch("http:localhost:5000/getAll")
            .then(response => response.json())
            .then(data => loadHTMLTable(data))

            fetch("http:localhost:5000/getData")
            .then(response => response.json())
            .then(data => loadHTMLData(data))    
    //.then(data => loadHTMLTable(data))
    // Now tell me somthing? I know that a second parameter can go here,
    // but is that neccacry in this setting? In what scenerio will i need to
    // speicify the headers and body and method: "POST"?

    //ANSWER: In express you propblay dont have to do that since this is a 
    // framwork!! The app.get + app.post takes care of that
    // without the framwork exprees you would wrtite all CRUD commands throurgh the
    // the fecth function!! 
    // fetch('http://localhost:5000/update', {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-type' : 'application/json'
    //     },
    //     body: JSON.stringify({
    //         id: updateNameInput.dataset.id,
    //         name: updateNameInput.value
    //     })
    // }) 
});

// Data flow <-- In !!
const addBtn = document.getElementById('newName')
addBtn.onclick = function () {
    const input = document.getElementById('nameValue')
    const inputValue = input.value
    input.innerHTML = "";

    fetch("http:localhost:5000/insert", {
        headers: {
            "Content-type": "application/json"
        }, 
        method: 'POST',
        body: JSON.stringify({ name: inputValue })
    })
    .then(response => response.json())
    .then(data => insertRowTable(data))
}

// Data flow --> Out !!
function insertRowTable(data) {
    const component = document.getElementById('up')
    for (i =0; i < data.length; i++ ) {
        for (const [key, value] of Object.entries(data[i])) {
            if (key === "Date_Added") {
                component.innerHTML += `<p> <strong>${key}</strong> : ${new Date(value).toLocaleString()}</p>`
                console.log('First one On')
            } else {
                component.innerHTML += `<p> <strong>${key}</strong> : ${value}</p>`
                console.log('Second one On')
            }
        } 
        component.innerHTML += "<hr>"       
    } 
}



function loadHTMLData(data) {
    const paragraph = document.getElementById('x');

    for (i =0; i < data.length; i++ ) {
        for (const [key, value] of Object.entries(data[i])) {
            paragraph.innerHTML += `<p> <strong>${key}</strong> : ${value}</p>`
        } 
        paragraph.innerHTML += "<hr>"       
    } 
    
    const table = document.querySelector('table tbody');
    console.log(data.length)

    if (data.length === 0) {
        console.log('working')
        table.innerHTML += "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
    }
}

function loadHTMLTable(data) {
    const paragraph = document.getElementById('p');

    for (let key of Object.keys(data)) {
        var value = data[key];
    }
// You may have to do a double for loop inorder to make this work with a real database !!
    for (const [key, value] of Object.entries(data)) {
        paragraph.innerHTML += `<p><strong>${key}</strong> : ${value}</p>`
    }
   
    // const table = document.querySelector('table tbody');

    // if (data.length === 0 ) {
    //     table.innerHTML = "<tr><td class'no-data' colspan='5'>No Data</td></tr>";
    // }


}







// Data Flow --> OUT
// const button = document.getElementById('newName')
// button.onclick = (function() {
//     console.log('Button Clicked Worked!')
//     const nameEle = document.getElementById('nameValue')
//     const nameInput = nameEle.value

//     fetch('http:localhost:5000/insert', {
//         headers: {
//             "Content-type": "application/json"
//         },
//         method: 'POST',
//         body: {name: nameInput}
//     })
//     .then(response => response.json())
//     .then(data => loadDivStuff(data))
// })

// // Data Flow <-- IN 

// function loadDivStuff(data) {
//     const thing = document.getElementById('up');
//     thing.innerHTML += `<p> ${data} </p>`
// }
