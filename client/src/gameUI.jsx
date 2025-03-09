import React from "react";

const GameUI = () => {
  return (
    <div className="bg-darkObsidian text-ancientBone min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-shadowPurple text-goldenEmber py-4 text-center text-3xl font-bold border-b-4 border-crimson shadow-lg">
        Build-A-Terror Workshop
      </header>

      {/* Main Content */}
      <main className="flex-grow grid grid-cols-2 gap-4 p-8">
        {/* Left Panel */}
        <section className="bg-abyssalTeal p-6 rounded-xl shadow-md border border-goldenEmber">
          <h2 className="text-xl font-semibold text-goldenEmber mb-4">Inventory</h2>
          <p className="text-ancientBone">Manage your collected monster parts.</p>
        </section>

        {/* Right Panel */}
        <section className="bg-darkObsidian p-6 rounded-xl shadow-md border border-glowingCyan">
          <h2 className="text-xl font-semibold text-glowingCyan mb-4">Gacha Summons</h2>
          <p className="text-ancientBone">Summon new horrors from the abyss.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-shadowPurple text-center py-3 text-ancientBone border-t-4 border-crimson">
        © 2025 Build-A-Terror. All Rights Reserved.
      </footer>
    </div>
  );
};

export default GameUI; 

// This component represents the main game UI for the Build-A-Terror game.
// It includes a header, main content area with two panels (Inventory and Gacha Summons), and a footer.
// The UI is styled using custom CSS classes for a unique look and feel.