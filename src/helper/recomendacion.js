// helper/aire.js
function getRecomendacion(iqa) {
    if (iqa <= 50) {
      return {
        categoria: 'Bueno',
        consejo: 'Disfruta las actividades al aire libre.'
      };
    }
    if (iqa <= 100) {
      return {
        categoria: 'Moderado',
        consejo: 'Personas muy sensibles deberían considerar reducir el ejercicio intenso al aire libre.'
      };
    }
    if (iqa <= 150) {
      return {
        categoria: 'Dañino para grupos sensibles',
        consejo: 'Niños, adultos mayores y personas con afecciones respiratorias deben limitar la exposición prolongada u onerosa.'
      };
    }
    if (iqa <= 200) {
      return {
        categoria: 'Dañino',
        consejo: 'Evita el ejercicio al aire libre; los grupos sensibles deberían permanecer en interiores.'
      };
    }
    if (iqa <= 300) {
      return {
        categoria: 'Muy dañino',
        consejo: 'Reduce al mínimo las actividades al aire libre; considera usar mascarilla si es imprescindible salir.'
      };
    }
    // >300
    return {
      categoria: 'Peligroso',
      consejo: 'Permanece en interiores con ventanas cerradas y purificador de aire si es posible.'
    };
  }
  
  module.exports = { getRecomendacion };
  