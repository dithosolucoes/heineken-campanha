import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, FileText, Eye } from "lucide-react";

const steps = ["Dados Gerais", "Regras", "PDVs", "Preview", "Revisão"];

const initialForm = {
  name: "",
  description: "",
  start: "",
  end: "",
  rules: [""],
  pdvs: [],
};

const CampaignWizard = ({ open, onOpenChange, onSubmit, campaign }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(campaign || initialForm);

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{campaign ? "Editar Campanha" : "Nova Campanha"}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={i} className={`flex-1 text-center py-2 rounded ${i === step ? 'bg-heineken-green text-white font-bold' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
          ))}
        </div>
        {/* Etapas do wizard */}
        {step === 0 && (
          <div className="space-y-4">
            <Input placeholder="Nome da campanha" value={form.name} onChange={e => handleChange('name', e.target.value)} />
            <Textarea placeholder="Descrição" value={form.description} onChange={e => handleChange('description', e.target.value)} />
            <div className="flex gap-2">
              <Input type="date" value={form.start} onChange={e => handleChange('start', e.target.value)} />
              <Input type="date" value={form.end} onChange={e => handleChange('end', e.target.value)} />
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <div className="font-semibold text-heineken-green mb-2 flex items-center gap-2"><FileText size={18}/>Regras</div>
            {form.rules.map((rule, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input value={rule} onChange={e => {
                  const newRules = [...form.rules];
                  newRules[idx] = e.target.value;
                  handleChange('rules', newRules);
                }} />
                <Button variant="ghost" onClick={() => handleChange('rules', form.rules.filter((_, i) => i !== idx))}>Remover</Button>
              </div>
            ))}
            <Button variant="outline" onClick={() => handleChange('rules', [...form.rules, ""])}>Adicionar Regra</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="font-semibold text-heineken-green mb-2 flex items-center gap-2"><Users size={18}/>PDVs Participantes</div>
            <div className="bg-gray-100 rounded p-4 text-gray-400">[Seleção de PDVs - Busca, Filtros, Lista]</div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div className="font-semibold text-heineken-green mb-2 flex items-center gap-2"><Eye size={18}/>Preview</div>
            <div className="bg-gray-100 rounded p-4">Resumo da campanha:<br/>Nome: {form.name}<br/>Descrição: {form.description}<br/>Período: {form.start} - {form.end}<br/>Regras: {form.rules.filter(Boolean).join(", ")}</div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <div className="font-semibold text-heineken-green mb-2">Revisão Final</div>
            <div className="bg-gray-100 rounded p-4">Tudo pronto para salvar!</div>
          </div>
        )}
        <div className="flex justify-between mt-6">
          <Button variant="ghost" onClick={prev} disabled={step === 0}>Voltar</Button>
          {step < steps.length - 1 ? (
            <Button onClick={next}>Próximo</Button>
          ) : (
            <Button onClick={() => { onSubmit?.(form); onOpenChange(false); }}>Salvar</Button>
          )}
        </div>
        <div className="flex justify-end mt-2">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignWizard;
