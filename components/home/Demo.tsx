export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-20 rounded-t-4xl bg-muted-primary p-5 md:gap-40 md:p-10">
      <div className="-rotate-8 rounded-4xl bg-background p-5 font-bold">
        Placholder
        <br /> Blah blah blah
        <br /> Yada Yada Yada Yada Yada
      </div>
      <img
        src="demo_phone.webp"
        alt="Demo Phone"
        className="pointer-events-none select-none"
      />
      <div className="flex flex-col justify-between gap-20 md:gap-40">
        <div className="rotate-10 rounded-4xl bg-background p-5 font-bold">
          Placholder
          <br /> Blah blah blah
          <br /> Yada Yada Yada Yada Yada
        </div>
        <div className="rotate-10 rounded-4xl bg-background p-5 font-bold">
          Placholder
          <br /> Blah blah blah
          <br /> Yada Yada Yada Yada Yada
        </div>
      </div>
    </div>
  );
}
