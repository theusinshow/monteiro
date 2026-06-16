"use client";

import { useState } from "react";
import { Field, TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Minimal contact form. With no backend yet, it composes the message into a
 * direct WhatsApp conversation — the studio's primary conversion path. The
 * status line confirms the hand-off and surfaces a manual link if the browser
 * blocks the new tab, so the action never fails silently.
 * Swap for a server action / email service when infra is decided.
 */
type Status = "idle" | "opened" | "blocked";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [waUrl, setWaUrl] = useState<string>(site.whatsappUrl);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      `Olá, Estúdio Monteiro.`,
      `Nome: ${data.get("nome")}`,
      `Contato: ${data.get("contato")}`,
      ``,
      `${data.get("mensagem")}`,
    ].join("\n");

    const url = `${site.whatsappUrl.split("?")[0]}?text=${encodeURIComponent(text)}`;
    setWaUrl(url);

    const win = window.open(url, "_blank", "noopener,noreferrer");
    // A blocked popup returns null — fall back to an explicit link instead of
    // leaving the user with no feedback.
    setStatus(win ? "opened" : "blocked");
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
      <Button type="submit" variant="solid" block>
        Enviar mensagem
      </Button>

      {/* Always present so screen readers announce status changes in place. */}
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-graphite">
        {status === "opened" && (
          <>
            Abrimos o WhatsApp com a sua mensagem. Não abriu?{" "}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ink"
            >
              Abrir manualmente
            </a>
            .
          </>
        )}
        {status === "blocked" && (
          <>
            O navegador bloqueou a nova aba.{" "}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ink"
            >
              Toque para abrir o WhatsApp
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
