import { MemeType, UploadTypeLabel } from "@/types/memes.types";
import { Loader2 } from "lucide-react";

interface MemeSubmitButtonProps {
  type: MemeType;
  isValid: boolean;
  isSubmitting: boolean;
}

export const MemeSubmitButton = ({
  type,
  isValid,
  isSubmitting,
}: MemeSubmitButtonProps) => (
  <button
    type="submit"
    disabled={!isValid || isSubmitting}
    className="w-full bg-brand text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand/20 active:scale-95 transition-all uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-30 disabled:grayscale"
  >
    {isSubmitting ? (
      <Loader2 className="animate-spin" size={20} />
    ) : (
      `Guardar ${UploadTypeLabel[type]}`
    )}
  </button>
);
