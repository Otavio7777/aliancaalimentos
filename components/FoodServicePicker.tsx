"use client";

import { useState } from "react";
import { produtoPorId } from "@/data/catalogo";
import { ProductCard } from "./ProductCard";

const usos = [
  {
    id: "cozinha",
    titulo: "Cozinha e prato do dia",
    texto: "Pacote de 800g para quem finaliza muitos pratos por dia. Menos troca de embalagem na bancada.",
    itens: ["foodservice-tradicional-800g", "palha-tradicional-300g", "palha-extrafina-300g"],
  },
  {
    id: "delivery",
    titulo: "Delivery e porcionamento",
    texto: "Sachê individual de 12g: a porção já vai pronta na sacola, sem pesar nem abrir pacote grande.",
    itens: ["foodservice-sache-12g"],
  },
  {
    id: "lanches",
    titulo: "Lanches na chapa",
    texto: "Batata palha por cima do cachorro-quente e do sanduíche: 800g na cozinha, sachê para viagem.",
    itens: ["foodservice-tradicional-800g", "foodservice-sache-12g"],
  },
  {
    id: "balcao",
    titulo: "Balcão e bar",
    texto: "Pacotes prontos para a mesa e a vitrine do balcão, sem preparo.",
    itens: ["petisco-bacon-100g", "petisco-pimenta-100g", "krisps-original-45g", "lisa-original-150g"],
  },
];

export function FoodServicePicker() {
  const [i, setI] = useState(0);
  const u = usos[i];
  return (
    <div>
      <div role="tablist" aria-label="Como você vai usar" className="flex flex-wrap gap-2">
        {usos.map((x, k) => (
          <button
            key={x.id}
            id={`uso-${x.id}`}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-controls="uso-painel"
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const n = (k + (e.key === "ArrowRight" ? 1 : usos.length - 1)) % usos.length;
              setI(n);
              document.getElementById(`uso-${usos[n].id}`)?.focus();
            }}
            className="rounded-full border-[3px] border-ink bg-white px-4 py-2 font-extrabold aria-selected:bg-ink aria-selected:text-white"
          >
            {x.titulo}
          </button>
        ))}
      </div>
      <div id="uso-painel" role="tabpanel" aria-labelledby={`uso-${u.id}`} className="mt-6">
        <p className="max-w-2xl text-lg">{u.texto}</p>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {u.itens.map((id) => (
            <li key={id}>
              <ProductCard p={produtoPorId(id)!} mostrarLinha />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
