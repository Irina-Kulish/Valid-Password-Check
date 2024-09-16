import React, { useState, ChangeEvent, useCallback, useMemo } from 'react';

export const PasswordValidator: React.FC = () => {
  const [passwords, setPasswords] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{
    validCount: number | null;
    error: string | null;
  }>({ validCount: null, error: null });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setValidationResult({ validCount: null, error: null });
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileContent = e.target?.result as string;
        setPasswords(fileContent);
      };
      reader.readAsText(file);
    }
  };

  const isValidPassword = useCallback((line: string): boolean => {
    const regex = /(\w) (\d+)-(\d+): (\w+)/;
    const match = line.match(regex);
    if (match) {
      const letter = match[1];
      const minCount = parseInt(match[2], 10);
      const maxCount = parseInt(match[3], 10);
      const password = match[4];
      const letterCount = password.split(letter).length - 1;
      return letterCount >= minCount && letterCount <= maxCount;
    }
    return false;
  }, []);

  const validatePasswords = () => {
    if (!selectedFile) {
      setValidationResult({ validCount: null, error: 'No file selected' });
      return;
    }
    const passwordLines = passwords.trim().split('\n');
    const validPasswords = passwordLines.filter((line) => isValidPassword(line));
    setValidationResult({ validCount: validPasswords.length, error: null });
  };

  const validCountDisplay = useMemo(() => {
    if (validationResult.validCount !== null) {
      return (
        <p className="mt-4 text-lg font-medium text-center text-white">
          Number of valid passwords: <span className="text-green-300">{validationResult.validCount}</span>
        </p>
      );
    }
    return null;
  }, [validationResult.validCount]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 shadow-2xl rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Upload a file with passwords
      </h2>

      <div className="mb-6 space-y-4">
        <label
          htmlFor="fileInput"
          className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {selectedFile ? `Selected file: ${selectedFile}` : 'Upload File'}
        </label>
        <input type="file" onChange={handleFileUpload} id="fileInput" className="hidden" />
        <button
          onClick={validatePasswords}
          className="btn btn-accent w-full bg-green-500 hover:bg-green-600 text-white"
        >
          Check passwords
        </button>
      </div>

      {validationResult.error && (
        <p className="text-red-500 text-center">{validationResult.error}</p>
      )}

      {validCountDisplay}
    </div>
  );
};
