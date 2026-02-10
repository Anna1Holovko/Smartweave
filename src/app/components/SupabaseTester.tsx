import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, CheckCircle, XCircle, AlertCircle, Copy } from 'lucide-react';
import { supabase } from '../../../utils/supabase/client';

export function SupabaseTester() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    const testResults: any = {
      timestamp: new Date().toISOString(),
      tests: [],
    };

    // Test 1: Check connection
    try {
      const { data, error } = await supabase.from('kv_store_d2f83652').select('count');
      testResults.tests.push({
        name: '1. Połączenie z Supabase',
        status: error ? 'error' : 'success',
        message: error ? error.message : 'Połączono pomyślnie',
        details: error || data,
        errorCode: error?.code,
      });
    } catch (e: any) {
      testResults.tests.push({
        name: '1. Połączenie z Supabase',
        status: 'error',
        message: 'Błąd połączenia',
        details: e.message,
      });
    }

    // Test 2: Check table exists and schema
    try {
      const { data, error } = await supabase
        .from('kv_store_d2f83652')
        .select('*')
        .limit(1);
      
      testResults.tests.push({
        name: '2. Tabela kv_store_d2f83652 istnieje',
        status: error ? 'error' : 'success',
        message: error ? error.message : 'Tabela istnieje',
        details: error || { rowCount: data?.length || 0 },
        errorCode: error?.code,
        hint: error?.code === 'PGRST204' 
          ? 'Schema cache nie został odświeżony lub tabela ma błędną strukturę. Uruchom SUPABASE_FIX.sql' 
          : undefined,
      });
    } catch (e: any) {
      testResults.tests.push({
        name: '2. Tabela kv_store_d2f83652 istnieje',
        status: 'error',
        message: 'Tabela nie istnieje lub brak dostępu',
        details: e.message,
      });
    }

    // Test 3: Try to insert
    try {
      const testKey = `test:${Date.now()}`;
      const { data, error } = await supabase
        .from('kv_store_d2f83652')
        .insert({
          key: testKey,
          value: { test: true, timestamp: new Date().toISOString() },
        })
        .select();

      testResults.tests.push({
        name: '3. Test zapisu (INSERT)',
        status: error ? 'error' : 'success',
        message: error ? error.message : 'Zapis działa',
        details: error || data,
        errorCode: error?.code,
      });

      // If insert succeeded, clean up
      if (!error) {
        await supabase.from('kv_store_d2f83652').delete().eq('key', testKey);
      }
    } catch (e: any) {
      testResults.tests.push({
        name: '3. Test zapisu (INSERT)',
        status: 'error',
        message: 'Nie można zapisać danych',
        details: e.message,
      });
    }

    // Test 4: Try reading contact entries
    try {
      const { data, error } = await supabase
        .from('kv_store_d2f83652')
        .select('*')
        .ilike('key', 'contact:%')
        .limit(5);

      testResults.tests.push({
        name: '4. Odczyt wiadomości kontaktowych',
        status: error ? 'error' : 'success',
        message: error ? error.message : `Znaleziono ${data?.length || 0} wiadomości`,
        details: error || { count: data?.length || 0, sample: data?.[0] },
        errorCode: error?.code,
      });
    } catch (e: any) {
      testResults.tests.push({
        name: '4. Odczyt wiadomości kontaktowych',
        status: 'error',
        message: 'Nie można odczytać wiadomości',
        details: e.message,
      });
    }

    setResults(testResults);
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Database className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Database className="w-7 h-7 text-blue-400" />
                    Diagnostyka Supabase
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Sprawdź połączenie i uprawnienia do bazy danych
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                >
                  <XCircle className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-150px)] p-6">
                {/* Run test button */}
                <div className="mb-6">
                  <button
                    onClick={runTests}
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <Database className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Testowanie...' : 'Uruchom testy połączenia'}
                  </button>
                </div>

                {/* Results */}
                {results && (
                  <div className="space-y-4">
                    {results.tests.map((test: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-xl border p-4 ${
                          test.status === 'success'
                            ? 'border-green-500/30 bg-green-500/10'
                            : test.status === 'error'
                            ? 'border-red-500/30 bg-red-500/10'
                            : 'border-yellow-500/30 bg-yellow-500/10'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {getStatusIcon(test.status)}
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1">{test.name}</h3>
                            <p
                              className={`text-sm mb-2 ${
                                test.status === 'success'
                                  ? 'text-green-300'
                                  : test.status === 'error'
                                  ? 'text-red-300'
                                  : 'text-yellow-300'
                              }`}
                            >
                              {test.message}
                            </p>
                            {test.errorCode && (
                              <p className="text-xs text-red-400 mb-2">
                                Kod błędu: <span className="font-mono bg-slate-800 px-2 py-0.5 rounded">{test.errorCode}</span>
                              </p>
                            )}
                            {test.hint && (
                              <div className="mb-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-300">
                                💡 <strong>Rozwiązanie:</strong> {test.hint}
                              </div>
                            )}
                            {test.details && (
                              <div className="mt-2 relative">
                                <button
                                  onClick={() => copyToClipboard(JSON.stringify(test.details, null, 2))}
                                  className="absolute top-2 right-2 p-1.5 bg-slate-700/50 hover:bg-slate-700 rounded transition-colors"
                                  title="Kopiuj szczegóły"
                                >
                                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                                </button>
                                <pre className="text-xs bg-slate-800/80 rounded-lg p-3 overflow-x-auto text-slate-300 border border-slate-700/50">
                                  {JSON.stringify(test.details, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Instructions if errors found */}
                    {results.tests.some((t: any) => t.status === 'error') && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 rounded-xl border border-purple-500/30 bg-purple-500/10 p-6"
                      >
                        <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-purple-400" />
                          Jak naprawić błędy
                        </h3>
                        <ol className="space-y-3 text-slate-300 text-sm">
                          <li className="flex gap-3">
                            <span className="text-purple-400 font-bold">1.</span>
                            <div>
                              Przejdź do SQL Editor:
                              <code className="block mt-1 text-xs bg-slate-800 px-2 py-1 rounded text-cyan-400">
                                https://supabase.com/dashboard/project/mpokyroyyqxhxlkofluc/sql/new
                              </code>
                            </div>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-purple-400 font-bold">2.</span>
                            <div>
                              Skopiuj i uruchom SQL (dostępny w poprzedniej wiadomości czatu)
                            </div>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-purple-400 font-bold">3.</span>
                            <div>Kliknij "Run" (Ctrl+Enter)</div>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-purple-400 font-bold">4.</span>
                            <div>Uruchom ponownie testy powyżej</div>
                          </li>
                        </ol>
                      </motion.div>
                    )}

                    {/* Success message */}
                    {results.tests.every((t: any) => t.status === 'success') && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center"
                      >
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-3" />
                        <h3 className="text-white font-bold text-xl mb-2">
                          🎉 Wszystko działa!
                        </h3>
                        <p className="text-green-300 text-sm">
                          Formularz kontaktowy teraz zapisuje dane do Supabase
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

                {!results && !isLoading && (
                  <div className="text-center py-12">
                    <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">
                      Kliknij przycisk powyżej aby uruchomić testy
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}