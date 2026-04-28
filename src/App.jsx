import { useState, useEffect } from 'react';

function App() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Simulated file data
  useEffect(() => {
    const mockFiles = [
      { id: 1, name: 'document.pdf', size: 245000, type: 'application/pdf', date: '2024-01-15' },
      { id: 2, name: 'image.png', size: 1250000, type: 'image/png', date: '2024-01-14' },
      { id: 3, name: 'report.xlsx', size: 89000, type: 'application/vnd.ms-excel', date: '2024-01-13' },
    ];
    setFiles(mockFiles);
  }, []);

  // Filter files based on search
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (uploadedFiles) => {
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newFiles = Array.from(uploadedFiles).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        type: file.type,
        date: new Date().toISOString().split('T')[0]
      }));
      
      setFiles(prev => [...newFiles, ...prev]);
      setUploading(false);
    }, 1500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDelete = (id) => {
    setFiles(files.filter(file => file.id !== id));
    setSelectedFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('word') || type.includes('document')) return '📝';
    return '📁';
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📁 File Manager</h1>
        <p>Upload, manage, and organize your files</p>
      </header>

      <div className="container">
        {/* Upload Section */}
        <div 
          className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            <span className="upload-icon">📤</span>
            <h3>Drag & Drop Files Here</h3>
            <p>or click to browse</p>
            <input 
              type="file" 
              multiple 
              onChange={(e) => handleFileUpload(e.target.files)}
              className="file-input"
            />
          </div>
          {uploading && <div className="uploading">Uploading...</div>}
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* File List */}
        <div className="file-list">
          <h2>Your Files ({filteredFiles.length})</h2>
          {filteredFiles.length === 0 ? (
            <p className="no-files">No files found</p>
          ) : (
            <ul className="files">
              {filteredFiles.map(file => (
                <li 
                  key={file.id} 
                  className={`file-item ${selectedFile?.id === file.id ? 'selected' : ''}`}
                  onClick={() => setSelectedFile(file)}
                >
                  <span className="file-icon">{getFileIcon(file.type)}</span>
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-meta">
                      {formatFileSize(file.size)} • {file.date}
                    </span>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* File Details Panel */}
        {selectedFile && (
          <div className="file-details">
            <h3>File Details</h3>
            <p><strong>Name:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
            <p><strong>Type:</strong> {selectedFile.type}</p>
            <p><strong>Date:</strong> {selectedFile.date}</p>
            <button onClick={() => setSelectedFile(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;