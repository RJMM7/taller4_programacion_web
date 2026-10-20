const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        mensaje: 'Todo funcionando correctamente'
    })
});

app.get('/api/info', (req, res) => {
    res.json(
        {
            integrantes : [
                {
                    carnet : '00186825',
                    ciudad : 'San Salvador',
                    carrera : 'Ing. Informatica',
                    proyectos : 1
                },{
                    carnet : '00148625',
                    ciudad : 'San Salvador',
                    carrera : 'Ing. Informatica',
                    proyectos : 1
                }
            ]
        }
    )
})

app.listen(port, ()=>{
    console.log(`Ejecutandose en el puerto ${port}`);
});