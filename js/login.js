const database = firebase.database();
const auth = firebase.auth();

const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const btnLogin = document.getElementById('btn_Login');

auth.onAuthStateChanged(
    (user) => {
        console.log("estoy en el metodo");
        if (user !== null) {
            window.location.href = "index.html";
        }
    }
);
btnLogin.addEventListener('click', () => {
    auth.signInWithEmailAndPassword(userEmail.value, userPassword.value).then(
            (data) => {
                window.location.href = "index.html";
            }
        ).catch(
            (error) => {
                alert(error.message);
            }
    )
});