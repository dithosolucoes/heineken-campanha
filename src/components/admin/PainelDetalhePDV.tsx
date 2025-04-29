interface PainelDetalhePDVProps {
  open: boolean;
  pdv: any;
  onClose: () => void;
}

export default function PainelDetalhePDV({ open, pdv, onClose }: PainelDetalhePDVProps) {
  if (!open || !pdv) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={onClose}>×</button>
        <h3 className="text-xl font-bold mb-4 text-heineken-green">Detalhes do PDV</h3>
        <div className="space-y-2">
          <div><b>Nome:</b> {pdv.name}</div>
          <div><b>CNPJ:</b> {pdv.cnpj}</div>
          <div><b>Cidade/UF:</b> {pdv.city}/{pdv.state}</div>
          <div><b>Campanhas:</b> {pdv.campaigns}</div>
          <div><b>Envios:</b> {pdv.uploads}</div>
          <div><b>Status:</b> {pdv.status}</div>
        </div>
        <div className="mt-6 flex gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-heineken-green text-white">Fechar</button>
        </div>
      </div>
    </div>
  );
}
