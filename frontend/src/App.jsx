
import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from 'reactstrap';

function App() {
  const [estado, setEstado] = useState(null);
  const [integrantes, setIntegrantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarDatos() {
      try {
        setCargando(true);
        setError('');

        const [respuestaHealth, respuestaInfo] = await Promise.all([
          fetch('http://localhost:3000/api/health'),
          fetch('http://localhost:3000/api/info'),
        ]);

        if (!respuestaHealth.ok || !respuestaInfo.ok) {
          throw new Error('No se pudieron obtener los datos del servidor.');
        }

        const datosHealth = await respuestaHealth.json();
        const datosInfo = await respuestaInfo.json();

        setEstado(datosHealth);
        setIntegrantes(datosInfo.integrantes ?? []);
      } catch (err) {
        setError(
          'No se pudo conectar con el backend. Verifica que el servidor esté activo en el puerto 3000.'
        );
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <Container>
          <p className="eyebrow">TALLER DE PROGRAMACIÓN WEB</p>
          <h1>Panel del equipo</h1>
          <p className="hero-description">
            Información de los integrantes y estado de nuestra API.
          </p>
        </Container>
      </header>

      <Container className="contenido">
        <section className="status-panel">
          <div>
            <p className="section-label">ESTADO DEL SERVIDOR</p>
            <h2>Conexión con el backend</h2>
            <p className="muted">
              Endpoint: <code>/api/health</code>
            </p>
          </div>

          {cargando ? (
            <Badge color="secondary" pill>
              <Spinner size="sm" className="me-2" />
              Consultando...
            </Badge>
          ) : estado?.status === 'ok' ? (
            <Badge color="success" pill>
              Servidor activo
            </Badge>
          ) : (
            <Badge color="danger" pill>
              Sin conexión
            </Badge>
          )}

          {estado && (
            <Alert color="success" className="health-message">
              {estado.mensaje}
            </Alert>
          )}
        </section>

        {error && (
          <Alert color="danger" className="mt-4">
            {error}
          </Alert>
        )}

        <section className="team-section">
          <div className="section-heading">
            <div>
              <p className="section-label">NUESTRO EQUIPO</p>
              <h2>Integrantes</h2>
            </div>
            <span className="team-count">
              {integrantes.length} integrantes
            </span>
          </div>

          {cargando ? (
            <div className="loading">
              <Spinner color="primary" />
              <p>Cargando información...</p>
            </div>
          ) : (
            <Row>
              {integrantes.map((integrante, index) => (
                <Col md="6" lg="4" className="mb-4" key={integrante.carnet}>
                  <Card className="member-card h-100">
                    <CardBody>
                      <div className="member-avatar">
                        {index + 1}
                      </div>

                      <CardSubtitle className="member-label">
                        INTEGRANTE {index + 1}
                      </CardSubtitle>

                      <CardTitle tag="h3" className="member-title">
                        Carnet {integrante.carnet}
                      </CardTitle>

                      <div className="member-detail">
                        <span>Ciudad</span>
                        <CardText>{integrante.ciudad}</CardText>
                      </div>

                      <div className="member-detail">
                        <span>Carrera</span>
                        <CardText>{integrante.carrera}</CardText>
                      </div>

                      <div className="member-detail">
                        <span>Proyectos</span>
                        <CardText>
                          {integrante.proyectos}
                        </CardText>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {!cargando && !error && integrantes.length === 0 && (
            <Alert color="info">
              No hay integrantes registrados en la API.
            </Alert>
          )}
        </section>

        <footer className="footer">
          Taller de Programación Web · React + Express
        </footer>
      </Container>
    </div>
  );
}

export default App;
