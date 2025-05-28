import { useState } from 'react';
import axios from 'axios';

export function ExcelUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert('Error al subir el archivo');
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Excel</button>
      <table>
        <thead>
          <tr>{data[0] && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
