//Obtener el color para una reseña
const getScoreColor = (score) => {
  const color = {
    1: "bg-red-900",
    2: "bg-red-800",
    3: "bg-red-700",
    4: "bg-orange-700",
    5: "bg-orange-600",
    6: "bg-yellow-600",
    7: "bg-yellow-600",
    8: "bg-green-600",
    9: "bg-green-600",
    10: "bg-green-500",
  };
  return color[Math.round(score)];
};

//Formatear fecha
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-CL");
};

//Obtener cookie
function getCookie(nombre) {
  //Obtener todas las cookies separas por ";"
  const cookies = document.cookie.split("; ");

  //Recorrer las cookies hasta encontrar la que queremos
  for (let i = 0; i < cookies.length; i++) {
    const [clave, valor] = cookies[i].split("=");
    if (clave === nombre) {
      return decodeURIComponent(valor);
    }
  }
  return null;
}

//Eliminar cookie estableciendo su fecha de expiración en el pasado
function deleteCookie(nombre) {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function redondear(valor) {
  let numero = typeof valor === "string" ? parseFloat(valor) : valor;

  if (isNaN(numero)) {
    throw new Error("El valor proporcionado no es un número válido");
  }

  const redondeado = Math.round(numero * 10) / 10;
  return Number.isInteger(redondeado) ? redondeado : redondeado;
}

export { getScoreColor, formatDate, getCookie, deleteCookie, redondear };
