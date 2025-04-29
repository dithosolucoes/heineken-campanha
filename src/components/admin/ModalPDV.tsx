import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CampanhaMultiSelect from './CampanhaMultiSelect';

interface ModalPDVProps {
  open: boolean;
  onClose: () => void;
  onSave: (pdv: any) => void;
  pdv?: any;
}

const mockCampanhas = [
  { id: '1', name: 'Verão Heineken 2025' },
  { id: '2', name: 'Futebol & Churrasco' },
  { id: '3', name: 'Carnaval Verde' },
];

const initialPDV = {
  name: '',
  cnpj: '',
  city: '',
  state: '',
  status: 'Ativo',
  campanhas: [] as string[],
};

export default function ModalPDV({ open, onClose, onSave, pdv }: ModalPDVProps) {
  const [form, setForm] = useState(initialPDV);

  useEffect(() => {
    if (pdv) setForm({ ...initialPDV, ...pdv });
    else setForm(initialPDV);
  }, [pdv, open]);

  if (!open) return null;

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSelect(val: string) {
    setForm({ ...form, status: val });
  }

  function handleCampanhasChange(ids: string[]) {
    setForm({ ...form, campanhas: ids });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSave({ ...form, id: pdv?.id || Date.now().toString() });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={onClose}>×</button>
        <h3 className="text-xl font-bold mb-4 text-heineken-green">{pdv ? 'Editar PDV' : 'Novo PDV'}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="pdv-nome" className="text-sm font-medium text-gray-700">Nome</label>
            <Input required id="pdv-nome" name="name" value={form.name} onChange={handleChange} placeholder="Ex: Supermercado Exemplo" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="pdv-cnpj" className="text-sm font-medium text-gray-700">CNPJ</label>
            <Input required id="pdv-cnpj" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" maxLength={18} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="pdv-cidade" className="text-sm font-medium text-gray-700">Cidade</label>
              <Input required id="pdv-cidade" name="city" value={form.city} onChange={handleChange} placeholder="Cidade" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="pdv-uf" className="text-sm font-medium text-gray-700">UF</label>
              <Input required id="pdv-uf" name="state" maxLength={2} value={form.state} onChange={handleChange} placeholder="UF" />
            </div>
          </div>
          <CampanhaMultiSelect options={mockCampanhas} value={form.campanhas} onChange={handleCampanhasChange} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select value={form.status} onValueChange={handleSelect}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="bg-heineken-green mt-4 w-full text-base font-semibold">{pdv ? 'Salvar' : 'Criar'}</Button>
        </form>
        <style>{`
          /* Mascara simples para CNPJ (apenas visual) */
          input[name='cnpj']::-webkit-input-placeholder { color: #bbb; }
        `}</style>
      </div>
    </div>
  );
}
