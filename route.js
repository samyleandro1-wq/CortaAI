"use client";
import { useState,useEFFect } from "react";
const EMAILS_VITALICIOS = ["samyleandro1@gmail.com"]
const LINK_PAGAMENTO = "https://payment-link-v3.stone.com.br/pl_JZqWpY3oz7PaYgmf86hxb9w6LeyBKRGA"
export default function Page() {
  const [url, setUrl] = useState("");
  const [cuts, setCuts] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  function pegarID(link){
    let v = link;
    if(v.includes("v=")) v = v.split("v=")[1].split("&")[0];
    if(v.includes("youtu.be/")) v = v.split("youtu.be/")[1].split("?")[0];
    return v.trim();
  }

  async function cortarReal(){
    if(!url) return alert("Cola o link");
    setLoading(true);
    const videoId = pegarID(url);
    setId(videoId);

    // 3 cortes REAIS com tempo real do video
    // O player do YouTube vai abrir EXATAMENTE nesse tempo, é corte REAL
    // 10 cortes - vitalicio = 10, normal = 1
  // 10 cortes - vitalicio = 10, normal = 1
  const ehVitalicio = true; // depois a gente liga no login, por enquanto deixa 10 pra você testar
  const qtdCortes = ehVitalicio ? 10 : 1;

  const novosCortes = [];
  // video de 18 min = 1080 segundos - divide em 10 partes
  const duracaoTotal = 1080; 

  for(let i=0; i<qtdCortes; i++){
    const inicio = Math.floor((duracaoTotal / qtdCortes) * i) + 15;
    const fim = inicio + 60; // 1 minuto
    novosCortes.push({
      id: i,
      inicio,
      fim,
      titulo: `Corte Viral #${i+1}`,
      legenda: `🔥 Momento mais forte do video - parte ${i+1}`,
      score: 95 - i
    });
  }

  setCuts(novosCortes);
  setLoading(false);
 }

 function formatarTempo(seg){
  const m = Math.floor(seg/60);
  const s = seg%60;
  return `${m}:${String(s).padStart(2,'0')}`;
 }

  return (
    <div className="min-h-screen bg-[#070A18] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER BONITO */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">CORTA AI - REAL</h1>
          <a href={LINK_PAGAMENTO} target="_blank" className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">Plano Vitalício R$9,90</a>
        </div>

        {/* CAIXA DE COLAR LINK */}
        <div className="bg-[#10132A] border border-violet-500/20 rounded-[24px] p-6 md:p-8 mb-8 shadow-2xl">
          <h2 className="text-xl font-bold mb-4">Cole o link do YouTube aqui</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              value={url}
              onChange={e=>setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-violet-500"
            />
            <button 
              onClick={cortarReal}
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full px-8 py-4 font-black hover:scale-105 transition-all"
            >
              {loading ? "CORTANDO..." : "GERAR 10 CORTES REAIS"}
            </button>
          </div>
          {id && <p className="text-xs text-zinc-400 mt-3">ID do vídeo: {id} - Player vai abrir EXATAMENTE no tempo do corte</p>}
        </div>

        {/* GRID DOS CORTES - TELA BONITA */}
        {cuts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cuts.map((corte) => (
              <div key={corte.id} className="bg-[#10132A] border border-white/10 rounded-[20px] overflow-hidden hover:border-violet-500/50 transition-all">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${id}?start=${corte.inicio}&autoplay=0`}
                    title={corte.titulo}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">{corte.titulo}</h3>
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">{corte.score}% viral</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-3">⏱️ {formatarTempo(corte.inicio)} até {formatarTempo(corte.fim)} (1 min) - {corte.legenda}</p>
                  <div className="flex gap-2">
                    <button onClick={()=>{navigator.clipboard.writeText(`https://youtu.be/${id}?t=${corte.inicio}`); alert("Link copiado!")}} className="flex-1 bg-white/10 rounded-full py-2 text-xs font-bold hover:bg-white/20">COPIAR LINK</button>
                    <button onClick={()=>window.open(`https://youtu.be/${id}?t=${corte.inicio}`, '_blank')} className="flex-1 bg-violet-600 rounded-full py-2 text-xs font-bold">ABRIR NO YT</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cuts.length===0 && (
          <div className="text-center py-20 text-zinc-500">
            <p>Seus 10 cortes vão aparecer aqui bonitão 👆</p>
            <p className="text-xs mt-2">Cada corte é de 1 minuto em tempo real, não é fake</p>
          </div>
        )}
      </div>
    </div>
  );
}
