const express = requere('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req , res) =>{
    res.send(`
    <h1>Lista de usuarios</h1>
    ${usuarios.map(
        (usuario) => `<li>ID: ${usuario.nombre} | Edad: ${usuario.edad} | Lugar de procedencia: ${usuario.lugarProcedencia}</li>`
    )
    .join()}
    `)
})

app.get('/usuarios', (req, res ) =>{
    res.json();
});

app.post('/usuarios', (req , res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
});

app.get('/usuarios/:nombre', (req , res) => {
    const nombreUsuario = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre === nombreUsuario);

    if(usuario) {
        res.json(usuario);
    }else{
        res.status(404).json({ mensaje: 'Usuario no encontrado'});
    }
});

app.put('/usuarios/:nombre',(req , res) => {
    const nombreUsuario = req.params.nombre;
    const indiceUsuario = usuarios.findIndex(u = u.nombre === nombreUsuario);
    
    if(indiceUsuario != -1) {
        usuarios[indiceUsuario] = {
            ...usuarios[indiceUsuario],
            edad: req.body.edad || usuarios[indiceUsuario].edad,
            lugarProcedencia: req.body.lugarProcedencia || usuarios[indiceUsuario].lugarProcedencia,
        };
        res.json(usuarios[indiceUsuario]);

    
    }else{
        res.status(404).json({mensaje:'Usuario no encontrado'});
    }    
});

app.delete('/usuarios/:nombre', (req , res) => {
    const nombreUsuario = req.params.nombre;
    usuarios = usuarios.filter(u => u.nombre !== nombreUsuario);
    res.json({mensaje:'Usuario eliminado correctamente'});
});

app.listen(3000, () =>{
    console.log('La aplicacion esta escuchando en el puerto 3000');
});
