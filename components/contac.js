class Contact{
    constructor(contacto){
        this.contacto = contacto;
    }



render = () =>{
    let contactComponent = document.createElement('div');
    contactComponent.className="contactComponent";
    contactComponent.id="contactComponent";

    let containerInfo = document.createElement('div');
    containerInfo.className="contactInfoContainer";

    let pInfoname = document.createElement('p');
    pInfoname.className="pInfoname";
    pInfoname.innerHTML = this.contacto.name;

    let pInfoTele = document.createElement('p');
    pInfoTele.className="pInfoTele";
    pInfoTele.innerHTML = this.contacto.telephone;

    let btnDeleteCon = document.createElement('button');
    btnDeleteCon.className = "btnDelete";
    btnDeleteCon.id = "btnDeleteCon";
    btnDeleteCon.innerHTML = "Delete";

    btnDeleteCon.addEventListener('click',()=>{
        database.ref('tallers14/contacts/'+this.contacto.userid+'/'+this.contacto.id).set(null);

    })

    containerInfo.appendChild(pInfoname);
    containerInfo.appendChild(pInfoTele);

    contactComponent.appendChild(containerInfo);
    contactComponent.appendChild(btnDeleteCon);

    return contactComponent;
}
}