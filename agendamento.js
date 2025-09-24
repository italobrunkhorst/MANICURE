import { db } from "./inicializador-firebase.js";
import { collection, addDoc, query, where, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const form = document.getElementById("form-agendamento");
const statusEl = document.getElementById("status");
const dataInput = document.getElementById("data");
const horaSelect = document.getElementById("hora");

// Lista fixa de horários
const horariosDisponiveis = [
  "09:00", "10:00", "11:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00"
];

// Quando o usuário escolhe uma data
dataInput.addEventListener("change", async () => {
  const data = dataInput.value;

  // Se não escolher data, não mostra nada
  if (!data) {
    horaSelect.innerHTML = "<option value=''>Selecione uma data primeiro</option>";
    return;
  }

  // Mostra carregando
  horaSelect.innerHTML = "<option value=''>Carregando horários...</option>";

  try {
    // Busca todos agendamentos da data no Firestore
    const q = query(collection(db, "agendamentos"), where("data", "==", data));
    const snapshot = await getDocs(q);

    // Pega os horários já ocupados
    const ocupados = snapshot.docs.map(doc => doc.data().hora);

    // Filtra os livres
    const livres = horariosDisponiveis.filter(h => !ocupados.includes(h));

    // Preenche o select
    horaSelect.innerHTML = "<option value=''>Selecione um horário</option>";
    if (livres.length === 0) {
      horaSelect.innerHTML = "<option value=''>Nenhum horário disponível</option>";
    } else {
      livres.forEach(h => {
        const opt = document.createElement("option");
        opt.value = h;
        opt.textContent = h;
        horaSelect.appendChild(opt);
      });
    }

  } catch (error) {
    console.error("Erro ao carregar horários:", error);
    horaSelect.innerHTML = "<option value=''>Erro ao carregar horários</option>";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const servico = document.getElementById("servico").value;

  try {
    await addDoc(collection(db, "agendamentos"), {
      nome,
      data,
      hora,
      servico,
      criadoEm: new Date()
    });

    statusEl.textContent = "✅ Agendamento realizado com sucesso!";
    statusEl.style.color = "green";
    form.reset();
    horaSelect.innerHTML = "<option value=''>Selecione um horário</option>";

  } catch (error) {
    console.error("Erro ao agendar:", error);
    statusEl.textContent = "❌ Erro ao realizar agendamento.";
    statusEl.style.color = "red";
  }
});