import { Link } from 'react-router-dom'

const TransparencyPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-teal/5 to-primary-blue/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
              Transparencia Total
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ve exactamente cómo se utilizan los fondos recaudados. 
              Sin comisiones de plataforma, todo va directo al proyecto.
            </p>
          </div>
          
          {/* Cards de transparencia */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Uso de fondos */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-primary-teal mr-3">📊</span>
                Uso de Fondos
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Filmación y producción</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-3 mr-3">
                      <div className="bg-primary-teal h-3 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="font-bold text-primary-teal">60%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Equipo técnico</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-3 mr-3">
                      <div className="bg-primary-orange h-3 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    <span className="font-bold text-primary-orange">20%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Marketing y distribución</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-3 mr-3">
                      <div className="bg-primary-blue h-3 rounded-full" style={{width: '10%'}}></div>
                    </div>
                    <span className="font-bold text-primary-blue">10%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Mantenimiento plataforma</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-3 mr-3">
                      <div className="bg-primary-purple h-3 rounded-full" style={{width: '10%'}}></div>
                    </div>
                    <span className="font-bold text-primary-purple">10%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-teal/10 rounded-lg">
                <p className="text-sm text-primary-teal font-semibold">
                  ✅ Sin comisiones de plataforma adicionales
                </p>
              </div>
            </div>
            
            {/* Actualizaciones */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-primary-orange mr-3">🔄</span>
                Actualizaciones
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary-teal pl-4">
                  <div className="text-sm text-gray-600">Hace 2 días</div>
                  <h4 className="font-semibold text-gray-800">Entrevista con Mario Filio completada</h4>
                  <p className="text-sm text-gray-600">Primera sesión de grabación en estudio profesional.</p>
                </div>
                
                <div className="border-l-4 border-primary-orange pl-4">
                  <div className="text-sm text-gray-600">Hace 1 semana</div>
                  <h4 className="font-semibold text-gray-800">Preproducción iniciada</h4>
                  <p className="text-sm text-gray-600">Coordinación con actores de doblaje confirmados.</p>
                </div>
                
                <div className="border-l-4 border-primary-blue pl-4">
                  <div className="text-sm text-gray-600">Hace 2 semanas</div>
                  <h4 className="font-semibold text-gray-800">Primer hito alcanzado</h4>
                  <p className="text-sm text-gray-600">$500,000 MXN recaudados - ¡Gracias!</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-primary-teal rounded-full mr-2 animate-pulse"></div>
                  Última actualización: Hoy, 14:30
                </div>
              </div>
            </div>
          </div>
          
          {/* Acceso exclusivo para donantes */}
          <div className="bg-gradient-to-r from-primary-teal to-primary-blue rounded-2xl text-white p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">🔐 Área Exclusiva para Donantes</h3>
            <p className="text-lg mb-6 opacity-90">
              Los donantes obtienen acceso a contenido exclusivo: clips preliminares, 
              fotos del rodaje y actualizaciones semanales detalladas.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
              <p className="text-sm">
                <strong>Próximamente:</strong> Enlace protegido con contraseña para acceder a material exclusivo
              </p>
            </div>
            
            <Link to="/transparencia">
              <button className="bg-white text-primary-teal font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Ver Dashboard Completo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TransparencyPreview