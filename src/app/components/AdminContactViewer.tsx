import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Mail, Phone, User, MessageSquare, Calendar, Trash2, RefreshCw, Database } from 'lucide-react';
import { supabase } from '../../../utils/supabase/client';

interface ContactSubmission {
  key: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  timestamp: string;
  status: string;
}

export function AdminContactViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'supabase' | 'localStorage' | 'both'>('both');

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen]);

  const loadSubmissions = async () => {
    setIsLoading(true);
    const allSubmissions: ContactSubmission[] = [];

    // Try loading from Supabase
    try {
      console.log('🔵 Loading from Supabase...');
      const { data, error } = await supabase
        .from('kv_store_d2f83652')
        .select('*')
        .ilike('key', 'contact:%')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        console.log('✅ Loaded from Supabase:', data.length, 'submissions');
        const supabaseSubmissions = data.map((row: any) => ({
          key: row.key,
          ...row.value,
        }));
        allSubmissions.push(...supabaseSubmissions);
        setDataSource('supabase');
      }
    } catch (error) {
      console.warn('⚠️ Failed to load from Supabase:', error);
    }

    // Also load from localStorage
    try {
      const localData = localStorage.getItem('contact_submissions');
      if (localData) {
        const parsed = JSON.parse(localData);
        console.log('✅ Loaded from localStorage:', parsed.length, 'submissions');
        
        // Merge with Supabase data, avoiding duplicates
        const existingKeys = new Set(allSubmissions.map(s => s.key));
        const localSubmissions = parsed.filter((s: ContactSubmission) => !existingKeys.has(s.key));
        
        allSubmissions.push(...localSubmissions);
        
        if (allSubmissions.length > 0 && localSubmissions.length > 0) {
          setDataSource('both');
        } else if (allSubmissions.length === 0 && localSubmissions.length > 0) {
          setDataSource('localStorage');
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to load from localStorage:', error);
    }

    // Sort by timestamp, newest first
    allSubmissions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setSubmissions(allSubmissions);
    setIsLoading(false);
  };

  const deleteSubmission = async (key: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tę wiadomość?')) return;

    // Delete from Supabase
    try {
      const { error } = await supabase
        .from('kv_store_d2f83652')
        .delete()
        .eq('key', key);

      if (error) throw error;
      console.log('✅ Deleted from Supabase');
    } catch (error) {
      console.warn('⚠️ Failed to delete from Supabase:', error);
    }

    // Delete from localStorage
    try {
      const data = localStorage.getItem('contact_submissions');
      if (data) {
        const parsed = JSON.parse(data);
        const filtered = parsed.filter((s: ContactSubmission) => s.key !== key);
        localStorage.setItem('contact_submissions', JSON.stringify(filtered));
        console.log('✅ Deleted from localStorage');
      }
    } catch (error) {
      console.warn('⚠️ Failed to delete from localStorage:', error);
    }

    loadSubmissions();
  };

  const clearAll = async () => {
    if (!confirm('Czy na pewno chcesz usunąć wszystkie wiadomości?')) return;

    // Clear from Supabase
    try {
      const { error } = await supabase
        .from('kv_store_d2f83652')
        .delete()
        .ilike('key', 'contact:%');

      if (error) throw error;
      console.log('✅ Cleared Supabase');
    } catch (error) {
      console.warn('⚠️ Failed to clear Supabase:', error);
    }

    // Clear localStorage
    localStorage.removeItem('contact_submissions');
    console.log('✅ Cleared localStorage');

    setSubmissions([]);
  };

  const exportData = () => {
    const dataToExport = JSON.stringify(submissions, null, 2);
    const blob = new Blob([dataToExport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString()}.json`;
    a.click();
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
              <div>
                <h2 className="text-2xl font-bold text-white">Wiadomości kontaktowe</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Zapisane lokalnie w localStorage
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-4 p-4 bg-slate-800/50 border-b border-slate-700/50">
              <button
                onClick={loadSubmissions}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Odśwież
              </button>
              <button
                onClick={exportData}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Eksportuj JSON
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Usuń wszystkie
              </button>
              <div className="ml-auto text-slate-400 text-sm flex items-center gap-2">
                <Database className="w-4 h-4" />
                {submissions.length} wiadomości
                {dataSource === 'supabase' && <span className="text-green-400">(Supabase)</span>}
                {dataSource === 'localStorage' && <span className="text-yellow-400">(Local)</span>}
                {dataSource === 'both' && <span className="text-blue-400">(Both)</span>}
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              {submissions.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Brak wiadomości</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <motion.div
                      key={submission.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all"
                    >
                      {/* Delete button */}
                      <button
                        onClick={() => deleteSubmission(submission.key)}
                        className="absolute top-4 right-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                        title="Usuń"
                      >
                        <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Name */}
                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-purple-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                              Imię i nazwisko
                            </p>
                            <p className="text-white font-medium">{submission.name}</p>
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                              Email
                            </p>
                            <a
                              href={`mailto:${submission.email}`}
                              className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                              {submission.email}
                            </a>
                          </div>
                        </div>

                        {/* Phone */}
                        {submission.phone && (
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-green-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                Telefon
                              </p>
                              <a
                                href={`tel:${submission.phone}`}
                                className="text-green-400 hover:text-green-300 font-medium"
                              >
                                {submission.phone}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Timestamp */}
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-orange-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                              Data
                            </p>
                            <p className="text-white font-medium">
                              {new Date(submission.timestamp).toLocaleString('pl-PL')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-pink-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                            Wiadomość
                          </p>
                          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {submission.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}