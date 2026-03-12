import FakeCard from "./FakeCard";

export default function HeroVisual() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/20 blur-[80px] pointer-events-none z-0 dark:bg-primary/10" />

      <div className="relative flex items-center justify-center w-full max-w-md">  
        <div className="absolute -rotate-14 -translate-x-16 md:-translate-x-20 z-10 opacity-40">
          <FakeCard content="Sloboda" example="Sloboda je dar." />
        </div>

        <div className="absolute rotate-12 z-20 translate-x-16 md:translate-x-20 opacity-60">
          <FakeCard content="Učiť sa" example="Učím sa po slovensky." />
        </div>

        <div className="relative -rotate-[4deg] md:scale-120 animate-float z-30 shadow-2xl">
           <FakeCard 
              content="Cesta" 
              example="Šťastnú cestu!" 
           />
        </div>
        
      </div>
    </div>
  );
}