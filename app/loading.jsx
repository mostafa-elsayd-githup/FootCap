"use client";

export default function Loader() {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-main)",
        color: "var(--color-primary)",
      }}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute blur-3xl rounded-full w-36 h-36 animate-pulse"></div>

        <div className="relative">
          <div
            className="w-12 h-12 rounded-full border-4 animate-spin"
            style={{
              borderColor: "var(--border_card)",
              borderTopColor: "var(--color-primary)",
              borderBottomColor: "var(--color-primary)",
            }}
          ></div>
        </div>

        <p
          className="mt-5 text-xs font-bold tracking-[0.2em] uppercase animate-pulse"
          style={{
            fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
            color: "var(--color-secondary)",
          }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
