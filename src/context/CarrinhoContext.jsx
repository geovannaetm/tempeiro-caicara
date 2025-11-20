"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [cartId, setCartId] = useState(null);

  // Carrega carrinho ao montar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    (async () => {
      try {
        const cartRes = await fetch("http://localhost:3333/api/cart/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cart = await cartRes.json();

        const id = cart.id || cart.id_cart;
        if (!id) return;
        setCartId(id);

        const itemsRes = await fetch(`http://localhost:3333/api/cart/${id}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const rawItems = await itemsRes.json();

        const mapped = Array.isArray(rawItems)
          ? rawItems.map((row) => ({
              id: row.pratos_id,
              quantidade: Number(row.quantidade),
              preco: Number(row.pratos?.preco) || 0,
              nome: row.pratos?.nome || "Sem nome",
              imagem: row.pratos?.imagem || "/logo.png",
            }))
          : [];

        setItens(mapped);
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
        setItens([]);
      }
    })();
  }, []);

  // Adicionar item
  const adicionarItem = async (produto) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para adicionar produtos ao carrinho.");
      return;
    }
    if (!cartId) return;

    await fetch(`http://localhost:3333/api/cart/${cartId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pratos_id: produto.id, quantidade: 1 }),
    });

    // Refetch para evitar duplicação
    const itemsRes = await fetch(`http://localhost:3333/api/cart/${cartId}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const rawItems = await itemsRes.json();
    const mapped = rawItems.map((row) => ({
      id: row.pratos_id,
      quantidade: Number(row.quantidade),
      preco: Number(row.pratos?.preco) || 0,
      nome: row.pratos?.nome || "Sem nome",
      imagem: row.pratos?.imagem || "/logo.png",
    }));
    setItens(mapped);
  };

  // Remover item
  const removerItem = async (pratosId) => {
    const token = localStorage.getItem("token");
    if (!token || !cartId) return;

    await fetch(`http://localhost:3333/api/cart/${cartId}/items/${pratosId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setItens((prev) => prev.filter((item) => item.id !== pratosId));
  };

  // Atualizar quantidade
  const atualizarQuantidade = async (pratosId, quantidade) => {
    const token = localStorage.getItem("token");
    if (!token || !cartId) return;

    const qtd = Number(quantidade);
    if (qtd <= 0) return removerItem(pratosId);

    await fetch(`http://localhost:3333/api/cart/${cartId}/items/${pratosId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantidade: qtd }),
    });

    setItens((prev) =>
      prev.map((item) =>
        item.id === pratosId ? { ...item, quantidade: qtd } : item
      )
    );
  };

  // Limpar carrinho (usado no logout)
  const limparCarrinho = () => {
    setItens([]);
    setCartId(null);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        cartId,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);
