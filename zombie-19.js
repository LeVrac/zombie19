class Gens {
    constructor(name, age, infectedStatus, vaccines) {
        this.name = name;
        this.age = age;
        this.infectedStatus = infectedStatus;
        this.livingStatus = true;
        this.vaccines = vaccines;
        this.down = [];
        this.parent = null;
    }

    addDown(gens) {
        this.down.push(gens);
        gens.parent = this;
    }

    propagation() {

        var listVariant = [2,5,7,11];

        var statubelow = 1;

        if (this.infectedStatus % 7 == 0 && this.vaccines == false && this.livingStatus == true) {
            var OneOnTwo = 1;
            this.parent.down.forEach(brother => {
                if (brother.infectedStatus % 7 != 0 && OneOnTwo == 1 && brother.vaccines == false) {
                    brother.infectedStatus *= 7;
                }
                OneOnTwo *= -1;
            })
        }

        this.down.forEach(element => {
            element.infectedStatus *= infectA(this, element);
            
            element.infectedStatus *= infect32Down(this, element);
            
            var infected = element.propagation();
            listVariant.forEach(variant => {
                if (infected % variant == 0 && statubelow % variant != 0) {
                    statubelow *= variant;
                }
            })
            
        });

        this.infectedStatus *= infectB(statubelow, this);

        this.infectedStatus *= infect32Up(statubelow, this);

        this.infectedStatus *= infectUltime(statubelow, this);
        

        if (this.vaccines == true && this.infectedStatus % 2 == 1) {
            this.infectedStatus /2;
        }
        if (this.vaccines == true && this.infectedStatus % 5 == 1) {
            this.infectedStatus /5;
        }
        return this.livingStatus ? this.infectedStatus : 1;
    }

    vaccinationA1() {


        this.down.forEach(element => {
            if ((element.infectedStatus % 2 == 0 || element.infectedStatus % 5 == 0) && element.age >= 0 && element.age <= 30) {
                element.infectedStatus = 1;
                element.vaccines = true;
            }
            element.vaccinationA1();
            
        });
    }
    
    vaccinationB1() {
        var OneOnTwo = 1;
        this.down.forEach(element => {
            if (element.infectedStatus % 3 == 0 || element.infectedStatus % 7 == 0 && element.livingStatus == true) {
                if (OneOnTwo == 1) {
                    element.infectedStatus = 1;
                } else {
                    element.livingStatus = false;
                }
                OneOnTwo *= -1;
            }
            element.vaccinationB1();
            
        });
    }
    
    vaccinationUltime() {
        this.down.forEach(element => {
            if (element.infectedStatus % 11 == 0) {
                element.infectedStatus = 1;
                element.vaccines = true;
            }
            element.vaccinationUltime();
            
        });
    }
}

function infectA(parent, element) {
    if (parent.infectedStatus % 2 == 0 && element.infectedStatus % 2 != 0 && parent.vaccines == false && parent.livingStatus == true) {
        return 2;
    }
    return 1;
}

function infectB(below, element) {
    if (below % 3 == 0 && element.infectedStatus % 3 != 0 && element.vaccines == false && element.livingStatus == true) {
        return 3;
    }
    return 1;
}

function infect32Up(below, element) {
    if (below % 5 == 0 && thelementis.infectedStatus % 5 != 0 && element.age >= 32 && element.vaccines == false && element.livingStatus == true) {
        return 5;
    }
    return 1;
}

function infect32Down(parent, element) {
    if (parent.infectedStatus % 5 == 0 && element.infectedStatus % 5 != 0 && element.age >= 32 && this.vaccines == false && this.livingStatus == true) {
        element.infectedStatus *= 5;
    }
}

function infectUltime(below, element) {
    if (below % 11 == 0 && element.infectedStatus % 11 != 0 && (element.parent == null || element.parent.livingStatus == false) && element.vaccines == false && element.livingStatus == true) {
        return 11;
    }
    return 1;
}

// saint = 1
// zombie A = 2
// zombie B = 3
// zombie 32 = 5
// zombie C = 7
// zombie Ultime = 11

let root = new Gens("Jean-Racine", 50, 1, 1);
let node1 = new Gens("Jean-Pierre", 30, 2, 1);
let node2 = new Gens("Jean-Michel", 40, 1, 1);
let node3 = new Gens("Jean-Luc", 20, 1, "vivant", 1);
let node11 = new Gens("4Jean-Luc", 20, 1, "vivant", 1);
let node12 = new Gens("5Jean-Luc", 20, 5, "vivant", 1);
let node21 = new Gens("6Jean-Luc", 20, 11, "vivant", 1);
let node22 = new Gens("7Jean-Luc", 20, 7, "vivant", 1);
let node221 = new Gens("8Jean-Luc", 20, 3, "vivant", 1);

root.addDown(node1);
root.addDown(node2);
root.addDown(node3);
node1.addDown(node11);
node1.addDown(node12);
node2.addDown(node21);
node2.addDown(node22);
node21.addDown(node221);


root.propagation();
root.vaccinationA1();
root.vaccinationB1();
root.vaccinationUltime();