1
let clients = [
    {
        nom: "Diallo",
        prenom: "Moussa",
        telephone: "775533221",
        email: "moussa.diallo@example.com",
        adresse: "Dakar",
        categorie: "Solvable"
            
    },
    {
        nom: "Ba",
        prenom: "Fatou",
        telephone: "778899665",
        email: "fatou.ba@example.com",
        adresse: "Thiès",
        categorie: "Fidèle"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    afficherClients();
    document.getElementById("filtreCategorie").addEventListener("change", filtrerClients);


});



function afficherClients(filtre = "all") {
    const tableBody = document.getElementById("tableClients");
    tableBody.innerHTML = "";

    clients.forEach((client, index) => {
        if (filtre === "all" || client.categorie === filtre) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${client.nom}</td>
                <td>${client.prenom}</td>
                <td>${client.telephone}</td>
                <td>${client.email}</td>
                <td>${client.adresse}</td>
                <td>${client.categorie}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="voirFiche(${index})">Voir Fiche</button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="modifierClient(${index})">Modifier</button>
                    <button class="btn btn-danger btn-sm" onclick="supprimerClient(${index})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });
}

function filtrerClients() {
    const filtre = document.getElementById("filtreCategorie").value;
    afficherClients(filtre);
}


function supprimerClient(index) {
    if (confirm("Voulez-vous vraiment supprimer ce client ?")) {
        clients.splice(index, 1);
        afficherClients();
    }
}

function modifierClient(index) {
    const client = clients[index];

    document.getElementById("nom").value = client.nom;
    document.getElementById("prenom").value = client.prenom;
    document.getElementById("telephone").value = client.telephone;
    document.getElementById("email").value = client.email;
    document.getElementById("adresse").value = client.adresse;
    document.getElementById("categorie").value = client.categorie;

    document.getElementById("formClient").onsubmit = function (event) {
        event.preventDefault();
        const errorMessage = validerFormulaire(client.telephone, client.email);
        if (errorMessage) {
            document.getElementById("error-message").textContent = errorMessage;
            return;
        }

        client.nom = document.getElementById("nom").value;
        client.prenom = document.getElementById("prenom").value;
        client.telephone = document.getElementById("telephone").value;
        client.email = document.getElementById("email").value;
        client.adresse = document.getElementById("adresse").value;
        client.categorie = document.getElementById("categorie").value;

        afficherClients();
        resetForm();
        bootstrap.Modal.getInstance(document.getElementById("ajouterClientModal")).hide();
    };

    new bootstrap.Modal(document.getElementById("ajouterClientModal")).show();
}


