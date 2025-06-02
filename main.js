let preguntaActual = 0;
let caramelos = 0;
let juegoTerminado = false;
let feedback = null;
let feedbackTime = 0;
let seleccionIncorrecta = -1;
let estado = "inicio"; // puede ser: "inicio", "juego", "fin"

function pRandom(preguntas) {
  for (let i = preguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [preguntas[i], preguntas[j]] = [preguntas[j], preguntas[i]];
  }
}

let preguntas = [
  {
    pregunta: "¿cual es una ventaja del reconocimiento de retina e iris?",
    opciones: [
      "se puede usar en una cámara regular",
      "la luz visible debe maximizarse para mayor precisión",
      "difícil  de falsificar",
      "tiene gran valor para la investigación criminal"
    ],
    correcta: 2
  },
  {
    pregunta: "¿en cual se basa el reconocimiento de retina?",
    opciones: [
      "los vasos sanguíneos del ojo",
      "en la forma del iris",
      "del tamaño del ojo",
      "en los patrones del ojo"
    ],
    correcta: 0
  },
  {
    pregunta: "¿El reconocimiento de iris puede ser analizado?",
    opciones: [
      "equivocamente",
      "dudosamente",
      "facilmente",
      "inequivocamente"
    ],
    correcta: 3
  },
  {
    pregunta: "¿Cual de las ventajas tiene como caracteristica ser mas higenico?",
    opciones: [
      "difícil  de falsificar",
      "No hay contacto físico al escanear", 
      "Rendimiento de comparación preciso", 
      "El iris está protegido por la córnea de manera que no cambia tanto a medida que las personas envejecen."
    ],
    correcta: 1
  },
  {
    pregunta: "¿Cual de las siguientes pertenece al iris?",
    opciones: [
      "Puede cambiar a base de una enfermedad sanguínea (SIDA, sifilis, etc)", 
      "Complejo de implementación", 
      "Puede usarse a la distancia", 
      "Necesita luz para el escaneo "
    ],
    correcta: 2
  }
];

pRandom(preguntas);

function setup() {
  createCanvas(windowWidth, windowHeight);
  textWrap(WORD);
  textFont('Arial');
}

function draw() {
  background(25, 10, 132);
  bolitas();

  if (estado === "inicio") {
    mostrarPantallaInicio();
  } else if (estado === "juego") {
    if (!preguntas[preguntaActual]) {
      estado = "fin";
      return;
    }

    if (feedback !== null) {
      background(feedback ? 'green' : 'red');
      bolitas();
    }

    mostrarPantalla(preguntas[preguntaActual]);

    if (feedback !== null && millis() - feedbackTime > 1000) {
      if (feedback) caramelos++;
      preguntaActual++;
      feedback = null;
      seleccionIncorrecta = -1;
    }

  } else if (estado === "fin") {
    mostrarFinal();
  }
}

function mostrarPantallaInicio() {
  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.06);
  fill(255);
  text("Reconocimiento de Retina", width / 2, height / 2 - height * 0.15);

  // Botón de inicio
  let btnWidth = width * 0.25;
  let btnHeight = height * 0.08;
  let btnX = width / 2 - btnWidth / 2;
  let btnY = height / 2;

  stroke(255, 255, 0);
  fill(47, 98, 144);
  rect(btnX, btnY, btnWidth, btnHeight, 10);

  fill(255);
  noStroke();
  textSize(min(width, height) * 0.035);
  text("Iniciar juego", width / 2, btnY + btnHeight / 2);
}

function mostrarPantalla(pregunta) {
  let margen = width * 0.07;
  let contWidth = width - margen * 2;
  let contHeight = height - margen * 2;

  // Fondo contenedor general
  stroke(255, 255, 0);
  fill(47, 98, 144);
  rect(margen, margen, contWidth, contHeight, 20);

  // Caja pregunta
  let pregX = margen + contWidth * 0.1;
  let pregY = margen + contHeight * 0.05;
  let pregWidth = contWidth * 0.8;
  let pregHeight = contHeight * 0.15;

  stroke(255, 255, 0);
  fill(0);
  rect(pregX, pregY, pregWidth, pregHeight, 20);

  textSize(min(width, height) * 0.04);
  stroke(255);
  fill(255);
  text(pregunta.pregunta, pregX + 10, pregY + 15, pregWidth - 20, pregHeight - 20);

  // Opciones — Distribuidas en 2 columnas, con margen igual a izquierda y derecha
  let opcionesX = pregX; // alineadas al mismo margen que la pregunta
  let opcionesY = pregY + pregHeight + contHeight * 0.05; // un poco abajo de la pregunta
  let opcionesWidth = pregWidth;
  let opcionesHeight = contHeight - (opcionesY - margen) - margen; // espacio disponible abajo

  let colCount = 2;
  let rowCount = 2;

  let gapX = opcionesWidth * 0.05;
  let optionWidth = (opcionesWidth - gapX * (colCount - 1)) / colCount;
  let gapY = opcionesHeight * 0.1;
  let optionHeight = (opcionesHeight - gapY * (rowCount - 1)) / rowCount;

  for (let i = 0; i < 4; i++) {
    let col = i % colCount;
    let row = Math.floor(i / colCount);

    let x = opcionesX + col * (optionWidth + gapX);
    let y = opcionesY + row * (optionHeight + gapY);

    let colorFondo = color(0);

    if (feedback !== null) {
      if (i === preguntas[preguntaActual].correcta) {
        colorFondo = color(0, 255, 0); // verde
      } else if (i === seleccionIncorrecta) {
        colorFondo = color(255, 0, 0); // rojo
      }
    }

    mostrarOpcion(x, y, optionWidth, optionHeight, pregunta.opciones[i], colorFondo);
  }
}

function mostrarOpcion(x, y, w, h, texto, colorFondo = 0) {
  stroke(255, 255, 0);
  fill(colorFondo || 0);
  rect(x, y, w, h, 20);

  textSize(min(width, height) * 0.025);
  stroke(255);
  fill(255);
  text(texto, x + 10, y + 15, w - 20, h - 30);
}

function mostrarOpcion(x, y, w, h, texto, colorFondo = color(0)) {
  stroke(255, 255, 0);
  fill(colorFondo);
  rect(x, y, w, h, 20);

  textSize(min(width, height) * 0.028);
  stroke(255);
  fill(255);
  text(texto, x + w * 0.05, y + h * 0.1, w * 0.9, h * 0.8);
}

function mouseClicked() {
  if (estado === "inicio") {
    let btnWidth = width * 0.25;
    let btnHeight = height * 0.08;
    let btnX = width / 2 - btnWidth / 2;
    let btnY = height / 2;

    if (
      mouseX > btnX && mouseX < btnX + btnWidth &&
      mouseY > btnY && mouseY < btnY + btnHeight
    ) {
      estado = "juego";
    }
    return;
  }

  if (estado === "fin") {
    let btnWidth = width * 0.25;
    let btnHeight = height * 0.07;
    let btnX = width / 2 - btnWidth / 2;
    let btnY = height / 2 + height * 0.12;

    if (
      mouseX > btnX && mouseX < btnX + btnWidth &&
      mouseY > btnY && mouseY < btnY + btnHeight
    ) {
      reiniciarJuego();
    }
    return;
  }

  if (!preguntas[preguntaActual] || feedback !== null) return;

  // Opciones
  let margen = width * 0.07;
  let contWidth = width - margen * 2;
  let contHeight = height - margen * 2;

  let pregY = margen + contHeight * 0.05;
  let pregHeight = contHeight * 0.15;

  let optionWidth = contWidth * 0.4;
  let optionHeight = contHeight * 0.3;
  let gapX = contWidth * 0.1;
  let gapY = contHeight * 0.05;

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let x = margen + gapX + col * (optionWidth + gapX);
    let y = pregY + pregHeight + gapY + row * (optionHeight + gapY);

    if (
      mouseX > x && mouseX < x + optionWidth &&
      mouseY > y && mouseY < y + optionHeight
    ) {
      feedback = (i === preguntas[preguntaActual].correcta);
      seleccionIncorrecta = feedback ? -1 : i;
      feedbackTime = millis();
      return;
    }
  }
}

function mostrarFinal() {
  background(0);
  textSize(min(width, height) * 0.06);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Fin del juego. Gracias por jugar.", width / 2, height / 2 - height * 0.1);

  textSize(min(width, height) * 0.045);
  text(`Puntaje final: ${caramelos} punto${caramelos === 1 ? "" : "s"} 👻`, width / 2, height / 2);

  // Botón reiniciar
  let btnWidth = width * 0.25;
  let btnHeight = height * 0.07;
  let btnX = width / 2 - btnWidth / 2;
  let btnY = height / 2 + height * 0.12;

  fill(47, 98, 144);
  stroke(255, 255, 0);
  rect(btnX, btnY, btnWidth, btnHeight, 10);

  fill(255);
  noStroke();
  textSize(min(width, height) * 0.035);
  text("Volver a jugar", width / 2, btnY + btnHeight / 2);
}

function reiniciarJuego() {
  preguntaActual = 0;
  caramelos = 0;
  feedback = null;
  seleccionIncorrecta = -1;
  juegoTerminado = false;
  estado = "juego";
  pRandom(preguntas);
  loop();
}

function bolitas() {
  // Usa tamaño relativo para los círculos decorativos
  let size = min(width, height) * 0.04;
  for (let i = size * 2; i <= width - size * 2; i += size * 3) {
    ellipse(i, size * 2, size);
    ellipse(i, height - size * 2, size);
  }
  for (let i = size * 2; i <= height - size * 2; i += size * 3) {
    ellipse(width - size * 2, i, size);
    ellipse(size * 2, i, size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
