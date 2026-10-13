import { linkWhatsApp } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener"
      className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full border-[3px] border-ink bg-[#25D366] shadow-[4px_4px_0_#141010] transition-transform hover:-translate-y-0.5"
      aria-label="Falar com o comercial no WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" fill="#fff">
        <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.7C5.1 10 10 5.3 16 5.3S26.9 10 26.9 15.8 22 26.4 16 26.4zm5.9-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-4.3-3.7c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7c0 1.6 1.2 3.1 1.3 3.3s2.3 3.5 5.6 4.9c2.1.9 2.9 1 3.9.8.6-.1 1.9-.8 2.2-1.5s.3-1.4.2-1.5-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}
