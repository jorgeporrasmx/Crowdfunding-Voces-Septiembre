import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/common/Icons'

const TermsPage = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
          <p className="text-sm text-gray-500 mb-8">Última actualización: Agosto 2025</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              TÉRMINOS Y CONDICIONES DE USO DE LA PLATAFORMA Y SITIO DE INTERNET
            </h2>
            
            <p className="text-gray-700 mb-4">
              SUTILDE, S.A.P.I. de C.V. ("SUTILDE"), sociedad legalmente constituida conforme a las leyes de los Estados Unidos Mexicanos, 
              con domicilio fiscal en México, pone a disposición de los usuarios (en lo sucesivo, el "Usuario" o el "Aportante", según corresponda) 
              los presentes Términos y Condiciones de Uso (los "Términos y Condiciones").
            </p>
            
            <p className="text-gray-700 mb-6">
              Estos Términos y Condiciones regulan de forma vinculante el acceso, navegación, uso y participación de los Usuarios y/o Aportantes 
              en el sitio web (en adelante, la "Plataforma"), así como su interacción y aportaciones en relación con el proyecto audiovisual 
              "Nuestras Voces" (el "Proyecto").
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. ACEPTACIÓN DE LOS TÉRMINOS Y CONDICIONES</h3>
            <p className="text-gray-700 mb-4">
              La aceptación expresa o tácita de los presentes Términos y Condiciones implica la celebración de un acuerdo de voluntades con 
              efectos jurídicos entre el Usuario y/o Aportante y SUTILDE, el cual regirá su relación en todo lo relativo al uso de la Plataforma 
              y a su participación en el Proyecto, conforme a lo dispuesto en el Código Civil Federal, la Ley Federal de Protección al Consumidor, 
              la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, la Ley Federal de Derecho de Autor y demás 
              disposiciones aplicables.
            </p>
            <p className="text-gray-700 mb-6">
              El acceso, navegación o uso continuado de la Plataforma constituirá la aceptación incondicional de estos Términos y Condiciones, 
              así como de cualquier modificación futura de los mismos, conforme al procedimiento de actualización previsto en este apartado.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. MODIFICACIONES A LOS TÉRMINOS Y CONDICIONES</h3>
            <p className="text-gray-700 mb-4">
              SUTILDE podrá, sin incurrir en ningún tipo de responsabilidad, en cualquier momento y a su entera discreción, modificar, 
              actualizar o complementar los presentes Términos y Condiciones. En caso de que dichas modificaciones impliquen cambios sustanciales, 
              SUTILDE lo notificará oportunamente a los Usuarios y/o Aportantes, mediante los medios de comunicación establecidos en la Plataforma.
            </p>
            <p className="text-gray-700 mb-6">
              Las modificaciones entrarán en vigor en la fecha que expresamente se indique en la notificación correspondiente, la cual no podrá 
              tener efectos retroactivos. Se entenderá que el Usuario y/o Aportante acepta las modificaciones si continúa accediendo, utilizando 
              o participando en la Plataforma con posterioridad a la fecha de entrada en vigor de los nuevos Términos y Condiciones.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. PROPIEDAD INTELECTUAL DE LA PLATAFORMA</h3>
            <p className="text-gray-700 mb-4">
              Todos los derechos de propiedad intelectual e industrial relacionados con la Plataforma, son propiedad exclusiva de SUTILDE o de 
              sus legítimos licenciantes, y se encuentran protegidos por la Ley Federal del Derecho de Autor, la Ley de la Propiedad Industrial 
              y demás disposiciones aplicables en los Estados Unidos Mexicanos y tratados internacionales vigentes.
            </p>
            <p className="text-gray-700 mb-6">
              Queda expresamente prohibida cualquier forma de reproducción, distribución, comunicación pública, transformación, puesta a disposición 
              o cualquier otro uso no autorizado de los elementos protegidos de la Plataforma, ya sea con fines comerciales o no comerciales, 
              sin el consentimiento previo, expreso y por escrito de SUTILDE.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. DECLARACIONES DEL USUARIO</h3>
            <p className="text-gray-700 mb-4">El Usuario y/o Aportante declara que:</p>
            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
              <li>Cuenta con capacidad jurídica plena para obligarse en términos de lo dispuesto por la legislación mexicana, y que, 
                  en caso de actuar en nombre y representación de un tercero, cuenta con las facultades suficientes para ello;</li>
              <li>Actúa en su propio nombre y derecho, y no en representación de terceros, salvo que se indique expresamente lo contrario 
                  y se cuente con la documentación que lo acredite;</li>
              <li>Ha leído, entendido y aceptado íntegramente los presentes Términos y Condiciones, así como las políticas adicionales 
                  que se publiquen en la Plataforma, mismas que se considerarán parte integrante de este instrumento.</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. LEGISLACIÓN APLICABLE</h3>
            <p className="text-gray-700 mb-6">
              El acceso, navegación y uso de la Plataforma se regirán e interpretarán de conformidad con las leyes federales y locales vigentes 
              en los Estados Unidos Mexicanos, particularmente las disposiciones aplicables en materia de comercio electrónico, protección de 
              datos personales, propiedad intelectual y derechos de los consumidores.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6. JURISDICCIÓN</h3>
            <p className="text-gray-700 mb-6">
              Cualquier controversia, reclamación o conflicto derivado del acceso, navegación o uso de la Plataforma, de los contenidos que en 
              ella se alojan, o de la interpretación y ejecución de los presentes Términos y Condiciones, será sometido a la jurisdicción de 
              los tribunales competentes en la Ciudad de México, renunciando expresamente el Usuario a cualquier otro fuero que pudiera 
              corresponderle por razón de su domicilio presente o futuro.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7. DIVISIBILIDAD</h3>
            <p className="text-gray-700 mb-6">
              En caso de que cualquier disposición de estos Términos y Condiciones sea declarada nula, inválida o inaplicable por autoridad 
              judicial o administrativa competente, dicha nulidad no afectará la validez ni la aplicabilidad de las demás disposiciones, 
              las cuales permanecerán en pleno vigor y efecto.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              TEXTOS RELACIONADOS DIRECTAMENTE CON LAS APORTACIONES Y EL PROYECTO
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8. NATURALEZA DEL PROYECTO Y MODELO DE PARTICIPACIÓN</h3>
            <p className="text-gray-700 mb-4">
              Esta Plataforma es un medio digital a través del cual los Usuarios y/o Aportante pueden realizar aportaciones voluntarias de 
              carácter económico destinadas exclusivamente a apoyar el desarrollo, producción, promoción y/o difusión del Proyecto, a cambio 
              de la entrega de una recompensa de carácter no patrimonial.
            </p>
            <p className="text-gray-700 mb-6">
              Estas recompensas se otorgarán conforme a los niveles, condiciones, características y disponibilidad publicados y vigentes en 
              la Plataforma, los cuales forman parte integrante de los presentes Términos y Condiciones.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">9. NO CREACIÓN DE DERECHOS PARA EL USUARIO Y/O APORTANTE</h3>
            <p className="text-gray-700 mb-4">
              Las aportaciones realizadas por los Usuarios y/o Aportantes no otorgan, bajo ninguna circunstancia, derechos de propiedad, 
              copropiedad, titularidad, participación accionaria, derechos corporativos, control, administración, voto, utilidades, dividendos 
              o toma de decisiones sobre SUTILDE, la Plataforma o el Proyecto.
            </p>
            <p className="text-gray-700 mb-6">
              El Usuario reconoce expresamente que su participación se limita al ámbito de apoyo voluntario con la expectativa de recibir 
              únicamente la recompensa ofrecida en el nivel elegido, sin que ello genere relación societaria, laboral o contractual distinta 
              a la aquí prevista.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10. RECONOCIMIENTO Y ACEPTACIÓN DE CONDICIONES DE PARTICIPACIÓN</h3>
            <p className="text-gray-700 mb-4">El Usuario declara conocer y aceptar que:</p>
            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
              <li>Su aportación es voluntaria y no reembolsable, salvo que el Proyecto no pueda ejecutarse por causas imputables a SUTILDE, 
                  en cuyo caso se seguirá el procedimiento previsto en estos Términos y Condiciones;</li>
              <li>Las recompensas están sujetas a disponibilidad y a los plazos de entrega especificados en la Plataforma;</li>
              <li>No existe garantía de obtención de beneficios económicos, participación en utilidades o cualquier otro derecho distinto 
                  al expresamente establecido en el nivel de recompensa seleccionado.</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11. MEDIOS DE PAGO Y EMISIÓN DE COMPROBANTES</h3>
            <p className="text-gray-700 mb-4">
              Las aportaciones podrán realizarse a través de los medios de pago que SUTILDE ponga a disposición en la Plataforma, incluyendo 
              de manera enunciativa mas no limitativa transferencias bancarias, pagos electrónicos, tarjetas de débito o crédito, depósitos 
              en ventanilla bancaria y/o cualquier otro mecanismo que sea habilitado y publicado en la Plataforma.
            </p>
            <p className="text-gray-700 mb-4">
              Para procesar cada aportación y, en su caso, emitir el Comprobante Fiscal Digital por Internet (CFDI) correspondiente, el Usuario 
              deberá proporcionar la información solicitada por SUTILDE, la cual podrá incluir nombre completo o razón social, Registro Federal 
              de Contribuyentes (RFC), domicilio fiscal y correo electrónico.
            </p>
            <p className="text-gray-700 mb-6">
              Las transacciones realizadas a través de la Plataforma podrán ser procesadas directamente por SUTILDE o por proveedores externos 
              de servicios de pago, quienes serán responsables de la seguridad y procesamiento de la operación conforme a sus propios términos 
              y políticas.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">12. NO REEMBOLSO</h3>
            <p className="text-gray-700 mb-4">
              Todas las aportaciones realizadas a través de la Plataforma tienen el carácter de voluntarias y no reembolsables, 
              independientemente del medio de pago utilizado.
            </p>
            <p className="text-gray-700 mb-6">
              El Usuario reconoce y acepta que el incumplimiento en el pago, la cancelación unilateral de la operación o el desconocimiento 
              del cargo por parte de la institución financiera emisora de la tarjeta o del proveedor de servicios de pago podrán dar lugar 
              a la suspensión o cancelación de la entrega de la recompensa asociada, así como a las acciones legales que correspondan para 
              recuperar los montos no cubiertos.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">13. LEGISLACIÓN APLICABLE A LAS APORTACIONES</h3>
            <p className="text-gray-700 mb-4">
              Las aportaciones voluntarias y las recompensas otorgadas a través de la Plataforma se rigen principalmente por las disposiciones 
              del Código Civil Federal y, en su caso, por los Códigos Civiles de las Entidades Federativas, en lo relativo a la celebración, 
              interpretación y cumplimiento de contratos entre particulares, incluyendo contratos atípicos o innominados, de conformidad con 
              lo previsto en los artículos 1796, 1832 y 1858 del Código Civil Federal.
            </p>
            <p className="text-gray-700 mb-6">
              En materia fiscal, las operaciones realizadas a través de la Plataforma se encuentran sujetas a lo dispuesto por la Ley del 
              Impuesto al Valor Agregado y la Ley del Impuesto sobre la Renta, así como a las disposiciones reglamentarias y misceláneas 
              fiscales aplicables en México.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">14. JURISDICCIÓN PARA APORTACIONES</h3>
            <p className="text-gray-700 mb-6">
              Para todo lo no previsto expresamente en los presentes Términos y Condiciones, las partes se someten a la legislación aplicable 
              en los Estados Unidos Mexicanos. Cualquier controversia derivada de la interpretación, ejecución o cumplimiento de estos Términos 
              y Condiciones será resuelta por los tribunales competentes de la Ciudad de México.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
              15. NO APLICACIÓN DE LEYES EN MATERIA DE INSTITUCIONES DE CRÉDITO O TECNOLOGÍA FINANCIERA
            </h3>
            <p className="text-gray-700 mb-4">El modelo de aportación implementado a través de la Plataforma no constituye:</p>
            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
              <li>Una oferta pública de valores, ni la colocación o intermediación de instrumentos financieros, en términos de la Ley del 
                  Mercado de Valores y disposiciones aplicables.</li>
              <li>Un mecanismo de inversión colectiva ni de financiamiento participativo regulado por la Ley para Regular las Instituciones 
                  de Tecnología Financiera (Ley Fintech), dado que las recompensas no representan rendimientos financieros ni participación 
                  en capital.</li>
              <li>Un donativo deducible para efectos fiscales, de conformidad con la Ley del Impuesto Sobre la Renta y demás disposiciones 
                  fiscales aplicables en México.</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">16. DERECHOS DE IMAGEN Y PARTICIPACIÓN EN EL PROYECTO</h3>
            <p className="text-gray-700 mb-4">
              Algunas recompensas ofrecidas a través de la Plataforma podrán incluir la posibilidad de que el Usuario participe directa o 
              indirectamente en actividades relacionadas con el Proyecto, tales como, de manera enunciativa mas no limitativa, intervenciones 
              de voz en off, grabaciones personalizadas, apariciones en materiales audiovisuales, participación en eventos promocionales, 
              asistencia a estrenos o premieres, y cualquier otra colaboración de naturaleza similar.
            </p>
            <p className="text-gray-700 mb-4">
              En todos los casos en que la recompensa incluya la participación personal del Usuario en el Proyecto, éste se obliga, como 
              condición indispensable para su participación, a firmar previamente una carta de cesión de derechos de imagen, voz y, en su caso, 
              de cualquier otro derecho conexo, a favor de SUTILDE, S.A.P.I. de C.V., en los términos que ésta determine.
            </p>
            <p className="text-gray-700 mb-6">
              El Usuario reconoce y acepta que todo el contenido generado con su participación podrá ser difundido, reproducido, adaptado, 
              editado, modificado o utilizado en su totalidad o en parte, a discreción de SUTILDE, en medios digitales, redes sociales, 
              plataformas de streaming, eventos promocionales, exhibiciones públicas, festivales, canales de televisión, salas de cine y 
              cualquier otro medio de comunicación, sin que por ello tenga derecho a recibir contraprestación adicional alguna, más allá 
              de la recompensa originalmente acordada.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">17. PROPIEDAD INTELECTUAL DEL PROYECTO</h3>
            <p className="text-gray-700 mb-4">
              Todos los derechos de propiedad intelectual y derechos conexos relacionados con el Proyecto "Nuestras Voces", incluyendo de 
              manera enunciativa mas no limitativa el guion, argumento, personajes, diálogos, fotografías, ilustraciones, música, efectos 
              sonoros, secuencias audiovisuales, diseños de producción, carteles, material promocional y cualquier otro elemento creativo 
              asociado, son propiedad exclusiva de SUTILDE, o de sus legítimos titulares.
            </p>
            <p className="text-gray-700 mb-6">
              Queda expresamente prohibido que el Usuario reproduzca, copie, distribuya, comunique públicamente, transmita, sincronice, adapte, 
              edite, modifique o utilice con fines comerciales cualquier elemento protegido del Proyecto sin contar con la autorización previa, 
              expresa y por escrito de SUTILDE.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage