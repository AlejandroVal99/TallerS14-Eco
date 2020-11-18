const auth = firebase.auth();

const userName = document.getElementById('userName')
const btnLogout = document.getElementById('btnLogout');
const btnNewContact = document.getElementById('btn_NewContact');
const containerContacts = document.getElementById('containerContacts');
const newContactForm = document.getElementById('newContactForm');
const btnOpenformContact = document.getElementById('btn_formNewContact');
const btnCloseformContact = document.getElementById('btn_CancelNewCon');
const name_Contact = document.getElementById('name_Contact');
const telephone_Contact = document.getElementById('telephone_Contact');

let userActiveid = null;


auth.onAuthStateChanged(
    (user) => {
        if (user !== null) {
            database.ref('tallers14/users/' + user.uid).once('value',
                (data) => {
                    let userDB = data.val();
                    userName.innerHTML = userDB.name;
                    userActiveid = userDB.id;
                    loadContacts();
                }
            );
        } else {
            window.location.href = "login.html";
        }
    }
);

btnOpenformContact.addEventListener('click', () => {
    console.log("Funciono");
    newContactForm.style.display = "flex";

});

btnCloseformContact.addEventListener('click', () => {
    newContactForm.style.display = "none";
});

loadContacts = () => {

    database.ref('tallers14/contacts/' + userActiveid).on('value', function (data) {
            console.log(userActiveid);
            containerContacts.innerHTML = '';
            data.forEach(

                nContact => {
                    let infoContact = nContact.val();
                    let contacto = new Contact(infoContact);
                    containerContacts.appendChild(contacto.render());
                }
            )
        }

    )
}
btnNewContact.addEventListener('click', () => {
    let validInputs = name_Contact.value === "" || telephone_Contact.value === "";
    if (validInputs) {
        alert("Complete all fields for create contact");
    } else {
        database.ref()

        let n = name_Contact.value;
        let t = telephone_Contact.value;
        let reference = database.ref('tallers14/contacts/' + userActiveid).push();
        let newContact = {
            id: reference.key,
            userid: userActiveid,
            name: n,
            telephone: t,
        }
        reference.set(newContact);
        name_Contact.value = "";
        telephone_Contact.value = "";
    }
})

btnLogout.addEventListener('click', () => {
    auth.signOut().then(
        () => {
            userActiveid = null;
            window.location.href = "login.html";
        }
    ).catch(
        (error) => {
            alert(error.mesagge)
        }
    );
})