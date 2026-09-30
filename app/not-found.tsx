import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-script text-4xl text-red">Ops!</p>
      <h1 className="mt-3 font-serif text-5xl">Página não encontrada</h1>
      <p className="mt-4 text-lg text-ink/75">O link pode ter mudado. Que tal ver os nossos produtos?</p>
      <ButtonLink href="/produtos" className="mt-8">
        Ver produtos
      </ButtonLink>
    </Container>
  );
}
