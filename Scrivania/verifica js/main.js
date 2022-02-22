/* let contenitore = document.getElementById('contenitore') */
let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let tabella = document.createElement('table');
let x = 1
let y = 1
let form = document.createElement('form')
let reset = document.createElement('button')
reset.innerHTML = "Reset"

let caricamento=document.createElement('button')
caricamento.innerHTML="Ricarica i risultati"
document.body.append(caricamento)
//dovevo finire con il bottone

let h1=document.createElement('h1')
h1.innerHTML="Caricamento..."
document.body.append(h1)
main()


function main(){ 

fetch('https://reqres.in/api/users')
    .then((response) => {
        h1.remove()
        console.log(response)
        return response.json()
    })


    .then((data) => {
        console.log(data)
        let trhead = document.createElement('tr');

        for (let key in data["data"][0]) {
            if (key == 'email' || key == 'first_name' || key == 'last_name') {
                let th = document.createElement('th')
                th.innerText = key
                trhead.append(th)
            }
        }
        tabella.append(trhead)
        for (let elements in data["data"]) {
            let trbody = document.createElement('tr')
            trbody.id = "tr" + x
            let elimina = document.createElement('button')
            elimina.innerHTML = "Elimina"
            x++


            for (let element in data["data"][elements]) {
                if (element == "email" || element == 'first_name' || element == 'last_name') {
                    let td = document.createElement('td')
                    td.innerText = data["data"][elements][element]
                    trbody.append(td)
                }

                trbody.append(elimina)

                elimina.addEventListener('click', function (event) {
                    window.localStorage.setItem(trbody.id, trbody.id)
                    trbody.remove()
                })

                if (trbody.id != localStorage[trbody.id]) {
                    tabella.append(trbody)
                }

            }
            reset.addEventListener('click', function (event) {
                localStorage.clear()
                tabella.append(trbody)
            })
        }
        traccia2()

        document.body.append(tabella)

        document.body.append(reset)
        document.body.append(form)

    })
}



//traccia 2

function traccia2() {

    let nomefor = document.createElement('input')
    let cognomefor = document.createElement('input')
    let emailform = document.createElement('input')
    let submit = document.createElement('input')
    nomefor.type = "Text"
    cognomefor.type = "Text"
    emailform.type = "Text"
    submit.type = "submit"
    submit.innerText = "aggiungi user"

    form.append(nomefor, cognomefor, emailform, submit)



    submit.addEventListener('click', function (event) {
        let x = true
        let trform = document.createElement('tr')
        let tdform1 = document.createElement('td')
        let tdform2 = document.createElement('td')
        let tdform3 = document.createElement('td')


        if (nomefor.value == "") {
            alert("Non hai inserito il nome ")
            x = false
        }

        if (emailform.value == "") {
            alert("Non hai inserito il la mail")
            x = false
        }

        if (cognomefor.value == "") {
            alert("Non hai inserito il cognome")
            x = false
        }

        if (!x) {
            event.preventDefault()
        }
        else {
            let dati = {
                'nome': nomefor.value,
                'cognome': cognomefor.value,
                'mail': emailform.value
            }
            tdform1.innerText = dati['nome']
            trform.appendChild(tdform1)

            tdform2.innerText = dati['cognome']
            trform.appendChild(tdform2)

            tdform3.innerText = dati['mail']
            trform.appendChild(tdform3)

            let datiJSON = JSON.stringify(dati)
            window.localStorage.setItem("user" + y, datiJSON)


            tabella.append(trform)
            y++

        }


    })


    if (localStorage.length != 0) {

        for (let i in localStorage) {
            let trsalvate = document.createElement('tr')

            datiJSON = localStorage.getItem(i)
            let dati = JSON.parse(datiJSON)
            for (let b in dati) {
                if (b == "nome") {
                    let tdsal1 = document.createElement('td')
                    tdsal1.innerText = dati['nome']
                    trsalvate.appendChild(tdsal1)
                }
                if (b == "cognome") {
                    let tdsal2 = document.createElement('td')
                    tdsal2.innerText = dati['nome']
                    trsalvate.appendChild(tdsal2)

                }
                if (b == "mail") {
                    let tdsal3 = document.createElement('td')
                    tdsal3.innerText = dati['nome']
                    trsalvate.appendChild(tdsal3)

                }
            }
            tabella.append(trsalvate)
        }
        
    }
}

