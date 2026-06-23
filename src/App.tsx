import bgImage from "@/assets/img/bg7.jpg";
import Game from "./views/Game"

function App() {

  return (
    <div className="relative min-h-screen">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Conteúdo */}
      <main className="relative min-h-screen z-10">
        <section className="mx-auto flex max-w-4xl flex-col gap-8 p-8">
          <Game />
        </section>
      </main>

    </div>
  )
}

export default App
