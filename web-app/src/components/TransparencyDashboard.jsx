import { useState, useEffect } from 'react'
import { formatMoney } from '../utils/formatMoney'

const TransparencyDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('total')
  const [funds, setFunds] = useState({
    total: 850000,
    thisMonth: 125000,
    thisWeek: 45000
  })
  
  // Datos de uso de fondos
  const fundUsage = [
    { category: 'Filmación y producción', amount: 510000, percentage: 60, color: 'bg-primary-teal' },
    { category: 'Equipo técnico', amount: 170000, percentage: 20, color: 'bg-primary-orange' },
    { category: 'Marketing y distribución', amount: 85000, percentage: 10, color: 'bg-primary-blue' },
    { category: 'Mantenimiento plataforma', amount: 85000, percentage: 10, color: 'bg-primary-purple' }
  ]
  
  // Gastos detallados por categoría
  const expenseDetails = {
    filmacion: [
      { item: 'Alquiler de estudio (10 días)', amount: 150000, date: '2025-01-15' },
      { item: 'Equipo de grabación 4K', amount: 200000, date: '2025-01-10' },
      { item: 'Honorarios director de fotografía', amount: 160000, date: '2025-01-08' }
    ],
    equipo: [
      { item: 'Editor principal (2 meses)', amount: 80000, date: '2025-01-20' },
      { item: 'Diseñador sonoro', amount: 60000, date: '2025-01-18' },
      { item: 'Asistente de producción', amount: 30000, date: '2025-01-15' }
    ]
  }
  
  // Actualizaciones del proyecto
  const updates = [
    {
      id: 1,
      date: '2025-01-28',
      title: 'Entrevista con Arturo Mercado Jr. completada',
      description: 'Sesión de 3 horas en Estudios Churubusco. Material excepcional sobre la tradición familiar del doblaje.',
      type: 'milestone',
      image: '/api/placeholder/400/200'
    },
    {
      id: 2,
      date: '2025-01-25',
      title: 'Nuevo material detrás de cámaras',
      description: 'Grabación de B-roll en cabina de doblaje vintage. Disponible para donantes nivel 4+.',
      type: 'content',
      image: '/api/placeholder/400/200'
    },
    {
      id: 3,
      date: '2025-01-22',
      title: 'Hito de $500K MXN alcanzado',
      description: '¡Gracias a 127 donantes increíbles! Esto nos permite iniciar la fase de postproducción.',
      type: 'funding',
      image: '/api/placeholder/400/200'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-teal">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Fondos Totales</h3>
          <div className="text-3xl font-bold text-primary-teal">{formatMoney(funds.total)}</div>
          <div className="text-sm text-gray-600 mt-1">17% de la meta</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-orange">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Este Mes</h3>
          <div className="text-3xl font-bold text-primary-orange">{formatMoney(funds.thisMonth)}</div>
          <div className="text-sm text-green-600 mt-1">+15% vs mes anterior</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-blue">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Esta Semana</h3>
          <div className="text-3xl font-bold text-primary-blue">{formatMoney(funds.thisWeek)}</div>
          <div className="text-sm text-green-600 mt-1">+22% vs semana anterior</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-purple">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Donantes</h3>
          <div className="text-3xl font-bold text-primary-purple">127</div>
          <div className="text-sm text-gray-600 mt-1">Personas increíbles</div>
        </div>
      </div>
      
      {/* Gráfico de uso de fondos */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Uso Detallado de Fondos</h3>
        
        <div className="space-y-6">
          {fundUsage.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{item.category}</span>
                <div className="text-right">
                  <span className="font-bold text-gray-800">{formatMoney(item.amount)}</span>
                  <span className="text-gray-600 ml-2">({item.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${item.color} transition-all duration-1000`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary-teal/10 rounded-lg">
          <p className="text-sm text-primary-teal font-semibold flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            0% comisiones de plataforma - Todo va al proyecto
          </p>
        </div>
      </div>
      
      {/* Gastos detallados */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-xl font-bold text-gray-800 mb-4">📹 Filmación y Producción</h4>
          <div className="space-y-3">
            {expenseDetails.filmacion.map((expense, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-800">{expense.item}</div>
                  <div className="text-sm text-gray-600">{expense.date}</div>
                </div>
                <div className="font-bold text-primary-teal">{formatMoney(expense.amount)}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-xl font-bold text-gray-800 mb-4">👥 Equipo Técnico</h4>
          <div className="space-y-3">
            {expenseDetails.equipo.map((expense, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-800">{expense.item}</div>
                  <div className="text-sm text-gray-600">{expense.date}</div>
                </div>
                <div className="font-bold text-primary-orange">{formatMoney(expense.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Actualizaciones del proyecto */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📅 Actualizaciones del Proyecto</h3>
        
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="border-l-4 border-primary-teal pl-6 pb-6 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{update.title}</h4>
                  <div className="text-sm text-gray-600">{update.date}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  update.type === 'milestone' ? 'bg-primary-teal/10 text-primary-teal' :
                  update.type === 'content' ? 'bg-primary-orange/10 text-primary-orange' :
                  'bg-primary-blue/10 text-primary-blue'
                }`}>
                  {update.type === 'milestone' ? '🎯 Hito' :
                   update.type === 'content' ? '🎬 Contenido' : '💰 Fondos'}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">{update.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Área exclusiva para donantes */}
      <div className="bg-gradient-to-r from-primary-teal to-primary-blue rounded-xl text-white p-8">
        <h3 className="text-2xl font-bold mb-4">🔐 Área Exclusiva para Donantes</h3>
        <p className="text-lg mb-6 opacity-90">
          ¿Ya donaste? Accede a contenido exclusivo con tu código de donante
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">🎬</div>
              <div className="font-semibold">Clips Exclusivos</div>
              <div className="text-sm opacity-90">Material sin editar</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📸</div>
              <div className="font-semibold">Fotos del Rodaje</div>
              <div className="text-sm opacity-90">Detrás de cámaras</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">Reportes Semanales</div>
              <div className="text-sm opacity-90">Análisis detallado</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Ingresa tu código de donante"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800"
          />
          <button 
            className="bg-white text-primary-teal font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => {
              const input = document.querySelector('input[placeholder="Ingresa tu código de donante"]')
              const code = input?.value.trim()
              if (code) {
                if (code.toLowerCase() === 'demo' || code.toLowerCase() === 'test') {
                  alert('🎉 ¡Acceso concedido! Contenido exclusivo desbloqueado (Demo)')
                } else {
                  alert('❌ Código inválido. Usa "demo" para probar la funcionalidad.')
                }
              } else {
                alert('⚠️ Por favor ingresa un código de donante')
              }
            }}
          >
            Acceder
          </button>
        </div>
        
        <p className="text-sm opacity-75 mt-4">
          * El código se envía por email inmediatamente después de tu donación
        </p>
      </div>
    </div>
  )
}

export default TransparencyDashboard