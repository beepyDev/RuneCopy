
import { useState } from "react";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [copiedRune, setCopiedRune] = useState<string | null>(null);

  // Runic Unicode range: U+16A0 to U+16F0
  const runeList = Array.from({ length: 81 }, (_, i) => String.fromCodePoint(0x16A0 + i));

  const copyToClipboard = async (rune: string) => {
    try {
      await navigator.clipboard.writeText(rune);
      setCopiedRune(rune);
      
      toast({
        title: "Copied to clipboard",
        description: `Rune: ${rune}`,
        duration: 2000,
      });
      
      // Reset the copied state after animation
      setTimeout(() => setCopiedRune(null), 500);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Runic Symbol Copier</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Click on any rune to instantly copy it to your clipboard. Perfect for writers, designers, and Norse mythology enthusiasts.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {runeList.map((rune, index) => (
              <button
                key={index}
                onClick={() => copyToClipboard(rune)}
                className={`
                  relative h-14 rounded-lg transition-all duration-300 flex items-center justify-center
                  ${copiedRune === rune 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-50 hover:bg-gray-100 text-gray-800"}
                `}
              >
                <span className="text-2xl font-runic">{rune}</span>
                {copiedRune === rune && (
                  <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>Created for writers, gamers, and rune enthusiasts.</p>
          <p className="mt-1">Click any rune to copy it to your clipboard.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
