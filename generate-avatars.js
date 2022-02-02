
const Avatar = require('avatar-builder').default;
const {createCanvas} = require('canvas');
const fs = require('fs');

const dir = "./assets/ph-images";

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
}

const avatar = Avatar.builder(
    Avatar.Image.margin(Avatar.Image.roundedRectMask(Avatar.Image.compose(
        Avatar.Image.randomFillStyle(),
        Avatar.Image.shadow(Avatar.Image.margin(Avatar.Image.cat(), 8), {blur: 5, offsetX: 2.5, offsetY: -2.5,color:'rgba(0,0,0,0.75)'})
    ), 32), 8),
    128, 128);

let table = [
    {"title":"H","desc":"Hydrogen","num":"1.00794","x":1,"y":1},
    {"title":"He","desc":"Helium","num":"4.002602","x":18,"y":1},
    {"title":"Li","desc":"Lithium","num":"6.941","x":1,"y":2},
    {"title":"Be","desc":"Beryllium","num":"9.012182","x":2,"y":2},
    {"title":"B","desc":"Boron","num":"10.811","x":13,"y":2},
    {"title":"C","desc":"Carbon","num":"12.0107","x":14,"y":2},
    {"title":"N","desc":"Nitrogen","num":"14.0067","x":15,"y":2},
    {"title":"O","desc":"Oxygen","num":"15.9994","x":16,"y":2},
    {"title":"F","desc":"Fluorine","num":"18.9984032","x":17,"y":2},
    {"title":"Ne","desc":"Neon","num":"20.1797","x":18,"y":2},
    {"title":"Na","desc":"Sodium","num":"22.98976...","x":1,"y":3},
    {"title":"Mg","desc":"Magnesium","num":"24.305","x":2,"y":3},
    {"title":"Al","desc":"Aluminium","num":"26.9815386","x":13,"y":3},
    {"title":"Si","desc":"Silicon","num":"28.0855","x":14,"y":3},
    {"title":"P","desc":"Phosphorus","num":"30.973762","x":15,"y":3},
    {"title":"S","desc":"Sulfur","num":"32.065","x":16,"y":3},
    {"title":"Cl","desc":"Chlorine","num":"35.453","x":17,"y":3},
    {"title":"Ar","desc":"Argon","num":"39.948","x":18,"y":3},
    {"title":"K","desc":"Potassium","num":"39.948","x":1,"y":4},
    {"title":"Ca","desc":"Calcium","num":"40.078","x":2,"y":4},
    {"title":"Sc","desc":"Scandium","num":"44.955912","x":3,"y":4},
    {"title":"Ti","desc":"Titanium","num":"47.867","x":4,"y":4},
    {"title":"V","desc":"Vanadium","num":"50.9415","x":5,"y":4},
    {"title":"Cr","desc":"Chromium","num":"51.9961","x":6,"y":4},
    {"title":"Mn","desc":"Manganese","num":"54.938045","x":7,"y":4},
    {"title":"Fe","desc":"Iron","num":"55.845","x":8,"y":4},
    {"title":"Co","desc":"Cobalt","num":"58.933195","x":9,"y":4},
    {"title":"Ni","desc":"Nickel","num":"58.6934","x":10,"y":4},
    {"title":"Cu","desc":"Copper","num":"63.546","x":11,"y":4},
    {"title":"Zn","desc":"Zinc","num":"65.38","x":12,"y":4},
    {"title":"Ga","desc":"Gallium","num":"69.723","x":13,"y":4},
    {"title":"Ge","desc":"Germanium","num":"72.63","x":14,"y":4},
    {"title":"As","desc":"Arsenic","num":"74.9216","x":15,"y":4},
    {"title":"Se","desc":"Selenium","num":"78.96","x":16,"y":4},
    {"title":"Br","desc":"Bromine","num":"79.904","x":17,"y":4},
    {"title":"Kr","desc":"Krypton","num":"83.798","x":18,"y":4},
    {"title":"Rb","desc":"Rubidium","num":"85.4678","x":1,"y":5},
    {"title":"Sr","desc":"Strontium","num":"87.62","x":2,"y":5},
    {"title":"Y","desc":"Yttrium","num":"88.90585","x":3,"y":5},
    {"title":"Zr","desc":"Zirconium","num":"91.224","x":4,"y":5},
    {"title":"Nb","desc":"Niobium","num":"92.90628","x":5,"y":5},
    {"title":"Mo","desc":"Molybdenum","num":"95.96","x":6,"y":5},
    {"title":"Tc","desc":"Technetium","num":"(98)","x":7,"y":5},
    {"title":"Ru","desc":"Ruthenium","num":"101.07","x":8,"y":5},
    {"title":"Rh","desc":"Rhodium","num":"102.9055","x":9,"y":5},
    {"title":"Pd","desc":"Palladium","num":"106.42","x":10,"y":5},
    {"title":"Ag","desc":"Silver","num":"107.8682","x":11,"y":5},
    {"title":"Cd","desc":"Cadmium","num":"112.411","x":12,"y":5},
    {"title":"In","desc":"Indium","num":"114.818","x":13,"y":5},
    {"title":"Sn","desc":"Tin","num":"118.71","x":14,"y":5},
    {"title":"Sb","desc":"Antimony","num":"121.76","x":15,"y":5},
    {"title":"Te","desc":"Tellurium","num":"127.6","x":16,"y":5},
    {"title":"I","desc":"Iodine","num":"126.90447","x":17,"y":5},
    {"title":"Xe","desc":"Xenon","num":"131.293","x":18,"y":5},
    {"title":"Cs","desc":"Caesium","num":"132.9054","x":1,"y":6},
    {"title":"Ba","desc":"Barium","num":"132.9054","x":2,"y":6},
    {"title":"La","desc":"Lanthanum","num":"138.90547","x":4,"y":9},
    {"title":"Ce","desc":"Cerium","num":"140.116","x":5,"y":9},
    {"title":"Pr","desc":"Praseodymium","num":"140.90765","x":6,"y":9},
    {"title":"Nd","desc":"Neodymium","num":"144.242","x":7,"y":9},
    {"title":"Pm","desc":"Promethium","num":"(145)","x":8,"y":9},
    {"title":"Sm","desc":"Samarium","num":"150.36","x":9,"y":9},
    {"title":"Eu","desc":"Europium","num":"151.964","x":10,"y":9},
    {"title":"Gd","desc":"Gadolinium","num":"157.25","x":11,"y":9},
    {"title":"Tb","desc":"Terbium","num":"158.92535","x":12,"y":9},
    {"title":"Dy","desc":"Dysprosium","num":"162.5","x":13,"y":9},
    {"title":"Ho","desc":"Holmium","num":"164.93032","x":14,"y":9},
    {"title":"Er","desc":"Erbium","num":"167.259","x":15,"y":9},
    {"title":"Tm","desc":"Thulium","num":"168.93421","x":16,"y":9},
    {"title":"Yb","desc":"Ytterbium","num":"173.054","x":17,"y":9},
    {"title":"Lu","desc":"Lutetium","num":"174.9668","x":18,"y":9},
    {"title":"Hf","desc":"Hafnium","num":"178.49","x":4,"y":6},
    {"title":"Ta","desc":"Tantalum","num":"180.94788","x":5,"y":6},
    {"title":"W","desc":"Tungsten","num":"183.84","x":6,"y":6},
    {"title":"Re","desc":"Rhenium","num":"186.207","x":7,"y":6},
    {"title":"Os","desc":"Osmium","num":"190.23","x":8,"y":6},
    {"title":"Ir","desc":"Iridium","num":"192.217","x":9,"y":6},
    {"title":"Pt","desc":"Platinum","num":"195.084","x":10,"y":6},
    {"title":"Au","desc":"Gold","num":"196.966569","x":11,"y":6},
    {"title":"Hg","desc":"Mercury","num":"200.59","x":12,"y":6},
    {"title":"Tl","desc":"Thallium","num":"204.3833","x":13,"y":6},
    {"title":"Pb","desc":"Lead","num":"207.2","x":14,"y":6},
    {"title":"Bi","desc":"Bismuth","num":"208.9804","x":15,"y":6},
    {"title":"Po","desc":"Polonium","num":"(209)","x":16,"y":6},
    {"title":"At","desc":"Astatine","num":"(210)","x":17,"y":6},
    {"title":"Rn","desc":"Radon","num":"(222)","x":18,"y":6},
    {"title":"Fr","desc":"Francium","num":"(223)","x":1,"y":7},
    {"title":"Ra","desc":"Radium","num":"(226)","x":2,"y":7},
    {"title":"Ac","desc":"Actinium","num":"(227)","x":4,"y":10},
    {"title":"Th","desc":"Thorium","num":"232.03806","x":5,"y":10},
    {"title":"Pa","desc":"Protactinium","num":"231.0588","x":6,"y":10},
    {"title":"U","desc":"Uranium","num":"238.02891","x":7,"y":10},
    {"title":"Np","desc":"Neptunium","num":"(237)","x":8,"y":10},
    {"title":"Pu","desc":"Plutonium","num":"(244)","x":9,"y":10},
    {"title":"Am","desc":"Americium","num":"(243)","x":10,"y":10},
    {"title":"Cm","desc":"Curium","num":"(247)","x":11,"y":10},
    {"title":"Bk","desc":"Berkelium","num":"(247)","x":12,"y":10},
    {"title":"Cf","desc":"Californium","num":"(251)","x":13,"y":10},
    {"title":"Es","desc":"Einstenium","num":"(252)","x":14,"y":10},
    {"title":"Fm","desc":"Fermium","num":"(257)","x":15,"y":10},
    {"title":"Md","desc":"Mendelevium","num":"(258)","x":16,"y":10},
    {"title":"No","desc":"Nobelium","num":"(259)","x":17,"y":10},
    {"title":"Lr","desc":"Lawrencium","num":"(262)","x":18,"y":10},
    {"title":"Rf","desc":"Rutherfordium","num":"(267)","x":4,"y":7},
    {"title":"Db","desc":"Dubnium","num":"(268)","x":5,"y":7},
    {"title":"Sg","desc":"Seaborgium","num":"(271)","x":6,"y":7},
    {"title":"Bh","desc":"Bohrium","num":"(272)","x":7,"y":7},
    {"title":"Hs","desc":"Hassium","num":"(270)","x":8,"y":7},
    {"title":"Mt","desc":"Meitnerium","num":"(276)","x":9,"y":7},
    {"title":"Ds","desc":"Darmstadium","num":"(281)","x":10,"y":7},
    {"title":"Rg","desc":"Roentgenium","num":"(280)","x":11,"y":7},
    {"title":"Cn","desc":"Copernicium","num":"(285)","x":12,"y":7},
    {"title":"Nh","desc":"Nihonium","num":"(286)","x":13,"y":7},
    {"title":"Fl","desc":"Flerovium","num":"(289)","x":14,"y":7},
    {"title":"Mc","desc":"Moscovium","num":"(290)","x":15,"y":7},
    {"title":"Lv","desc":"Livermorium","num":"(293)","x":16,"y":7},
    {"title":"Ts","desc":"Tennessine","num":"(294)","x":17,"y":7},
    {"title":"Og","desc":"Oganesson","num":"(294)","x":18,"y":7}
];

function generateAvatars(table, index){

    avatar.create(table[index].desc).then(buffer => {

        console.log("Generating cat " + (index+1));

        fs.writeFileSync(dir + '/cat-' + (index+1) + '.png', buffer);

        index++;

        if (index < table.length)
            return generateAvatars(table, index);
    });
}


generateAvatars(table, 0);