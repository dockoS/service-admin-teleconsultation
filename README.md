# service-admin-kayFadju


## POST
###  /admin/login => connexion d un admin attribut:{matricule:String,password:String} 
### cas 1 return l'object admin connecte si tout ce passe bien
### cas 2 return status(402) si le matricule ou mot de passe n'est pas bonne 
### cas 3 return status(500) erreur dans la base de donnees 

## POST
###  /admin/signup => inscription d un admin attribut:{ numTel,email, prenom,nom,password,confirmPassword,matricule (type All String)} 
### cas 1 return status(200) l'object admin inscrit si tout ce passe bien
### cas 2 return status(400) si le mail n'est pas bonne 
### cas 3 return status(402) si le matricule existe deja dans la base de donnees
### cas 4 return status(402) si le mot de passe et confirmation non identiques
### cas 5 return status(500) erreur dans la base de donnees 

## GET
###  /admin/read  
### cas 1 return status(200) la liste des admins inscrits 
### cas 2 return status(500) erreur dans la base de donnees  

## POST
###  /admin/createPatient => inscription d un admin attribut:{ you know it} 
### cas 1 return status(200) l'object le patient  inscrit et l envoie un message 
### cas 2 return status(400) si le numero n'est pas bonne 
### cas 3 return status(402) si le matricule existe deja dans la base de donnees
### cas 5 return status(500) erreur dans la base de donnees # service-admin-teleconsultation
