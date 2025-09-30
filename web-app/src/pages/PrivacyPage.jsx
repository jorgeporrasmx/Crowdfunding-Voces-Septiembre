import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ShieldIcon, LockIcon, EyeIcon, UserCheckIcon } from '../components/common/Icons'

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="flex items-center mb-8">
            <ShieldIcon className="w-12 h-12 text-purple-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Aviso de Privacidad</h1>
              <p className="text-gray-600 mt-2">Protección de Datos Personales</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-8">Última actualización: Agosto 2025</p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              En cumplimiento con lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), 
              su Reglamento y demás disposiciones aplicables, SUTILDE, S.A.P.I. de C.V. pone a su disposición el presente Aviso de Privacidad.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
              <UserCheckIcon className="w-6 h-6 mr-3 text-purple-600" />
              1. RESPONSABLE DEL TRATAMIENTO
            </h2>
            <p className="text-gray-700 mb-6">
              SUTILDE, S.A.P.I. de C.V. ("SUTILDE") es responsable del tratamiento legítimo, controlado e informado de los datos personales 
              que recabe de los Usuarios y/o Aportantes a través de la Plataforma, conforme a la Ley Federal de Protección de Datos Personales 
              en Posesión de los Particulares y demás disposiciones aplicables.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
              <EyeIcon className="w-6 h-6 mr-3 text-purple-600" />
              2. DATOS PERSONALES RECABADOS
            </h2>
            <p className="text-gray-700 mb-4">
              SUTILDE podrá recabar, directa o indirectamente, de manera enunciativa mas no limitativa, los siguientes datos personales:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Datos de identificación:</strong>
                    <span className="text-gray-600 ml-2">Nombre completo, fecha de nacimiento, CURP</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Datos de contacto:</strong>
                    <span className="text-gray-600 ml-2">Domicilio, correo electrónico, teléfono</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Datos fiscales:</strong>
                    <span className="text-gray-600 ml-2">RFC, domicilio fiscal</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Datos financieros:</strong>
                    <span className="text-gray-600 ml-2">Cuenta bancaria, CLABE, número de tarjeta (últimos 4 dígitos)</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Datos de imagen y voz:</strong>
                    <span className="text-gray-600 ml-2">Cuando la recompensa implique participación personal en el Proyecto</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Importante:</strong> No se recabarán datos personales sensibles (por ejemplo, estado de salud o datos biométricos) 
                sin solicitar consentimiento expreso y por escrito.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. FINALIDADES PRINCIPALES DEL TRATAMIENTO</h2>
            <p className="text-gray-700 mb-4">
              Las finalidades principales para las cuales utilizaremos sus datos personales son:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
              <li>Procesar aportaciones y pagos, así como emitir comprobantes fiscales (CFDI)</li>
              <li>Entregar recompensas y coordinar la participación del Usuario en el Proyecto</li>
              <li>Cumplir obligaciones legales, fiscales y contractuales</li>
              <li>Enviar información relevante sobre el Proyecto, actualizaciones y comunicaciones relacionadas</li>
              <li>Difundir, previo consentimiento, materiales en los que aparezca la imagen o voz del Usuario</li>
              <li>Mantener y mejorar la seguridad y funcionalidad de la Plataforma</li>
            </ol>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-800">
                Estas finalidades son necesarias para la relación contractual entre SUTILDE y el Usuario, por lo que no podrán ser objeto 
                de oposición mientras exista dicha relación.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. FINALIDADES SECUNDARIAS DEL TRATAMIENTO</h2>
            <p className="text-gray-700 mb-4">
              De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que no son necesarias 
              para el servicio solicitado, pero que nos permiten brindarle una mejor atención:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Comunicar campañas futuras de SUTILDE o de proyectos similares</li>
              <li>Informar sobre nuevos productos, servicios o actividades no directamente vinculadas con la aportación realizada</li>
              <li>Ofrecer promociones, descuentos o beneficios especiales de aliados comerciales</li>
              <li>Invitar a participar en eventos o actividades no vinculadas al Proyecto</li>
              <li>Realizar encuestas de satisfacción, hábitos de consumo o preferencias de participación</li>
              <li>Generar estadísticas y métricas para mejorar la experiencia del usuario</li>
              <li>Compartir información de contacto con patrocinadores o aliados estratégicos (previo consentimiento)</li>
            </ul>

            <p className="text-gray-700 mb-6">
              En caso de que no desee que sus datos personales sean tratados para estas finalidades secundarias, puede manifestarlo 
              enviando un correo electrónico a la dirección indicada en la sección de contacto.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. OPCIONES PARA LIMITAR USO O DIVULGACIÓN</h2>
            <p className="text-gray-700 mb-4">
              El Usuario podrá en todo momento solicitar que SUTILDE limite el uso o divulgación de sus datos para finalidades secundarias, 
              a través de los siguientes medios:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Enviando una solicitud al correo electrónico de contacto para protección de datos personales</li>
              <li>Marcando la casilla correspondiente en los formularios de recolección de datos</li>
              <li>Siguiendo el procedimiento descrito en la sección de Derechos ARCO de este Aviso</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
              <LockIcon className="w-6 h-6 mr-3 text-purple-600" />
              6. DERECHOS ARCO Y PROCEDIMIENTO
            </h2>
            <p className="text-gray-700 mb-4">
              Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que 
              les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, 
              sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la 
              misma no está siendo utilizada conforme a los principios, deberes y obligaciones previstas en la normativa (Cancelación); 
              así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
            </p>

            <p className="text-gray-700 mb-4">
              Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva mediante escrito que contenga:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
              <li>Nombre del titular y medio para recibir notificaciones (correo electrónico o domicilio)</li>
              <li>Documentos que acrediten identidad o, en su caso, personalidad del representante legal</li>
              <li>Descripción clara y precisa de los datos personales respecto de los que se busca ejercer alguno de los derechos ARCO</li>
              <li>Cualquier otro elemento o documento que facilite la localización de los datos personales</li>
            </ol>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Contacto para ejercer Derechos ARCO:</h3>
              <p className="text-gray-700">
                <strong>Correo electrónico:</strong> datospersonales@sutilde.com<br />
                <strong>Atención:</strong> Departamento de Protección de Datos Personales
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              SUTILDE responderá a su solicitud en un plazo máximo de 20 días hábiles contados desde la fecha de recepción de la solicitud 
              completa y, de resultar procedente, ejecutará la acción solicitada en un plazo de 15 días hábiles posteriores a la fecha en 
              que se comunique la respuesta.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. REVOCACIÓN DEL CONSENTIMIENTO</h2>
            <p className="text-gray-700 mb-6">
              Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos personales. 
              Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso 
              de forma inmediata, ya que es posible que por alguna obligación legal requiramos seguir tratando sus datos personales. 
              Asimismo, usted deberá considerar que para ciertos fines, la revocación de su consentimiento implicará que no le podamos 
              seguir prestando el servicio que nos solicitó, o la conclusión de su relación con nosotros.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
              <ShieldIcon className="w-6 h-6 mr-3 text-purple-600" />
              8. MEDIDAS DE SEGURIDAD
            </h2>
            <p className="text-gray-700 mb-4">
              SUTILDE implementará medidas de seguridad administrativas, técnicas y físicas para proteger los datos personales contra daño, 
              pérdida, alteración, destrucción o uso no autorizado, considerando el riesgo, la sensibilidad de los datos y el desarrollo 
              tecnológico disponible.
            </p>
            <p className="text-gray-700 mb-4">Entre las medidas de seguridad adoptadas se encuentran:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Cifrado de datos sensibles y financieros</li>
              <li>Protocolos de acceso restringido a bases de datos</li>
              <li>Capacitación del personal en materia de protección de datos</li>
              <li>Auditorías periódicas de seguridad</li>
              <li>Respaldos periódicos de información</li>
              <li>Sistemas de detección y prevención de intrusiones</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. VULNERACIONES DE SEGURIDAD</h2>
            <p className="text-gray-700 mb-6">
              En caso de que ocurra una vulneración de seguridad en cualquier fase del tratamiento de datos personales que afecte de forma 
              significativa los derechos patrimoniales o morales de los titulares, SUTILDE lo notificará de manera inmediata al Usuario por 
              correo electrónico, para que éste pueda tomar las medidas correspondientes a la defensa de sus derechos.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">10. TRANSFERENCIA DE DATOS</h2>
            <p className="text-gray-700 mb-4">
              Los datos personales podrán ser transferidos a terceros nacionales o extranjeros en los siguientes casos:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Proveedores de servicios de pago:</strong>
                    <span className="text-gray-600 ml-2">Para procesar transacciones financieras</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Empresas de logística:</strong>
                    <span className="text-gray-600 ml-2">Para la entrega de recompensas físicas</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Proveedores de servicios tecnológicos:</strong>
                    <span className="text-gray-600 ml-2">Para el mantenimiento y operación de la Plataforma</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div>
                    <strong className="text-gray-800">Autoridades competentes:</strong>
                    <span className="text-gray-600 ml-2">Cuando sea requerido por ley o por orden judicial</span>
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6">
              Todos los terceros a quienes se transfieran datos personales estarán obligados a mantener la confidencialidad de los mismos 
              y a tratarlos conforme a las mismas obligaciones y medidas de seguridad establecidas en este Aviso de Privacidad.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">11. USO DE COOKIES Y TECNOLOGÍAS DE RASTREO</h2>
            <p className="text-gray-700 mb-4">
              Le informamos que en nuestra página de internet utilizamos cookies, web beacons y otras tecnologías a través de las cuales es 
              posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y experiencia al navegar 
              en nuestra página.
            </p>
            <p className="text-gray-700 mb-4">Los datos personales que obtenemos de estas tecnologías de rastreo son los siguientes:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Tipo de navegador y sistema operativo</li>
              <li>Las páginas de Internet que visita</li>
              <li>Los vínculos que sigue</li>
              <li>La dirección IP</li>
              <li>El sitio que visitó antes de entrar al nuestro</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Estas tecnologías podrán deshabilitarse siguiendo los procedimientos del navegador de internet que utilice.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">12. CAMBIOS AL AVISO DE PRIVACIDAD</h2>
            <p className="text-gray-700 mb-4">
              El presente Aviso de Privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; 
              de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en 
              nuestro modelo de negocio, o por otras causas.
            </p>
            <p className="text-gray-700 mb-4">
              Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente Aviso de Privacidad, a través de:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Notificaciones en la Plataforma</li>
              <li>Correo electrónico a la dirección registrada</li>
              <li>Publicación de la versión actualizada en esta misma página</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">13. AUTORIDAD COMPETENTE</h2>
            <p className="text-gray-700 mb-6">
              Si usted considera que su derecho a la protección de datos personales ha sido lesionado por alguna conducta de nuestros empleados 
              o de nuestras actuaciones o respuestas, presume que en el tratamiento de sus datos personales existe alguna violación a las 
              disposiciones previstas en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, podrá interponer 
              la queja o denuncia correspondiente ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos 
              Personales (INAI). Para mayor información visite: 
              <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 ml-1">
                www.inai.org.mx
              </a>
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">14. ACEPTACIÓN DEL AVISO DE PRIVACIDAD</h2>
            <p className="text-gray-700 mb-4">
              El presente Aviso de Privacidad está disponible en todo momento en la Plataforma. Su aceptación expresa o tácita implica su 
              conformidad con los términos del mismo y autoriza a SUTILDE para realizar el tratamiento de sus datos personales conforme a 
              lo aquí establecido.
            </p>
            <p className="text-gray-700 mb-6">
              Se entenderá que el Usuario consiente tácitamente el tratamiento de sus datos personales en los términos del presente Aviso 
              de Privacidad si no manifiesta su oposición al mismo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage