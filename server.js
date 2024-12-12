const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;
let pollDeadline = Date.now() + 100 * 1000;
let pollOptions1 = ["Galiger Hanna", "Szilagyi Paula", "Lacatus Andrada", "Grebinar Roxana", "Gantner Alisia", "Horvath Lorena", "Peter Iris", "Snelenpeger Sofia", "Nagy Vivien", "Rus Roxana", "Kiss Reka", "Ardelean Iasmina", "Dosa Paula"];
let pollOptions2 = ["Bartha Lucian", "Papai Otto", "Suto Alex", "Alfoldi Raul", "Dragos Gabriel", "Giurguta Dorian", "Osan Andrei", "Kaszany Gabriel", "Kristian Hiri", "Dominik Asztalos", "Balog Matei"];
const teams = [
    {
        girl: { name: "Galiger Hanna", photo: "/images/fata1.jpg", lyrics: "Buna seara tuturor,<br>Doamnelor si domnilor,<br>Eu Hanna ma numesc,<br>Si am venit sa va vrajesc.<br>Din Santau eu am venit,<br>Ca pe voi sa va uimesc,<br>Mie-mi place a canta,<br>A dansa si a juca.<br>Vreau sa spun ca eu astept,<br>Ca votul sa-l primesc." },
        boy: { name: "Bartha Lucian", photo: "/images/baiat1.jpg", lyrics: "Seara buna domni si doamne,<br>Va intrebati cine i sub reflectoare,<br>Lucian ma numesc si acum eu povestesc,<br>Ca pe tractor de zori lucrez,<br>Si pamanturi mostenesc,<br>Ca la anul eu sa am,<br>La animale sa le dau,<br>Si pe voi eu v as ruga,<br>Cu un vot sa ma jurati." },
    },
    {
        girl: { name: "Szilagyi Paula", photo: "/images/fata2.jpg", lyrics: "Buna seara dragi jurati,<br>Spectatori si invitati,<br>Ma numesc Paula,am 15 ani,<br>Cu ochi albastri ce ascund mii de ani,<br>Parul saten straluceste-n lumina,<br>Farmecul meu?E o raza divina.<br>Sunt visatoare,mereu zambitoare,<br>Pe scena aduc doar clipe de soare.<br>Cu pasi de regina,va spun dintr-un gand:<br>Titlul de miss?Il voi lua razand." },
        boy: { name: "Iulian", photo: "/images/baiat2.jpg", lyrics: "" },
    },
    {
        girl: { name: "Lacatus Andrada", photo: "/images/fata3.jpg", lyrics: "Eu Andrada urc pe scena,<br>Cu ochi verzi ca smaraldul,<br>Si par saten ce straluceste sub luminile balului.<br>Sunt gratioasa si frumoasa,<br>Ca un vis dintr o poveste,<br>Iar zambetul meu cald pe toti ii cucereste.<br>Cu pasi usor pasesc,<br>Sunt plina de farmec rar,<br>Privirea mea senina e ca un dulce dar.<br>Andrada boboaca voastra,<br>Straluceste-n orice fel,<br>Balul prinde viata caci eu sunt model!" },
        boy: { name: "Papai Otto", photo: "/images/baiat3.jpg", lyrics: "Buna seara va doresc!<br>Otto ma numesc,<br>Poate par mic si sincer,<br>Dar am mare caracter,<br>Si sunt foarte smecher<br>Dar si curios de fel.<br>La vioara eu cant magic,<br>Sa nu castig titlul de mister boboc ar fi tragic,<br>Am 15 ani impliniti,<br>15 ani de istete de mic!" },
    },
    {
        girl: { name: "Grebinar Roxana", photo: "/images/fata4.jpg", lyrics: "Sunt Roxana,la bal,plina de mister,<br>Cu masca si vise,pasesc cu mult fler,<br>La 15 ani,in noaptea de vis,<br>Pe ring dansez,de magie cuprins.<br>E balul bobocilor,totul straluce,<br>Iar eu sub lumina ma simt tot mai dulce.<br>Sub masca de stea,in taina zambesc,<br>Si povestea noptii o scriu cat traiesc." },
        boy: { name: "Suto Alex", photo: "/images/baiat4.jpg", lyrics: "Sunt Alex la balul mascat,plin de mister,<br>La 16 ani,pasesc cu fler,<br>Sub masca ascund un zambet curat,<br>Visand la un dans neincetat.<br>Lumini ma-nconjoara,totu-i feeric,<br>Ma simt puternic,magic,sincer.<br>E noaptea mea,stralucesc din plin,<br>Balul bobocilor,moment divin." },
    },
    {
        girl: { name: "Gantner Alisia", photo: "/images/fata5.jpg", lyrics: "Alisia ma numesc,<br>Ziua,noaptea chefuiesc,<br>15 ani si ochi caprui,<br>Fura inima oricui.<br>La acest bal am venit,<br>Sa va incant sis a castig.<br>Sunt o fata optimista,<br>Cu par lung si tupeista.<br>Eu sunt zodia balanta,<br>Si sunt cam intrazneata,<br>Si mai am cate o restanta,<br>La iubire si eleganta.<br>Va zic fara suparare,<br>Iau coroana la plecare!" },
        boy: { name: "Alfoldi Raul", photo: "/images/baiat5.jpg", lyrics: "Buna seara,dragi jurati,<br>Spectatori si invitati,<br>Sunt Raul,va salut voios,<br>Cu versuri simple,curajos.<br>Imi place fotbalul,sa stiti,<br>Cu pase,goluri si amici,<br>Pe teren ma simt in larg,<br>Cu mingea,sunt prieten drag.<br>Par saten si ochi capriu,<br>Stralucesc sub cerul albastrui,<br>Un zambet larg pe fata port,<br>Si suflet viu in orice loc.<br>Azi la bal cu masca-n joc,<br>Dansez,visez,cu al lumii foc,<br>Un cavaler,un erou,cine-s eu?<br>Raul,copilul cu visul mereu." },
    },
    {
        girl: { name: "Horvath Lorena", photo: "/images/fata6.jpg", lyrics: "Eu Lorena ma numesc,<br>Si am venit sa va uimesc,<br>Sunt bruneta si isteata,<br>Cu ochi caprui si zambetul pe fata,<br>Visez sa fiu regina balului stralucitor,<br>Si avocat pe viitor,<br>La 15 ani si 6 lui mi-am propus sa fac minuni,<br>Pe ring sa stralucesc,juriul sa-l cuceresc,<br>Miss boboc sa ma numesc!" },
        boy: { name: "Dragos Gabriel", photo: "/images/baiat6.jpg", lyrics: "Buna! Gabi ma numesc!<br>Si pe fete le vrajesc.<br>Sunt dragut si chiar glumet,<br>Frumos si foarte istet.<br>Am venit la 4 ace,<br>Ca mie doar asa-mi place.<br>Am venit odata-n an,<br>Ca sa fiu the number one." },
    },
    {
        girl: { name: "Peter Iris", photo: "/images/fata7.jpg", lyrics: "Iris cu ochii ca un smarald,<br>Si parul brunet ca un adanc,<br>Prin carti calatoreste,visand in tacere,<br>Sa fie regina la bal,sub lumini si placere.<br>Cu pasi de poveste,pe ritmuri usoare,<br>In inima serii,s-ar vedea stralucitoare,<br>Cu zambet senin si visul aprins,<br>Iris ar fi regina balului promis." },
        boy: { name: "Giurguta Dorian", photo: "/images/baiat7.jpg", lyrics: "Dorian,baiat brunet sic ret,<br>Cu ochii caprui si foarte istet,<br>La 15 ani viseaza mereu,<br>Camioane mari,sub cerul greu.<br>Prin zari intinse,sub stele aprinse,<br>Isi vede visul,roti neinvinse,<br>Cu tiruri grele,drum lung in fata,<br>Un dor de drum ce-i arde-n viata." },
    },
    {
        girl: { name: "Snelenpeger Sofia", photo: "/images/fata8.jpg", lyrics: "Am venit sa va soptesc,<br>Ca Sofia ma numesc,<br>Sa castig eu imi doresc,<br>Si am venit sa va uimesc,<br>Cu ochii mei caprui si mici,<br>Am venit cu Andrei aici,<br>Sa castigam mister si miss,<br>Noi luam coroana de vis!" },
        boy: { name: "Osan Andrei", photo: "/images/baiat8.jpg", lyrics: "Eu Andrei ma numesc,<br>Am venit s-o insotesc,<br>Pe Sofia azi la bal,<br>Sa castigam ar fi ideal,<br>De zodie sunt capricorn,<br>Ma-nclin gallant ca si un domn,<br>Cu ochi caprui si chip senin,<br>Si eleganta din plin,<br>Va rugam sa ne votati,<br>Ca nu o sa regretati!" },
    },
    {
        girl: { name: "Nagy Vivien", photo: "/images/fata9.jpg", lyrics: "Buna seara,dragi jurati,<br>Spectatori si invitati,<br>Nagy Vivien ma numesc,<br>Gesturi mici eu pretuiesc.<br>Sa va spun cate ceva,<br>Ce stiu ca v-ar interesa.<br>16 ani dar mititica,<br>Sunt pasionata de estetica.<br>Parul blond si ochi maronii,<br>Bag in boala toti strainii.<br>Gatesc bine,nu glumesc,<br>Sa castig,asta imi doresc!<br>Moda,makeup se unesc,<br>Si dau tot ce eu iubesc,<br>Trec peste orice provocare,<br>S-am sa iau coroana la plecare!" },
        boy: { name: "Kaszany Gabriel", photo: "/images/baiat9.jpg", lyrics: "Buna seara tuturor!<br>Nu am venit sa ma insor,<br>Am venit sa castig acest bal,<br>Mister sa fiu la final!<br>Eu Gabriel ma numesc,<br>Azi am sa va uimesc,<br>Cu talentul meu la dans,<br>Si partenera mea de vals." },
    },
    {
        girl: { name: "Rus Roxana", photo: "/images/fata10.jpg", lyrics: "Buna seara tuturor,<br>Vreau sa incepem usor.<br>Roxana ma numesc,<br>Si pe scena figurez,<br>15 ani si curajoasa,<br>Dar pe langa,si frumoasa.<br>Par brunet si mititica,<br>Sper sa va fiu si simpatico.<br>O dorinta mare avem,<br>Eu si partenerul meu<br>Miss si mister vrem sa fim,<br>Stim ca meritam din plin!" },
        boy: { name: "Kristian Hiri", photo: "/images/baiat10.jpg", lyrics: "Buna seara,jo estet!<br>Am ajuns si eu aici,<br>Cu colegii mei mistici,<br>Sa-mi arat si eu talentul,<br>Cum n-a vazut tot vestul.<br>Kristian eu ma numesc,<br>Va promit,n-am sa va plictisesc.<br>15 ani,inalt,frumos,<br>Imi doresc s-ajung faimos!<br>Pe fortnite sunt numaru 1,<br>La dormit nu ma intrece niciunu.<br>Sunt curajos si elegant,<br>Sper sa fiu azi premiant!" },
    },
    {
        girl: { name: "Kiss Reka", photo: "/images/fata11.jpg", lyrics: "Buna seara tuturor,<br>Dragi parinti si spectatoti,<br>Vin din Santau cel mic,<br>Nu ma tem de nimic.<br>Reka ma numesc,mereu zambesc!<br>Cu pasiune si curaj,<br>Eu urmez drumul minunat.<br>O boboaca ce promite,plina de bucurie.<br>Eu va arat azi,ca seara aceasta voi castiga." },
        boy: { name: "Dominik Asztalos", photo: "/images/baiat11.jpg", lyrics: "Buna seara va doresc,<br>Dominik ma numesc,<br>Sunt inalt si curajos,<br>16 ani si misterios.<br>Fete am,nu glumesc,<br>Sa castig balul imi doresc,<br>Ochi albastrii si istet,<br>Si de fel sunt vorbaret." },
    },
    {
        girl: { name: "Ardelean Iasmina", photo: "/images/fata12.jpg", lyrics: "Eu Iasmina ma numesc,<br>Si senin mereu zambesc,<br>16 ani o sa implinesc,<br>Si dorintele le indeplinesc.<br>Cu vise si sperante mari,<br>Noi vom fi cei mai tari!<br>Azi coroana o luam,<br>Fara ea noi nu plecam!" },
        boy: { name: "Balog Matei", photo: "/images/baiat12.jpg", lyrics: "În satul mic, cu dealuri verzi, senine,<br>Trăiește-un băiat cu ochi căprui, divine.<br>Balog Matei e numele ce-l poartă,<br>Un suflet cald, o inimă curată.<br>Privirea lui e blândă, ca un apus,<br>Ce-ți spune povești din ceruri de nespus.<br>Sub gene dese, ochii lui luceau,<br>Ca două stele ce în noapte vegheau.<br>Pe drum de țară, desculț alerga,<br>Cu vise-n suflet și vântul pe fața sa.<br>Cânta cu păsări, râdea cu pârâu,<br>Era un copil de lumină și plai viu." },
    },
    {
        girl: { name: "Dosa Paula", photo: "/images/fata13.jpg", lyrics: "Eu Paula ma numesc,<br>Am 15 ani si va uimesc,<br>Sunt curajoasa si indrasneata,<br>Si-mi traiesc fiecare clipa din viata.<br>Inalta cu ochi caprui,<br>Eu fur inima oricui,<br>Sunt satena si frumoasa,<br>Pentru ca eu sunt balanta.<br>Sa castig e visul meu,<br>Fara sa fac vreun cliseu." },
        boy: { name: "Beni", photo: "/images/baiat13.jpg", lyrics: "" },
    },
];

let pollResults1 = new Array(pollOptions1.length).fill(0);
let pollResults2 = new Array(pollOptions2.length).fill(0);


// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON body for API requests
app.use(bodyParser.json());

// API to get team data
app.get('/api/teams', (req, res) => {
    res.json({ teams });
});

// Get poll options and deadline
app.get('/api/poll-data', (req, res) => {
    res.json({
        options1: pollOptions1,
        options2: pollOptions2,
    });
});
app.get('/api/deadline', (req, res) => {
    res.json({
        deadline: pollDeadline,
    });
});

// Submit a vote
app.post('/api/vote:id', (req, res) => {
    if (Date.now() > pollDeadline) {
        return res.status(403).json({ error: "Poll has already ended" });
    }
    const { option } = req.body;
    const optionIndex = parseInt(option);
    if (typeof optionIndex !== 'number' || optionIndex < 0) {
        return res.status(400).json({ error: 'Invalid option index' });
    }
    if (req.params['id'] == 1) {
        pollResults1[optionIndex] += 1;
    }
    if (req.params['id'] == 2) {
        pollResults2[optionIndex] += 1;
    }
    res.json({ message: 'Vote submitted successfully' });
});

// Get poll results
app.get('/api/results:id', (req, res) => {
    if (Date.now() < pollDeadline) {
        const msLeft = pollDeadline - Date.now();
        const days = Math.floor(msLeft / (24 * 60 * 60 * 1000));
        const hours = Math.floor((msLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((msLeft % (60 * 60 * 1000)) / (60 * 1000));
        const readableDate = `${days}d ${hours}h ${minutes}m`;
        return res.status(403).json({ error: `Poll results only available in ${readableDate}` });
    }
    if (req.params['id'] == 1) {
        res.json(Object.assign(...pollOptions1.map((k, i) => ({ [k]: pollResults1[i] }))));
    }
    if (req.params['id'] == 2) {
        res.json(Object.assign(...pollOptions2.map((k, i) => ({ [k]: pollResults2[i] }))));
    }
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Live poll server running at http://localhost:${port}`);
});
