import { MemeFormValues } from "@/lib/validations/meme.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SubmitMemeTitleProps {
  register: UseFormRegister<MemeFormValues>;
  error?: FieldErrors<MemeFormValues>["title"];
}

export const SubmitMemeTitle = ({ register, error }: SubmitMemeTitleProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-foreground/50 ml-1">
      Título
    </label>
    <input
      {...register("title")}
      className={`w-full bg-input-bg border ${
        error ? "border-red-500" : "border-card-border"
      } rounded-2xl py-4 px-4 text-sm text-foreground focus:ring-2 focus:ring-brand outline-none transition-all`}
      placeholder="Escribe algo gracioso..."
    />
    {error && (
      <p className="text-[10px] text-red-500 font-bold ml-2">{error.message}</p>
    )}
  </div>
);
