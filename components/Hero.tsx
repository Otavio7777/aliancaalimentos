import { Parallax } from "./Motion";
import { PackShot } from "./PackShot";
import { ButtonLink, Container } from "./ui";
import { produtos } from "@/data/products";

const byId = (id: string) => produtos.find((p) => p.id === id)!;

export function Hero() {
  return (
    <section
      data-theme="#C8102E"
      data-theme-ink="#FFFFFF"
      className="juta relative isolate overflow-hidden bg-red text-white"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-red-deep/60 blur-2xl"
      />
      <Container className="grid items-center gap-8 pb-0 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:py-24">
        <div>
          <p className="font-condensed text-sm uppercase tracking-[0.25em] text-juta">Aliança Alimentos</p>
          <h1 id="hero-title" className="mt-4">
            <span className="block font-script text-6xl leading-[1.15] text-gold-light drop-shadow-[0_3px_0_rgba(0,0,0,.25)] sm:text-7xl lg:text-8xl">
              Batata Palha
            </span>
            <span className="mt-2 block font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              crocante do primeiro ao último fio.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
            Batata palha, batata ondulada e salgadinho de trigo para a gôndola, o atacado e a cozinha profissional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/produtos" variant="gold">
              Ver produtos
            </ButtonLink>
            <ButtonLink href="/revenda" variant="outline-light">
              Quero vender Aliança
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[28rem] lg:h-[34rem]">
          <Parallax distance={30} rotateFrom={-12} className="absolute left-0 top-10 w-[46%] opacity-95">
            <PackShot produto={byId("bp-extrafina-100g")} sizes="25vw" />
          </Parallax>
          <Parallax distance={30} rotateFrom={12} className="absolute right-0 top-12 w-[46%] opacity-95">
            <PackShot produto={byId("bp-temperada-100g")} sizes="25vw" />
          </Parallax>
          <Parallax distance={90} rotateFrom={-4} rotateTo={4} className="absolute left-[19%] top-0 w-[62%]">
            <PackShot produto={byId("bp-tradicional-100g")} priority sizes="40vw" />
          </Parallax>
        </div>
      </Container>
      <div className="relative h-10 bg-gold sm:h-12" aria-hidden="true">
        <div className="flex h-full items-center overflow-hidden whitespace-nowrap font-condensed text-lg tracking-widest text-ink sm:text-xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-6">
              BATATA PALHA · CHIPS LISA · KRISP&apos;S · CHECKMATE · FOOD SERVICE ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
