
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileUploader = ({ onFileSelect, selectedFile }: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Tipo de arquivo inválido',
        description: 'Por favor, selecione apenas arquivos de imagem.',
        variant: 'destructive'
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Arquivo muito grande',
        description: 'O tamanho máximo permitido é 5MB.',
        variant: 'destructive'
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Pass file to parent
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect(null as any);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-heineken-green bg-heineken-green/5' : 'border-gray-300 hover:border-heineken-green'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="rounded-full bg-heineken-green/10 p-3">
              <Upload className="h-8 w-8 text-heineken-green" />
            </div>
            <div>
              <p className="text-lg font-medium">Arraste ou clique para enviar</p>
              <p className="text-sm text-gray-500 mt-1">Formatos aceitos: JPG, PNG. Máximo: 5MB</p>
            </div>
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-300">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full object-cover" 
            style={{ maxHeight: '300px' }} 
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full" 
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {selectedFile && (
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <Image className="mr-2 h-4 w-4" />
          <span className="truncate">{selectedFile.name}</span>
          <span className="ml-2">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
