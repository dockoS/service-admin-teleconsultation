mettre_space=(tel)=>{
    newNumtel=""

    for (let i = 0; i < tel.length; i++) {
        newNumtel=newNumtel+tel[i]
            if (i==1 || i==4 || i==6) {
                newNumtel=newNumtel+" "
            }
    
    }
    return newNumtel
}

console.log(mettre_space("784389282"))