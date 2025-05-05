
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
        title: "Copied",
        description: `${rune}`,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-6">
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
      </div>
    </div>
  );
};

export default Index;
