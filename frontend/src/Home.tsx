import Header from '../src/components/Header';
import GreenBar from '../src/components/GreenBar';
import VideoSection from '../src/components/VideoSection';
import AuthButtons from '../src/components/AuthButtons';
import MainContent from '../src/components/MainContent';
import { ParticlesBackground } from './components/ParticlesBackground';
import ParallaxText from './components/ParallaxText'; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-white">
      {/* Fondo de partículas */}
      <ParticlesBackground />
      
      {/* Cabecera de la página con fuente personalizada */}
      <Header />
      
      {/* Barra verde al principio */}
      <GreenBar />
      
      {/* Sección de video */}
      <VideoSection />
      
      {/* Texto Parallax de bienvenida */}
      <section className="parallax-text-section">
        <ParallaxText 
          text="¡Bienvenido a Empresa Logística!" 
          baseVelocity={-5} 
          className="my-10 text-4xl text-white bg-gradient-to-r from-blue-800 to-yellow-400 font-semibold uppercase font-sans"
        />
        <ParallaxText 
          text="Innovación y eficiencia en cada envío 🚚" 
          baseVelocity={5} 
          className="my-10 text-4xl text-white bg-gradient-to-r from-blue-800 to-yellow-400 font-semibold uppercase font-sans"
        />
      </section>

      {/* Botones de autenticación */}
      <AuthButtons />
      
      {/* Contenido principal */}
      <MainContent />
      
      

    </div>
  );
}
