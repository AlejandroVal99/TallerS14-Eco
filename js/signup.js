const database = firebase.database();
const auth = firebase.auth();

const nameUser = document.getElementById('name');
const teleUser = document.getElementById('telephone');
const emailUser = document.getElementById('email');
const passUser = document.getElementById('password');
const conPassUser = document.getElementById('passwordCon');
const btn_SignUp = document.getElementById('btn_SignUp');

var isSignUp = false;
//alert('funciono');

auth.onAuthStateChanged(
    (user) => {
        if (user !== null) {
            if (isSignUp) {
                
                    let newUser = {
                        id: user.uid,
                        name: nameUser.value,
                        telephone: teleUser.value,
                        email: emailUser.value,
                        password: passUser.value,
                    };
                    database.ref('tallers14/users/'+ newUser.id).set(newUser).then(
                        ()=>{
                            window.location.href = "index.html"
                        }
                    );
            }else{
                window.location.href = "index.html";
            }
      
        }
    }
);

btn_SignUp.addEventListener('click', () => {

    isSignUp = true;

    let validationPass = passUser.value === conPassUser.value;
    let validationInputs = nameUser.value === "" || teleUser.value === "" || emailUser.value === "" || passUser.value === "";
    
    if (validationInputs) {
        alert('Complete all fields to complete');
    } else {
        if (validationPass) {
            auth.createUserWithEmailAndPassword(emailUser.value, passUser.value).then();
        } else {
            alert('Passwords do not match');
        }
    }
});

