'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  name: string;
  defaultValue?: string | null;
  folder?: string;
}

export function ImageUpload({ name, defaultValue, folder = 'general' }: ImageUploadProps) {
  const [url, setUrl] = useState(defaultValue ?? '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');

    const ext = file.name.split('.').pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const supabase = createClient();
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="relative w-full max-w-xs">
          <img
            src={url}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg border border-white/10"
          />
          <button
            type="button"
            onClick={() => setUrl('')}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-8 rounded-lg bg-[#0a0a0c] border border-dashed border-white/20 text-gray-400 hover:border-purple-500/50 hover:text-white transition-colors text-sm disabled:opacity-50 w-full max-w-xs justify-center"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Subiendo...' : 'Subir imagen'}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
