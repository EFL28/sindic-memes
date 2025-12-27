import { MemeFormValues } from "@/lib/validations/meme.schema";
import { Link as LinkIcon } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SubmitMemeUrlProps {
  register: UseFormRegister<MemeFormValues>;
  error?: FieldErrors<MemeFormValues>["url"];
}

export const SubmitMemeUrl = ({ register, error }: SubmitMemeUrlProps) => (
  <div className="relative">
    <LinkIcon
      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      size={18}
    />
    <input
      {...register("url")}
      type="url"
      placeholder="https://x.com/status/..."
      className={`w-full bg-input-bg border ${
        error ? "border-red-500" : "border-card-border"
      } rounded-2xl py-4 pl-12 pr-4 text-sm text-foreground focus:ring-2 focus:ring-brand outline-none transition-all`}
    />
  </div>
);
