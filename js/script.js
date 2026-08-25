// =====================================================================
// CONFIGURACIÓN — completa estos dos valores antes de subir a tu dominio
// =====================================================================
// 1) URL de tu Google Apps Script publicado como Web App (termina en /exec)
//    Instrucciones completas al final del archivo index.html, en el comentario.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQfVSw2nbD6TS_ncbZdCZ4qepBF_2duh86c55JP6eqwNwrvMNTIvpk9GblnhRNH-I4/exec";

// 2) URL de la hoja de Google Sheets donde quieres ver los registros
//    (la que crearás al seguir las instrucciones). Solo para el botón
//    "Panel de administración" — se abre en una pestaña nueva.
const SHEET_VIEW_URL = "https://docs.google.com/spreadsheets/d/1S7YPn4SCPyimQaTzGMMkW3jPlyp0z7zxdqMevuZO7iA/edit?gid=0#gid=0";
// =====================================================================

// ---- Padrón de trabajadores (DNI -> nombre, cargo) ----
const PADRON = {"23997471": {"nombre": "Florencio Walter Bejar Mejia", "cargo": "Alcalde"}, "47808393": {"nombre": "Edwar Vasquez Mora", "cargo": "Gerente Municipal"}, "44944635": {"nombre": "Juan Eduardo Solis Mesco", "cargo": "Subgerente de Infraestructura y Desarrollo Territorial"}, "70054458": {"nombre": "Karen Elizabeth Pilares Tuni", "cargo": "Jefe de la Oficina de Abastecimiento"}, "45707388": {"nombre": "Joseph Anibal Monterroso Valdez", "cargo": "Subgerente de Infraestructura y Desarrollo Territorial"}, "44468435": {"nombre": "Katherine Kalla Calvo", "cargo": "Jefe de la Oficina de Vaso de Leche y Programas Sociales"}, "45078049": {"nombre": "Marinez Cardenas Zamalloa", "cargo": "Jefe de la Oficina de Tesoreria"}, "47778642": {"nombre": "Flor Delis Palomino Huallpa", "cargo": "Jefe de la Unidad de Relaciones Publicas E Imagen Institucional"}, "47296788": {"nombre": "Ana Luisa Ninaya Sarmiento", "cargo": "Jefa de la Oficina de Recursos Humanos"}, "71838852": {"nombre": "Marco Antonio Mendoza Huillca", "cargo": "Jefe de la Unidad de Informatica y Soporte Tecnico"}, "24467343": {"nombre": "Luciano Palomino Mora", "cargo": "Tecnico Gasfitero"}, "80289880": {"nombre": "Norka Paz Alvarado", "cargo": "Jefe de la Unidad de Registro de Estado Civil"}, "45365641": {"nombre": "Natty Condori Tupa", "cargo": "Obrera-guardia de Palacio Municipal"}, "40256586": {"nombre": "Nestor David Romero Montalvo", "cargo": "Residente de Obra"}, "75794861": {"nombre": "Kevin Bayona Guardapuclla", "cargo": "Asistente Tecnico"}, "71512126": {"nombre": "Flor de Maria Huaraka Curasco", "cargo": "Asistente Administrativo I"}, "70032185": {"nombre": "Flor Angel Palomino Huallpa", "cargo": "Residente de Proyecto"}, "76425971": {"nombre": "Shiro Isidro Quispe Avendaño", "cargo": "Asistente Tecnico"}, "71512120": {"nombre": "Royer Edmilson Quino Curasco", "cargo": "Promotor en Seguridad Ciudadana"}, "71517940": {"nombre": "Roymer Jayro Gonzales Carrion", "cargo": "Coordinador"}, "74539892": {"nombre": "Javier Puma Baños", "cargo": "Promotor en Seguridad Ciudadana"}, "71512143": {"nombre": "Anderson Ysaias Huaman Mamani", "cargo": "Promotor en Seguridad Ciudadana"}, "60308132": {"nombre": "Aldair Edson Matto Centeno", "cargo": "Promotor en Seguridad Ciudadana"}, "23843865": {"nombre": "Agustin Morales Apaza", "cargo": "Promotor en Seguridad Ciudadana"}, "71517938": {"nombre": "Esmeralda Huaman Mamani", "cargo": "Promotor en Seguridad Ciudadana"}, "62333736": {"nombre": "Roberto Jesús Rojas Mejia", "cargo": "Promotor en Seguridad Ciudadana"}, "73576938": {"nombre": "Yudith Huamanga Cachi", "cargo": "Promotor en Seguridad Ciudadana"}, "23930413": {"nombre": "Rene Gonzales Vargas", "cargo": "Inspector de Proyecto"}, "45504641": {"nombre": "Uriel Bardales Cardenas", "cargo": "Residente"}, "73582476": {"nombre": "Marisol Mamani Quispe", "cargo": "Asistente Administrativo"}, "70457643": {"nombre": "Olintho Junior Montalvo Vargas", "cargo": "Tecnico Agropecuario"}, "47242249": {"nombre": "Mily Milagros Zegarra Peña", "cargo": "Asistente Tecnico"}, "74390825": {"nombre": "Hilary Velazco Costilla", "cargo": "Auxiliar"}, "44296898": {"nombre": "Marcusa Chaucca Yapu", "cargo": "Promotor de Limpieza Publica"}, "47218314": {"nombre": "Carmen Pillco Ramos", "cargo": "Promotor de Limpieza Publica"}, "71513904": {"nombre": "Eliana Mamani Quispe", "cargo": "Promotor de Limpieza Publica"}, "75475432": {"nombre": "Dara Taiz Hidalgo Año", "cargo": "Promotor de Gestion Ambiental"}, "44376307": {"nombre": "Yury Quispe Loaiza", "cargo": "Promotor de Areas Verdes"}, "45932042": {"nombre": "Susana Huillca Huillca", "cargo": "Promotor de Limpieza Publica"}, "24468113": {"nombre": "Fernando Huamanga Huamanga", "cargo": "Promotor de Areas Verdes"}, "61073322": {"nombre": "Katherine Milagros Morales Lopez", "cargo": "Promotor de Limpieza Publica"}, "70925019": {"nombre": "Victor Mijael Huaman Mamani", "cargo": "Conductor"}, "73582465": {"nombre": "Yurema Quispe Choque", "cargo": "Promotor de Limpieza Publica"}, "42874802": {"nombre": "Delia Quispe Huaman", "cargo": "Promotor de Limpieza Publica"}, "46597783": {"nombre": "Edgar Salazar Puente de la Vega", "cargo": "Promotor de Limpieza Publica"}, "24468261": {"nombre": "Vicente Huaman Valer", "cargo": "Promotor de Limpieza Publica"}, "43799463": {"nombre": "Veronica Huallpayunca Quillahuaman", "cargo": "Promotor de Limpieza Publica"}, "48568678": {"nombre": "Tania Mamani Chipayo", "cargo": "Promotor de Limpieza Publica"}, "73585590": {"nombre": "Dayanna Maryory Quispe Calvo", "cargo": "Promotor de Actividades Culturales-nivel Sec"}, "75452734": {"nombre": "Ros Karen Ccanccahua Mora", "cargo": "Facilitador en Educacion Civica"}, "74924222": {"nombre": "Liz Angela Jara Alvaro", "cargo": "Facilitador en Fisica"}, "73996907": {"nombre": "Lilian Snay Pareja Delgado", "cargo": "Facilitador en Filosofia"}, "45746213": {"nombre": "Reynaldo Eddy Tintaya Mora", "cargo": "Promotor de Actividades Culturales-nivel Prim"}, "70925029": {"nombre": "Jailer Morales Calasaya", "cargo": "Facilitador de Futbol"}, "60308113": {"nombre": "Didierd Fernando Mora Paz", "cargo": "Asistentes de Campo"}, "24466926": {"nombre": "Bonifacio Huillca Quispe", "cargo": "Asistentes de Campo"}, "41843407": {"nombre": "Juan Jose Huahuachampi Cruz", "cargo": "Residente de Obra"}, "23952396": {"nombre": "Tania Quispe Puclla", "cargo": "Administrador de Obra"}, "75951233": {"nombre": "Adolfo Camala Huillca", "cargo": "Asistente Tecnico"}, "41965403": {"nombre": "Celedonio Quispe Zuñiga", "cargo": "Cotizador"}, "24467424": {"nombre": "Nazario Huaman Puma", "cargo": "Peon"}, "24468165": {"nombre": "Leonardo Quispe Huaman", "cargo": "Peon"}, "70929093": {"nombre": "Richar Huillca Huaman", "cargo": "Peon"}, "23812072": {"nombre": "Gabriel Quispe Rocca", "cargo": "Oficial"}, "44168371": {"nombre": "Joel Monroy Ccolque", "cargo": "Residente de Obra"}, "70330874": {"nombre": "Joel Jonathan Mamani Otazu", "cargo": "Asistente Tecnico"}, "72132880": {"nombre": "Astrith Ivoska Mendoza Benavides", "cargo": "Asistente de Obra"}, "41159616": {"nombre": "Harry Huaman Achahui", "cargo": "Inspector de Proyecto"}, "42373370": {"nombre": "Ronal Fuentes Yunguri", "cargo": "Inspector de Proyecto"}, "24467964": {"nombre": "Victor Huaman Puma", "cargo": "Operario"}, "41663822": {"nombre": "Christian Peralta Serrano", "cargo": "Operario"}, "63118209": {"nombre": "Abelardo Montiel Quispe", "cargo": "Oficial"}, "71513945": {"nombre": "Hugo Huillca Chaucca", "cargo": "Peon"}, "74410209": {"nombre": "Anny Peña Carrillo", "cargo": "Peon"}, "60293013": {"nombre": "David Champi Coorimanya", "cargo": "Inspector de Proyecto"}, "23952927": {"nombre": "Becerra Mendivil Sara", "cargo": "Jefe Ogrd"}, "71512116": {"nombre": "Quispe Huaman Elizabet", "cargo": "Asistente Administrativo"}, "41662793": {"nombre": "Aviles Huillca Juan Carlos", "cargo": "Responsable de Equipo Mecanico"}, "40624244": {"nombre": "Huillca Ttito Anastacio", "cargo": "Guardian"}, "71552401": {"nombre": "Galindo Mora Arnold", "cargo": "Operador de Maquinaria"}, "71081161": {"nombre": "Huamanga Quispe Nieves Milagros", "cargo": "Apoyo"}, "76943672": {"nombre": "Gongora Suca Gledy", "cargo": "Asistente de Campo"}, "71512079": {"nombre": "Flores Quispe Ramiro", "cargo": "Apoyo"}};

const dniInput = document.getElementById('dni');
const credential = document.getElementById('credential');
const credName = document.getElementById('credName');
const credRole = document.getElementById('credRole');
const dniNotFound = document.getElementById('dniNotFound');
const dniError = document.getElementById('dniError');
const submitBtn = document.getElementById('submitBtn');

const fechaInput = document.getElementById('fecha');
const celularInput = document.getElementById('celular');
const correoInput = document.getElementById('correo');

const countdownBar = document.getElementById('countdownBar');
const countdownMsg = document.getElementById('countdownMsg');
const countdownTime = document.getElementById('countdownTime');

const CLOSE_HOUR = 16; // 4:00 p. m., hora local del navegador
let registrationClosed = false;

function pad(n){ return String(n).padStart(2, '0'); }

function getCloseTime(){
  const d = new Date();
  d.setHours(CLOSE_HOUR, 0, 0, 0);
  return d;
}

function updateCountdown(){
  const diff = getCloseTime() - new Date();

  if(diff <= 0){
    countdownTime.textContent = '00:00:00';
    if(!registrationClosed) closeRegistration();
    return;
  }

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdownTime.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function closeRegistration(){
  registrationClosed = true;
  countdownBar.classList.add('closed');
  countdownMsg.innerHTML = 'El registro se ha <strong>cerrado</strong> — el horario fue hasta las 4:00 p. m.';
  dniInput.disabled = true;
  fechaInput.disabled = true;
  celularInput.disabled = true;
  correoInput.disabled = true;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Registro cerrado';
}

updateCountdown();
setInterval(updateCountdown, 1000);

let matchedRecord = null;

function evaluateDni(){
  const val = dniInput.value.replace(/\D/g,'').slice(0,8);
  if(val !== dniInput.value) dniInput.value = val;

  credential.classList.remove('show');
  dniNotFound.classList.remove('show');
  dniInput.classList.remove('invalid');
  dniError.classList.remove('show');
  matchedRecord = null;

  if(val.length === 8){
    const rec = PADRON[val];
    if(rec){
      matchedRecord = { dni: val, nombre: rec.nombre, cargo: rec.cargo };
      credName.textContent = rec.nombre;
      credRole.textContent = rec.cargo;
      requestAnimationFrame(()=> credential.classList.add('show'));
    } else {
      dniInput.classList.add('invalid');
      dniNotFound.classList.add('show');
    }
  }
  validateAll();
}

function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidCelular(v){
  return /^9\d{8}$/.test(v);
}
function isValidFecha(v){
  if(!v) return false;
  const d = new Date(v + 'T00:00:00');
  const today = new Date();
  if(d > today) return false;
  const minDate = new Date('1930-01-01');
  if(d < minDate) return false;
  return true;
}

function validateAll(){
  const ok = !registrationClosed
    && matchedRecord
    && isValidFecha(fechaInput.value)
    && isValidCelular(celularInput.value)
    && isValidEmail(correoInput.value);
  submitBtn.disabled = !ok;
  return ok;
}

dniInput.addEventListener('input', evaluateDni);

celularInput.addEventListener('input', () => {
  celularInput.value = celularInput.value.replace(/\D/g,'').slice(0,9);
  validateAll();
});
celularInput.addEventListener('blur', () => {
  toggleFieldError(celularInput, document.getElementById('celularError'), celularInput.value === '' || isValidCelular(celularInput.value));
});
fechaInput.addEventListener('change', () => {
  toggleFieldError(fechaInput, document.getElementById('fechaError'), fechaInput.value === '' || isValidFecha(fechaInput.value));
  validateAll();
});
correoInput.addEventListener('input', validateAll);
correoInput.addEventListener('blur', () => {
  toggleFieldError(correoInput, document.getElementById('correoError'), correoInput.value === '' || isValidEmail(correoInput.value));
});

function toggleFieldError(input, errEl, isOk){
  input.classList.toggle('invalid', !isOk);
  errEl.classList.toggle('show', !isOk);
}

document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!validateAll()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Guardando…';

  const registro = {
    dni: matchedRecord.dni,
    nombre: matchedRecord.nombre,
    cargo: matchedRecord.cargo,
    fecha_nacimiento: fechaInput.value,
    celular: celularInput.value,
    correo: correoInput.value.trim(),
    registrado_el: new Date().toISOString()
  };

  if(SCRIPT_URL.indexOf('PEGA_AQUI') === 0){
    submitBtn.disabled = false;
    submitBtn.textContent = 'Guardar registro';
    alert('Falta configurar SCRIPT_URL en el código antes de usar el formulario en producción. Revisa las instrucciones al final del archivo HTML.');
    return;
  }

  try{
    // Apps Script no responde con cabeceras CORS para fetch normal,
    // por eso se usa 'no-cors': no podemos leer la respuesta, pero
    // si la petición de red se completa sin error, el dato quedó guardado.
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(registro)
    });
    showSuccess(registro);
  }catch(err){
    submitBtn.disabled = false;
    submitBtn.textContent = 'Guardar registro';
    alert('No se pudo guardar el registro. Revisa tu conexión e intenta nuevamente.');
    console.error(err);
  }
});

function showSuccess(registro){
  document.getElementById('regForm').style.display = 'none';
  const sv = document.getElementById('successView');
  document.getElementById('doneNombre').textContent = registro.nombre;
  document.getElementById('summaryBox').innerHTML = `
    <div><span>DNI</span><span>${registro.dni}</span></div>
    <div><span>Cargo</span><span>${registro.cargo}</span></div>
    <div><span>Fecha de nacimiento</span><span>${registro.fecha_nacimiento}</span></div>
    <div><span>Celular</span><span>${registro.celular}</span></div>
    <div><span>Correo</span><span>${registro.correo}</span></div>
  `;
  sv.classList.add('show');
}

function resetForm(){
  document.getElementById('regForm').reset();
  document.getElementById('regForm').style.display = 'block';
  document.getElementById('successView').classList.remove('show');
  credential.classList.remove('show');
  dniNotFound.classList.remove('show');
  matchedRecord = null;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Guardar registro';
  dniInput.focus();
}

// ---------- Admin: abre la hoja de Google Sheets con los registros ----------
function toggleAdmin(){
  if(SHEET_VIEW_URL.indexOf('PEGA_AQUI') === 0){
    alert('Falta configurar SHEET_VIEW_URL en el código con el enlace de tu Google Sheet.');
    return;
  }
  window.open(SHEET_VIEW_URL, '_blank');
}
