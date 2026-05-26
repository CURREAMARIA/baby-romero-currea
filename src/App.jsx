import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

// ── ROPA: 4 etapas, MC=1 paquete, Pijamas=2 paquetes, Ropa para salir x2 ───
const CLOTHING_DEFAULT = {
  "0-3m": {
    label: "Talla 0–3 meses", emoji: "🥚", color: "#10b981",
    packages: [
      { id:"rA01", type:"Bodies manga larga", n:1, qty:"×3 uds",
        specs:"Algodón 100% suave. Colores neutros o suaves (blanco, gris, verde menta, azul claro). Cierre a presión en la entrepierna. Sin adornos que puedan molestar.", refLink:"", claimedBy:"" },
      { id:"rA02", type:"Bodies manga larga", n:2, qty:"×3 uds",
        specs:"Igual que Paquete 1. Algodón suave, colores neutros, cierre a presión.", refLink:"", claimedBy:"" },
      { id:"rA03", type:"Bodies manga corta", n:1, qty:"×3 uds",
        specs:"Algodón suave. Ideales para uso diario. Colores neutros o estampados simples.", refLink:"", claimedBy:"" },
      { id:"rA04", type:"Pijamas algodón", n:1, qty:"×3 uds",
        specs:"Preferiblemente con broches a presión en la entrepierna. Sin cordones ni cremalleras. Talla 0-3 meses.", refLink:"", claimedBy:"" },
      { id:"rA05", type:"Pijamas algodón", n:2, qty:"×3 uds",
        specs:"Igual que Paquete 1. Broches a presión, sin cordones. Talla 0-3 meses.", refLink:"", claimedBy:"" },
    ],
  },
  "3-6m": {
    label: "Talla 3–6 meses", emoji: "🦕", color: "#059669",
    packages: [
      { id:"rB01", type:"Bodies manga larga", n:1, qty:"×3 uds",
        specs:"Algodón 100%. Colores neutros o suaves. Cierre a presión. Talla 3-6 meses.", refLink:"", claimedBy:"" },
      { id:"rB02", type:"Bodies manga larga", n:2, qty:"×3 uds",
        specs:"Igual que Paquete 1. Talla 3-6 meses.", refLink:"", claimedBy:"" },
      { id:"rB03", type:"Bodies manga corta", n:1, qty:"×3 uds",
        specs:"Algodón suave, uso diario. Talla 3-6 meses.", refLink:"", claimedBy:"" },
      { id:"rB04", type:"Pijamas algodón", n:1, qty:"×3 uds",
        specs:"Con broches a presión, sin cordones. Talla 3-6 meses.", refLink:"", claimedBy:"" },
      { id:"rB05", type:"Pijamas algodón", n:2, qty:"×3 uds",
        specs:"Igual que Paquete 1. Talla 3-6 meses.", refLink:"", claimedBy:"" },
      { id:"rB06", type:"Ropa para salir", n:1, qty:"×3 mudas",
        specs:"Mudas completas para salir. Pueden ser conjuntos. Talla 3-6 meses. ¡Estampado de dinosaurios 🦕 es bienvenido!", refLink:"", claimedBy:"" },
      { id:"rB07", type:"Ropa para salir", n:2, qty:"×3 mudas",
        specs:"Igual que Paquete 1 de ropa para salir. Talla 3-6 meses. Diferentes estilos/colores.", refLink:"", claimedBy:"" },
    ],
  },
  "6-9m": {
    label: "Talla 6–9 meses", emoji: "🦖", color: "#047857",
    packages: [
      { id:"rC01", type:"Bodies manga larga", n:1, qty:"×3 uds",
        specs:"Algodón preferiblemente. Colores neutros. Talla 6-9 meses.", refLink:"", claimedBy:"" },
      { id:"rC02", type:"Bodies manga larga", n:2, qty:"×3 uds",
        specs:"Igual que Paquete 1. Talla 6-9 meses.", refLink:"", claimedBy:"" },
      { id:"rC03", type:"Bodies manga corta", n:1, qty:"×3 uds",
        specs:"Algodón suave, uso diario. Talla 6-9 meses.", refLink:"", claimedBy:"" },
      { id:"rC04", type:"Pijamas", n:1, qty:"×3 uds",
        specs:"Tela fresca y cómoda. Con cierre fácil. Talla 6-9 meses.", refLink:"", claimedBy:"" },
      { id:"rC05", type:"Pijamas", n:2, qty:"×3 uds",
        specs:"Igual que Paquete 1. Talla 6-9 meses.", refLink:"", claimedBy:"" },
      { id:"rC06", type:"Ropa para salir", n:1, qty:"×3 mudas",
        specs:"Mudas completas para salir. Pueden ser conjuntos. Talla 6-9 meses.", refLink:"", claimedBy:"" },
      { id:"rC07", type:"Ropa para salir", n:2, qty:"×3 mudas",
        specs:"Igual que Paquete 1 de ropa para salir. Talla 6-9 meses. Diferentes estilos.", refLink:"", claimedBy:"" },
    ],
  },
  "9-12m": {
    label: "Talla 9–12 meses", emoji: "🌿", color: "#065f46",
    packages: [
      { id:"rD01", type:"Bodies manga larga", n:1, qty:"×3 uds",
        specs:"Algodón preferiblemente. Talla 9-12 meses.", refLink:"", claimedBy:"" },
      { id:"rD02", type:"Bodies manga larga", n:2, qty:"×3 uds",
        specs:"Igual que Paquete 1. Talla 9-12 meses.", refLink:"", claimedBy:"" },
      { id:"rD03", type:"Bodies manga corta", n:1, qty:"×3 uds",
        specs:"Algodón suave, uso diario. Talla 9-12 meses.", refLink:"", claimedBy:"" },
      { id:"rD04", type:"Pijamas", n:1, qty:"×3 uds",
        specs:"Tela fresca, cierre fácil. Talla 9-12 meses.", refLink:"", claimedBy:"" },
      { id:"rD05", type:"Pijamas", n:2, qty:"×3 uds",
        specs:"Igual que Paquete 1. Talla 9-12 meses.", refLink:"", claimedBy:"" },
      { id:"rD06", type:"Ropa para salir", n:1, qty:"×3 mudas",
        specs:"Mudas completas para salir. Talla 9-12 meses.", refLink:"", claimedBy:"" },
      { id:"rD07", type:"Ropa para salir", n:2, qty:"×3 mudas",
        specs:"Igual que Paquete 1 de ropa para salir. Talla 9-12 meses.", refLink:"", claimedBy:"" },
    ],
  },
};

const ITEMS_DEFAULT = [
  // BAÑO
  { id:"b1",cat:"bano",icon:"🛁",name:"Tina de baño",detail:"para recién nacido",priority:"Alta",canSplit:false,
    specs:"Tina para bebé, idealmente con soporte o base antideslizante. No necesita ser el modelo exacto del enlace.",
    refLink:"https://www.carestino.com.co/producto/baniera-hawaii-50l-gris",claimedBy:[]},
  { id:"b2",cat:"bano",icon:"🌿",name:"Toallas con capota",detail:"×2 uds",priority:"Alta",canSplit:false,
    specs:"Toallas muy suaves y absorbentes, preferiblemente grandes. En algodón o bambú. Con capota integrada.",
    refLink:"",claimedBy:[]},
  { id:"b3",cat:"bano",icon:"🧴",name:"Kit de aseo completo",priority:"Alta",canSplit:true,
    specs:"El kit debe incluir:\n✅ Cortaúñas o tijerita de punta redonda\n✅ Lima de uñas para bebé\n✅ Cepillo y peine suave\n✅ Termómetro digital\n✅ Aspirador nasal o perita\n✅ Jabón líquido suave\n✅ Shampoo sin lágrimas\n✅ Crema antipañalitis\n✅ Crema humectante\n\nPuede venir en caja lista o ensamblarlo tú.",
    refLink:"",claimedBy:[]},
  { id:"b4",cat:"bano",icon:"💧",name:"Combo cuidado: pañitos + cremas + loción",detail:"varios productos juntos",priority:"Alta",canSplit:true,
    specs:"Combo de productos esenciales para el cuidado diario del bebé:\n\n✅ Pañitos húmedos sin alcohol ni perfume (entre más cantidad, mejor — varios paquetes grandes)\n✅ Crema antipañalitis MARCA 4 (varias unidades)\n✅ Crema de cuerpo para bebé\n✅ Loción Arrurrú\n\nTodos sin perfume fuerte. ⚠️ Para la crema antipañalitis preferimos específicamente la Marca 4.",
    refLink:"",claimedBy:[]},
  // PAÑALES
  { id:"p1",cat:"panales",icon:"♻️",name:"Pañales ecológicos reutilizables",detail:"combo completo — ideal entre 2",priority:"Alta",canSplit:true,
    specs:"Combo que incluye: pañales ecológicos reutilizables, absorbentes, filtros y detergente especial.\n\nEs el regalo más completo de pañales y puede compartirse entre 2 personas.",
    refLink:"https://okolo.com.co/collections/combos-panales-ecologicos-reutilizables-bebes/products/combo-familia-x6-panales-ecologicos-6-absorbentes-1-filtros-x100-gratis-1-detergente-2l-okolo",claimedBy:[]},
  { id:"p6",cat:"panales",icon:"🧳",name:"Cambiador portátil",detail:"para salidas",priority:"Alta",canSplit:false,
    specs:"Plegable, fácil de limpiar. Con bolsillos si es posible. Para cambio fuera de casa.",
    refLink:"",claimedBy:[]},
  // LACTANCIA
  { id:"l1",cat:"lactancia",icon:"🥛",name:"Extractor de leche",detail:"para mamá — ideal entre 2",priority:"Alta",canSplit:true,
    specs:"Extractor de leche para mamá. Preferiblemente que sea eléctrico.\n\nEl enlace de referencia es el modelo sugerido.",
    refLink:"https://a.co/d/01de44hF",claimedBy:[]},
  { id:"l2",cat:"lactancia",icon:"🧣",name:"Baberos y trapitos para gases en muselina · Pack 2",detail:"×10 uds",priority:"Alta",canSplit:false,
    specs:"Baberos y trapitos para sacar los gases de bebé, suaves de muselina o en algodón. Suaves, Lavables y absorbentes. Sin botones que puedan soltarse.",
    refLink:"https://a.co/d/0fhdUG8q",claimedBy:[]},
  { id:"l5",cat:"lactancia",icon:"🍼",name:"Biberones Pigeon ×3",detail:"⚠️ marca específica",priority:"Alta",canSplit:false,
    specs:"⚠️ MARCA ESPECÍFICA: Pigeon\n\nBusca biberones PIGEON para recién nacido (flujo lento / newborn flow). Los encuentras en tiendas de bebés, Falabella, Rappi o Amazon Colombia.\n\n🚫 Por favor no sustituir por otra marca preferiblemente que sean Philips Avent — es importante para la preferencia del bebé.",
    refLink:"",claimedBy:[]},
  { id:"l6",cat:"lactancia",icon:"🤱",name:"Cojín de lactancia",detail:"ergonómico, lavable",priority:"Alta",canSplit:true,
    specs:"Cojín ergonómico y lavable para lactancia. Cualquier color o diseño.",
    refLink:"",claimedBy:[]},
  { id:"l7",cat:"lactancia",icon:"🍽️",name:"Kit de comer (6 meses+)",detail:"plato, cucharas, vaso",priority:"Media",canSplit:false,
    specs:"Para la etapa de alimentación complementaria (6 meses en adelante). Incluir:\n✅ Plato silicona con ventosa\n✅ Cucharas suaves\n✅ Vaso entrenador\n✅ Babero para alimentación",
    refLink:"",claimedBy:[]},
  { id:"l8",cat:"lactancia",icon:"🍼",name:"Bolsas Almacenamiento Leche",detail:"Bolsas Almacenamiento Leche Materna",priority:"Media",canSplit:false,
    specs:"Preferiblemente pack x120, ideales para la alimentación del bebé",
    refLink:"https://a.co/d/05ZCXPuJ",claimedBy:[]},
  // SUEÑO
  { id:"s1",cat:"sueno",icon:"🛏️",name:"Cuna colecho",detail:"con mosquitero · ideal entre 2",priority:"Alta",canSplit:true,
    specs:"Cuna colecho para poner al lado de la cama. Con mosquitero y organizador incluido.\n⚠️ Verificar dimensiones antes de comprar para que sea compatible con la cama.",
    refLink:"https://www.falabella.com.co/falabella-co/product/120249206/Cuna-Colecho-para-Bebe-con-Mosquitero-y-Organizador-/120249207",claimedBy:[]},
  { id:"s2",cat:"sueno",icon:"🌿",name:"Sábanas ajustables y mantas de muselina ×3",detail:"para cuna colecho",priority:"Alta",canSplit:false,
    specs:"⚠️ Verificar la medida exacta del colecho antes de comprar para que ajusten bien.suaves y versátiles,De algodón o bambú.",
    refLink:"",claimedBy:[]},
   { id:"s4",cat:"sueno",icon:"💤",name:"Saco de dormir bebé",detail:"más seguro que cobijas",priority:"Media",canSplit:false,
    specs:"Más seguro que cobijas sueltas. Liviano, de talla adecuada para recién nacido.",
    refLink:"",claimedBy:[]},
  { id:"s5",cat:"sueno",icon:"🌙",name:"Cobijita liviana ×2",detail:"suave y transpirable",priority:"Media",canSplit:false,
    specs:"⚠️ No dejar suelta en el espacio de sueño del recién nacido.",
    refLink:"",claimedBy:[]},
  { id:"s6",cat:"sueno",icon:"🔴",name:"Máquina ruido blanco + luz roja",detail:"para que duerma mejor · ideal entre 2",priority:"Alta",canSplit:true,
    specs:"Emite ruido blanco (simula los sonidos del útero, muy relajante para el bebé) y luz roja tenue (no interrumpe el ciclo de sueño como la luz blanca o azul).\n\nMuy recomendado por pediatras y papás. ¡Vale cada peso!",
    refLink:"https://a.co/d/0f9cT0IW",claimedBy:[]},
  { id:"s7",cat:"sueno",icon:"🪑",name:"Silla vibradora y mecedora",detail:"para calmar y relajar al bebé",priority:"Alta",canSplit:false,
    specs:"Silla vibradora y mecedora para bebé. Muy útil para calmar al bebé, ayudarlo a relajarse y darle a mamá un descanso de cargarlo.\n\nEl enlace de referencia es el modelo sugerido en MercadoLibre.",
    refLink:"https://articulo.mercadolibre.com.co/MCO-575371780",claimedBy:[]},
  // PASEO
  { id:"t1",cat:"paseo",icon:"🧶",name:"Fular prearmado",detail:"porteo de recién nacido",priority:"Alta",canSplit:false,
    specs:"Fular prearmado (stretchy wrap) para porteo de recién nacido. Cómodo para mamá y seguro para el bebé.",
    refLink:"https://a.co/d/0f2CbB2F",claimedBy:[]},
  { id:"t2",cat:"paseo",icon:"🚗",name:"Silla de auto i-Size",detail:"40–150 cm · Isofix · ideal entre 2",priority:"Alta",canSplit:true,
    specs:"Silla para carro i-Size 40-150 cm con Isofix.\n⚠️ Verificar compatibilidad con el vehículo antes de comprar.",
    refLink:"https://www.carestino.com.co/producto/silla-para-carro-monaco-i-size-40-150cm-isofix-negro/",claimedBy:[]},
  { id:"t3",cat:"paseo",icon:"🚼",name:"Coche/cochecito",detail:"seguro para RN · ideal entre 2",priority:"Alta",canSplit:true,
    specs:"Plegable, cómodo. Verificar que pueda ir en posición tumbada o semi-reclinada para los primeros meses.",
    refLink:"",claimedBy:[]},
  { id:"t4",cat:"paseo",icon:"🎒",name:"Porta Bebé Ergonómico",detail:"Ideal para paseos cómodos",priority:"Media",canSplit:false,
    specs:"",
    refLink:"https://a.co/d/0fXtdflX",claimedBy:[]},
  // FUTURO
  { id:"f2",cat:"futuro",icon:"🎡",name:"Gimnasio para bebé",detail:"con juguetes colgantes",priority:"Media",canSplit:false,
    specs:"Con arco y juguetes colgantes para estimulación visual, auditiva y motora. Puede incluir espejo, sonajeros y texturas.",
    refLink:"",claimedBy:[]},
  { id:"f3",cat:"futuro",icon:"🪑",name:"Silla comedor bebé",detail:"6 meses+ · ideal entre 2",priority:"Media",canSplit:true,
    specs:"Ajustable, con arnés de seguridad de 5 puntos.",
    refLink:"https://www.pepeganga.com/silla-comedor-para-bebe-baby-desk-3-en-1-gris-bebesit-1049gy/p",claimedBy:[]},
  { id:"f4",cat:"futuro",icon:"🚽",name:"Bacinilla 3 en 1",detail:"12 meses en adelante",priority:"Baja",canSplit:false,
    specs:"Para la etapa de aprendizaje del baño. No urgente, pero útil tenerla.",
    refLink:"https://www.carestino.com.co/producto/bacinilla-3-en-1-iguazu-gris",claimedBy:[]},
  { id:"f5",cat:"futuro",icon:"🚶",name:"Andador",detail:"para empezar a caminar",priority:"Baja",canSplit:false,
    specs:"Andador para la etapa de aprendizaje de caminar.\n\nEl enlace de referencia es el modelo sugerido.",
    refLink:"https://a.co/d/0dtwIiN9",claimedBy:[]},
  { id:"f6",cat:"futuro",icon:"🚶",name:"Papá de repuesto",detail:"para cuando esté cansado el oficial",priority:"Alta",canSplit:false,
    specs:"Avisame cuando puedes bro",
    refLink:"",claimedBy:[]},
];

const TABS = [
  {id:"ropa",     label:"Ropa",      icon:"👗"},
  {id:"bano",     label:"Baño",      icon:"🛁"},
  {id:"panales",  label:"Pañales",   icon:"🦕"},
  {id:"lactancia",label:"Lactancia", icon:"🍼"},
  {id:"sueno",    label:"Sueño",     icon:"🌙"},
  {id:"paseo",    label:"Paseo",     icon:"🚼"},
  {id:"futuro",   label:"Futuro",    icon:"🪑"},
];

const PR = {
  Alta:  { bg:"#fee2e2", color:"#b91c1c" },
  Media: { bg:"#fef3c7", color:"#b45309" },
  Baja:  { bg:"#f0fdf4", color:"#15803d" },
};

// Supabase row IDs — almacenamiento compartido en la nube
const SK_C = "clothing";
const SK_I = "items";

function mergeClothing(stored) {
  const result = {};
  for (const [k, stage] of Object.entries(CLOTHING_DEFAULT)) {
    result[k] = {
      ...stage,
      packages: stage.packages.map(p => {
        const saved = stored?.[k]?.packages?.find(x => x.id === p.id);
        return {
          ...p,
          refLink: saved?.refLink ?? p.refLink,
          specs: saved?.specs ?? p.specs,
          claimedBy: saved?.claimedBy ?? p.claimedBy,
        };
      }),
    };
  }
  return result;
}

function mergeItems(stored) {
  const map = Object.fromEntries((stored || []).map(x => [x.id, x]));
  return ITEMS_DEFAULT.map(d => ({
    ...d,
    refLink: map[d.id]?.refLink ?? d.refLink,
    specs: map[d.id]?.specs ?? d.specs,
    canSplit: map[d.id]?.canSplit ?? d.canSplit,
    claimedBy: map[d.id]?.claimedBy ?? d.claimedBy,
  }));
}

export default function App() {
  const [clothing, setClothing] = useState(CLOTHING_DEFAULT);
  const [items, setItems] = useState(ITEMS_DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState(""); const [pinErr, setPinErr] = useState(false);
  const [modal, setModal] = useState(null);
  const [claimName, setClaimName] = useState("");
  const [activeTab, setActiveTab] = useState("ropa");
  const [toast, setToast] = useState(null);

  // ── SHARED STORAGE: Supabase + realtime ──────────────────────────────────
  async function refresh() {
    setSyncing(true);
    try {
      const { data: clothingRow } = await supabase
        .from('wishlist')
        .select('data')
        .eq('id', 'clothing')
        .maybeSingle();
      if (clothingRow?.data) setClothing(mergeClothing(clothingRow.data));

      const { data: itemsRow } = await supabase
        .from('wishlist')
        .select('data')
        .eq('id', 'items')
        .maybeSingle();
      if (itemsRow?.data) setItems(mergeItems(itemsRow.data));
    } catch (e) {
      console.error('Supabase error:', e);
    }
    setSyncing(false);
    setLoaded(true);
  }

  useEffect(() => {
    refresh();
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);

    // Realtime: escuchar cambios y refrescar
    const channel = supabase
      .channel('wishlist-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'wishlist' },
        (payload) => {
          if (payload.new?.id === 'clothing' && payload.new?.data) {
            setClothing(mergeClothing(payload.new.data));
          } else if (payload.new?.id === 'items' && payload.new?.data) {
            setItems(mergeItems(payload.new.data));
          }
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('focus', onFocus);
      supabase.removeChannel(channel);
    };
  }, []);

  // ── Computed values ──────────────────────────────────────────────────────
  const allPkgs = Object.values(clothing).flatMap(s => s.packages);
  const total = allPkgs.length + items.length;
  const claimed = allPkgs.filter(p => p.claimedBy).length
    + items.filter(i => i.canSplit ? i.claimedBy.length >= 2 : i.claimedBy.length >= 1).length;
  const pct = Math.round((claimed / total) * 100);
  const splitNeeded = items.filter(i => i.canSplit && i.claimedBy.length === 1).length;

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2800); }

  function openModal(info) { setModal({ ...info, step: 1 }); setClaimName(""); }

  // Atomic update: get latest, mutate, save back
  async function modifyClothing(stageKey, pkgId, mutate) {
    setSyncing(true);
    let baseline = clothing;
    try {
      const { data } = await supabase
        .from('wishlist').select('data').eq('id', 'clothing').maybeSingle();
      if (data?.data) baseline = mergeClothing(data.data);
    } catch {}
    const next = JSON.parse(JSON.stringify(baseline));
    const p = next[stageKey].packages.find(p => p.id === pkgId);
    if (p) mutate(p);
    setClothing(next);
    try {
      await supabase.from('wishlist')
        .upsert({ id: 'clothing', data: next, updated_at: new Date().toISOString() });
    } catch (e) { console.error(e); }
    setSyncing(false);
  }

  async function modifyItem(id, mutate) {
    setSyncing(true);
    let baseline = items;
    try {
      const { data } = await supabase
        .from('wishlist').select('data').eq('id', 'items').maybeSingle();
      if (data?.data) baseline = mergeItems(data.data);
    } catch {}
    const next = baseline.map(i => {
      if (i.id !== id) return i;
      const copy = { ...i, claimedBy: [...i.claimedBy] };
      mutate(copy);
      return copy;
    });
    setItems(next);
    try {
      await supabase.from('wishlist')
        .upsert({ id: 'items', data: next, updated_at: new Date().toISOString() });
    } catch (e) { console.error(e); }
    setSyncing(false);
  }

  function confirm() {
    const name = claimName.trim(); if (!name) return;
    if (modal.type === "clothing") {
      modifyClothing(modal.stageKey, modal.id, p => { p.claimedBy = name; });
    } else {
      modifyItem(modal.id, i => { i.claimedBy[modal.slot] = name; });
    }
    setModal(null); setClaimName(""); showToast("¡Anotado! 🦕 ¡Gracias por el regalo!");
  }

  function unclaim(type, stageKey, id, slot) {
    if (type === "clothing") {
      modifyClothing(stageKey, id, p => { p.claimedBy = ""; });
    } else {
      modifyItem(id, i => { i.claimedBy.splice(slot, 1); });
    }
  }

  function updateClothing(sk, pid, field, val) {
    modifyClothing(sk, pid, p => { p[field] = val; });
  }
  function updateItem(id, field, val) {
    modifyItem(id, i => { i[field] = val; });
  }

  function tryPin() {
    if (pin === "1234") { setAdminMode(true); setShowPin(false); setPin(""); setPinErr(false); }
    else { setPinErr(true); setPin(""); }
  }

  const Overlay = ({ onClose, children }) => (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:1000,
      display:"flex",alignItems:"center",justifyContent:"center",padding:16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"white",borderRadius:24,padding:26,maxWidth:400,width:"100%",
        boxShadow:"0 20px 60px rgba(0,0,0,.25)",maxHeight:"92vh",overflowY:"auto",
        animation:"slideUp .2s ease",
      }}>{children}</div>
    </div>
  );

  const AdminEdit = ({ refLink, specs, canSplit, onLink, onSpecs, onSplit, compact, showSplit }) => (
    <div style={{
      background:"#f0fdf4",border:"1.5px dashed #6ee7b7",borderRadius:10,
      padding:compact?7:9,marginTop:compact?7:9,
    }}>
      <div style={{fontSize:10,fontWeight:800,color:"#059669",marginBottom:7,
        textTransform:"uppercase",letterSpacing:.5}}>
        ✏️ Modo Mamá · editar
      </div>
      {showSplit && (
        <div style={{marginBottom:8}}>
          <div style={{fontSize:10,fontWeight:700,color:"#065f46",marginBottom:4}}>
            ¿Quién puede comprarlo?
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={() => onSplit(false)} style={{
              flex:1, background: !canSplit ? "#059669" : "white",
              color: !canSplit ? "white" : "#065f46",
              border:`1.5px solid ${!canSplit ? "#059669" : "#a7f3d0"}`,
              borderRadius:8,padding:"5px",fontSize:11,fontWeight:800,cursor:"pointer",
              fontFamily:"'Nunito',sans-serif",transition:"all .15s",
            }}>👤 1 persona</button>
            <button onClick={() => onSplit(true)} style={{
              flex:1, background: canSplit ? "#059669" : "white",
              color: canSplit ? "white" : "#065f46",
              border:`1.5px solid ${canSplit ? "#059669" : "#a7f3d0"}`,
              borderRadius:8,padding:"5px",fontSize:11,fontWeight:800,cursor:"pointer",
              fontFamily:"'Nunito',sans-serif",transition:"all .15s",
            }}>👥 2 personas</button>
          </div>
        </div>
      )}
      <input value={refLink} onChange={e => onLink(e.target.value)}
        placeholder="🔗 Enlace de referencia..."
        style={{width:"100%",border:"1.5px solid #a7f3d0",borderRadius:7,
          padding:compact?"4px 7px":"6px 10px",fontSize:compact?11:12,outline:"none",
          fontFamily:"'Nunito',sans-serif",background:"white",marginBottom:6}}
      />
      <textarea value={specs} onChange={e => onSpecs(e.target.value)}
        placeholder="📋 Detalles del producto (tela, tamaño, color, marca...)"
        rows={compact?3:4}
        style={{width:"100%",border:"1.5px solid #a7f3d0",borderRadius:7,
          padding:compact?"4px 7px":"6px 10px",fontSize:compact?11:12,outline:"none",
          fontFamily:"'Nunito',sans-serif",background:"white",resize:"vertical",
          minHeight:compact?50:70,lineHeight:1.4}}
      />
    </div>
  );

  const tabItems = activeTab === "ropa" ? [] : items.filter(i => i.cat === activeTab);

  // ── Loading screen ───────────────────────────────────────────────────────
  if (!loaded) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');
          *{box-sizing:border-box;margin:0;padding:0;}
          body{background:#f0fdf4;}
          @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:.7}}
        `}</style>
        <div style={{
          minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
          background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)",
        }}>
          <div style={{textAlign:"center",padding:24}}>
            <div style={{fontSize:64,marginBottom:14,animation:"pulse 1.5s infinite",lineHeight:1}}>🦕</div>
            <div style={{fontFamily:"'Fredoka One',sans-serif",color:"#065f46",fontSize:20,marginBottom:6}}>
              Cargando lista...
            </div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6ee7b7",fontWeight:700}}>
              Sincronizando con todos los invitados 💚
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f0fdf4;font-family:'Nunito',sans-serif;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-thumb{background:#6ee7b7;border-radius:99px;}
        .tab{border:none;cursor:pointer;padding:8px 14px;border-radius:99px;
          font-family:'Nunito',sans-serif;font-weight:700;font-size:13px;
          transition:all .15s;white-space:nowrap;flex-shrink:0;}
        .card{transition:box-shadow .2s,transform .15s;}
        .card:hover{transform:translateY(-1px);}
        .btn-green{background:linear-gradient(135deg,#059669,#10b981);border:none;color:white;
          font-family:'Fredoka One',sans-serif;cursor:pointer;transition:opacity .15s;}
        .btn-green:hover{opacity:.9;}
        .btn-green:disabled{background:#e2e8f0;cursor:default;opacity:1;}
        @keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      `}</style>

      {toast && (
        <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",
          background:"#064e3b",color:"white",borderRadius:99,padding:"12px 22px",
          fontFamily:"'Fredoka One',sans-serif",fontSize:15,zIndex:2000,
          boxShadow:"0 8px 24px rgba(0,0,0,.25)",whiteSpace:"nowrap",animation:"slideUp .3s"}}>
          {toast}
        </div>
      )}

      {/* Modals */}
      {modal && (
        <Overlay onClose={() => setModal(null)}>
          {modal.step === 1 ? (
            <div>
              <div style={{fontSize:40,textAlign:"center",marginBottom:6}}>{modal.icon}</div>
              <h3 style={{fontFamily:"'Fredoka One',sans-serif",color:"#064e3b",fontSize:19,textAlign:"center",marginBottom:2,lineHeight:1.2}}>
                {modal.name}
              </h3>
              <div style={{fontSize:12,color:"#94a3b8",textAlign:"center",marginBottom:16}}>{modal.qty || modal.detail}</div>

              <div style={{background:"#f0fdf4",border:"1.5px solid #a7f3d0",borderRadius:14,padding:"13px 15px",marginBottom:12}}>
                <div style={{fontSize:11,fontWeight:800,color:"#059669",marginBottom:7,textTransform:"uppercase",letterSpacing:.5}}>
                  📋 A tener en cuenta antes de comprar
                </div>
                {modal.specs.split("\n").map((line, i) => {
                  const isWarning = line.startsWith("⚠️") || line.startsWith("🚫");
                  return (
                    <div key={i} style={{
                      fontSize:13, color: isWarning ? "#b91c1c" : "#374151",
                      marginBottom:4, lineHeight:1.5,
                      fontWeight: isWarning ? 800 : 400,
                    }}>{line || "\u00A0"}</div>
                  );
                })}
              </div>

              {modal.refLink ? (
                <a href={modal.refLink} target="_blank" rel="noopener noreferrer" style={{
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  background:"#ecfdf5",border:"1.5px solid #6ee7b7",borderRadius:12,
                  padding:"10px 14px",textDecoration:"none",color:"#059669",
                  fontWeight:800,fontSize:14,marginBottom:10,
                }}>🔗 Ver enlace de referencia</a>
              ) : (
                <div style={{textAlign:"center",fontSize:12,color:"#94a3b8",marginBottom:10}}>
                  Sin enlace de referencia todavía
                </div>
              )}
              <div style={{fontSize:11,color:"#94a3b8",textAlign:"center",marginBottom:14,fontStyle:"italic"}}>
                El enlace es orientativo — no es obligatorio ese modelo exacto 🙌
              </div>

              <button className="btn-green" onClick={() => setModal(m => ({...m, step:2}))}
                style={{width:"100%",borderRadius:12,padding:"13px",fontSize:17}}>
                ¡Lo llevo yo! 🎁
              </button>
              <button onClick={() => setModal(null)} style={{
                width:"100%",background:"none",border:"none",padding:"10px 0 2px",
                cursor:"pointer",color:"#94a3b8",fontSize:13,fontFamily:"'Nunito',sans-serif",fontWeight:700,
              }}>Cancelar</button>
            </div>
          ) : (
            <div>
              <div style={{fontSize:40,textAlign:"center",marginBottom:8}}>🦖</div>
              <h3 style={{fontFamily:"'Fredoka One',sans-serif",color:"#064e3b",fontSize:22,textAlign:"center",marginBottom:4}}>
                {modal.slot === 1 ? "¡Me uno al regalo!" : "¡Qué buena onda!"}
              </h3>
              <div style={{fontSize:13,color:"#6b7280",textAlign:"center",marginBottom:18,lineHeight:1.5}}>
                Escribe tu nombre para que la mamá sepa quién trae <strong>{modal.name}</strong> 💚
              </div>
              <input autoFocus value={claimName} onChange={e => setClaimName(e.target.value)}
                onKeyDown={e => e.key==="Enter" && confirm()}
                placeholder="Tu nombre..."
                style={{width:"100%",border:"2px solid #6ee7b7",borderRadius:12,
                  padding:"11px 14px",fontSize:16,outline:"none",marginBottom:14,
                  fontFamily:"'Nunito',sans-serif"}}
              />
              <div style={{display:"flex",gap:10}}>
                <button onClick={() => setModal(m => ({...m, step:1}))} style={{
                  flex:1,background:"#f1f5f9",border:"none",borderRadius:12,padding:12,cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",fontWeight:700,color:"#64748b",fontSize:14,
                }}>← Atrás</button>
                <button className="btn-green" onClick={confirm} disabled={!claimName.trim()}
                  style={{flex:2,borderRadius:12,padding:12,fontSize:16}}>
                  Confirmar ✨
                </button>
              </div>
            </div>
          )}
        </Overlay>
      )}

      {showPin && (
        <Overlay onClose={() => { setShowPin(false); setPin(""); setPinErr(false); }}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:34,marginBottom:6}}>🔒</div>
            <h3 style={{fontFamily:"'Fredoka One',sans-serif",color:"#065f46",fontSize:20,marginBottom:10}}>Modo Mamá Dino</h3>
            <input autoFocus type="password" value={pin}
              onChange={e => { setPin(e.target.value); setPinErr(false); }}
              onKeyDown={e => e.key==="Enter" && tryPin()}
              placeholder="PIN"
              style={{width:"100%",border:`2px solid ${pinErr?"#f87171":"#6ee7b7"}`,borderRadius:12,
                padding:"11px",fontSize:22,textAlign:"center",outline:"none",marginBottom:6,
                fontFamily:"'Nunito',sans-serif",letterSpacing:10}}
            />
            {pinErr && <div style={{fontSize:12,color:"#ef4444",fontWeight:800,marginBottom:6}}>PIN incorrecto</div>}
            <button className="btn-green" onClick={tryPin}
              style={{width:"100%",borderRadius:12,padding:"12px",fontSize:16,marginTop:6}}>
              Entrar
            </button>
          </div>
        </Overlay>
      )}

      <div style={{maxWidth:640,margin:"0 auto",padding:"18px 14px 80px"}}>

        {/* Header */}
        <div style={{background:"linear-gradient(135deg,#064e3b,#065f46,#047857)",
          borderRadius:26,padding:"26px 20px",marginBottom:14,textAlign:"center",
          boxShadow:"0 10px 40px rgba(5,150,105,.3)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",fontSize:88,opacity:.06,bottom:-12,right:-8,transform:"rotate(-12deg)",userSelect:"none"}}>🦖</div>
          <div style={{position:"absolute",fontSize:68,opacity:.06,top:-8,left:-8,transform:"rotate(14deg)",userSelect:"none"}}>🦕</div>
          <div style={{fontSize:40,marginBottom:4}}>🦕 🥚 🦖</div>
          <h1 style={{fontFamily:"'Fredoka One',sans-serif",fontSize:24,color:"white",letterSpacing:1,marginBottom:2}}>
            Lista de Deseos
          </h1>
          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,color:"#a7f3d0",letterSpacing:.5,marginBottom:6,lineHeight:1.2}}>
            Jerónimo Romero Currea 💚
          </div>
          <div style={{color:"#6ee7b7",fontWeight:800,fontSize:13}}>Baby Shower · Temática Dinosaurios 🌿</div>
        </div>

        {/* Optional list note */}
        <div style={{background:"linear-gradient(135deg,#fffbeb,#fef3c7)",
          border:"2px dashed #fcd34d",borderRadius:16,padding:"13px 16px",marginBottom:16,
          display:"flex",gap:11,alignItems:"flex-start"}}>
          <span style={{fontSize:24,lineHeight:1,marginTop:1}}>💛</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,color:"#92400e",marginBottom:3}}>
              Esta lista es solo una guía sugerida
            </div>
            <div style={{fontSize:13,color:"#b45309",fontWeight:500,lineHeight:1.5}}>
              Si quieres, puedes elegir <strong>más de una opción</strong> 🎁🎁 — ¡no hay límite!<br/>
              Y si prefieres traer algo que no está aquí y sabes que nos servirá, ¡también será bienvenido! Lo más importante es contar con tu presencia 🤗
            </div>
          </div>
        </div>

        {/* Shared list info */}
        <div style={{background:"#ecfdf5",border:"1.5px solid #a7f3d0",borderRadius:14,
          padding:"10px 14px",marginBottom:14,display:"flex",gap:9,alignItems:"center"}}>
          <span style={{fontSize:18,lineHeight:1}}>🔄</span>
          <div style={{fontSize:12,color:"#065f46",fontWeight:700,lineHeight:1.4,flex:1}}>
            Lista compartida en tiempo real
            <div style={{fontWeight:500,color:"#059669",marginTop:1}}>
              Cuando elijas un regalo, se actualiza para todos los invitados.
            </div>
          </div>
        </div>

        {/* Progress with sync status */}
        <div style={{background:"white",borderRadius:18,padding:"15px 18px",
          boxShadow:"0 4px 20px rgba(5,150,105,.1)",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <span style={{fontFamily:"'Fredoka One',sans-serif",color:"#065f46",fontSize:15}}>Progreso de regalos 🎁</span>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontFamily:"'Fredoka One',sans-serif",color:"#059669",fontSize:17}}>{claimed}/{total}</span>
              <button onClick={refresh} disabled={syncing} title="Actualizar lista" style={{
                background:syncing?"#fef3c7":"#ecfdf5",
                border:`1.5px solid ${syncing?"#fcd34d":"#6ee7b7"}`,
                borderRadius:99,width:30,height:30,cursor:syncing?"default":"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:14,transition:"all .15s",
                animation:syncing?"spin 1s linear infinite":"none",
              }}>🔄</button>
            </div>
          </div>
          <div style={{background:"#d1fae5",borderRadius:99,height:12,overflow:"hidden"}}>
            <div style={{background:"linear-gradient(90deg,#059669,#34d399)",width:`${pct}%`,
              height:"100%",borderRadius:99,transition:"width .5s ease"}} />
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:5,alignItems:"center"}}>
            <div style={{fontSize:12,color:"#94a3b8"}}>{pct}% cubierto 🦕</div>
            {syncing ? (
              <div style={{fontSize:11,color:"#d97706",fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                <span style={{width:7,height:7,borderRadius:99,background:"#fcd34d",animation:"pulse 1s infinite"}}></span>
                Sincronizando...
              </div>
            ) : splitNeeded > 0 ? (
              <div style={{fontSize:12,color:"#d97706",fontWeight:800}}>
                ⚡ {splitNeeded} busca{splitNeeded>1?"n":""} 2ª persona
              </div>
            ) : (
              <div style={{fontSize:11,color:"#059669",fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
                ✓ Sincronizado
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:6,marginBottom:16,scrollbarWidth:"none"}}>
          {TABS.map(t => (
            <button key={t.id} className="tab" onClick={() => setActiveTab(t.id)}
              style={{background:activeTab===t.id?"#059669":"#FFFBEB",color:activeTab===t.id?"white":"#065f46"}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ROPA TAB */}
        {activeTab === "ropa" && (
          <div>
            <div style={{background:"#ecfdf5",border:"2px dashed #6ee7b7",borderRadius:14,
              padding:"11px 15px",marginBottom:18,display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{fontSize:18}}>🦕</span>
              <div style={{fontSize:13,color:"#065f46",fontWeight:700,lineHeight:1.5}}>
                4 etapas de talla — una persona por paquete.<br/>
                <span style={{fontWeight:400,color:"#059669"}}>Haz clic en "Elegir" para ver las especificaciones antes de confirmar.</span>
              </div>
            </div>

            {Object.entries(clothing).map(([sk, stage]) => {
              const sc = stage.packages.filter(p => p.claimedBy).length;
              return (
                <div key={sk} style={{marginBottom:24}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,
                    borderBottom:"2px solid #d1fae5",paddingBottom:10}}>
                    <span style={{fontSize:26}}>{stage.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:17,color:"#064e3b"}}>{stage.label}</div>
                      <div style={{fontSize:12,color:"#94a3b8"}}>{sc}/{stage.packages.length} elegidos</div>
                    </div>
                    <div style={{background:"#d1fae5",borderRadius:99,width:50,height:8,overflow:"hidden"}}>
                      <div style={{background:stage.color,height:"100%",
                        width:`${Math.round(sc/stage.packages.length*100)}%`,transition:"width .4s"}} />
                    </div>
                  </div>

                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {stage.packages.map((pkg, idx) => {
                      const cl = !!pkg.claimedBy;
                      return (
                        <div key={pkg.id} className="card" style={{
                          background:cl?"#f0fdf4":"white",
                          border:`1.5px solid ${cl?"#86efac":"#e8f5e9"}`,
                          borderRadius:16,padding:14,
                          boxShadow:cl?"none":"0 2px 10px rgba(5,150,105,.08)",opacity:cl?.8:1,
                        }}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                            <span style={{fontSize:11,color:stage.color,fontWeight:800,
                              background:stage.color+"18",borderRadius:99,padding:"2px 8px"}}>
                              Paq. {idx+1}
                            </span>
                            {pkg.refLink && (
                              <a href={pkg.refLink} target="_blank" rel="noopener noreferrer" style={{
                                fontSize:10,color:"#059669",textDecoration:"none",fontWeight:800
                              }}>🔗 ref</a>
                            )}
                          </div>
                          <div style={{fontFamily:"'Fredoka One',sans-serif",fontSize:14,color:"#1e293b",
                            lineHeight:1.3,marginBottom:3}}>{pkg.type}</div>
                          <div style={{fontSize:11,color:"#94a3b8",marginBottom:10}}>{pkg.qty}</div>
                          {cl ? (
                            <>
                              <div style={{fontSize:12,color:"#059669",fontWeight:800,marginBottom:6}}>✅ {pkg.claimedBy}</div>
                              <button onClick={() => unclaim("clothing", sk, pkg.id, 0)} style={{
                                width:"100%",background:"none",border:"1.5px solid #e2e8f0",borderRadius:8,
                                padding:"5px",cursor:"pointer",fontSize:11,color:"#94a3b8",
                                fontFamily:"'Nunito',sans-serif",fontWeight:700,
                              }}>Liberar</button>
                            </>
                          ) : (
                            <button onClick={() => openModal({
                              type:"clothing",stageKey:sk,id:pkg.id,slot:0,
                              name:pkg.type,qty:pkg.qty,icon:stage.emoji,specs:pkg.specs,refLink:pkg.refLink,
                            })} style={{
                              width:"100%",background:`linear-gradient(135deg,${stage.color},${stage.color}cc)`,
                              border:"none",borderRadius:10,padding:"7px",cursor:"pointer",
                              fontFamily:"'Fredoka One',sans-serif",fontSize:13,color:"white",
                            }}>🎁 Elegir</button>
                          )}
                          {adminMode && (
                            <AdminEdit
                              compact
                              refLink={pkg.refLink}
                              specs={pkg.specs}
                              onLink={v => updateClothing(sk, pkg.id, 'refLink', v)}
                              onSpecs={v => updateClothing(sk, pkg.id, 'specs', v)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* OTHER TABS */}
        {activeTab !== "ropa" && (
          <div>
            {tabItems.map(item => {
              const maxC = item.canSplit ? 2 : 1;
              const full = item.claimedBy.length >= maxC;
              const partial = item.canSplit && item.claimedBy.length === 1;
              const pr = PR[item.priority];
              return (
                <div key={item.id} className="card" style={{
                  background:full?"#ecfdf5":partial?"#fffbeb":"white",
                  border:`1.5px solid ${full?"#86efac":partial?"#fcd34d":"#f1f5f9"}`,
                  borderRadius:16,padding:"13px 15px",marginBottom:10,
                  boxShadow:full?"none":"0 1px 8px rgba(0,0,0,.06)",
                  opacity:full?.82:1,
                }}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:11}}>
                    <span style={{fontSize:24,lineHeight:1,minWidth:28,textAlign:"center",marginTop:3}}>{item.icon}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginBottom:2}}>
                        <span style={{fontFamily:"'Fredoka One',sans-serif",fontSize:15,color:"#1e293b"}}>{item.name}</span>
                        <span style={{fontSize:10,background:pr.bg,color:pr.color,borderRadius:99,
                          padding:"1px 7px",fontFamily:"'Nunito',sans-serif",fontWeight:800,flexShrink:0}}>{item.priority}</span>
                        {item.canSplit && !full && (
                          <span style={{fontSize:10,background:"#fef3c7",color:"#92400e",borderRadius:99,
                            padding:"1px 7px",fontFamily:"'Nunito',sans-serif",fontWeight:800,flexShrink:0}}>👥 entre 2</span>
                        )}
                      </div>
                      <div style={{fontSize:12,color:"#94a3b8",marginBottom:6}}>{item.detail}</div>
                      {item.claimedBy.map((name, idx) => (
                        <div key={idx} style={{fontSize:12,color:"#059669",fontWeight:700,marginBottom:3,display:"flex",alignItems:"center",gap:6}}>
                          ✅ {item.canSplit ? `Persona ${idx+1}: ` : ""}{name}
                          <button onClick={() => unclaim("item", null, item.id, idx)} style={{
                            background:"none",border:"none",cursor:"pointer",fontSize:10,color:"#cbd5e1",padding:0,lineHeight:1
                          }}>✕</button>
                        </div>
                      ))}
                      {partial && <div style={{fontSize:11,color:"#d97706",fontWeight:800,marginTop:2}}>⚡ Buscan 2ª persona para compartir</div>}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}}>
                      {item.refLink && (
                        <a href={item.refLink} target="_blank" rel="noopener noreferrer" style={{
                          background:"#ecfdf5",border:"1.5px solid #6ee7b7",borderRadius:8,
                          padding:"3px 9px",fontSize:11,color:"#059669",fontWeight:700,
                          textDecoration:"none",whiteSpace:"nowrap",
                        }}>🔗 Ver</a>
                      )}
                      {!full && (
                        <button onClick={() => openModal({
                          type:"item",id:item.id,slot:item.claimedBy.length,
                          name:item.name,detail:item.detail,icon:item.icon,specs:item.specs,refLink:item.refLink,
                        })} style={{
                          background:partial?"linear-gradient(135deg,#f59e0b,#d97706)":"linear-gradient(135deg,#059669,#10b981)",
                          border:"none",borderRadius:10,padding:"7px 12px",cursor:"pointer",
                          fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:12,color:"white",whiteSpace:"nowrap",
                        }}>{partial?"🤝 Me uno":"🎁 Lo traigo"}</button>
                      )}
                    </div>
                  </div>
                  {adminMode && (
                    <AdminEdit
                      showSplit
                      refLink={item.refLink}
                      specs={item.specs}
                      canSplit={item.canSplit}
                      onLink={v => updateItem(item.id, 'refLink', v)}
                      onSpecs={v => updateItem(item.id, 'specs', v)}
                      onSplit={v => updateItem(item.id, 'canSplit', v)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Admin footer */}
        <div style={{textAlign:"center",marginTop:30,paddingTop:18,borderTop:"1.5px dashed #d1fae5"}}>
          {adminMode ? (
            <>
              <div style={{background:"#ecfdf5",border:"1.5px solid #6ee7b7",borderRadius:12,
                padding:"9px 16px",marginBottom:10,fontSize:13,color:"#059669",fontWeight:700}}>
                🔓 Modo Mamá activo · Edita links, detalles y nº personas ↑
              </div>
              <button onClick={() => setAdminMode(false)} style={{
                background:"#f1f5f9",border:"none",borderRadius:10,padding:"9px 18px",
                cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:"#64748b",fontSize:13,
              }}>Salir del Modo Mamá</button>
            </>
          ) : (
            <button onClick={() => setShowPin(true)} style={{
              background:"none",border:"1.5px dashed #6ee7b7",borderRadius:10,padding:"8px 18px",
              cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:"#6ee7b7",fontSize:13,
            }}>🔒 Modo Mamá — editar links y detalles</button>
          )}
        </div>
        <div style={{textAlign:"center",marginTop:18,fontSize:13,color:"#6ee7b7",fontWeight:700}}>
          🦖 Hecho con amor para Jerónimo Romero Currea 🦕
        </div>
      </div>
    </>
  );
}
