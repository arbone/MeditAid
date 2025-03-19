import React, { useState, useEffect } from "react";
import "../styles/MotivationalQuotes.css";

const quotes = [
    "Sii il cambiamento che vuoi vedere nel mondo.",
    "La pace viene da dentro. Non cercarla fuori.",
    "Ogni giorno è una nuova opportunità per migliorare te stesso.",
    "Fai oggi ciò che il tuo futuro ringrazierà.",
    "La felicità non è qualcosa di pronto. Viene dalle tue azioni.",
    "Ciò che pensiamo, diventiamo.",
    "Il successo è la somma di piccoli sforzi ripetuti giorno dopo giorno.",
    "Abbraccia l’ignoto, è lì che avviene la crescita.",
    "Il fallimento è il condimento che dà sapore al successo.",
    "Non conta quanto vai piano, l’importante è non fermarsi.",
    "La vita è 10% cosa ti accade e 90% come reagisci.",
    "Un viaggio di mille miglia inizia con un singolo passo.",
    "Non puoi tornare indietro e cambiare l’inizio, ma puoi iniziare da ora e cambiare il finale.",
    "Chi dice che è impossibile non dovrebbe disturbare chi ce la sta facendo.",
    "Non aspettare. Il momento giusto non arriverà mai.",
    "Ogni ostacolo è un'opportunità per migliorare.",
    "La mente è come un paracadute, funziona solo se si apre.",
    "Credi in te stesso e tutto sarà possibile.",
    "Se puoi sognarlo, puoi farlo.",
    "Fai qualcosa oggi che il tuo futuro te stesso ringrazierà.",
    "Ogni giorno è una seconda possibilità.",
    "Non fermarti finché non sei orgoglioso.",
    "Sii più forte delle tue scuse.",
    "I limiti esistono solo nella tua mente.",
    "La disciplina è il ponte tra obiettivi e risultati.",
    "Ogni momento è un'opportunità per ricominciare.",
    "Le piccole cose fanno una grande differenza.",
    "Non conta quante volte cadi, ma quante volte ti rialzi.",
    "Il coraggio è resistere alla paura, non la sua assenza.",
    "Non puoi cambiare il vento, ma puoi regolare le vele.",
    "Il futuro appartiene a coloro che credono nella bellezza dei loro sogni.",
    "Fai di ogni giorno un capolavoro.",
    "Non lasciare che il passato occupi troppo il tuo presente.",
    "Non importa quanto lentamente vai, l’importante è non fermarsi.",
    "Sorridi e il mondo sorriderà con te.",
    "Se vuoi qualcosa che non hai mai avuto, devi fare qualcosa che non hai mai fatto.",
    "La perseveranza è il segreto di ogni traguardo.",
    "Il modo migliore per predire il futuro è crearlo.",
    "Osa, perché solo chi osa può ottenere il meglio.",
    "Non smettere mai di imparare.",
    "Non cercare la felicità. Crea la felicità.",
    "Ogni successo inizia con la decisione di provarci.",
    "Fai della tua vita un sogno, e di un sogno, una realtà.",
    "Il tuo unico limite è la tua immaginazione.",
    "Non rimandare a domani ciò che puoi fare oggi.",
    "La vita è fatta di piccole gioie quotidiane.",
    "Le grandi cose iniziano sempre con piccoli passi.",
    "Sii la versione migliore di te stesso.",
    "Un’azione vale più di mille parole.",
    "Il momento giusto è sempre adesso.",
    "Sei più forte di quanto pensi.",
    "Non lasciare che la paura decida il tuo destino.",
    "La felicità è un viaggio, non una destinazione.",
    "Il miglior investimento che puoi fare è su te stesso.",
    "Ogni giorno è un'opportunità per crescere.",
    "Dai il meglio di te in tutto ciò che fai.",
    "Non avere paura di fallire, abbi paura di non provarci.",
    "Il cambiamento inizia sempre dentro di te.",
    "Non è mai troppo tardi per essere ciò che avresti voluto essere.",
    "La forza non viene dalla vittoria, ma dalle difficoltà superate.",
    "Le idee senza azione rimangono solo sogni.",
    "Non confrontarti con gli altri, confrontati con la versione di ieri di te stesso.",
    "Più lavori sodo, più diventi fortunato.",
    "Fai quello che puoi, con quello che hai, dove sei.",
    "Lascia andare ciò che ti pesa e segui ciò che ti rende felice.",
    "Credi nei tuoi sogni, anche quando nessun altro lo fa.",
    "La vera libertà è essere fedeli a se stessi.",
    "Non devi essere perfetto per essere straordinario.",
    "I sogni diventano realtà con determinazione e impegno.",
    "Sii il faro, non la nave alla deriva.",
    "Sorridi alla vita e la vita ti sorriderà.",
    "Pianta un seme oggi per raccogliere un domani migliore.",
    "La chiave del successo è iniziare prima di essere pronti.",
    "Fai del tuo meglio, il resto verrà da sé.",
    "Non conta da dove vieni, conta dove vuoi andare.",
    "L’unico modo per fallire è smettere di provare.",
    "Trova il coraggio di seguire il tuo cuore.",
    "Le difficoltà preparano persone comuni a destini straordinari.",
    "Non lasciare che il tuo passato rubi il tuo futuro.",
    "Non permettere a nessuno di spegnere la tua luce.",
    "Il miglior modo per avere successo è aiutare gli altri ad avere successo.",
    "Non temere il cambiamento, abbraccialo.",
    "Sii gentile, sempre. Non sai mai chi sta combattendo una battaglia silenziosa.",
    "Quando tutto sembra difficile, è il momento di spingere di più.",
    "Ciò che oggi sembra impossibile, domani sarà il tuo punto di forza.",
    "La resilienza è la chiave per ogni successo.",
    "Le opportunità spesso si nascondono dietro le sfide.",
    "La paura è solo una bugia che raccontiamo a noi stessi.",
    "Non aspettare l’occasione perfetta, creala.",
    "Se vuoi fare la differenza, inizia con te stesso.",
    "Non c’è crescita senza cambiamento.",
    "Sii la luce che vuoi vedere nel mondo.",
    "Ogni grande successo inizia con la decisione di provare.",
    "Se credi in te stesso, sei già a metà strada."
  ];

const MotivationalQuotes = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 7000); // Cambia frase ogni 7 secondi

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="motivational-quote">
      <p>{quote}</p>
    </div>
  );
};

export default MotivationalQuotes;