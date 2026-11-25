"use client";

/* Contact & hire — static-site form: the brief is saved to localStorage and
 * delivered instantly by opening WhatsApp pre-filled with the client's
 * message. Direct channels (phone / WhatsApp / email / socials) come from
 * the editable Admin profile (→ /admin, Profile tab). */
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  Send,
  Loader2,
} from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-context";
import { useProfile } from "@/hooks/use-profile";
import { CONTACT } from "@/content/site";
import { addSubmission } from "@/lib/local-data";
import {
  BrandInstagram,
  BrandYouTube,
  BrandTikTok,
  BrandFacebook,
  BrandX,
  BrandLinkedIn,
  BrandWhatsApp,
} from "@/components/shared/brand-icons";
import type { ComponentType } from "react";

type FormValues = {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  budget?: string;
};

export function Contact() {
  const { t } = useLanguage();
  const { profile } = useProfile();
  const [submitting, setSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    company: z.string().optional(),
    service: z.string().min(1),
    message: z.string().min(10),
    budget: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      // Static site — store the brief locally AND deliver it through WhatsApp.
      addSubmission({
        name: values.name,
        email: values.email,
        company: values.company || null,
        service: values.service,
        message: values.message,
        budget: values.budget || null,
      });
      const waText = encodeURIComponent(
        `Hi Ubaid! I'm ${values.name}${values.company ? ` (${values.company})` : ""}.\n` +
          `Service: ${values.service}${values.budget ? `\nBudget: ${values.budget}` : ""}\n\n` +
          `${values.message}\n\nEmail: ${values.email}`
      );
      const wa = profile.whatsapp || CONTACT.whatsappNumber;
      window.open(`https://wa.me/${wa}?text=${waText}`, "_blank", "noopener");
      toast({ description: t.contact.form.success });
      reset({ name: "", email: "", company: "", service: "", message: "", budget: "" });
      setSelectedService("");
      setSelectedBudget("");
    } catch {
      toast({ description: t.contact.form.error, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const err = (msg: string) => <p className="mt-1.5 text-[11px] font-medium text-destructive">{msg}</p>;

  // Build a tel: href from any phone format (+92 345…, 0345…, 345…)
  const telHref = (() => {
    const raw = profile.phone.trim();
    const digits = raw.replace(/[^0-9]/g, "");
    if (raw.startsWith("+")) return `tel:+${digits}`;
    if (digits.startsWith("0")) return `tel:+92${digits.slice(1)}`;
    return `tel:+92${digits}`;
  })();

  const channel = (href: string, label: string, Icon: ComponentType<{ className?: string }>, external = true) => (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3 rounded-2xl border border-line bg-surface/50 px-4 py-3.5 transition hover:border-electric/60 hover:bg-surface"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-electric/40 bg-electric/10 text-glow transition group-hover:bg-electric group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {label === "WhatsApp" && profile.phone ? (
          <span dir="ltr" className="truncate text-[11px] text-muted-foreground">{profile.phone}</span>
        ) : null}
        {label === t.contact.phone && profile.phone ? (
          <span dir="ltr" className="truncate text-[11px] text-muted-foreground">{profile.phone}</span>
        ) : null}
        {label === "Email" && profile.email ? (
          <span dir="ltr" className="truncate text-[11px] text-muted-foreground">{profile.email}</span>
        ) : null}
      </span>
    </a>
  );

  const socials = (
    [
      { href: profile.instagram, Icon: BrandInstagram, label: "Instagram" },
      { href: profile.youtube, Icon: BrandYouTube, label: "YouTube" },
      { href: profile.tiktok, Icon: BrandTikTok, label: "TikTok" },
      { href: profile.facebook, Icon: BrandFacebook, label: "Facebook" },
      { href: profile.x, Icon: BrandX, label: "X" },
      { href: profile.linkedin, Icon: BrandLinkedIn, label: "LinkedIn" },
    ] as { href: string; Icon: ComponentType<{ className?: string }>; label: string }[]
  ).filter((s) => s.href);

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(225,29,46,0.12),transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t.contact.kicker} heading={t.contact.heading} subtitle={t.contact.subheading} />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Form */}
          <Reveal>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-line bg-card/70 p-6 backdrop-blur sm:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ct-name" className="text-xs font-semibold text-muted-foreground">{t.contact.form.name} *</label>
                  <Input id="ct-name" {...register("name")} className="mt-2 border-line bg-surface/70" aria-invalid={!!errors.name} />
                  {errors.name ? err(t.contact.form.required) : null}
                </div>
                <div>
                  <label htmlFor="ct-email" className="text-xs font-semibold text-muted-foreground">{t.contact.form.email} *</label>
                  <Input id="ct-email" type="email" {...register("email")} className="mt-2 border-line bg-surface/70" aria-invalid={!!errors.email} dir="ltr" />
                  {errors.email ? err(t.contact.form.invalidEmail) : null}
                </div>
                <div>
                  <label htmlFor="ct-company" className="text-xs font-semibold text-muted-foreground">{t.contact.form.company}</label>
                  <Input id="ct-company" {...register("company")} className="mt-2 border-line bg-surface/70" />
                </div>
                <div>
                  <label htmlFor="ct-service" className="text-xs font-semibold text-muted-foreground">{t.contact.form.service} *</label>
                  <input type="hidden" {...register("service")} />
                  <Select
                    value={selectedService}
                    onValueChange={(v) => {
                      setSelectedService(v);
                      setValue("service", v, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger id="ct-service" className="mt-2 w-full border-line bg-surface/70" aria-invalid={!!errors.service}>
                      <SelectValue placeholder={t.contact.form.service} />
                    </SelectTrigger>
                    <SelectContent className="border-line bg-popover">
                      {t.contact.services.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service ? err(t.contact.form.required) : null}
                </div>
                <div>
                  <label htmlFor="ct-budget" className="text-xs font-semibold text-muted-foreground">{t.contact.form.budget}</label>
                  <input type="hidden" {...register("budget")} />
                  <Select
                    value={selectedBudget}
                    onValueChange={(v) => {
                      setSelectedBudget(v);
                      setValue("budget", v);
                    }}
                  >
                    <SelectTrigger id="ct-budget" className="mt-2 w-full border-line bg-surface/70">
                      <SelectValue placeholder={t.contact.form.budget} />
                    </SelectTrigger>
                    <SelectContent className="border-line bg-popover">
                      {t.contact.budgets.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ct-message" className="text-xs font-semibold text-muted-foreground">{t.contact.form.message} *</label>
                  <Textarea id="ct-message" rows={5} {...register("message")} className="mt-2 border-line bg-surface/70" aria-invalid={!!errors.message} />
                  {errors.message ? err(t.contact.form.required) : null}
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full bg-electric text-sm font-bold tracking-wider text-white shadow-[0_0_28px_rgba(225,29,46,0.45)] transition hover:bg-glow sm:w-auto sm:px-10"
              >
                {submitting ? (
                  <>
                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                    {t.contact.form.submitting}
                  </>
                ) : (
                  <>
                    {t.contact.form.submit}
                    <Send className="ms-2 h-4 w-4 rtl:-scale-x-100" />
                  </>
                )}
              </Button>
            </form>
          </Reveal>

          {/* Direct channels */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">{t.contact.directTitle}</p>
              {profile.whatsapp ? channel(`https://wa.me/${profile.whatsapp}`, "WhatsApp", BrandWhatsApp) : null}
              {profile.phone ? channel(telHref, t.contact.phone, Phone, false) : null}
              {profile.email ? channel(`mailto:${profile.email}`, "Email", Mail, false) : null}
              {profile.location ? (
                <p className="rounded-xl border border-line bg-surface/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  {profile.location}
                </p>
              ) : null}

              {socials.length > 0 ? (
                <>
                  <p className="pt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">{t.contact.followTitle}</p>
                  {socials.map((s) => (
                    <Fragment key={s.label}>{channel(s.href, s.label, s.Icon)}</Fragment>
                  ))}
                </>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
