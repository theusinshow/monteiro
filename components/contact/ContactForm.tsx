"use client";

import { useState } from "react";
import { Field, TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Minimal contact form. With no backend yet, it composes the message into a
 * direct WhatsApp conversation — the studio's primary conversion path.
 * Swap for a server action / email service when infra is decided.
 */
export function ContactForm() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.currentTarget);
    const text = [
      `Olá, Estúdio Monteiro.`,
      `Nome: ${data.get("nome")}`,
      `Contato: ${data.get("contato")}`,
      ``,
      `${data.get("mensagem")}`,
    ].join("\n");

    const base = site.whatsappUrl.split("?")[0];
    window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank");
    setSending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Field label="Nome" name="nome" autoComplete="name" required />
        <Field
          label="E-mail ou telefone"
          name="contato"
          autoComplete="email"
          required
        />
      </div>
      <TextField
        label="Sobre o projeto"
        name="mensagem"
        rows={5}
        placeholder="Conte um pouco sobre o que você imagina."
        required
      />
      <Button type="submit" variant="solid" disabled={sending}>
        Enviar mensagem
      </Button>
    </form>
  );
}
